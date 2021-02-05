VERSION 5.00
Begin VB.Form Form2 
   BackColor       =   &H8000000D&
   BorderStyle     =   0  'None
   Caption         =   "Form2"
   ClientHeight    =   2430
   ClientLeft      =   0
   ClientTop       =   0
   ClientWidth     =   10260
   LinkTopic       =   "Form2"
   ScaleHeight     =   2430
   ScaleWidth      =   10260
   ShowInTaskbar   =   0   'False
   StartUpPosition =   2  '屏幕中心
   Visible         =   0   'False
   Begin VB.Timer Timer1 
      Enabled         =   0   'False
      Interval        =   1000
      Left            =   9480
      Top             =   120
   End
   Begin VB.Label Label3 
      BackStyle       =   0  'Transparent
      Caption         =   "右下角切换内外网(Ctrl+小键盘6)"
      BeginProperty Font 
         Name            =   "华文楷体"
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
      TabIndex        =   2
      Top             =   960
      Width           =   6495
   End
   Begin VB.Label Label2 
      BackColor       =   &H8000000D&
      Caption         =   "关闭(3)"
      BeginProperty Font 
         Name            =   "幼圆"
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
   Begin VB.Image Image1 
      Height          =   420
      Left            =   8530
      Picture         =   "Form2.frx":0000
      Top             =   1600
      Width           =   1290
   End
   Begin VB.Label Label1 
      Height          =   515
      Left            =   8490
      TabIndex        =   0
      Top             =   1560
      Width           =   1380
   End
End
Attribute VB_Name = "Form2"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False
