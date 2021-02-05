import tkinter as Tk
from tkinter import ttk
from threading import Timer
import requests
from lxml import etree
import pandas as pd
import urllib.request
import urllib.parse
import http.cookiejar
import datetime

pd.set_option('display.max_rows',500)
pd.set_option('display.max_columns',500)
pd.set_option('display.width',1000)


login_url = 'http://10.33.2.11/WebBFS/Login.aspx'
quexian_url = 'http://10.33.2.11/WebBFS/Program3.aspx?programId=103&programNum=10006'
tongji_url = 'http://10.33.2.11:8888/bfs_report/MmlServlet?'
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:47.0) Gecko/20100101 Firefox/47.0'
}
formdata = {
    '__VIEWSTATE': '/wEPDwUKMjA5OTUxOTkzOA9kFgQCAw8PFgIeBFRleHRkZGQCBQ9kFhBmDw8WAh8ABRPmnI3liqHlmagv5pWw5o2u5bqTZGQCAQ8QDxYCHgtfIURhdGFCb3VuZGdkEBUCDOato+W8j+eOr+WigwzmtYvor5Xnjq/looMVAgzmraPlvI/njq/looMM5rWL6K+V546v5aKDFCsDAmdnZGQCAg8PFgIfAAUG6K+t6KiAZGQCAw8QZBAVBgdFbmdsaXNoBkdlcm1hbgdDaGluZXNlCFJ1c3Npc2NoCFNwYW5pc2NoCUZyYW56aXNjaBUGB0VuZ2xpc2gGR2VybWFuB0NoaW5lc2UIUnVzc2lzY2gIU3BhbmlzY2gJRnJhbnppc2NoFCsDBmdnZ2dnZ2RkAgQPDxYCHwAFBueUqOaIt2RkAgYPDxYCHwAFBuWvhueggWRkAggPDxYCHwAFBueZu+W9lWRkAgoPDxYCHwBlZGRkz6KxaKIeQ5xsrQ97tXQvcbH/CRhU8yTO8Gg0ip3MmN4=',
    '__VIEWSTATEGENERATOR': '67C0058E',
    '__EVENTVALIDATION' : '/wEdAAyiiVRvCGbLgXiYYdIRL/iAyQYNkCQZslBQhY9ddq9DmJchT8giAkzbrulWPBkqL4oBFMs6WEtLL6khlc9tTkJPAU6oojdxeh/D8gEVx3uhsoxtXv9xo4Nd1sl8WQ4ol8tZt80EZ3xpv9pLyzBwuboPZcf3P0JUVshR/rr8SoMq/R6l46w2dUIRm6Ue1GqbFrCQ/djM1moA3Lcx9yiXrNYoqFe59uEio+bAp/33YZOR3aKeKEbp39eHc9mbdvkCgxBXR/f3ASKxLx1DAMmCuXAxxM7bWmGwGEz5Nyh3TWpARw==',
    'ddlServerName': '正式环境',
    'ddlLanguage': 'Chinese',
    'tbUser': '80180258',
    'tbPassword': '80180258',
    'btnLogin': '登录',
}
PARAMS = {
    'forward'   : 'getMmlDetailInfo',
    'begDate': '2021-01-06',
    'endDate'   : '2021-01-10',
    'mmlType': '',
    'profession'    : '热控检修队',
    'bz'    : '热工-计算机',
    'name'  : 'hj',
    'jz': '',
}

# cj = http.cookiejar.CookieJar()
# handle = urllib.request.HTTPCookieProcessor(cj)
# opener = urllib.request.build_opener(handle)
# REQ = urllib.request.Request(url=login_url, headers=HEADERS)
# formdata = urllib.parse.urlencode(formdata).encode()
# response = opener.open(REQ, data=formdata)




def get_info():
    try:
        year = datetime.datetime.now().year
        month = datetime.datetime.now().month
        begDate = '{}-{:0>2d}-01'.format(year, month)
        if month == 12:
            endDate = '{}-{:0>2d}-01'.format(year + 1, 1)
        else:
            endDate = '{}-{:0>2d}-01'.format(year, month + 1)

        # print(begDate, endDate)
        PARAMS['begDate'] = begDate
        PARAMS['endDate'] = endDate
        PARAMS['profession'] = '热控检修队'
        PARAMS['bz'] = '热工-计算机'
        # print(PARAMS)
        # respones=requests.get(url=tongji_url,headers=HEADERS,params=PARAMS)
        # html=etree.HTML(respones.text)
        html = etree.parse('bfs.html')

        table = html.xpath('//table[@id="tb"]')
        str = etree.tostring(table[0], encoding='utf-8').decode()
        df = pd.read_html(str, encoding='utf-8', header=0, skiprows=1)[0]
        return df
    except Exception as e:
        print(e)
        pass

class MyApp(object):
    def __init__(self, parent):
        """Constructor"""
        self.root = parent
        self.root.title("本月未确认缺陷")
        self.root.withdraw()
        self.i = 0
        self.mydf = None
        self.sum_of_day = 0
        self.temp_df = None
        self.tree = ttk.Treeview(self.root)  # #创建表格对象
        style = ttk.Style(self.root)
        style.theme_use("default")
        style.configure("Treeview")
        self.tree = ttk.Treeview(root, columns=['1', '2'], show='headings')
        self.tree.column('1', width=50, anchor='center')
        self.tree.column('2', width=350, anchor='w')
        self.tree.heading('1', text='序号')
        self.tree.heading('2', text='缺陷描述')
        self.tree.pack()
        self.jiance()
        # [序号	检修班组	缺陷单号	缺陷描述	措施说明	状态	状态描述	登记时间	完成时间	登记人	机组	缺陷类型	运行班组]

    def hide(self):
        self.root.withdraw()
    def show(self):
        self.root.update()
        self.root.deiconify()

    def delButton(self, tre):
        x = self.tree.get_children()
        for item in x:
            self.tree.delete(item)

    def jiance(self):
        try:
            self.mydf = get_info()
            self.delButton(self.tree)
            # if datetime.datetime.now().hour == 0 and datetime.datetime.now().minute == 0 and datetime.datetime.now().second == 0:
            #     self.temp_df = None
            #     pass
            df1 = self.mydf.loc[self.mydf['状态描述'] == '挂起申请']
            rows = df1.shape[0]
            # print(df1)
            if rows > 0:
                self.show()
            for i in range(rows):
                self.tree.insert('', i, values=(df1.iat[i, 2], df1.iat[i, 3],))
            print('*' * 100)
            # Timer(5, self.jiance).start()
        except Exception as e:
            print(e)
            # Timer(10, self.jiance).start()
            # return
        finally:
            Timer(2, self.jiance).start()

def closeWindow():
    print('隐藏窗口')
    app.hide()
    return
if __name__ == "__main__":
    root = Tk.Tk()
    x = root.winfo_screenwidth()
    y = root.winfo_screenheight()
    width = 400
    heigh = 250
    pos = "{}x{}+{}+{}".format(width, heigh, x - width, y - heigh - 80)
    print(pos)
    root.geometry(pos)
    app = MyApp(root)
    root.wm_attributes('-topmost', 1)   #窗口置顶
    root.attributes("-toolwindow", 2)   #去掉最大化最小化按钮
    root.protocol('WM_DELETE_WINDOW', closeWindow)  #捕捉关闭消息
    root.mainloop()