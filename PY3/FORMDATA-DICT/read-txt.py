#
# d1={
# "ctl00$MC$TC$_ctl0$ctl00$_167"  :   "2",
# "ctl00$MC$TC$_ctl0$ctl00$_168"	:   "2",
# "ctl00$MC$TC$_ctl0$ctl00$_169"	:   "2",
# "ctl00$MC$TC$_ctl0$ctl00$_107"	:   "2",
# "ctl00$MC$TC$_ctl0$ctl00$_1107" :	"2",
# "ctl00$MC$TC$_ctl0$ctl00$_1108" :	"2",
# "ctl00$MC$TC$_ctl0$ctl00$_1109"	:   "2",
# "ctl00$MC$TC$_ctl0$ctl00$_171"	:   "2",
#
#
#
# }
# import  requests

with open(r"c:\11\post.txt","r",encoding='utf-8') as f:
    lines = f.readlines()
name_list = []
value_list = []
for index,line in enumerate(lines):
    # print(line)
    line = line.strip("\n")
    templist = line.split("	")
    name_list.append(templist[0])
    value_list.append(templist[1])
mydict = dict(zip(name_list,value_list))
print(mydict)


