GD = {
    '查询': {
        'TAB_btn': "//td[@tabid='MC_TC,0']",
        '编号': "//*[@id='MC_TC__ctl0_ctl00__5002']",
        '年份': {
            'combo_btn': "//*[@id='MC_TC__ctl0_ctl00__102']/div/table/tbody/tr/td[2]/img",
            '2017': "//*[@data-ig='x:898879528.26:adr:18']",
            '2018': "//*[@data-ig='x:898879528.27:adr:19']",
            '2019': "//*[@data-ig='x:898879528.28:adr:20']",
            '2020': "//*[@data-ig='x:898879528.29:adr:21']",
        },
    },
    '工单': {
        'TAB_btn': "//td[@tabid='MC_TC,2']",
        '优先级': {
            'combo_btn': '//*[@id="MC_TC__ctl2_ctl00__314"]/div/table/tbody/tr/td[2]/img',
            'input_adr': "//*[@data-ig='x:1317819027.2:mkr:Input']",
            '立刻': "//*[@data-ig='x:1317819027.8:adr:0']",
            '24小时内处理': "//*[@data-ig='x:1317819027.9:adr:1']",
            '48小时内处理': "//*[@data-ig='x:1317819027.10:adr:2']",
            '72小时内处理': "//*[@data-ig='x:1317819027.11:adr:3']",
            '168小时内处理': "//*[@data-ig='x:1317819027.12:adr:4']",
            '停机处理': "//*[@data-ig='x:1317819027.13:adr:5']",
        },
        '维修类型': {
            'combo_btn': '//*[@id="MC_TC__ctl2_ctl00__311"]/div/table/tbody/tr/td[2]/img',
            'input_adr': "//*[@data-ig='x:126177939.2:mkr:Input']",
            '定期工作': "//*[@data-ig='x:126177939.8:adr:0']",
            '改进性检修': "//*[@data-ig='x:126177939.9:adr:1']",
            '故障检修': "//*[@data-ig='x:126177939.10:adr:2']",
            '状态检修': "//*[@data-ig='x:126177939.11:adr:3']",
        },
        '机组': {
            'combo_btn': '//*[@id="MC_TC__ctl2_ctl00__3002"]/div/table/tbody/tr/td[2]/img',
            'input_adr': "//*[@data-ig='x:508519679.2:mkr:Input']",
            '当前值': '',
            '目标值': '',
            '丰泰#1机组': "//*[@data-ig='x:508519679.8:adr:0']",
            '丰泰#2机组': "//*[@data-ig='x:508519679.9:adr:1']",
            '丰泰公用': "//*[@data-ig='x:508519679.10:adr:2']",
            '科林新#3机组': "//*[@data-ig='x:508519679.11:adr:3']",
            '科林新#4机组': "//*[@data-ig='x:508519679.12:adr:4']",
            '科林公用': "//*[@data-ig='x:508519679.13:adr:5']",
        },
        '专业': {
            'combo_btn': '//*[@id="MC_TC__ctl2_ctl00__717"]/div/table/tbody/tr/td[2]/img',
            'input_adr': "//*[@data-ig='x:256421229.2:mkr:Input']",
            '汽机专业': "//*[@data-ig='x:256421229.8:adr:0']",
            '锅炉专业': "//*[@data-ig='x:256421229.9:adr:1']",
            '电气专业': "//*[@data-ig='x:256421229.10:adr:2']",
            '热控专业': "//*[@data-ig='x:256421229.11:adr:3']",
            '输煤专业': "//*[@data-ig='x:256421229.12:adr:4']",
            '脱硫专业': "//*[@data-ig='x:256421229.13:adr:5']",
            '化学专业': "//*[@data-ig='x:256421229.14:adr:6']",
            '土建专业': "//*[@data-ig='x:256421229.15:adr:7']",
            '远动专业': "//*[@data-ig='x:256421229.16:adr:8']",
        },
        '机组类别': {
            'combo_btn': '//*[@id="MC_TC__ctl2_ctl00__3004"]/div/table/tbody/tr/td[2]/img',
            'input_adr': "//*[@data-ig='x:508519685.2:mkr:Input']",
            '内蒙古丰泰发电厂': "//*[@data-ig='x:508519685.8:adr:0']",
            '呼和浩特科林热电厂': "//*[@data-ig='x:508519685.9:adr:1']",
            '科林城发热力': "//*[@data-ig='x:508519685.10:adr:2']",
        },
        '负责人': {'input_adr': "//*[@id='MC_TC__ctl2_ctl00__990']", '当前值': '', '目标值': '', },
        '工作内容': {'input_adr': "//*[@id='MC_TC__ctl2_ctl00__348']", '当前值': '', '目标值': '', },
        '开始日期': {'input_adr': "//*[@id='MC_TC__ctl2_ctl00__972']", '当前值': '', '目标值': '', },
        '开始时间': {'input_adr': "//*[@id='MC_TC__ctl2_ctl00__872']", '当前值': '', '目标值': '', },
        '结束日期': {'input_adr': "//*[@id='MC_TC__ctl2_ctl00__973']", '当前值': '', '目标值': '', },
        '结束时间': {'input_adr': "//*[@id='MC_TC__ctl2_ctl00__873']", '当前值': '', '目标值': '', },
        '电厂编码': {'input_adr': "//*[@id='MC_TC__ctl2_ctl00__960']", '当前值': '', '目标值': '', },

    },
    '工单分项': {
        'TAB_btn': "//td[@tabid='MC_TC,3']",
        '分项表格': "//*[@data-ig = 'x:914667624.17:adr:0:tag:']",
        '班组': {'input_adr': "//*[@id='MC_TC__ctl3_ctl00_Splitter_10007_4_1_3__960']", '当前值': '', '目标值': '', },
    },
    '连接': {
        'TAB_btn': "//td[@tabid='MC_TC,4']",
        '工作票': "//*[@id='ctl00MCTCctl4ctl00Splitter100071111ctl00uwLinkTree_1_2_1_6']/span[3]",
        '打开工作票': "//*[@id='MC_TC__ctl4_ctl00_Splitter_10007_11_1_1_ctl01_uwPopMenu1n3']/td/table",
        '创建工作票': "//*[@id='MC_TC__ctl4_ctl00_Splitter_10007_11_1_1_ctl01_uwPopMenu1n0']/td/table/tbody/tr/td/a/div",
    },

}
GZP = {
    '工作票': {
        'TAB_btn': "//td[@tabid='MC_TC,2']",
        '工作票类型': {
            'combo_btn': "//*[@id='MC_TC__ctl2_ctl00__107']/div/table/tbody/tr/td[2]/img",
            'input_adr': '//*[@data-ig="x:1822111954.2:mkr:Input"]',
            '电气工作票': "//*[@data-ig='x:1822111954.8:adr:0']",
            '热力机械工作票': "//*[@data-ig='x:1822111954.9:adr:1']",
            '外包电气工作票': "//*[@data-ig='x:1822111954.10:adr:2']",
            '外包热力机械工作票': "//*[@data-ig='x:1822111954.11:adr:3']",
        },
        '专业': {
            'combo_btn': "//*[@id='MC_TC__ctl2_ctl00__252']/div/table/tbody/tr/td[2]/img",
            'input_adr': '//*[@data-ig="x:495527167.2:mkr:Input"]',
            '汽机专业': "//*[@data-ig='x:495527167.8:adr:0']",
            '锅炉专业': "//*[@data-ig='x:495527167.9:adr:1']",
            '电气专业': "//*[@data-ig='x:495527167.10:adr:2']",
            '热控专业': "//*[@data-ig='x:495527167.11:adr:3']",
            '输煤专业': "//*[@data-ig='x:495527167.12:adr:4']",
            '脱硫专业': "//*[@data-ig='x:495527167.13:adr:5']",
            '化学专业': "//*[@data-ig='x:495527167.14:adr:6']",
            '土建专业': "//*[@data-ig='x:495527167.15:adr:7']",
            '远动专业': "//*[@data-ig='x:495527167.16:adr:8']",
        },
        '机组': {
            'combo_btn': "//*[@id='MC_TC__ctl2_ctl00__5043']/div/table/tbody/tr/td[2]/img",
            'input_adr': '//*[@data-ig="x:260479746.2:mkr:Input"]',
            '丰泰#1机组': "//*[@data-ig='x:260479746.8:adr:0']",
            '丰泰#2机组': "//*[@data-ig='x:260479746.9:adr:1']",
            '丰泰公用': "//*[@data-ig='x:260479746.10:adr:2']",
            '科林新#3机组': "//*[@data-ig='x:260479746.11:adr:3']",
            '科林新#4机组': "//*[@data-ig='x:260479746.12:adr:4']",
            '科林公用': "//*[@data-ig='x:260479746.13:adr:5']",
        },
        '总人数': {'input_adr': "//*[@id='MC_TC__ctl2_ctl00__156']", '当前值': '', '目标值': '', },
        '负责人': {'input_adr': "//*[@id='MC_TC__ctl2_ctl00__112']", '当前值': '', '目标值': '', },
        '班组成员': {'input_adr': "//*[@id='MC_TC__ctl2_ctl00__153']", '当前值': '', '目标值': '', },
        '工作内容及地点': {'input_adr': "//*[@id='MC_TC__ctl2_ctl00__120']", '当前值': '', '目标值': '', },

    },
    '电厂编码': {
        'TAB_btn': "//td[@tabid='MC_TC,3']",
        '隔离': {
            'combo_btn': "//*[@data-ig='x:683059316.4:mkr:ButtonImage']",
            'input_adr': '',
            '电气隔离': "//*[@data-ig='x:683059316.8:adr:0']",
            '机械隔离': "//*[@data-ig='x:683059316.9:adr:1']",
            '电气及机械隔离': "//*[@data-ig='x:683059316.10:adr:2']",
        },
        '编码表格': "//*[@data-ig = 'x:1317427084.17:adr:0:tag:']",
        'radio_btn_电气': "//*[@id='MC_TC__ctl3_ctl00__247_img']",
        'radio_btn_机械': "//*[@id='MC_TC__ctl3_ctl00__248_img']",
        'radio_value_电气': "//*[@id='MC_TC__ctl3_ctl00__247']",
        'radio_value_机械': "//*[@id='MC_TC__ctl3_ctl00__248']",

    },
    '隔离措施': {
        'TAB_btn': "//td[@tabid='MC_TC,5']",
        '隔离状态': {
            'combo_btn': "//*[@id='MC_TC__ctl5_ctl00__231']/div/table/tbody/tr/td[2]/img",
            'input_adr': '//*[@data-ig="x:1289034592.2:mkr:Input"]',
            '备用': "//*[@data-ig='x:1289034592.8:adr:0']",
            '不停电': "//*[@data-ig='x:1289034592.9:adr:1']",
            '断开': "//*[@data-ig='x:1289034592.10:adr:2']",
            '关': "//*[@data-ig='x:1289034592.11:adr:3']",
            '关闭、停电': "//*[@data-ig='x:1289034592.12:adr:4']",
            '合上': "//*[@data-ig='x:1289034592.13:adr:5']",
            '解除自动': "//*[@data-ig='x:1289034592.14:adr:6']",
            '开': "//*[@data-ig='x:1289034592.15:adr:7']",
            '停电': "//*[@data-ig='x:1289034592.16:adr:8']",
            '停运': "//*[@data-ig='x:1289034592.17:adr:9']",
            '停运断电': "//*[@data-ig='x:1289034592.18:adr:10']",
            '退出保护': "//*[@data-ig='x:1289034592.19:adr:11']",
            '退出监视': "//*[@data-ig='x:1289034592.20:adr:12']",
            '退出联锁': "//*[@data-ig='x:1289034592.21:adr:13']",
        },
        '安全标示': {
            'combo_btn': "//*[@id='MC_TC__ctl5_ctl00__234']/div/table/tbody/tr/td[2]/img",
            'input_adr': '//*[@data-ig="x:1814291616.2:mkr:Input"]',
            '禁止操作，有人工作': "//*[@data-ig='x:1814291616.8:adr:0']",
            '禁止合闸，有人工作': "//*[@data-ig='x:1814291616.9:adr:1']",
            '禁止攀登': "//*[@data-ig='x:1814291616.10:adr:2']",
            '由此上下': "//*[@data-ig='x:1814291616.11:adr:3']",
            '在此工作': "//*[@data-ig='x:1814291616.12:adr:4']",
            '止步，高压危险': "//*[@data-ig='x:1814291616.13:adr:5']",
        },
        '隔离切换操作': {
            'combo_btn': "//*[@id='MC_TC__ctl5_ctl00__216']/div/table/tbody/tr/td[2]/img",
            'input_adr': '',
            '记录陈述': "//*[@data-ig='x:1700213290.8:adr:0']",
            '隔离切换操作': "//*[@data-ig='x:1700213290.9:adr:1']",
        },
        '措施类别': {
            'combo_btn': "//*[@data-ig='x:2074329851.4:mkr:ButtonImage']",
            'input_adr': '',
            '热机票-1': "//*[@data-ig='x:2074329851.8:adr:0']",
            '热机票-2': "//*[@data-ig='x:2074329851.9:adr:1']",
        },
        '电厂编码': {'input_adr':"//*[@id='MC_TC__ctl5_ctl00__960']"},
        '措施内容': {'input_adr':"//*[@id='MC_TC__ctl5_ctl00__218']"},
        '措施表格': "//*[@data-ig='x:1317417514.18:mkr:rows:nw:1']",

    },
    '危险预控': {
        'TAB_btn': "//td[@tabid='MC_TC,6']",
        '危险辨识': {'input_adr':"//*[@id='MC_TC__ctl6_ctl00__371']"},
        '危险预控': {'input_adr':"//*[@id='MC_TC__ctl6_ctl00__5002']"},
        '预控表格': "//*[@data-ig = 'x:1317421711.16:mkr:rows:nw:1']"
    },
}
EMPLOYEE_INFO={
    '胡毅' :      ['80180258', '80180258'],
    '周军' :      ['80180266', '80180266'],
    '王志英' :    ['80181079', 'AC2564'],
    '梁春红' :    ['80182666', '80182666'],
    '云雯' :      ['82026854', '1'],
    '车璐' :      ['82043074', '1'],
    '范舒婷' :    ['82043072', '4'],

}

BTN = {
    '保存' : "//*[@id='ctl00xcphToolbarxuwtToolbar_Item_4_img']",
    '查找' : "//*[@id='ctl00xcphToolbarxuwtToolbar_Item_5_img']",
    '新建' : "//*[@id='ctl00xcphToolbarxuwtToolbar_Item_19_img']",
    '工单确认' : "//*[@id='MC_TC__ctl2_ctl00__964']",
    '工作票确认' : "//*[@id='MC_TC__ctl2_ctl00__5025']",
    '分项确认' : "//*[@id='MC_TC__ctl3_ctl00_Splitter_10007_4_1_2__1985']",
    '登录' : '//*[@name="btnLogin"]',
}
FORMDATA = {
    'USERNAME' : '//*[@name="tbUser"]',
    'PASSWORD' : '//*[@name="tbPassword"]',
}