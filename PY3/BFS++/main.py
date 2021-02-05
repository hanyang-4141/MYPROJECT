from mydict import GD, GZP, EMPLOYEE_INFO, TABBAR, TOOLBAR, ZZ
from ui_UI import *
from PyQt5 import QtCore
from PyQt5.QtWidgets import QWidget, QApplication, QListWidgetItem
# import threading
import time
from bfs import BFS
import pandas as pd


class Window(QWidget, Ui_Form):
    def __init__(self):
        super().__init__()
        self.setupUi(self)
        self.CurrentPage = GD
        self.CurrentPage_Dict = None
        self.CurrentTabItems = None
        self.list1_selected_index = None
        self.list2_selected_text = None
        self.CurrentTab = 0
        self.list1.clicked.connect(self.list1_clicked)
        self.list2.clicked.connect(self.list2_clicked)
        self.com1.currentIndexChanged.connect(self.com1_change)
        self.com2.currentIndexChanged.connect(self.com2_change)
        self.pushButton.clicked.connect(self.add)
        self.btn1.clicked.connect(self.start)
        self.thread_list = []
        self.MyBfs = BFS()
        # self.list1.itemSelectionChanged.connect(self.list1_selectionchanged)
        self.Current_list2 = None
        #缺省设置
        self.CurrentTabItems = TABBAR['工单'].keys()
        for key in TABBAR['工单'].keys():
            self.com2.addItem(key)
        print(self.MyBfs.MyDriver.title)
        self.get_df_from_excel()
        print(list(self.data_pd.keys()))
        #############################################################################
        self.list_page_items.clicked.connect(self.list_page_items_clicked)
        self.list_tab_items.clicked.connect(self.list_tab_items_clicked)
        self.list_operate_items.clicked.connect(self.list_operate_items_clicked)
        self.list_element_toolbar_items.clicked.connect(self.list_element_clicked)
        self.list_element_items.clicked.connect(self.list_element_clicked)
        self.list_finally_items.doubleClicked.connect(self.list_finally_items_clicked)
        self.current_dict = GD
        self.list_page_index = 0
        self.list_page_text = '工单'
        self.list_tab_index = 0
        self.list_tab_text = '查询'
        self.list_operate_index = 0
        self.list_operate_text = '点击'
        self.list_element_text = '保存'
        print('****************************************************************************************')
        print(self.data_pd['名称'])

    def list_page_items_clicked(self, item):
        self.list_page_index = item.row()
        self.list_page_text = self.list_page_items.currentItem().text()
        self.list_tab_items.clear()
        for key in TABBAR[self.list_page_text].keys():
            self.list_tab_items.addItem(QListWidgetItem(key))
        if self.list_page_index == 0:
            self.current_dict = GD
        elif self.list_page_index == 1:
            self.current_dict = GZP
        elif self.list_page_index == 2:
            self.current_dict = ZZ
        pass


    def list_tab_items_clicked(self, item):
        self.list_tab_index = item.row()
        self.list_tab_text = self.list_tab_items.currentItem().text()
        pass
    def list_operate_items_clicked(self, item):
        self.list_operate_index = item.row()
        self.list_operate_text = self.list_operate_items.currentItem().text()
        self.list_element_toolbar_items.clear()
        self.list_element_items.clear()
        if self.list_operate_text == '点击':
            for key in TOOLBAR.keys():
                self.list_element_toolbar_items.addItem(QListWidgetItem(key))
            self.list_element_toolbar_items.setStyleSheet("background-color: rgb(252, 228, 189);")
            for key in self.current_dict[self.list_tab_text]['btn']:
                self.list_element_items.addItem(QListWidgetItem(key))
        elif self.list_operate_text == '写入文本':
            for key in self.current_dict[self.list_tab_text]['input']:
                self.list_element_items.addItem(QListWidgetItem(key))
        elif self.list_operate_text == '追加文本':
            for key in self.current_dict[self.list_tab_text]['input']:
                self.list_element_items.addItem(QListWidgetItem(key))

    def list_element_clicked(self, item):
        self.list_element_text = self.sender().currentItem().text()
        print(self.list_element_text)
        temstr = self.list_page_text + '-' + self.list_tab_text + '-' + self.list_operate_text + '-' + \
            self.list_element_text
        self.list_finally_items.addItem(QListWidgetItem(temstr))

        pass

    def list_finally_items_clicked(self, item):
        self.list_finally_items.takeItem(item.row())

    ####################################################################################

    def get_df_from_excel(self):
        self.data_pd = pd.read_excel(r'D:\MYPROJECT\PY3\BFS++\data.xls')
        print(self.data_pd)
    def callback_auto_write(self,intint, strstr):
        pass
    def start(self):

        tasklist =[]
        for index in range(self.list_finally_items.count()):
            # print(self.list3.item(index).text())
            tasklist.append(self.list_finally_items.item(index).text())

        self.thread3 = Auto_Write_Thread(self.MyBfs, tasklist, self.data_pd)
        self.thread3._auto_write_sign.connect(self.callback_auto_write)
        self.thread3.start()




    def add(self):
        if self.list1_selected_text == 'ToolBar':
            tempstr = self.com1.currentText() + '-' + self.com2.currentText() + '-' + 'ToolBar' + '-' + \
                      self.list2_selected_text + '-' + TOOLBAR[self.list2_selected_text]

        elif self.list1_selected_text == 'TabBar':
            tempstr = self.com1.currentText() + '-' + self.com2.currentText() + '-' + 'TabBar' + '-' + \
                      self.list2_selected_text + '-' + TABBAR[self.com1.currentText()][self.list2_selected_text]
        else:

        # print(self.CurrentPage[self.CurrentTab_Text][self.list1_selected_text][self.list2_selected_text])
        # print(self.CurrentPage)
        # print(self.CurrentTab_Text)
        # print(self.list1_selected_text)
        # print(self.list2_selected_text)


            tempstr = self.com1.currentText() + '-' + self.com2.currentText() + '-' + \
                      self.list1_selected_text + '-' + self.list2_selected_text + '-' + \
                      self.CurrentPage[self.CurrentTab_Text][self.list1_selected_text][self.list2_selected_text]
        self.list3.addItem(QListWidgetItem(tempstr))
        # print(tempstr)

        pass
    def com2_change(self, index):
        self.CurrentTab = index
        self.CurrentTab_Text = self.com2.currentText()
    def com1_change(self, index):

        # print(index)
        self.com2.clear()
        if index== 0:
            self.CurrentPage = GD
            self.CurrentTabItems = TABBAR['工单'].keys()
            for key in TABBAR['工单'].keys():
                self.com2.addItem(key)
        elif index == 1:
            self.CurrentPage = GZP
            self.CurrentTabItems = TABBAR['工作票'].keys()
            for key in TABBAR['工作票'].keys():
                self.com2.addItem(key)


        pass


    def list2_clicked(self, item):

        self.list2_selected_text = list(self.Current_list2)[item.row()]


    def list1_clicked(self, item):
        self.list1_selected_index = item.row()

        print('list1 clicked',item.row())
        self.list2.clear()
        if item.row() == 0:
            self.list1_selected_text = 'ToolBar'
            self.Current_list2 = TOOLBAR.keys()
            for key in TOOLBAR.keys():
                newitem = QListWidgetItem(key)
                self.list2.addItem(newitem)
        elif item.row() == 1:
            self.list1_selected_text = 'TabBar'
            self.Current_list2 =  self.CurrentTabItems
            for key in self.CurrentTabItems:
                newitem = QListWidgetItem(key)
                self.list2.addItem(newitem)
        elif item.row() == 2:               #dianji
            self.list1_selected_text = 'btn'
            self.Current_list2 = list(self.CurrentPage[self.com2.currentText()]['btn'].keys())
            for key in self.Current_list2:
                newitem = QListWidgetItem(key)
                self.list2.addItem(newitem)
            print(self.Current_list2)
            pass
        elif item.row() == 3:
            self.list1_selected_text = 'input'
            self.Current_list2 = list(self.CurrentPage[self.com2.currentText()]['input'].keys())
            for key in self.Current_list2:
                newitem = QListWidgetItem(key)
                self.list2.addItem(newitem)
            print(self.Current_list2)
        elif item.row() == 4:
            self.list1_selected_text = '文本获取'
            self.Current_list2 = list(self.CurrentPage[self.com2.currentText()]['input'].keys())
            for key in self.Current_list2:
                newitem = QListWidgetItem(key)
                self.list2.addItem(newitem)
            print(self.Current_list2)
    # def list1_selectionchanged(self):
    #     print(self.list1_selected_index)
    #     pass


class Auto_Write_Thread(QtCore.QThread):
    _auto_write_sign = QtCore.pyqtSignal([int, str])
    def __init__(self, bfs_isintance, tasklist, dataframe):
        super(Auto_Write_Thread, self).__init__()

        self.MyBfs = bfs_isintance
        self.tasklist = tasklist
        self.Current_Page = None
        self.Current_Tab = None
        self.data_pd = dataframe

    def run(self):
        rows = self.data_pd.shape[0]
        for i in range(93, rows):     #str(selected_df.iat[i, j])
            print('***************************************************************执行第{}条************************************'.format(i))
            for index, item in enumerate(self.tasklist):
                print('执行第{}步'.format(index))
                itemlist = item.split('-')
                print(itemlist)

                # ************************************************************
                if itemlist[3] == '保存' or itemlist[3] == '清除' or itemlist[3] == '新建':
                    xpath = TOOLBAR[itemlist[3]]
                else:
                    xpath = ZZ[itemlist[1]]['input'][itemlist[3]]
                    content = self.data_pd.at[i, itemlist[3]]
                    # ************************************************************

                             #[itemlist[3]]

                if self.Current_Page != itemlist[0]:
                    self.Current_Page = itemlist[0]
                    #切换到目标页
                    print('页面切换到', itemlist[0])
                if self.Current_Tab != itemlist[1]:
                    self.Current_Tab = itemlist[1]
                    #切换到当前TAB
                    print('TAB选项卡切换到T---', itemlist[1])

                if itemlist[2] == 'ToolBar':
                    print('点击ToolBar', itemlist[3])
                    # self.MyBfs.btn_click(itemlist[4])
                    pass
                if itemlist[2] == 'TabBar':
                    print('点击TabBar', itemlist[3])
                    # self.MyBfs.btn_click(TABBAR[itemlist[0]][itemlist[3]])
                    # self.MyBfs.btn_click(itemlist[4])
                    pass

                if itemlist[2] == '点击':
                    self.MyBfs.btn_click(xpath)
                    # if itemlist[3] == '保存':
                    time.sleep(3)
                    pass
                if itemlist[2] == '写入文本':
                    print('输入文本到',itemlist[3])

                    # self.MyBfs.get_text(itemlist[4])
                    # self.MyBfs.set_text(itemlist[4])
                    self.MyBfs.set_text(xpath, content)
                    pass
                if itemlist[2] == '文本获取':
                    print('获取文本', itemlist[3])
                    pass

                # time.sleep(2)

        pass

if __name__ == "__main__":
    print(TABBAR['工单'].keys())
    app = QApplication([])
    mywindow = Window()
    mywindow.show()
    app.exec_()