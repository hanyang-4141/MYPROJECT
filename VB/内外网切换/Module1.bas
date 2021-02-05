Attribute VB_Name = "Module1"
'-----------------------ģ����--------------------------
'��ϵͳ������ʾͼ���ģ��
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

       dwForwardDest As Long      'Ŀ�ĵ�IP��ַ

       dwForwardMask As Long     'Ŀ�ĵ���������������

       dwForwardPolicy As Long    '���������ͨ��·��ѡ��������������ο�RFC 1354��

       dwForwardNextHop As Long        '·������IP��ַ����һ��Ծ��

       dwForwardIfIndex As Long         '·�ɵĽӿ����

       dwForwardType As Long      'RFC 1354��·�ɵĶ��壬����ֵ֮һ��

       dwForwardProto As Long  '����·�ɵ�Э�飬����IPXЭ��ֵ�ο�Routprot.h����IP��Ŀ�ο�Iprtrmib.h

       dwForwardAge As Long  '·�ɳ���ʱ�䣬���롣������·��Զ�̷��ʷ���RRAS��Routing and Remote Access Service������ʱ�򣬲��ҽ���·������ΪPROTO_IP_NETMGMT��

       dwForwardNextHopAS As Long  '��һԾ�������ϵͳ���

       dwForwardMetric1 As Long  '·��Э��ר�еĹ���ֵ������μ�RFC 1354��

       dwForwardMetric2 As Long  '·��Э��ר�еĹ���ֵ������μ�RFC 1354��

       dwForwardMetric3 As Long  '·��Э��ר�еĹ���ֵ������μ�RFC 1354��

       dwForwardMetric4 As Long  '·��Э��ר�еĹ���ֵ������μ�RFC 1354��

       dwForwardMetric5 As Long  '·��Э��ר�еĹ���ֵ������μ�RFC 1354��

End Type
Public Type MIB_IPFORWARDTABLE

    dwNumEntries As Long                            '����·�ɽӿ���Ŀ

    Table(120) As MIB_IPFORWARDROW      'ָ��MIB_IPFORWARDROW��������

End Type
Public MIB_ROW0000 As MIB_IPFORWARDROW
Public nfIconData As NOTIFYICONDATA
Public Const MAX_TOOLTIP As Integer = 64    '��ʾ�ַ�����Ԥ��ʾ�ĸ���
Public Const NIF_ICON = &H2                 'Ԥ��ӵ�ͼ��
Public Const NIF_MESSAGE = &H1              '�¼���Ϣ,�������̧�����
Public Const NIF_TIP = &H4                  'Ԥ��ʾ������
Public Const NIM_ADD = &H0                  '�������ͼ��
Public Const NIM_MODIFY = &H1               'change����ͼ��
Public Const NIM_DELETE = &H2               'ɾ������ͼ��
Public Const WM_MOUSEMOVE = &H200           '����ƶ�
Public Const WM_LBUTTONDOWN = &H201         '�����Ҽ�
Public Const WM_LBUTTONUP = &H202           '���̧��
Public Const WM_LBUTTONDBLCLK = &H203       '���˫��
Public Const WM_RBUTTONDOWN = &H204         '�����Ҽ�
Public Const WM_RBUTTONUP = &H205           '�Ҽ�̧��
Public Const WM_RBUTTONDBLCLK = &H206       '�Ҽ�˫��
Public Const SW_RESTORE = 9                 '״̬�ָ�
Public Const SW_HIDE = 0                    '״̬����

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
Public CurrentState As Integer              '����=1 ����=2

Public Declare Function CreatePolygonRgn Lib "gdi32" (lpPoint As POINTAPI, ByVal nCount As Long, ByVal nPolyFillMode As Long) As Long
Public Declare Function ScreenToClient Lib "user32" (ByVal hWnd As Long, lpPoint As POINTAPI) As Long ''����3���г����ڵı߿�
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
    '�г����ڵı߿�
    Dim rctClient As rect, rctFrame As rect
    Dim hRgn As Long
    Dim lRes As Long
    ReDim XY(3) As POINTAPI
    Dim lpTL As POINTAPI, lpBR As POINTAPI
        '��ô��ھ�������
        '�����ھ�������ת��Ϊ��Ļ����
        lpTL.X = frm.left / 15
        lpTL.Y = frm.top / 15
        ScreenToClient frm.hWnd, lpTL
        rctClient.left = Abs(lpTL.X)
        rctClient.top = Abs(lpTL.Y)
        frm.ScaleMode = 1                                       'Twip
        rctClient.right = frm.ScaleWidth / 15 + Abs(lpTL.X)
        rctClient.bottom = frm.ScaleHeight / 15 + Abs(lpTL.Y)
        '����Ҫ�и������
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
                       Shell "cmd /c route change 0.0.0.0 mask 0.0.0.0 10.162.11.254"    '��ǰΪ����,��Ϊ����
                       Debug.Print "��ǰΪ����,��Ϊ����"
                    ElseIf CurrentState = 2 Then
                       Shell "cmd /c route change 0.0.0.0 mask 0.0.0.0 10.34.0.126"    '��ǰΪ����,��Ϊ����
                       Debug.Print "��ǰΪ����,��Ϊ������"
                    End If
                End If
            End If
       End If
       '��������ȼ���Ϣ�����ԭ���ĳ���
       wndproc = CallWindowProc(preWinProc, hWnd, Msg, wParam, lParam)
End Function

