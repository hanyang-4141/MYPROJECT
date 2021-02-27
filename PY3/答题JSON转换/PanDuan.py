# f = open(r'd:\panduandaan.txt', 'r',encoding='UTF-8')
# strlist = f.read()
# # print(strlist)
# l1 = strlist.split('；')
# pd_daan = []
# print(l1)
# for ll in l1:
#     ll = ll[-1:]
#     if ll == '√':
#
#         pd_daan.append(True)
#     else:
#         pd_daan.append(False)
# print(pd_daan)
# import  re
#
# ff = open(r'd:\panduan.txt', 'r',encoding='UTF-8')
# strlist1 = ff.readlines()
# print(strlist1)
# str = r"[f]+"
# Questions = []
# print('题目长度',len(strlist1))
# print('答案长度',len(l1))
# for index,h in enumerate(strlist1):
#     mydict = {}
#     print(h)
#     mydict.setdefault('answer', pd_daan[index])
#     mydict.setdefault('options', [{'checked': False, 'name': '正确', 'value': True}, {'checked': False, 'name': '错误', 'value': False}])
#     mydict.setdefault('title', re.sub(str, '', h))
#
#     Questions.append(mydict)
# # print(Questions)
# for q in Questions:
#     print(q['title'])
# import  json
# ddd = {}
# ddd.setdefault('PanDuan',Questions)
# print(ddd)
# myjson = json.dumps(ddd)
# print(myjson)

PD = True

f = open(r'c:\dati\PanDuan.txt', 'r',encoding='UTF-8')
strlist = f.readlines()
daan = open(r'c:\dati\PanDuan-answer.txt', 'r',encoding='UTF-8')
daanstr = daan.readline()
print(type(daanstr))
daan_list = daanstr.split('；')[0:-1]
print(daan_list)
# print(strlist)
MyDaAn = []
for da in daan_list:
    tempda = da.split('.')[-1]
    MyDaAn.append(tempda)
print(len(MyDaAn))


preindex = 0
tempOptions = []
temptitle = ''
titleIndex_list = []
PretitleIndex = 0
DanXuan = []
# tempDict = []
for index, ff in enumerate(strlist):

    i = ff.find('、')
    if i > 0 and i < 4:
        titleIndex_list.append(index)

print(titleIndex_list)
print(len(titleIndex_list))
for hehe in titleIndex_list:
    print(strlist[hehe])

for i, titleIndex in enumerate(titleIndex_list):
    mydict = {}
    temptitle = strlist[titleIndex]
    if (i + 1) == len(titleIndex_list):
        OptionsSum = len(strlist) - 1 -titleIndex_list[i]
    else:
        OptionsSum = titleIndex_list[i + 1] - titleIndex_list[i]

    for j in range(1, OptionsSum):
        tempDict = {}
        tempDict.setdefault('value', strlist[titleIndex + j][:1])
        tempDict.setdefault('name', strlist[titleIndex + j][2:])
        tempDict.setdefault('checked', False)
        tempOptions.append(tempDict)
    mydict.setdefault('type', 'PanDuan')
    mydict.setdefault('answer', MyDaAn[i])
    mydict.setdefault('title', temptitle)
    if PD:
        mydict.setdefault('options', [{'checked': False, 'name': '正确', 'value': '√'}, {'checked': False, 'name': '错误', 'value': '×'}])
    else:
        mydict.setdefault('options', tempOptions)
    DanXuan.append(mydict)
    tempOptions = []
    temptitle = ''

for pp in DanXuan:
    print(pp)
import json
ddd = {}
ddd.setdefault('PanDuan',DanXuan)
myjson = json.dumps(ddd)
print(myjson)