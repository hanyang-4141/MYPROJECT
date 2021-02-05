import requests
from lxml import etree
import pandas as pd
pd.set_option('display.max_rows',500)
pd.set_option('display.max_columns',500)
pd.set_option('display.width',1000)
# from selenium.webdriver.common.action_chains import ActionChains
URL = 'http://10.33.2.11:8888/bfs_report/MmlServlet?'
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:47.0) Gecko/20100101 Firefox/47.0'
}
PARAMS = {
    'forward'	: 'getMmlDetailInfo',
    'begDate': '2021-01-13',
    'endDate'	: '2021-01-20',
    'mmlType': '',
    'profession'	: '热控检修队',
    'bz'	: '热工-计算机',
    'name'	: 'hj',
    'jz': '',
}
respones=requests.get(url=URL,headers=HEADERS,params=PARAMS)
html=etree.HTML(respones.text)
# html = etree.parse('bfs.html')
table = html.xpath('//table[@id="tb"]')
str = etree.tostring(table[0], encoding='utf-8').decode()
df = pd.read_html(str, encoding='utf-8', header=0, skiprows=1)[0]
print(df)


