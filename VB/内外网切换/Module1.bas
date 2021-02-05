Attribute VB_Name = "Module1"
'-----------------------模块中--------------------------
'在系统托盘显示图标的模块
Option Explicit

Public Declare Function SetWindowLong Lib "user32" Alias "SetWindowLongA" (ByVal hWnd As Long, ByVal nIndex As Long, ByVal dwNewLong As Long) As Long
Public Declare Function GetWindowLong Lib "user32" Alias "GetWindowLongA" (ByVal hWnd As Long, ByVal nIndex As Long) As Long
Public Declare Function CallWindowProc Lib "user32" Alias "CallWindowProcA" (ByVal lpPrevWndFunc As Long, ByVal hWnd As Long, ByVal Msg As Long, ByVal wParam As Long, ByVal lParam As Long) As Long
Public Declare Function RegisterHotKey Lib "user32" (ByVal hWnd As Long, ByVal id As Long, ByVal fsModifiers As Long, ByVal vk As Long) As Long
Public Declare Function UnregisterHotKey Lib "user32" (ByVal hWnd As Long, ByVal id As Long) As Long
Public Const WM_HOTKEY = &H312
Public Const MOD_ALT = &H1
Public Const MOD_CONTROL = &H2
Public Const MOD_SHIFT = &H4
Public Const GWL_WNDPROC = (-4)
Public Const VBKEYNUMBER6 = &H66
Public Const SWP_NOMOVE = &H2
Public Const SWP_NOSIZE = &H1
Public Const SWP_NOZORDER = &H4

Public preWinProc As Long
Public Modifiers As Long, uVirtKey As Long, idHotKey As Long

Private Type taLong
   ll   As Long
End Type
Private Type t2Int
   lWord   As Integer
   hword   As Integer
End Type

Public Declare Function SendMessage Lib "user32" Alias "SendMessageA" (ByVal hWnd As Long, ByVal wMsg As Long, ByVal wParam As Long, lParam As Any) As Long
Public Const WM_CLOSE = &H10
Public Declare Function GetLastError Lib "kernel32" () As Long
Public Declare Function FindWindow Lib "user32" Alias "FindWindowA" (ByVal lpClassName As String, ByVal lpWindowName As String) As Long
Public Declare Function CloseWindow Lib "user32" (ByVal hWnd As Long) As Long
Public Declare Function SetWindowPos Lib "user32" (ByVal hWnd As Long, ByVal hWndInsertAfter As Long, ByVal X As Long, ByVal Y As Long, ByVal cx As Long, ByVal cy As Long, ByVal wFlags As Long) As Long

Public Declare Function inet_addr Lib "ws2_32.dll" (ByVal cp As String) As Long
Public Declare Function SetIpForwardEntry Lib "iphlpapi.dll" (pRoute As MIB_IPFORWARDROW) As Long
Public Declare Function SetForegroundWindow Lib "user32" (ByVal hWnd As Long) As Long
Public Declare Function Shell_NotifyIcon Lib "shell32.dll" Alias "Shell_NotifyIconA" (ByVal dwMessage As Long, lpData As NOTIFYICONDATA) As Long
Public Declare Function ShowWindow Lib "user32" (ByVal hWnd As Long, ByVal nCmdShow As Long) As Long
Public Declare Function GetIpForwardTable Lib "iphlpapi.dll" (pIpForwardTable As MIB_IPFORWARDTABLE, pdwSize As Long, bOrder As Long) As Long
Public Type MIB_IPFORWARDROW

       dwForwardDest As Long      '目的地IP地址

       dwForwardMask As Long     '目的地主机的子网掩码

       dwForwardPolicy As Long    '将会引起多通道路由选择的设置条件。参看RFC 1354。

       dwForwardNextHop As Long        '路由器中IP地址的下一个跃点

       dwForwardIfIndex As Long         '路由的接口序号

       dwForwardType As Long      'RFC 1354中路由的定义，以下值之一：

       dwForwardProto As Long  '生成路由的协议，具体IPX协议值参看Routprot.h，而IP条目参看Iprtrmib.h

       dwForwardAge As Long  '路由持续时间，毫秒。仅用于路由远程访问服务（RRAS：Routing and Remote Access Service）运行时候，并且仅当路由类型为PROTO_IP_NETMGMT。

       dwForwardNextHopAS As Long  '下一跃点的自治系统编号

       dwForwardMetric1 As Long  '路由协议专有的公制值。详情参见RFC 1354。

       dwForwardMetric2 As Long  '路由协议专有的公制值。详情参见RFC 1354。

       dwForwardMetric3 As Long  '路由协议专有的公制值。详情参见RFC 1354。

       dwForwardMetric4 As Long  '路由协议专有的公制值。详情参见RFC 1354。

       dwForwardMetric5 As Long  '路由协议专有的公制值。详情参见RFC 1354。

End Type
Public Type MIB_IPFORWARDTABLE

    dwNumEntries As Long                            '表中路由接口数目

    Table(120) As MIB_IPFORWARDROW      '指向MIB_IPFORWARDROW类型阵列

End Type
Public MIB_ROW0000 As MIB_IPFORWARDROW
Public nfIconData As NOTIFYICONDATA
Public Const MAX_TOOLTIP As Integer = 64    '提示字符串中预显示的个数
Public Const NIF_ICON = &H2                 '预添加的图标
Public Const NIF_MESSAGE = &H1              '事件消息,比如鼠标抬起或按下
Public Const NIF_TIP = &H4                  '预显示的文字
Public Const NIM_ADD = &H0                  '添加托盘图标
Public Const NIM_MODIFY = &H1               'change托盘图标
Public Const NIM_DELETE = &H2               '删除托盘图标
Public Const WM_MOUSEMOVE = &H200           '鼠标移动
Public Const WM_LBUTTONDOWN = &H201         '按下右键
Public Const WM_LBUTTONUP = &H202           '左键抬起
Public Const WM_LBUTTONDBLCLK = &H203       '左键双击
Public Const WM_RBUTTONDOWN = &H204         '按下右键
Public Const WM_RBUTTONUP = &H205           '右键抬起
Public Const WM_RBUTTONDBLCLK = &H206       '右键双击
Public Const SW_RESTORE = 9                 '状态恢复
Public Const SW_HIDE = 0                    '状态隐藏

Public Type NOTIFYICONDATA
    cbSize As Long
    hWnd As Long
    uID As Long
    uFlags As Long
    uCallbackMessage As Long
    hIcon As Long
    szTip As String * MAX_TOOLTIP
End Type

Public Icon_nei As Long
Public Icon_wai As Long
Public ForwardState As Integer
Public CurrentState As Integer              '内网=1 外网=2

Public Declare Function CreatePolygonRgn Lib "gdi32" (lpPoint As POINTAPI, ByVal nCount As Long, ByVal nPolyFillMode As Long) As Long
Public Declare Function ScreenToClient Lib "user32" (ByVal hWnd As Long, lpPoint As POINTAPI) As Long ''以下3个切除窗口的边框
Public Declare Function SetWindowRgn Lib "user32" (ByVal hWnd As Long, ByVal hRgn As Long, ByVal bRedraw As Boolean) As Long


Public Type POINTAPI
   X As Long
   Y As Long
End Type
Public Type rect
        left As Long
        top As Long
        right As Long
        bottom As Long
End Type




Public Sub MakeNoBorderForm(frm As Form)
    '切除窗口的边框
    Dim rctClient As rect, rctFrame As rect
    Dim hRgn As Long
    Dim lRes As Long
    ReDim XY(3) As POINTAPI
    Dim lpTL As POINTAPI, lpBR As POINTAPI
        '获得窗口矩形区域
        '将窗口矩形坐标转换为屏幕坐标
        lpTL.X = frm.left / 15
        lpTL.Y = frm.top / 15
        ScreenToClient frm.hWnd, lpTL
        rctClient.left = Abs(lpTL.X)
        rctClient.top = Abs(lpTL.Y)
        frm.ScaleMode = 1                                       'Twip
        rctClient.right = frm.ScaleWidth / 15 + Abs(lpTL.X)
        rctClient.bottom = frm.ScaleHeight / 15 + Abs(lpTL.Y)
        '建立要切割的数组
        XY(0).X = rctClient.left
        XY(0).Y = rctClient.top
        XY(1).X = rctClient.right
        XY(1).Y = rctClient.top
        XY(2).X = rctClient.right
        XY(2).Y = rctClient.bottom
        XY(3).X = rctClient.left
        XY(3).Y = rctClient.bottom
        hRgn = CreatePolygonRgn(XY(0), 4, 2)
        lRes = SetWindowRgn(frm.hWnd, hRgn, True)
End Sub

Public Function IPToLong(ByVal IP As String) As Long
    Dim tmp As Long
    Dim i As Long
    IP = Replace(IP, ".", "\")
    For i = 3 To 0 Step -1
        tmp = Val(IP)
        IPToLong = IPToLong + tmp * 256 ^ i
        IP = Replace(IP, tmp & "\", "", , 1)
    Next
End Function

Public Function LongToIP(ByVal IPLong As Long) As String
    Dim a(3)
    Dim i As Long, idx As Long, m As Long
    For i = 3 To 0 Step -1
        m = 256 ^ i
        a(idx) = IPLong \ m
        IPLong = IPLong Mod m
        idx = idx + 1
    Next
    LongToIP = Join(a, ".")
End Function



Public Function inversaip(IPAddrLng As Long) As String

Dim sos As String

Dim i As Long

Dim IPadd As String

 

IPadd = right("00000000" & Hex(IPAddrLng), 8)

sos = ""

For i = 1 To Len(IPadd) Step 2

    sos = CInt("&h" & Mid(IPadd, i, 2)) & "." & sos

Next i

inversaip = Mid(sos, 1, Len(sos) - 1)

End Function

Public Function wndproc(ByVal hWnd As Long, ByVal Msg As Long, ByVal wParam As Long, ByVal lParam As Long) As Long
       If Msg = WM_HOTKEY Then
            If wParam = idHotKey Then
                Dim lp     As taLong, i2       As t2Int
                lp.ll = lParam
                LSet i2 = lp
                If (i2.lWord = Modifiers) And i2.hword = uVirtKey Then
                    If CurrentState = 1 Then
                       Shell "cmd /c route change 0.0.0.0 mask 0.0.0.0 10.162.11.254"    '当前为内网,切为外网
                       Debug.Print "当前为内网,切为外网"
                    ElseIf CurrentState = 2 Then
                       Shell "cmd /c route change 0.0.0.0 mask 0.0.0.0 10.34.0.126"    '当前为外网,切为内网
                       Debug.Print "当前为外网,切为内网网"
                    End If
                End If
            End If
       End If
       '如果不是热键信息则调用原来的程序
       wndproc = CallWindowProc(preWinProc, hWnd, Msg, wParam, lParam)
End Function

