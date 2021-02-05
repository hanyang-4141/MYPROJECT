GD = {
    '查询': {
        'input':{
            '编号': "//*[@id='MC_TC__ctl0_ctl00__5002']",
            '年份': "",
        },
        'btn':{

        }
    },
    '工单': {
        'input': {
            '优先级': "//*[@id='MC_TC__ctl0_ctl00__5002']",
            '维修类型': "",
            '机组': "//*[@data-ig='x:508519679.2:mkr:Input']",
            '专业': "//*[@data-ig='x:256421229.2:mkr:Input']",
            '机组类别':  "//*[@data-ig='x:508519685.2:mkr:Input']",
            '负责人':  "//*[@id='MC_TC__ctl2_ctl00__990']",
            '工作内容': "//*[@id='MC_TC__ctl2_ctl00__348']",
            '开始日期':  "//*[@id='MC_TC__ctl2_ctl00__972']",
            '开始时间': "//*[@id='MC_TC__ctl2_ctl00__872']",
            '结束日期':  "//*[@id='MC_TC__ctl2_ctl00__973']",
            '结束时间': "//*[@id='MC_TC__ctl2_ctl00__873']",
            '电厂编码': "//*[@id='MC_TC__ctl2_ctl00__960']",
        },
        'btn': {
            '确认': "",
        },
    },
    '工单分项': {
        'input': {

            '班组': "//*[@id='MC_TC__ctl3_ctl00_Splitter_10007_4_1_3__960']",
        },
        'btn': {
            '分项表格': "//*[@data-ig = 'x:914667624.17:adr:0:tag:']",
            '分项确认':'',
            '工作开始':'',
            '工作完成':'',

        }
    },
    '连接': {
        'input': {

                },
        'btn': {
            '工作票': "//*[@id='ctl00MCTCctl4ctl00Splitter100071111ctl00uwLinkTree_1_2_1_6']/span[3]",
            '打开工作票': "//*[@id='MC_TC__ctl4_ctl00_Splitter_10007_11_1_1_ctl01_uwPopMenu1n3']/td/table",
            '创建工作票': "//*[@id='MC_TC__ctl4_ctl00_Splitter_10007_11_1_1_ctl01_uwPopMenu1n0']/td/table/tbody/tr/td/a/div",
        }
    },
}
GZP = {
    '查询':{
        'input':{

        },
        'btn':{

        }
    },
    '工作票': {
        'input': {
            '工作票类型':  '//*[@data-ig="x:1822111954.2:mkr:Input"]',
            '专业':  '//*[@data-ig="x:495527167.2:mkr:Input"]',
            '机组':  '//*[@data-ig="x:260479746.2:mkr:Input"]',
            '总人数':  "//*[@id='MC_TC__ctl2_ctl00__156']",
            '负责人': "//*[@id='MC_TC__ctl2_ctl00__112']",
            '班组成员':"//*[@id='MC_TC__ctl2_ctl00__153']",
            '工作内容及地点':  "//*[@id='MC_TC__ctl2_ctl00__120']",
        },
        'btn': {
            '确认':''
        }
    },
    '电厂编码': {
        'input': {
            '隔离': '',
                },
        'btn': {
            '编码表格': "//*[@data-ig = 'x:1317427084.17:adr:0:tag:']",
            'radio_btn_电气': "//*[@id='MC_TC__ctl3_ctl00__247_img']",
            'radio_btn_机械': "//*[@id='MC_TC__ctl3_ctl00__248_img']",
            'radio_value_电气': "//*[@id='MC_TC__ctl3_ctl00__247']",
            'radio_value_机械': "//*[@id='MC_TC__ctl3_ctl00__248']",
        }
    },
    "连接":{
        'input':{

        },
        'btn':{

        }

    },
    '隔离措施': {
        'input': {
            '隔离状态':'//*[@data-ig="x:1289034592.2:mkr:Input"]',
            '安全标示': '//*[@data-ig="x:1814291616.2:mkr:Input"]',
            '隔离切换操作': '',
            '措施类别': "",
            '电厂编码': {'input_adr':"//*[@id='MC_TC__ctl5_ctl00__960']"},
            '措施内容': {'input_adr':"//*[@id='MC_TC__ctl5_ctl00__218']"},

        },
        'btn': {
            '措施表格': "//*[@data-ig='x:1317417514.18:mkr:rows:nw:1']",
        }
    },
    '预控措施': {
        'input': {
            '危险辨识': {'input_adr':"//*[@id='MC_TC__ctl6_ctl00__371']"},
            '预控措施': {'input_adr':"//*[@id='MC_TC__ctl6_ctl00__5002']"},
        },
        'btn': {
            '预控表格': "//*[@data-ig = 'x:1317421711.16:mkr:rows:nw:1']"
        }
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
ZZ = {
    '电厂编码':{
        'input':{
            '编码': "//*[@id='MC_TC__ctl2_ctl00__951']",
            '分类': "//*[@id='MC_TC__ctl2_ctl00__299']",
            '名称': "//*[@id='MC_TC__ctl2_ctl00__310']",
            '负责人':"//*[@id='MC_TC__ctl2_ctl00__202']",
            '维修策略': "//*[@data-ig='x:683060589.2:mkr:Input']",
            '质量等级': "//*[@data-ig='x:277041052.2:mkr:Input']",
            '安全等级': "//*[@data-ig='x:914600036.2:mkr:Input']",
            '专业': "//*[@data-ig='x:1671379913.2:mkr:Input']",
            '机组': "//*[@data-ig='x:524368841.2:mkr:Input']",

        },
        'btn':{

        }
    }
}
TOOLBAR = {
    "新建":"//*[@id='ctl00xcphToolbarxuwtToolbar_Item_19_img']",
    "保存":"//*[@id='ctl00xcphToolbarxuwtToolbar_Item_4_img']",
    "搜索":"//*[@id='ctl00xcphToolbarxuwtToolbar_Item_5_img']",
    "清除":"//*[@id='ctl00xcphToolbarxuwtToolbar_Item_18_img']",
}
TABBAR ={
    "工单":{
        "查询":"//td[@tabid='MC_TC,0']",
        "工单":"//td[@tabid='MC_TC,2']",
        "工单分项": "//td[@tabid='MC_TC,3']",
        "连接": "//td[@tabid='MC_TC,4']",
    },
    "工作票": {
        "查询": "//td[@tabid='MC_TC,0']",
        "工作票": "//td[@tabid='MC_TC,2']",
        "电厂编码": "//td[@tabid='MC_TC,3']",
        "连接": "//td[@tabid='MC_TC,4']",
        "隔离措施": "//td[@tabid='MC_TC,5']",
        "危险域控": "//td[@tabid='MC_TC,6']",
    },
    '装置':{
        # "查询": "//td[@tabid='MC_TC,0']",
        "电厂编码": "//td[@tabid='MC_TC,2']",


    }
}