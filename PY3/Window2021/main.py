# from ui_easy1 import *
from ui_win2021 import *
from Abfs import bfs
from PyQt5.QtWidgets import QWidget, QApplication, QTableWidget, QTableWidgetItem, QMessageBox, QHeaderView, QComboBox, QLabel
import pandas as pd
from PyQt5.QtCore import QDate, QTime
FILEPATH = r'data\模板备份.xlsx'
定期工作 = 2
工作票 = 1
维修类型 = 3
class Window(QWidget, Ui_Form):
    def __init__(self):
        super().__init__()
        self.setupUi(self)

        self.use_df = None
        self.mybfs = None



        self.pageSwitch.itemClicked.connect(self.switch_stack)
        self.stackedWidget.currentChanged.connect(self.page_change)
        self.mainTable.itemDoubleClicked.connect(self.maintable_Dclick)
        self.mainTable.setSelectionBehavior(QTableWidget.SelectRows)  # 整行选择
        self.mainTable.setEditTriggers(QTableWidget.NoEditTriggers)  # 无法编辑
        self.mainTable.setSelectionMode(QTableWidget.SingleSelection)
        self.mainTable.verticalHeader().hide()

        self.total_df = self.get_df_from_excel(FILEPATH)

        self.loginbutton.clicked.connect(self.login)



        self.insert_data(self.mainTable, self.total_df)

        self.dq_Start.clicked.connect(self.start_DQ)
        self.gd_Start.clicked.connect(self.start_GD)
        # self.main_table_2.setSelectionBehavior(QTableWidget.SelectRows)  # 整行选择
        # self.main_table_2.setEditTriggers(QTableWidget.NoEditTriggers)  # 无法编辑
        # self.main_table_2.setSelectionMode(QTableWidget.SingleSelection)
        # self.tabWidget.tabBarClicked.connect(self.tab_clicked)
        self.mybfs = bfs()



    def login(self):

        # self.mybfs.login(1,2)
        pass


    def switch_stack(self):
        try:
            i = self.pageSwitch.currentIndex().row()
            self.stackedWidget.setCurrentIndex(i)
        except:
            pass

    def page_change(self, item):
        if item == 1:
            self.current_job = 工作票
        elif item == 2:
            self.current_job = 定期工作
        else:
            self.current_job = None



    def maintable_Dclick(self, item):
        try:
            current_row = item.row()
            current_type = self.mainTable.item(current_row, 3).text()
            xuhao = int(self.mainTable.item(current_row, 0).text())
            self.use_df = self.total_df.iloc[xuhao - 1]
            if current_type == '定期工作':
                self.stackedWidget.setCurrentIndex(定期工作)
                self.insert_DQ_data(self.use_df)
            else:
                self.stackedWidget.setCurrentIndex(工作票)
                self.insert_GD_data(self.use_df)

        except Exception as e:
            print(e)


    def insert_GD_data(self, temp_df):
        df = temp_df.fillna('无')
        self.begindate.setDate(QDate.currentDate())
        self.begintime.setTime(QTime.currentTime())
        etime = QTime.fromString('18:00', 'hh:mm')
        if QTime.currentTime() > etime:
            # print('超过，加1')
            self.enddate.setDate(QDate.currentDate().addDays(1))
        else:
            self.enddate.setDate(QDate.currentDate())
        self.endtime.setTime(QTime.fromString('18:00', 'hh:mm'))
        self.youxianji.setCurrentText(df['优先级'])
        self.weixiuleixing.setCurrentText(df['维修类型'])
        self.mvp.setText(df['负责人'])
        self.jizu.setCurrentText(df['机组'])
        self.zhuanye.setCurrentText(df['专业'])
        self.bianma.setText(df['电厂编码'])
        self.content.setText(df['工作内容'])
        self.jizuleibie.setCurrentText(df['机组类别'])
        self.banzu.setCurrentText(df['班组'])
        self.gzpleixing.setCurrentText(df['工作票类型'])
        self.sum.setText(str(df['总人数']).split('.')[0])
        self.chengyuan.setText(df['班组成员'])
        self.contentaddr.setText(df['工作内容及地点'])
        self.gelileixing.setCurrentText(df['隔离类型'])
        self.gelizhuangtai.setCurrentText(df['隔离状态'])
        self.anquanbiaoshi.setCurrentText(df['安全标示'])
        self.insert_glcs_data(df['隔离措施'])
        self.insert_ykcs_data(df['危险预控'])
        pass

    def insert_DQ_data(self, temp_df):
        df = temp_df.fillna('无')
        self.begindate_2.setDate(QDate.currentDate())
        self.begintime_2.setTime(QTime.currentTime())
        etime = QTime.fromString('18:00', 'hh:mm')
        if QTime.currentTime() > etime:
            # print('超过，加1')
            self.enddate_2.setDate(QDate.currentDate().addDays(1))
        else:
            self.enddate_2.setDate(QDate.currentDate())
        self.endtime_2.setTime(QTime.fromString('18:00', 'hh:mm'))
        self.youxianji_2.setCurrentText(df['优先级'])
        self.weixiuleixing_2.setCurrentText(df['维修类型'])
        self.mvp_2.setText(df['负责人'])
        self.jizu_2.setCurrentText(df['机组'])
        self.zhuanye_2.setCurrentText(df['专业'])
        self.bianma_2.setText(df['电厂编码'])
        self.content_2.setText(df['工作内容'])
        self.jizuleibie_2.setCurrentText(df['机组类别'])
        self.banzu_2.setCurrentText(df['班组'])
        self.gzpleixing_2.setCurrentText(df['工作票类型'])
        return


    def get_df_from_excel(self, file_path):
        df = pd.read_excel(file_path)
        return df


    def insert_glcs_data(self, glcs_str):
        self.glcs_table.clear()
        if glcs_str.strip() != '无':
            glcs_list = glcs_str.splitlines()
            for i, temp_glcs in enumerate(glcs_list):
                temp_glcs_list = temp_glcs.split('$')
                #删除热机票2 且措施为‘无’
                if ('热机票-2' in temp_glcs_list[0] and '无' in temp_glcs_list[2]):
                    glcs_list.pop(i)
            linesum = len(glcs_list)
            self.glcs_table.setRowCount(linesum)
            self.glcs_table.setColumnCount(3)
            width = self.glcs_table.width()
            self.glcs_table.verticalHeader().hide()
            self.glcs_table.setColumnWidth(0, 80)
            self.glcs_table.setColumnWidth(1, 80)
            self.glcs_table.setColumnWidth(2, width - 180)
            for index, glcs in enumerate(glcs_list):
                gl_list = glcs.split('$')
                self.glcs_table.setItem(index, 0, QTableWidgetItem(gl_list[0].strip()))
                self.glcs_table.setItem(index, 1, QTableWidgetItem(gl_list[1].strip()))
                self.glcs_table.setItem(index, 2, QTableWidgetItem(gl_list[2].strip()))
        else:
            self.glcs_table.setRowCount(0)
            self.glcs_table.setColumnCount(0)
        pass

    # -------预控措施表格中，插入数据
    def insert_ykcs_data(self, ykcs_str):
        self.ykcs_table.clear()
        if ykcs_str.strip() != '无':
            ykcs_list = ykcs_str.splitlines()
            linesum = len(ykcs_list)
            self.ykcs_table.verticalHeader().hide()
            self.ykcs_table.setRowCount(linesum)
            self.ykcs_table.setColumnCount(2)
            self.ykcs_table.horizontalHeader().setSectionResizeMode(1, QHeaderView.Stretch)
            self.ykcs_table.horizontalHeader().setSectionResizeMode(0, QHeaderView.ResizeToContents)
            for index, ykcs_str in enumerate(ykcs_list):
                yk_list = ykcs_str.split('$')
                newitem0 = QTableWidgetItem(yk_list[0].strip())
                newitem1 = QTableWidgetItem(yk_list[1].strip())
                self.ykcs_table.setItem(index, 0, newitem0)
                self.ykcs_table.setItem(index, 1, newitem1)
        else:
            self.ykcs_table.setRowCount(0)
            self.ykcs_table.setColumnCount(0)
        pass

    def insert_data(self, widget, current_df):
        try:
            # selected_df = current_df[['序号', '机组', '工作内容']]
            # print(selected_df)
            selected_df = current_df
            rows = selected_df.shape[0]
            columns = selected_df.shape[1]
            headers = selected_df.columns.values.tolist()
            widget.clear()
            widget.setRowCount(rows)
            widget.setColumnCount(columns)
            widget.setHorizontalHeaderLabels(headers)
            widget.horizontalHeader().setSectionResizeMode(0, QHeaderView.ResizeToContents)
            widget.horizontalHeader().setSectionResizeMode(1, QHeaderView.ResizeToContents)
            widget.horizontalHeader().setSectionResizeMode(2, QHeaderView.Stretch)
            widget.verticalHeader().hide()

            for i in range(rows):
                for j in range(columns):
                    newitem = QTableWidgetItem(str(selected_df.iat[i, j]))
                    widget.setItem(i, j, newitem)
        except Exception as e:
            print(e)

    # 从隔离措施TABLE中，获取数据->拼接成字符串
    def get_glcs_data(self):
        row_glcs = self.glcs_table.rowCount()
        str_glcs = ''
        for i in range(row_glcs):
            strtemp = ''
            stritem0 = self.glcs_table.item(i, 0).text()
            stritem1 = self.glcs_table.item(i, 1).text()
            stritem2 = self.glcs_table.item(i, 2).text()
            strtemp = strtemp + "$" + stritem0 + "$" + stritem1 + "$" + stritem2
            # for j in range(column_glcs):
            #     strtemp = strtemp + "$" + str(self.glcs_table.item(i, j).text())
            str_glcs = str_glcs + strtemp[1:] + '\r\n'
        return str_glcs

    # 从预控措施TABLE中，获取数据->拼接成字符串
    def get_ykcs_data(self):
        row_ykcs = self.ykcs_table.rowCount()
        column_ykcs = self.ykcs_table.columnCount()
        str_ykcs = ''
        for i in range(row_ykcs):
            strtemp = ''
            for j in range(column_ykcs):
                strtemp = strtemp + "$" + str(self.ykcs_table.item(i, j).text())
            str_ykcs = str_ykcs + strtemp[1:] + '\r\n'
        return str_ykcs


    def get_GD_info(self, out_dict):
        str_glcs = self.get_glcs_data()
        str_ykcs = self.get_ykcs_data()
        out_dict['优先级'] = self.youxianji.currentText()
        out_dict['维修类型'] = self.weixiuleixing.currentText()
        out_dict['负责人'] = self.mvp.text()
        out_dict['机组'] = self.jizu.currentText()
        out_dict['专业'] = self.zhuanye.currentText()
        out_dict['电厂编码'] = self.bianma.text()
        out_dict['工作内容'] = self.content.text()
        out_dict['机组类别'] = self.jizuleibie.currentText()
        out_dict['开始日期'] = QDate.toString(self.begindate.date(), 'yyyy/MM/dd')
        out_dict['开始时间'] = QTime.toString(self.begintime.time(), 'hh:mm')
        out_dict['结束日期'] = QDate.toString(self.enddate.date(), 'yyyy/MM/dd')
        out_dict['结束时间'] = QTime.toString(self.endtime.time(), 'hh:mm')
        out_dict['班组'] = self.banzu.currentText()
        out_dict['工作票类型'] = self.gzpleixing.currentText()
        out_dict['总人数'] = self.sum.text()
        out_dict['班组成员'] = self.chengyuan.text()
        out_dict['工作内容及地点'] = self.contentaddr.text()
        out_dict['隔离类型'] = self.gelileixing.currentText()
        out_dict['隔离状态'] = self.gelizhuangtai.currentText()
        out_dict['安全标示'] = self.anquanbiaoshi.currentText()
        out_dict['隔离措施'] = str_glcs
        out_dict['预控措施'] = str_ykcs
        return  out_dict

    def get_DQ_info(self, out_dict):
        out_dict['优先级'] = self.youxianji_2.currentText()
        out_dict['维修类型'] = self.weixiuleixing_2.currentText()
        out_dict['负责人'] = self.mvp_2.text()
        out_dict['机组'] = self.jizu_2.currentText()
        out_dict['专业'] = self.zhuanye_2.currentText()
        out_dict['电厂编码'] = self.bianma_2.text()
        out_dict['工作内容'] = self.content_2.text()
        out_dict['机组类别'] = self.jizuleibie_2.currentText()
        out_dict['开始日期'] = QDate.toString(self.begindate_2.date(), 'yyyy/MM/dd')
        out_dict['开始时间'] = QTime.toString(self.begintime_2.time(), 'hh:mm')
        out_dict['结束日期'] = QDate.toString(self.enddate_2.date(), 'yyyy/MM/dd')
        out_dict['结束时间'] = QTime.toString(self.endtime_2.time(), 'hh:mm')
        out_dict['班组'] = self.banzu_2.currentText()
        return  out_dict

    def start_GD(self):
        mydict = {}
        self.get_GD_info(mydict)
        print(mydict)
        pass


    def start_DQ(self):
        mydict = {}
        self.get_DQ_info(mydict)
        print(mydict)
        pass

if __name__ == "__main__":
    app = QApplication([])
    mywindow = Window()
    mywindow.show()
    app.exec_()