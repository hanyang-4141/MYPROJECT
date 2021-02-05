VERSION 5.00
Begin VB.Form Form1 
   Caption         =   "Form1"
   ClientHeight    =   5220
   ClientLeft      =   120
   ClientTop       =   450
   ClientWidth     =   4695
   LinkTopic       =   "Form1"
   ScaleHeight     =   5220
   ScaleWidth      =   4695
   StartUpPosition =   3  'Windows Default
   Begin VB.CheckBox Check1 
      Caption         =   "窗口置顶"
      Height          =   255
      Left            =   2640
      TabIndex        =   0
      Top             =   240
      Width           =   1095
   End
   Begin VB.CommandButton Command1 
      Caption         =   "灰色控件突破"
      Height          =   375
      Left            =   0
      TabIndex        =   14
      Top             =   3240
      Visible         =   0   'False
      Width           =   1455
   End
   Begin VB.Timer Timer1 
      Enabled         =   0   'False
      Interval        =   600
      Left            =   3360
      Top             =   3120
   End
   Begin VB.TextBox Text1 
      Height          =   375
      Index           =   5
      Left            =   1560
      Locked          =   -1  'True
      TabIndex        =   12
      Text            =   "Text1"
      Top             =   3000
      Width           =   1815
   End
   Begin VB.TextBox Text1 
      Height          =   375
      Index           =   4
      Left            =   1560
      Locked          =   -1  'True
      TabIndex        =   10
      Text            =   "Text1"
      Top             =   600
      Width           =   1815
   End
   Begin VB.TextBox Text1 
      Height          =   375
      Index           =   3
      Left            =   1560
      Locked          =   -1  'True
      TabIndex        =   4
      Text            =   "Text1"
      Top             =   2520
      Width           =   1815
   End
   Begin VB.TextBox Text1 
      Height          =   375
      Index           =   2
      Left            =   1560
      Locked          =   -1  'True
      TabIndex        =   3
      Text            =   "Text1"
      Top             =   2040
      Width           =   1815
   End
   Begin VB.TextBox Text1 
      Height          =   375
      Index           =   1
      Left            =   1560
      Locked          =   -1  'True
      TabIndex        =   2
      Text            =   "Text1"
      Top             =   1560
      Width           =   1815
   End
   Begin VB.TextBox Text1 
      Height          =   375
      Index           =   0
      Left            =   1560
      Locked          =   -1  'True
      TabIndex        =   1
      Text            =   "Text1"
      Top             =   1080
      Width           =   1815
   End
   Begin VB.Label Label4 
      Caption         =   "Label4"
      Height          =   375
      Left            =   1200
      TabIndex        =   16
      Top             =   4320
      Width           =   2055
   End
   Begin VB.Label Label3 
      Caption         =   "Label3"
      Height          =   255
      Left            =   1320
      TabIndex        =   15
      Top             =   3840
      Width           =   1935
   End
   Begin VB.Label Label2 
      Caption         =   "按住拖拽到目标窗口"
      Height          =   255
      Left            =   600
      TabIndex        =   13
      Top             =   120
      Width           =   1815
   End
   Begin VB.Label Label1 
      Caption         =   "类名"
      Height          =   255
      Index           =   5
      Left            =   600
      TabIndex        =   11
      Top             =   3000
      Width           =   855
   End
   Begin VB.Label Label1 
      Caption         =   "父窗口"
      Height          =   255
      Index           =   4
      Left            =   600
      TabIndex        =   9
      Top             =   600
      Width           =   855
   End
   Begin VB.Label Label1 
      Caption         =   "矩形"
      Height          =   255
      Index           =   3
      Left            =   600
      TabIndex        =   8
      Top             =   2520
      Width           =   855
   End
   Begin VB.Label Label1 
      Caption         =   "进程ID"
      Height          =   255
      Index           =   2
      Left            =   600
      TabIndex        =   7
      Top             =   2040
      Width           =   855
   End
   Begin VB.Label Label1 
      Caption         =   "标题"
      Height          =   255
      Index           =   1
      Left            =   600
      TabIndex        =   6
      Top             =   1560
      Width           =   855
   End
   Begin VB.Label Label1 
      Caption         =   "句柄"
      Height          =   255
      Index           =   0
      Left            =   600
      TabIndex        =   5
      Top             =   1080
      Width           =   855
   End
   Begin VB.Image Image1 
      Height          =   480
      Left            =   0
      Picture         =   "Form1.frx":0000
      Top             =   0
      Width           =   480
   End
End
Attribute VB_Name = "Form1"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False
Dim rc As RECT
Dim H As Long
Dim pt As POINTAPI
Dim Go As Boolean
Dim preH As Long

Private Sub Check1_Click()
If Check1.Value Then
    SetWindowPos H, HWND_TOPMOST, 0, 0, 0, 0, SWP_NOSIZE Or SWP_NOMOVE
    Else
    SetWindowPos H, HWND_NOTOPMOST, 0, 0, 0, 0, SWP_NOSIZE Or SWP_NOMOVE
End If
End Sub

Private Sub Command1_Click()


    EnableWindow H, 1

End Sub

Private Sub Form_Load()
WantHwnd = 0
preH = 0
End Sub

Private Sub Image1_MouseDown(Button As Integer, Shift As Integer, X As Single, Y As Single)
Me.Hide
Dim Mycur As Long
Go = True
SetCapture Me.hwnd
Image1.Picture = LoadResPicture(102, vbResIcon)
'Mycur = LoadResPicture(101, vbResCursor)
Me.MousePointer = 99
Me.MouseIcon = LoadResPicture(103, vbResIcon)
'Me.Caption = Mycur
'SetCursor Mycur
End Sub

Private Sub Image1_MouseMove(Button As Integer, Shift As Integer, X As Single, Y As Single)
If Button = 1 Then

    GetCursorPos pt
    H = WindowFromPoint(pt.X, pt.Y)
    Label3.Caption = preH
    Label4.Caption = H
    If H <> 0 Then
        If preH <> H Then
            If preH <> 0 Then
            GetWindowRect preH, rc
            rcadd rc
            DrawRect rc
        End If
            preH = H
            'Sleep 10
            GetWindowRect preH, rc
            rcadd rc
            DrawRect rc
        End If
    End If
            
 
End If
End Sub

Private Sub Image1_MouseUp(Button As Integer, Shift As Integer, X As Single, Y As Single)


Dim Title As String * 255

Dim Pid As Long
Dim ParentHwnd As Long
Dim ClsName As String * 255

DrawRect rc
Me.MousePointer = 0
Image1.Picture = LoadResPicture(101, vbResIcon)

ParentHwnd = GetParent(H)
GetWindowText H, Title, 255

GetWindowThreadProcessId H, Pid
GetClassName H, ClsName, 255
ReleaseCapture
Text1(0).Text = H
Text1(1).Text = Title
Text1(2).Text = Pid
Text1(3).Text = "(" & rc.Left & "," & rc.Top & ")" & "---" & "(" & rc.Right & "," & rc.Bottom & ")"
Text1(4).Text = ParentHwnd
Text1(5).Text = ClsName
Go = False
preH = 0
Me.Show
End Sub

Private Sub Timer1_Timer()
If Go Then
Dim DeskHwnd As Long
Dim Mydc As Long
Dim Oldrop As Long
Dim Mybrush As Long
Dim Mypen As Long
GetCursorPos pt
H = WindowFromPoint(pt.X, pt.Y)
'Label3.Caption = "x=" & pt.X & "-----y=" & pt.Y
EnumChildWindows H, AddressOf EnumChildProc, 0
If WantHwnd <> 0 Then
    If H <> WantHwnd Then
        rcadd rc
        DrawRect rc
        
        H = WantHwnd
        GetWindowRect H, rc
        rcadd rc
        DrawRect rc
        WantHwnd = 0
    End If
End If


DeskHwnd = GetDesktopWindow '得到桌面句柄
Mydc = GetWindowDC(DeskHwnd) '得到桌面DC
Oldrop = SetROP2(Mydc, 10)
Mybrush = GetStockObject(NULL_BRUSH) '创建画刷
Mypen = CreatePen(0, 3, RGB(255, 0, 0)) '创建画笔
SelectObject Mydc, Mybrush
SelectObject Mydc, Mypen
Rectangle Mydc, rc.Left, rc.Top, rc.Right, rc.Bottom '画矩形
Sleep 100
Rectangle Mydc, rc.Left, rc.Top, rc.Right, rc.Bottom
SetROP2 Mydc, Oldrop
ReleaseDC DeskHwnd, Mydc

End If
End Sub

Private Sub DrawRect(rc As RECT)
Dim DeskHwnd As Long
Dim Mydc As Long
Dim Oldrop As Long
Dim Mybrush As Long
Dim Mypen As Long
DeskHwnd = GetDesktopWindow
Mydc = GetWindowDC(DeskHwnd)
Oldrop = SetROP2(Mydc, 10)
Mybrush = GetStockObject(NULL_BRUSH)
Mypen = CreatePen(0, 2, RGB(0, 0, 0))
SelectObject Mydc, Mybrush
SelectObject Mydc, Mypen
Rectangle Mydc, rc.Left, rc.Top, rc.Right, rc.Bottom
SetROP2 Mydc, Oldrop
ReleaseDC DeskHwnd, Mydc

End Sub
Private Sub rcadd(rcc As RECT)
Dim i As Integer
i = 2
With rcc
    .Left = .Left - i
    .Top = .Top - i
    .Right = .Right + i
    .Bottom = .Bottom + i
End With
End Sub

