
f = open(r'd:\duoxuan.txt', 'r',encoding='UTF-8')
strlist = f.readlines()
# mydict = {}
# mydict['answer'] = ''
# mydict['help'] = ''
# mydict['options'] = []    #1,checked =false     2, name = "夹具不牢固导致物件飞出伤人"    3, value = A
# mydict['title'] = ''
# mydict['url'] = ''
import re
import json
# hehe = "101、当管沟开挖深度大于( d )时，不宜采用人工开挖。(1分)"
str = r"[a-d]+"

sum = 0

Questions = []
templist = []
temptitle = ''

for index, ff in enumerate(strlist):
    mydict = {}
    i = ff.find('、')
    if i > 0 and i < 4:
        if templist:

            mydict.setdefault('options', templist)
            mydict.setdefault('title', temptitle)
            mydict.setdefault('answer', res[0].upper())
            Questions.append(mydict)
            templist = []
        temptitle = ff
        res = re.findall(str, ff)
        # print(index)
        # print(ff)
        print(res)

    else:
        tempdict = {}
        tempdict.setdefault('checked',False)
        tempdict.setdefault('value', ff[:1])
        tempdict.setdefault('name', ff[2:])
        templist.append(tempdict)

# print(Questions[100])
ddd = {}
ddd.setdefault('question',Questions)
myjson = json.dumps(ddd)
print(myjson)