#
# f = open(r'd:\duoxuan.txt', 'r',encoding='UTF-8')
# strlist = f.readlines()
# # mydict = {}
# # mydict['answer'] = ''
# # mydict['help'] = ''
# # mydict['options'] = []    #1,checked =false     2, name = "夹具不牢固导致物件飞出伤人"    3, value = A
# # mydict['title'] = ''
# # mydict['url'] = ''
# import re
# import json
# # hehe = "101、当管沟开挖深度大于( d )时，不宜采用人工开挖。(1分)"
# str = r"[a-d]+"
#
# sum = 0
#
# Questions = []
# templist = []
# temptitle = ''
#
# for index, ff in enumerate(strlist):
#     mydict = {}
#     i = ff.find('、')
#     if i > 0 and i < 4:
#         if templist:
#
#             mydict.setdefault('options', templist)
#             mydict.setdefault('title', temptitle)
#             mydict.setdefault('answer', res[0].upper())
#             Questions.append(mydict)
#             templist = []
#         temptitle = re.sub(str, '', ff)
#         res = re.findall(str, ff)
#         # print(index)
#         # print(ff)
#         print(res)
#
#     else:
#         tempdict = {}
#         tempdict.setdefault('checked',False)
#         tempdict.setdefault('value', ff[:1])
#         tempdict.setdefault('name', ff[2:])
#         templist.append(tempdict)
#
# for q in Questions:
#     print(q['title'])
# ddd = {}
# ddd.setdefault('DuoXuan',Questions)
# myjson = json.dumps(ddd)
# print(myjson)

f = open(r'c:\dati\DuoXuan.txt', 'r',encoding='UTF-8')
strlist = f.readlines()
daan = open(r'c:\dati\DuoXuan-answer.txt', 'r',encoding='UTF-8')
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
    mydict.setdefault('type', 'DuoXuan')
    mydict.setdefault('answer', MyDaAn[i])
    mydict.setdefault('title', temptitle)
    mydict.setdefault('options', tempOptions)
    DanXuan.append(mydict)
    tempOptions = []
    temptitle = ''
import json
ddd = {}
ddd.setdefault('DuoXuan',DanXuan)
myjson = json.dumps(ddd)
print(myjson)