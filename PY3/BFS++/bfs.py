# from PyQt5.QtWidgets import QWidget, QApplication, QTableWidget, QTableWidgetItem, QMessageBox, QHeaderView, QComboBox, QLabel
# from PyQt5.QtCore import QDate, QTime, QStringListModel
# from PyQt5.QtGui import QIntValidator
# from  PyQt5.QtGui import QColor

# from PyQt5 import QtCore
# import numpy as np
import pandas as pd
# from ui_easy1 import *
import re
from selenium import webdriver
from selenium.webdriver.common.by import By
# from lxml import etree
import time
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait
from selenium.common.exceptions import TimeoutException
from mydict import GD, GZP, TABBAR, TOOLBAR
PATH = r"d:\app\chromedriver.exe"


class BFS:
    def __init__(self):
        chrome_options = Options()
        chrome_options.add_experimental_option('debuggerAddress', '127.0.0.1:9222')
        self.MyDriver=webdriver.Chrome(executable_path=PATH,chrome_options=chrome_options)
        # self.MyDriver=webdriver.Chrome(executable_path=PATH)
        # self.MyDriver.get(r'http://10.33.2.11/WebBFS/Login.aspx')
        # self.MyDriver.get('http://www.baidu.com')

    def btn_click(self, xpath):
        ele_exist = EC.presence_of_element_located((By.XPATH, xpath))
        element = WebDriverWait(self.MyDriver, 5).until(ele_exist)
        element.click()

    def get_text(self, xpath):  # 读元素数据
        ele_exist = EC.presence_of_element_located((By.XPATH, xpath))
        element = WebDriverWait(self.MyDriver, 20).until(ele_exist)
        return element.get_attribute('value')

    def set_text(self, xpath, content):
        ele_exist = EC.presence_of_element_located((By.XPATH, xpath))
        element = WebDriverWait(self.MyDriver, 20).until(ele_exist)
        element.clear()
        element.send_keys(content)



if __name__ == "__main__":

    pass