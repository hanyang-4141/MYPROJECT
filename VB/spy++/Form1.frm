VERSION 5.00
Begin VB.Form Form1 
   Caption         =   "Form1"
   ClientHeight    =   3660
   ClientLeft      =   120
   ClientTop       =   450
   ClientWidth     =   3840
   LinkTopic       =   "Form1"
   ScaleHeight     =   3660
   ScaleWidth      =   3840
   StartUpPosition =   3  'Windows Default
   Begin VB.CheckBox Check1 
      Caption         =   "�����ö�"
      Height          =   255
      Left            =   2640
      TabIndex        =   14
      Top             =   240
      Width           =   1095
   End
   Begin VB.CommandButton Command1 
      Caption         =   "��ɫ�ؼ�ͻ��"
      Height          =   375
      Left            =   0
      TabIndex        =   13
      Top             =   3240
      Visible         =   0   'False
      Width           =   1455
   End
   Begin VB.Timer Timer1 
      Interval        =   600
      Left            =   3360
      Top             =   3120
   End
   Begin VB.TextBox Text1 
      Height          =   375
      Index           =   5
      Left            =   1560
      TabIndex        =   11
      Text            =   "Text1"
      Top             =   3000
      Width           =   1815
   End
   Begin VB.TextBox Text1 
      Height          =   375
      Index           =   4
      Left            =   1560
      TabIndex        =   9
      Text            =   "Text1"
      Top             =   600
      Width           =   1815
   End
   Begin VB.TextBox Text1 
      Height          =   375
      Index           =   3
      Left            =   1560
      TabIndex        =   3
      Text            =   "Text1"
      Top             =   2520
      Width           =   1815
   End
   Begin VB.TextBox Text1 
      Height          =   375
      Index           =   2
      Left            =   1560
      TabIndex        =   2
      Text            =   "Text1"
      Top             =   2040
      Width           =   1815
   End
   Begin VB.TextBox Text1 
      Height          =   375
      Index           =   1
      Left            =   1560
      TabIndex        =   1
      Text            =   "Text1"
      Top             =   1560
      Width           =   1815
   End
   Begin VB.TextBox Text1 
      Height          =   375
      Index           =   0
      Left            =   1560
      TabIndex        =   0
      Text            =   "Text1"
      Top             =   1080
      Width           =   1815
   End
   Begin VB.Label Label2 
      Caption         =   "��ס��ק��Ŀ�괰��"
      Height          =   255
      Left            =   600
      TabIndex        =   12
      Top             =   120
      Width           =   1815
   End
   Begin VB.Label Label1 
      Caption         =   "����"
      Height          =   255
      Index           =   5
      Left            =   600
      TabIndex        =   10
      Top             =   3000
      Width           =   855
   End
   Begin VB.Label Label1 
      Caption         =   "������"
      Height          =   255
      Index           =   4
      Left            =   600
      TabIndex        =   8
      Top             =   600
      Width           =   855
   End
   Begin VB.Label Label1 
      Caption         =   "����"
      Height          =   255
      Index           =   3
      Left            =   600
      TabIndex        =   7
      Top             =   2520
      Width           =   855
   End
   Begin VB.Label Label1 
      Caption         =   "����ID"
      Height          =   255
      Index           =   2
      Left            =   600
      TabIndex        =   6
      Top             =   2040
      Width           =   855
   End
   Begin VB.Label Label1 
      Caption         =   "����"
      Height          =   255
      Index           =   1
      Left            =   600
      TabIndex        =   5
      Top             =   1560
      Width           =   855
   End
   Begin VB.Label Label1 
      Caption         =   "���"
      Height          =   255
      Index           =   0
      Left            =   600
      TabIndex        =   4
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

Private Sub Image1_MouseDown(Button As Integer, Shift As Integer, x As Single, y As Single)
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

Private Sub Image1_MouseUp(Button As Integer, Shift As Integer, x As Single, y As Single)


Dim Title As String * 255

Dim Pid As Long
Dim ParentHwnd As Long
Dim ClsName As String * 255
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
End Sub

Private Sub Timer1_Timer()
If Go Then
Dim DeskHwnd As Long
Dim Mydc As Long
Dim Oldrop As Long
Dim Mybrush As Long
Dim Mypen As Long
GetCursorPos pt
H = WindowFromPoint(pt.x, pt.y)
EnumChildWindows H, AddressOf EnumChildProc, 0
If WantHwnd <> 0 Then
    H = WantHwnd
    WantHwnd = 0
End If
GetWindowRect H, rc

DeskHwnd = GetDesktopWindow '�õ�������
Mydc = GetWindowDC(DeskHwnd) '�õ�����DC
Oldrop = SetROP2(Mydc, 10)
Mybrush = GetStockObject(NULL_BRUSH) '������ˢ
Mypen = CreatePen(0, 3, RGB(255, 0, 0)) '��������
SelectObject Mydc, Mybrush
SelectObject Mydc, Mypen
Rectangle Mydc, rc.Left, rc.Top, rc.Right, rc.Bottom '������
Sleep 100
Rectangle Mydc, rc.Left, rc.Top, rc.Right, rc.Bottom
SetROP2 Mydc, Oldrop
ReleaseDC DeskHwnd, Mydc

End If
End Sub
