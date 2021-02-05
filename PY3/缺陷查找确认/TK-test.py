import tkinter as Tk
from tkinter import ttk
from threading import Timer
class MyApp(object):
    def __init__(self, parent):
        """Constructor"""
        self.root = parent
        self.root.title("Main frame")
        self.root.withdraw()
        self.i = 0
        self.insert_data()
        self.jiance()
    def insert_data(self):
        # [序号	检修班组	缺陷单号	缺陷描述	措施说明	状态	状态描述	登记时间	完成时间	登记人	机组	缺陷类型	运行班组]
        tree = ttk.Treeview(self.root)  # #创建表格对象
        tree = ttk.Treeview(root, columns=['1', '2', '3', '4'], show='headings')
        tree.column('1', width=70, anchor='center')
        tree.column('2', width=70, anchor='center')
        tree.column('3', width=70, anchor='center')
        tree.column('4', width=70, anchor='center')
        tree.heading('1', text='缺陷单号')
        tree.heading('2', text='缺陷描述')
        tree.heading('3', text='状态')
        tree.heading('4', text='登记时间')
        tree.insert('', 0, values=("652", "20万机组集控#2号机盘前从西数第七个电脑屏坏。", "验收合格", "2021-01-14 14:13"))
        tree.grid()
        tree.pack()
    def hide(self):
        self.root.withdraw()
    def show(self):
        self.root.update()
        self.root.deiconify()
    def jiance(self):
        self.i += 1
        print(self.i)
        if self.i % 5 == 0:
            self.hide()
        else:
            self.show()
        Timer(1, self.jiance).start()
def closeWindow():
    # print('隐藏窗口')
    app.hide()
    return
if __name__ == "__main__":
    root = Tk.Tk()
    x = root.winfo_screenwidth()
    y = root.winfo_screenheight()
    pos = "300x150+{}+{}".format(x - 300, y - 150 - 80)
    print(pos)
    root.geometry(pos)
    app = MyApp(root)
    root.wm_attributes('-topmost', 1)   #窗口置顶
    root.attributes("-toolwindow", 2)   #去掉最大化最小化按钮
    root.protocol('WM_DELETE_WINDOW', closeWindow)  #捕捉关闭消息
    root.mainloop()