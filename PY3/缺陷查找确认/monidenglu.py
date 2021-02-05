import urllib.request
import urllib.parse
import http.cookiejar  # save cookie

# 创建COOKIEJAR 对象
cj = http.cookiejar.CookieJar()
# 通过cookie创建handler
handle = urllib.request.HTTPCookieProcessor(cj)
opener = urllib.request.build_opener(handle)

post_url = 'http://www.renren.com/ajaxLogin/login?1=1&uniqueTimestamp=2019761246550'

# 表单数据
form_data = {

    'email': '18004844847',
    'origURL': 'http://www.renren.com/home',
    'domain': 'renren.com',
    'key_id': '1',
    'captcha_type': 'web_login',
    'password': '8b386dba30323687ebe19f6aa8301654b775670c1ce059d0f24389477fe48dd4',
    'rkey': '094f6917dae5e973a6722c03448e0af4',
    'f': 'http%3A%2F%2Fwww.renren.com%2FLogout.do%3Frequesttoken%3D-421203843',
}

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3730.400 QQBrowser/10.5.3805.400'

}


request = urllib.request.Request(url=post_url, headers=headers)

form_data = urllib.parse.urlencode(form_data).encode()

# response = urllib.request.urlopen(request, form_data)
response = opener.open(request, data=form_data)
print(response.read().decode())
print('*' * 50)

get_url = 'http://www.renren.com/972108210/profile'
request = urllib.request.Request(url=get_url, headers=headers)
response = opener.open(request)
print(response.read().decode())
