f = open(r'c:\dati\DanXuan.txt', 'r',encoding='UTF-8')
strlist = f.readlines()
daan = open(r'c:\dati\DanXuan-answer.txt', 'r',encoding='UTF-8')
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
    mydict.setdefault('type', 'DanXuan')
    mydict.setdefault('answer', MyDaAn[i])
    mydict.setdefault('title', temptitle)
    mydict.setdefault('options', tempOptions)
    DanXuan.append(mydict)
    tempOptions = []
    temptitle = ''
import json
ddd = {}
ddd.setdefault('DanXuan',DanXuan)
myjson = json.dumps(ddd)
print(myjson)


