VERSION 5.00
Begin VB.Form Form1 
   BackColor       =   &H8000000D&
   BorderStyle     =   1  'Fixed Single
   Caption         =   "Form1"
   ClientHeight    =   2220
   ClientLeft      =   4500
   ClientTop       =   2220
   ClientWidth     =   10185
   LinkTopic       =   "Form1"
   MaxButton       =   0   'False
   MinButton       =   0   'False
   ScaleHeight     =   2220
   ScaleWidth      =   10185
   StartUpPosition =   2  '��Ļ����
   Begin VB.Timer Timer2 
      Enabled         =   0   'False
      Interval        =   1000
      Left            =   120
      Top             =   600
   End
   Begin VB.Timer Timer1 
      Enabled         =   0   'False
      Interval        =   1000
      Left            =   120
      Top             =   120
   End
   Begin VB.Label Label3 
      BackStyle       =   0  'Transparent
      Caption         =   "���½��л�������(Ctrl+С����6)"
      BeginProperty Font 
         Name            =   "���Ŀ���"
         Size            =   21.75
         Charset         =   134
         Weight          =   700
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      ForeColor       =   &H00FFFFFF&
      Height          =   615
      Left            =   1800
      TabIndex        =   0
      Top             =   840
      Width           =   6495
   End
   Begin VB.Image Image2 
      Height          =   375
      Left            =   960
      Top             =   120
      Visible         =   0   'False
      Width           =   495
   End
   Begin VB.Image Image1 
      Height          =   375
      Left            =   480
      Top             =   120
      Visible         =   0   'False
      Width           =   495
   End
   Begin VB.Label Label2 
      BackColor       =   &H8000000D&
      Caption         =   "�ر�(3)"
      BeginProperty Font 
         Name            =   "��Բ"
         Size            =   12
         Charset         =   134
         Weight          =   700
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      ForeColor       =   &H00FFFFFF&
      Height          =   270
      Left            =   8640
      TabIndex        =   1
      Top             =   1680
      Width           =   1095
   End
   Begin VB.Image Image3 
      Height          =   420
      Left            =   8530
      Picture         =   "Form1.frx":0000
      Top             =   1600
      Width           =   1290
   End
   Begin VB.Label Label1 
      Height          =   510
      Left            =   8490
      TabIndex        =   2
      Top             =   1560
      Width           =   1380
   End
   Begin VB.Menu CAOZUO 
      Caption         =   "����"
      Visible         =   0   'False
      Begin VB.Menu NEIWANG 
         Caption         =   "����(Ctrl+С����6)"
      End
      Begin VB.Menu WAIWANG 
         Caption         =   "����(Ctrl+С����6)"
      End
      Begin VB.Menu fenge1 
         Caption         =   "-"
         Visible         =   0   'False
      End
      Begin VB.Menu QUXIAO 
         Caption         =   "ȡ��"
         Visible         =   0   'False
      End
      Begin VB.Menu TUICHU 
         Caption         =   "�˳�"
         Visible         =   0   'False
      End
   End
End
Attribute VB_Name = "Form1"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False
 Dim i As Integer
 Dim exist0000 As Boolean
 '-----------------------Form��--------------------------
Function WindowStyle()
    '���°ѳ������System Tray====================================System Tray Begin
    With nfIconData
        .hWnd = Me.hWnd
        .uID = Me.Icon
        .uFlags = NIF_ICON Or NIF_MESSAGE Or NIF_TIP
        .uCallbackMessage = WM_MOUSEMOVE
        .hIcon = Me.Icon.Handle
        '��������ƶ���������ʱ��ʾ��Tip
        .szTip = "��/�����л�" & vbNullChar
        .cbSize = Len(nfIconData)
    End With
    
    Call Shell_NotifyIcon(NIM_ADD, nfIconData)
    '=============================================================System Tray End
    'Me.Hide
End Function

Private Sub Form_Initialize()
    MakeNoBorderForm Me
End Sub

Private Sub TUICHU_Click()
    Call Shell_NotifyIcon(NIM_DELETE, nfIconData)
    End
End Sub

Private Sub WAIWANG_Click()
    'MsgBox "�л�Ϊ����"
    Shell "cmd /c route change 0.0.0.0 mask 0.0.0.0 10.162.11.254"
End Sub

Function ChangeIcon()
    
    
    If CurrentState = 1 Then
        nfIconData.hIcon = Image1.Picture.Handle
        Call Shell_NotifyIcon(NIM_MODIFY, nfIconData)
    ElseIf CurrentState = 2 Then
        nfIconData.hIcon = Image2.Picture.Handle
        Call Shell_NotifyIcon(NIM_MODIFY, nfIconData)
    End If
        

End Function

Function PanDuanWangLuo() As Integer

    Dim hehe As MIB_IPFORWARDTABLE
    Dim i As Long
        Dim dwsize As Long
        i = GetIpForwardTable(hehe, dwsize, True)
        i = GetIpForwardTable(hehe, dwsize, True)
        exist0000 = False
        For i = 0 To hehe.dwNumEntries - 1
    
           realip = inversaip(hehe.Table(i).dwForwardDest)

           realmask = inversaip(hehe.Table(i).dwForwardMask)
           
           getway = inversaip(hehe.Table(i).dwForwardNextHop)
           
           getway1 = LongToIP(hehe.Table(i).dwForwardNextHop)
        
            wangguan = hehe.Table(i).dwForwardNextHop
           
           
           If realip = "0.0.0.0" And realmask = "0.0.0.0" Then
                exist0000 = True
                MIB_ROW0000 = hehe.Table(i)
             
             If getway = "10.162.11.254" Then
            
                PanDuanWangLuo = 2
             ElseIf getway = "10.34.0.126" Then
                PanDuanWangLuo = 1
             Else
                PanDuanWangLuo = 0
             End If
             
             Exit For
             
           End If
                
            
    
        Next
        
        If Not exist0000 Then
            Debug.Print "add0000"
            Shell "cmd /c route add 0.0.0.0 mask 0.0.0.0 10.162.11.254"
            
        End If
    
End Function


Private Sub Form_QueryUnload(Cancel As Integer, UnloadMode As Integer)
    '�˳�����ʱɾ������ͼ��
    Call Shell_NotifyIcon(NIM_DELETE, nfIconData)
    Dim ret     As Long
    'ȡ��Message�Ľ�ȡ��ʹ֮����ԭ����window����
    ret = SetWindowLong(Me.hWnd, GWL_WNDPROC, preWinProc)
    Call UnregisterHotKey(Me.hWnd, uVirtKey)
End Sub

Private Sub NEIWANG_Click()
    'MsgBox "�л�Ϊ����"
    Shell "cmd /c route change 0.0.0.0 mask 0.0.0.0 10.34.0.126"
    
    
End Sub

Private Sub Form_MouseMove(Button As Integer, Shift As Integer, X As Single, Y As Single)
    Dim lMsg As Single
    lMsg = X / Screen.TwipsPerPixelX
    Select Case lMsg
    Case WM_LBUTTONDBLCLK '˫�������ʾ���壬Ҫ�ĳ������Ŀ�ģ����Ķ���
        'ShowWindow Me.hwnd, SW_RESTORE
        'Me.Top = WindowTop
        'Me.Left = WindowLeft
        'Call Shell_NotifyIcon(NIM_DELETE, nfIconData)
        'Me.SetFocus
    Case WM_RBUTTONUP '������ͼ���ϵ��Ҽ���ʾ�˵�
        SetForegroundWindow Form1.hWnd
        PopupMenu CAOZUO '�˵�����ΪF00�����˵�ʱ����Ըĳɱ�ģ�����Ҳ�øĳ���Ӧ��
    'Case WM_LBUTTONUP
        'PopupMenu CAOZUO
    End Select
End Sub

Private Sub Form_Load()
    If App.PrevInstance Then
        End
    End If
    
    Me.Hide
    Call WindowStyle
    CurrentState = PanDuanWangLuo()
    Image1.Picture = LoadPicture(App.Path + "\nei.ico")
    Image2.Picture = LoadPicture(App.Path + "\wai.ico")
    Timer1.Enabled = True
    Dim ret     As Long
      '��¼ԭ����window�����ַ
      preWinProc = GetWindowLong(Me.hWnd, GWL_WNDPROC)
      '���Զ���������ԭ����window����
      ret = SetWindowLong(Me.hWnd, GWL_WNDPROC, AddressOf wndproc)
      idHotKey = 1       'in   the   range   ��h0000   through   ��hBFFF
      Modifiers = MOD_CONTROL
      uVirtKey = VBKEYNUMBER6
      'ע���ȼ�
      ret = RegisterHotKey(Me.hWnd, idHotKey, Modifiers, uVirtKey)
End Sub


Private Sub Image3_Click()
    Me.Hide
End Sub

Private Sub Label2_Click()
    Me.Hide
End Sub

Private Sub Timer1_Timer()
    CurrentState = PanDuanWangLuo()
    'Debug.Print "CurrentState=", CurrentState, "--------   ForwardState=", ForwardState
    If CurrentState <> ForwardState Then
        ForwardState = CurrentState
        Call ChangeIcon
        
    End If
    
    Dim win As Long
    win = FindWindow("CabinetWClass", "��������")
    If win <> 0 Then
        'Debug.Print "���ڴ���"
        Form1.Show
        SetWindowPos Form1.hWnd, -1, 0, 0, 0, 0, SWP_NOMOVE Or SWP_NOSIZE
        Timer2.Enabled = True
        SendMessage win, WM_CLOSE, 0, 0
    Else
        'Debug.Print "û��"
        
    End If
        
    
End Sub

Private Sub Timer2_Timer()
    
    
    If i > 3 Then
        i = 0
        Form1.Hide
        Timer2.Enabled = False
    End If
    Label2.Caption = "�ر�(" & 3 - i & ")"
    i = i + 1
    
    
End Sub


