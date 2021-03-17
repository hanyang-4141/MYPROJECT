import  requests
from lxml import  etree
mydict = {
    '__VIEWSTATE':         '/wEPDwUKMjA5OTUxOTkzOA9kFgQCAw8PFgIeBFRleHRkZGQCBQ9kFhBmDw8WAh8ABRPmnI3liqHlmagv5pWw5o2u5bqTZGQCAQ8QDxYCHgtfIURhdGFCb3VuZGdkEBUCDOato+W8j+eOr+WigwzmtYvor5Xnjq/looMVAgzmraPlvI/njq/looMM5rWL6K+V546v5aKDFCsDAmdnZGQCAg8PFgIfAAUG6K+t6KiAZGQCAw8QZBAVBgdFbmdsaXNoBkdlcm1hbgdDaGluZXNlCFJ1c3Npc2NoCFNwYW5pc2NoCUZyYW56aXNjaBUGB0VuZ2xpc2gGR2VybWFuB0NoaW5lc2UIUnVzc2lzY2gIU3BhbmlzY2gJRnJhbnppc2NoFCsDBmdnZ2dnZ2RkAgQPDxYCHwAFBueUqOaIt2RkAgYPDxYCHwAFBuWvhueggWRkAggPDxYCHwAFBueZu+W9lWRkAgoPDxYCHwBlZGRkz6KxaKIeQ5xsrQ97tXQvcbH/CRhU8yTO8Gg0ip3MmN4=',
    '__VIEWSTATEGENERATOR': '67C0058E',
    '__EVENTVALIDATION': '/wEdAAyiiVRvCGbLgXiYYdIRL/iAyQYNkCQZslBQhY9ddq9DmJchT8giAkzbrulWPBkqL4oBFMs6WEtLL6khlc9tTkJPAU6oojdxeh/D8gEVx3uhsoxtXv9xo4Nd1sl8WQ4ol8tZt80EZ3xpv9pLyzBwuboPZcf3P0JUVshR/rr8SoMq/R6l46w2dUIRm6Ue1GqbFrCQ/djM1moA3Lcx9yiXrNYoqFe59uEio+bAp/33YZOR3aKeKEbp39eHc9mbdvkCgxBXR/f3ASKxLx1DAMmCuXAxxM7bWmGwGEz5Nyh3TWpARw==',
    'ddlServerName': '正式环境',
    'ddlLanguage': 'Chinese',
    'tbUser': '80180266',
    'tbPassword': '80180266',
    'btnLogin': '登录'
}
URL = r'http://10.33.2.11/WebBFS/Login.aspx?action=logout'
DCBM= r'http://10.33.2.11/WebBFS/ajax/DialogLoader.aspx?ViewKnz=view_awanl.awanl.ascx&DatTyp=st40&IsEnabled=true&progNum=10007&betKnz=%u5317%u65b9%u547c%u70ed'
MYSESSION = requests.session()
HEADERS = {
    # "origin": "https://passport.mafengwo.cn",
    # "Referer": "https://passport.mafengwo.cn/",
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:47.0) Gecko/20100101 Firefox/47.0',
}

responseRes = MYSESSION.post(URL, data = mydict, headers = HEADERS)
#无论是否登录成功，状态码一般都是 statusCode = 200
print(f"statusCode = {responseRes.status_code}")
# print(f"text = {responseRes.text}")
text=responseRes.content.decode('utf-8')
html=etree.HTML(text)
images=html.xpath('//*[@data-ig="x:826516391.18:mkr:rows:nw:1"]/tr')
print(len(images))
for index, image in enumerate(images):
    temp = image.xpath('./td[2]/text()')
    print(temp)
lianxidan = MYSESSION.get('http://10.33.2.11/WebBFS/Program3.aspx?programId=2391&programNum=14459')
print(lianxidan.content.decode('utf-8'))