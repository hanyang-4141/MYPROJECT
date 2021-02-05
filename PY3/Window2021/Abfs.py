from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains
from mydict import GD, GZP, BTN, FORMDATA
import time
PATH = r'chromedriver.exe'
定期工作 = 2
工作票 = 1
class bfs:
    def __init__(self):
        self.MyDriver = None
        self.current_page = None     #实例，'GD-工单'
        self.current_page = "GD-工单"

    def login(self, name, password):        
        self.MyDriver = webdriver.Chrome(executable_path=PATH)
        self.MyDriver.get(r'http:www.baidu.com')
        self.input_setText_byxpath(FORMDATA['USERNAME'])
        self.input_setText_byxpath(FORMDATA['PASSWORD'])

    # 按键点击----------------------------------------------------------------------------------------
    def button_click_byxpath(self, xpath):
        ele_exist = EC.presence_of_element_located((By.XPATH, xpath))
        element = WebDriverWait(self.MyDriver, 5).until(ele_exist)
        element.click()


    def button_rclick_byxpath(self, xpath):
        ele_exist = EC.presence_of_element_located((By.XPATH, xpath))
        element = WebDriverWait(self.MyDriver, 20).until(ele_exist)
        (ActionChains)(self.MyDriver).context_click(element).perform()

    def button_click_byname(self, btn_name):
        if btn_name == '工单':            self.button_click_byxpath(GD['工单']['TAB_btn'])
        elif btn_name == '工单分项':       self.button_click_byxpath(GD['工单分项']['TAB_btn'])
        elif btn_name == '连接':          self.button_click_byxpath(GD['连接']['TAB_btn'])
        elif btn_name == '工作票':         self.button_click_byxpath(GZP['工作票']['TAB_btn'])
        elif btn_name == '电厂编码':        self.button_click_byxpath(GZP['电厂编码']['TAB_btn'])
        elif btn_name == '隔离措施':        self.button_click_byxpath(GZP['隔离措施']['TAB_btn'])
        elif btn_name == '危险预控':        self.button_click_byxpath(GZP['危险预控']['TAB_btn'])
        elif btn_name == '查找':         self.button_click_byxpath(BTN['查找'])
        elif btn_name == '保存':            self.button_click_byxpath(BTN['保存'])
        elif btn_name == '新建':            self.button_click_byxpath(BTN['新建'])
        elif btn_name == '工单确认':        self.button_click_byxpath(BTN['工单确认'])
        elif btn_name == '工作票确认':        self.button_click_byxpath(BTN['工作票确认'])
        elif btn_name == '分项表格':        self.button_click_byxpath(GD['工单分项']['分项表格'])
        elif btn_name == '编码表格':        self.button_click_byxpath(GZP['电厂编码']['编码表格'])
        elif btn_name == '分项确认':        self.button_click_byxpath(BTN['分项确认'])
        elif btn_name == '选中工作票':      self.button_click_byxpath(GD['连接']['工作票'])
        elif btn_name == '打开工作票':      self.button_click_byxpath(GD['连接']['打开工作票'])
        elif btn_name == '创建工作票':      self.button_click_byxpath(GD['连接']['创建工作票'])
        elif btn_name == 'radio电气':      self.button_click_byxpath(GZP['电厂编码']['radio_btn_电气'])
        elif btn_name == 'radio机械':      self.button_click_byxpath(GZP['电厂编码']['radio_btn_机械'])
        elif btn_name == '右键工作票':       self.button_rclick_byxpath(GD['连接']['工作票'])
        elif btn_name == 'login':          self.button_click_byxpath(BTN['登录'])

        
    #combo操作-------------------------------------------------------------------------------------------
    def combo_click(self, xpath):
        ele_exist = EC.presence_of_element_located((By.XPATH, xpath))
        element = WebDriverWait(self.MyDriver, 20).until(ele_exist)        
        element.click()


    def combo_selectOptions(self, xpath):
        element = self.MyDriver.find_elements(By.XPATH, xpath)[-1]
        element.click()


    def combo_setText_byxpath(self, xpath_combo_btn, xpath_combo_list):
        self.combo_click(xpath_combo_btn)
        self.combo_selectOptions(xpath_combo_list)


    def combo_setText_byname(self, combo_name, content):
        templist = self.current_page.split('-')
        combo_xpath_str = "{}['{}']['{}']['combo_btn']".format(templist[0], templist[1], combo_name)
        combolist_xpath_str = "{}['{}']['{}']['{}']".format(templist[0], templist[1], combo_name ,content)
        combo_xpath = eval(combo_xpath_str)
        combolist_xpath = eval(combolist_xpath_str)
        self.combo_click(combo_xpath)
        self.combo_selectOptions(combolist_xpath)


    #输入框文本---------------------输入框文本---------------------------输入框文本--------------------输入框文本-----------------------
    def input_setText_byname(self, input_name, content):
        templist = self.current_page.split('-')
        input_xpath_str = "{}['{}']['{}']['input_adr']".format(templist[0], templist[1], input_name)
        xpath = eval(input_xpath_str)
        self.input_setText_byxpath(xpath, content)


    def input_setText_byxpath(self, xpath, content):
        ele_exist = EC.presence_of_element_located((By.XPATH, xpath))
        element = WebDriverWait(self.MyDriver, 20).until(ele_exist)
        element.clear()
        element.send_keys(content)

    #getText
    def getText_byxpath(self, xpath):
        ele_exist = EC.presence_of_element_located((By.XPATH, xpath))
        element = WebDriverWait(self.MyDriver, 20).until(ele_exist)
        return element.get_attribute('value')

    def getText_byname(self, input_name):
        templist = self.current_page.split('-')
        input_xpath_str = "{}['{}']['{}']['input_adr']".format(templist[0], templist[1], input_name)
        xpath = eval(input_xpath_str)

    # 元素---------------------元素---------------------------元素--------------------元素-----------------------
    def findelement(self, xpath):
        try:
            ele_exist = EC.presence_of_element_located((By.XPATH, xpath))
            return WebDriverWait(self.MyDriver, 10).until(ele_exist)
        except TimeoutException:
            return False

    def findelements(self, xpath):
        try:
            ele_exist = EC.presence_of_all_elements_located((By.XPATH, xpath))
            return WebDriverWait(self.MyDriver, 10).until(ele_exist)
        except TimeoutException:
            return False


    #-------------------------------------------------------------------------------------------------------------
    def get_page_text(self, dict):  # 得到玉页面当前数据
        if self.current_page == 'GD-工单':
            dict['优先级'] = self.getText_byname('优先级')
            dict['维修类型'] = self.getText_byname('维修类型')
            dict['负责人'] = self.getText_byname('负责人')
            dict['机组'] = self.getText_byname('机组')
            dict['专业'] = self.getText_byname('专业')
            dict['电厂编码'] = self.getText_byname('电厂编码')
            dict['工作内容'] = self.getText_byname('工作内容')
            dict['机组类别'] = self.getText_byname('机组类别')
            dict['开始日期'] = self.getText_byname('开始日期')
            dict['开始时间'] = self.getText_byname('开始时间')
            dict['结束日期'] = self.getText_byname('结束日期')
            dict['结束时间'] = self.getText_byname('结束时间')
            return 'GD-工单--完成'
        elif self.current_page == 'GD-工单分项':
            qq = self.findelement("//*[@data-ig = 'x:914667624.17:adr:0:tag:']/td[4]")
            dict['班组'] = qq.get_attribute('title')
            return 'GD-工单分项--完成'
        elif self.current_page == 'GZP-工作票':
            dict['工作票类型'] = self.getText_byname('工作票类型')
            dict['总人数'] = self.getText_byname('总人数')
            dict['班组成员'] = self.getText_byname('班组成员')
            dict['工作内容及地点'] = self.getText_byname('工作内容及地点')
            return 'GZP-工作票--完成'

        elif self.current_page == 'GZP-电厂编码':
            qq = self.findelement("//*[@data-ig = 'x:1317427084.17:adr:0:tag:']/td[6]")  # GZP['电厂编码']['编码表格']
            dict['隔离类型'] = qq.get_attribute('title')
            return 'GZP-电厂编码--完成'

        elif self.current_page == 'GZP-隔离措施':
            qq1 = self.findelements("//*[@data-ig='x:1317417514.18:mkr:rows:nw:1']/tr")
            if qq1 == False:
                print('无法找到隔离措施!')
                return '隔离措施无法找到！'
            print("隔离措施%d条" % len(qq1), end='->', flush=True)
            str_cs = ''
            for index, q in enumerate(qq1):
                str2 = q.find_element(By.XPATH, "./td[2]")
                str3 = q.find_element(By.XPATH, "./td[3]")
                str5 = q.find_element(By.XPATH, "./td[5]")
                if index == 0:
                    str = ''
                    str9 = q.find_element(By.XPATH, "./td[9]")
                    str10 = q.find_element(By.XPATH, "./td[10]")
                    dict['隔离状态'] = str9.get_attribute('title')
                    dict['安全标示'] = str10.get_attribute('title')
                str = str2.get_attribute('title') + "$" + str5.get_attribute('title') + "$" + str3.get_attribute(
                    'title') + '\r\n'
                str_cs += str
            dict['隔离措施'] = str_cs
            return 'GZP-隔离措施--完成'

        elif self.current_page == 'GZP-危险预控':
            qq = self.findelements("//*[@data-ig = 'x:1317421711.16:mkr:rows:nw:1']/tr")
            if qq == False:
                print('无法找到危险预控！')
                return '危险预控无法找到！'
            print("危险预控%d条" % len(qq), flush=True)
            str_yk = ''
            for index, q in enumerate(qq):
                str2 = q.find_element(By.XPATH, "./td[2]")
                str3 = q.find_element(By.XPATH, "./td[3]")
                str = str2.get_attribute('title') + "$" + str3.get_attribute('title') + '\r\n'
                str_yk = str_yk + str
            dict['危险预控'] = str_yk
            return 'GZP-危险预控--完成'
   

    #-------------------------------------------------------------------------------------------------------------
    def write_page_text(self, aim_dict):  # 写入页面数据
        if self.current_page == 'GD-工单':
            self.combo_setText_byname('优先级', aim_dict['优先级']);          print('优先级..........已写入')
            self.combo_setText_byname('维修类型', aim_dict['维修类型']);       print('维修类型..........已写入')
            self.combo_setText_byname('机组', aim_dict['机组']);             print('机组..........已写入')
            self.combo_setText_byname('专业', aim_dict['专业']);            print('专业..........已写入')
            self.combo_setText_byname('机组类别', aim_dict['机组类别']);      print('机组类别..........已写入')
            self.input_setText_byname('负责人', aim_dict['负责人']);         print('负责人..........已写入')
            self.input_setText_byname('工作内容', aim_dict['工作内容']);      print('工作内容..........已写入')
            self.input_setText_byname('开始日期', aim_dict['开始日期']);      print('开始日期..........已写入')
            self.input_setText_byname('开始时间', aim_dict['开始时间']);      print('开始时间..........已写入')
            self.input_setText_byname('结束日期', aim_dict['结束日期']);      print('结束日期..........已写入')
            self.input_setText_byname('结束时间', aim_dict['结束时间']);      print('结束时间..........已写入')
            self.input_setText_byname('电厂编码', aim_dict['电厂编码']);      print('电厂编码..........已写入')
            ele = self.MyDriver.find_element(By.ID, 'MC_TC__ctl2_ctl00__301')  # 点空白处 加载电厂编码
            ele.click()
            time.sleep(3)
            self.button_click_byname('保存')

        elif self.current_page == 'GD-工单分项':
            time.sleep(3)
            self.button_click_byname('分项表格')
            time.sleep(5)
            self.input_setText_byname('班组', aim_dict['班组']);         print('班组..........已写入')
            time.sleep(3)
            self.button_click_byname('保存')

        elif self.current_page == 'GD-连接':
            self.button_click_byname('选中工作票')
            time.sleep(1)
            self.button_click_byname('右键工作票')
            time.sleep(1)
            self.button_click_byname('创建工作票')
            print('创建工作票')
            time.sleep(3)
            self.button_click_byname('选中工作票')
            time.sleep(1)
            self.button_click_byname('右键工作票')
            time.sleep(1)
            self.button_click_byname('打开工作票')
            print('打开工作票')
            #以下xp不能用
            # exist = EC.new_window_is_opened(self.MyDriver.window_handles)
            # WebDriverWait(self.MyDriver, 20).until(exist)
            time.sleep(5)
            self.MyDriver.switch_to.window(self.MyDriver.window_handles[-1])

        elif self.current_page == 'GZP-工作票':
            self.combo_setText_byname('工作票类型', aim_dict['工作票类型']);          print('工作票类型..........已写入')
            self.combo_setText_byname('专业', aim_dict['专业']);                    print('专业..........已写入')
            self.combo_setText_byname('机组', aim_dict['机组']);                    print('机组..........已写入')
            self.input_setText_byname('负责人', aim_dict['负责人']);                 print('负责人..........已写入')
            self.input_setText_byname('总人数', aim_dict['总人数']);                 print('总人数..........已写入')
            self.input_setText_byname('班组成员', aim_dict['班组成员']);              print('班组成员..........已写入')
            self.input_setText_byname('工作内容及地点', aim_dict['工作内容及地点']);    print('工作内容及地点..........已写入')
            print('*' * 60)
            self.button_click_byname('保存')

        elif self.current_page == 'GZP-电厂编码':
            self.button_click_byname('编码表格')
            if aim_dict.get('隔离类型') == '' or aim_dict.get('隔离类型') == 'nan':
                return
            time.sleep(5)
            self.combo_setText_byname('隔离', aim_dict.get('隔离类型'))
            if aim_dict.get('隔离类型') == '电气及机械隔离':
                self.button_click_byname('radio电气')
                self.button_click_byname('radio机械')
            elif aim_dict.get('隔离类型') == '电气隔离':
                self.button_click_byname('radio电气')
            elif aim_dict.get('隔离类型') == '机械隔离':
                self.button_click_byname('radio机械')
            self.button_click_byname('保存')

        elif self.current_page == 'GZP-隔离措施':
            tempstr = str(aim_dict['隔离措施'])
            glcs_list = tempstr.splitlines()
            len1 = len(glcs_list)
            for index, glcs in enumerate(glcs_list):
                str1 = glcs.split('$')
                if str1[0].strip() == '热机票-2' or str1[0].strip() == '' :
                    break
                print("隔离措施一共{}条，正在写入第{}条！".format(len1, index + 1))
                if index == 0:
                    self.combo_setText_byname('隔离切换操作', '隔离切换操作')
                    time.sleep(2)
                    self.combo_setText_byname('措施类别', '热机票-1')
                    self.input_setText_byname('措施内容', str1[2])
                    self.input_setText_byname('电厂编码', aim_dict['电厂编码'])
                    qq = self.MyDriver.find_element(By.XPATH, GZP['隔离措施']['措施内容']['input_adr'])
                    qq.click()
                    time.sleep(2)
                    if aim_dict['隔离状态'] != '无':
                        self.combo_setText_byname('隔离状态', aim_dict['隔离状态'])
                    if aim_dict['安全标示'] != '无':
                        self.combo_setText_byname('安全标示', aim_dict['安全标示'])
                    self.button_click_byname('保存')
                    time.sleep(3)
                else:
                    self.combo_setText_byname('隔离切换操作', '记录陈述')
                    time.sleep(2)
                    self.combo_setText_byname('措施类别', '热机票-1')
                    self.input_setText_byname('措施内容', str1[2])
                    self.button_click_byname('保存')
                    time.sleep(2)

        elif self.current_page == 'GZP-危险预控':
            tempstr = str(aim_dict['危险预控'])
            ykcs_list = tempstr.splitlines()
            len2 = len(ykcs_list)
            for index, glcs in enumerate(ykcs_list):
                print("危险预控一共{}条，正在写入第{}条！".format(len2, index + 1))
                str1 = glcs.split('$')
                self.input_setText_byname('危险辨识',str1[0])
                self.input_setText_byname('危险预控', str1[1])
                self.button_click_byname('保存')
                time.sleep(2)


    def get_gd_info(self, year, num):
        self.MyDriver.get(r'http://10.33.2.11/WebBFS/Program3.aspx?programId=216&programNum=10007')
        self.button_click_byname('查询')
        self.input_setText_byxpath(GD['查询']['编号'], num)
        self.combo_setText_byxpath(GD['查询']['年份']['combo_btn'], GD['查询']['年份'][year])
        self.button_click_byname('查找')
        self.current_page = 'GD-工单'
        mydict = {}
        mydict['工单号'] = num
        self.get_page_text(mydict)
        self.button_click_byname('工单分项')
        self.current_page = 'GD-工单分项'
        self.get_page_text(mydict)
        self.button_click_byname('连接')
        self.current_page = 'GD-连接'
        self.button_click_byname('选中工作票')
        try:
            element = WebDriverWait(self.MyDriver, 10).until(
                EC.visibility_of_element_located((By.ID, 'MC_TC__ctl4_ctl00_LinkViewControl__101')))
        except Exception as e:
            print("获取工作票超时!查询结束....")
            mydict['隔离单号'] = '无'
            mydict['工作票类型'] = '无'
            mydict['总人数'] = '无'
            mydict['班组成员'] = '无'
            mydict['工作内容及地点'] = '无'
            mydict['隔离类型'] = '无'
            mydict['隔离状态'] = '无'
            mydict['隔离类型'] = '无'
            mydict['安全标示'] = '无'
            mydict['隔离措施'] = '无'
            mydict['危险预控'] = '无'
            return
        else:
            qq = self.findelement("//*[@id='MC_TC__ctl4_ctl00_LinkViewControl__101']")
            num = qq.get_attribute('value')
            mydict['隔离单号'] = num
            self.button_click_byname("右键工作票")
            self.button_click_byname("打开工作票")
        # exist = EC.new_window_is_opened(self.bfs.MyDriver.window_handles)
        # WebDriverWait(self.bfs.MyDriver, 20).until(exist)
        time.sleep(3)
        self.MyDriver.switch_to_window(self.MyDriver.window_handles[-1])
        self.current_page = 'GZP-工作票'
        self.get_page_text(mydict)
        self.button_click_byname('电厂编码')
        self.current_page = 'GZP-电厂编码'
        self.get_page_text(mydict)
        self.button_click_byname('隔离措施')
        self.current_page = 'GZP-隔离措施'
        self.get_page_text(mydict)
        self.button_click_byname('危险预控')
        self.current_page = 'GZP-危险预控'
        self.get_page_text(mydict)
        self.MyDriver.close()
        self.MyDriver.switch_to_window(self.MyDriver.window_handles[0])
        return mydict


    def auto_write(self, job_type, aim_dict):
        self.MyDriver.get(r'http://10.33.2.11/WebBFS/Program3.aspx?programId=216&programNum=10007')
        self.button_click_byname('工单')
        self.current_page = 'GD-工单'
        time.sleep(5)
        try:
            self.button_click_byname('新建')
        except Exception as e:
            print(e)
        time.sleep(5)

        try:
            self.write_page_text(aim_dict)
            time.sleep(5)
            self.button_click_byname('工单分项')
            self.current_page = 'GD-工单分项'
            self.button_click_byname('分项表格')
            time.sleep(5)
            self.input_setText_byname('班组', "热控计算机")
            tic = time.time()
            while 1:
                self.button_click_byname('保存')
                cur_tic = time.time()
                if cur_tic - tic >8:
                    break
                time.sleep(1)
            time.sleep(4)
            if job_type == 定期工作:
                return
            self.button_click_byname('连接')
            self.current_page = 'GD-连接'
            self.write_page_text(aim_dict)
            self.current_page = 'GZP-工作票'
            self.write_page_text(aim_dict)
            time.sleep(5)
            self.button_click_byname('电厂编码')
            self.current_page = 'GZP-电厂编码'
            self.write_page_text(aim_dict)
            time.sleep(5)
            self.button_click_byname('隔离措施')
            self.current_page = 'GZP-隔离措施'
            self.write_page_text(aim_dict)
            time.sleep(5)
            self.button_click_byname('危险预控')
            self.current_page = 'GZP-危险预控'
            self.write_page_text(aim_dict)
        except Exception as e:
            print(e)




        pass


if __name__ == "__main__":
   pass