/**
 * @file lunar-calendar.js
 * @author cyan
 * @description A JavaScript library for converting between solar and lunar calendars, based on the LunarCore Objective-C code.
 * @version 1.0.0
 */

const LunarCalendar = {

    // --- Configuration ---
    minYear: 1890,
    maxYear: 2100,
    weekStart: 0, // 0 for Sunday, 1 for Monday, etc.

    // --- Core Data ---

    // Lunar calendar data from 1890 to 2100
    // Format: [leapMonth, solarMonthOfFirstDay, solarDayOfFirstDay, encodedMonthDays]
    lunarInfo: [
        [2,1,21,22184],[0,2,9,21936],[6,1,30,9656],[0,2,17,9584],[0,2,6,21168],[5,1,26,43344],[0,2,13,59728],[0,2,2,27296],[3,1,22,44368],[0,2,10,43856],[8,1,30,19304],[0,2,19,19168],[0,2,8,42352],[5,1,29,21096],[0,2,16,53856],[0,2,4,55632],[4,1,25,27304],[0,2,13,22176],[0,2,2,39632],[2,1,22,19176],[0,2,10,19168],[6,1,30,42200],[0,2,18,42192],[0,2,6,53840],[5,1,26,54568],[0,2,14,46400],[0,2,3,54944],[2,1,23,38608],[0,2,11,38320],[7,2,1,18872],[0,2,20,18800],[0,2,8,42160],[5,1,28,45656],[0,2,16,27216],[0,2,5,27968],[4,1,24,44456],[0,2,13,11104],[0,2,2,38256],[2,1,23,18808],[0,2,10,18800],[6,1,30,25776],[0,2,17,54432],[0,2,6,59984],[5,1,26,27976],[0,2,14,23248],[0,2,4,11104],[3,1,24,37744],[0,2,11,37600],[7,1,31,51560],[0,2,19,51536],[0,2,8,54432],[6,1,27,55888],[0,2,15,46416],[0,2,5,22176],[4,1,25,43736],[0,2,13,9680],[0,2,2,37584],[2,1,22,51544],[0,2,10,43344],[7,1,29,46248],[0,2,17,27808],[0,2,6,46416],[5,1,27,21928],[0,2,14,19872],[0,2,3,42416],[3,1,24,21176],[0,2,12,21168],[8,1,31,43344],[0,2,18,59728],[0,2,8,27296],[6,1,28,44368],[0,2,15,43856],[0,2,5,19296],[4,1,25,42352],[0,2,13,42352],[0,2,2,21088],[3,1,21,59696],[0,2,9,55632],[7,1,30,23208],[0,2,17,22176],[0,2,6,38608],[5,1,27,19176],[0,2,15,19152],[0,2,3,42192],[4,1,23,53864],[0,2,11,53840],[8,1,31,54568],[0,2,18,46400],[0,2,7,46752],[6,1,28,38608],[0,2,16,38320],[0,2,5,18864],[4,1,25,42168],[0,2,13,42160],[10,2,2,45656],[0,2,20,27216],[0,2,9,27968],[6,1,29,44448],[0,2,17,43872],[0,2,6,38256],[5,1,27,18808],[0,2,15,18800],[0,2,4,25776],[3,1,23,27216],[0,2,10,59984],[8,1,31,27432],[0,2,19,23232],[0,2,7,43872],[5,1,28,37736],[0,2,16,37600],[0,2,5,51552],[4,1,24,54440],[0,2,12,54432],[0,2,1,55888],[2,1,22,23208],[0,2,9,22176],[7,1,29,43736],[0,2,18,9680],[0,2,7,37584],[5,1,26,51544],[0,2,14,43344],[0,2,3,46240],[4,1,23,46416],[0,2,10,44368],[9,1,31,21928],[0,2,19,19360],[0,2,8,42416],[6,1,28,21176],[0,2,16,21168],[0,2,5,43312],[4,1,25,29864],[0,2,12,27296],[0,2,1,44368],[2,1,22,19880],[0,2,9,59728],[6,1,29,25480],[0,2,17,25472],[0,2,6,43344],[5,1,26,55888],[0,2,14,46400],[0,2,2,54944],[3,1,23,38608],[0,2,11,38320],[8,2,1,18872],[0,2,20,18800],[0,2,8,42160],[5,1,28,45656],[0,2,16,27216],[0,2,4,27968],[4,1,24,44456],[0,2,12,11104],[0,2,2,38256],[2,1,22,18808],[0,2,10,18800],[6,1,30,25776],[0,2,17,54432],[0,2,6,59984],[5,1,26,27976],[0,2,14,23248],[0,2,3,11104],[3,1,24,37744],[0,2,11,37600],[7,1,31,51560],[0,2,19,51536],[0,2,8,54432],[6,1,27,55888],[0,2,15,46416],[0,2,5,22176],[4,1,25,43736],[0,2,13,9680],[0,2,2,37584],[2,1,22,51544],[0,2,10,43344],[7,1,29,46248],[0,2,17,27808],[0,2,6,46416],[5,1,27,21928],[0,2,14,19872],[0,2,3,42416],[3,1,24,21176],[0,2,12,21168],[8,1,31,43344],[0,2,18,59728],[0,2,8,27296],[6,1,28,44368],[0,2,15,43856],[0,2,5,19296],[4,1,25,42352],[0,2,13,42352],[0,2,2,21088],[3,1,21,59696],[0,2,9,55632],[7,1,30,23208],[0,2,17,22176],[0,2,6,38608],[5,1,27,19176],[0,2,15,19152],[0,2,3,42192],[4,1,23,53864],[0,2,11,53840],[8,1,31,54568],[0,2,18,46400],[0,2,7,46752],[6,1,28,38608],[0,2,16,38320],[0,2,5,18864],[4,1,25,42168],[0,2,13,42160],[10,2,2,45656],[0,2,20,27216],[0,2,9,27968],[6,1,29,44448],[0,2,17,43872],[0,2,6,38256],[5,1,27,18808],[0,2,15,18800],[0,2,4,25776],[3,1,23,27216],[0,2,10,59984],[8,1,31,27432],[0,2,19,23232],[0,2,7,43872],[5,1,28,37736],[0,2,16,37600],[0,2,5,51552],[4,1,24,54440],[0,2,12,54432],[0,2,1,55888],[2,1,22,23208],[0,2,9,22176],[7,1,29,43736],[0,2,18,9680],[0,2,7,37584],[5,1,26,51544],[0,2,14,43344],[0,2,3,46240],[4,1,23,46416],[0,2,10,44368],[9,1,31,21928],[0,2,19,19360],[0,2,8,42416],[6,1,28,21176],[0,2,16,21168],[0,2,5,43312],[4,1,25,29864],[0,2,12,27296],[0,2,1,44368],[2,1,22,19880]
    ],

    // Solar new year dates
    springFestival: [
        [1,21],[2,9],[1,30],[2,17],[2,6],[1,26],[2,14],[2,2],[1,22],[2,10],[1,31],[2,19],[2,8],[1,29],[2,16],[2,4],[1,25],[2,13],[2,2],[1,22],[2,10],[1,30],[2,18],[2,6],[1,26],[2,14],[2,4],[1,23],[2,11],[2,1],[2,20],[2,8],[1,28],[2,16],[2,5],[1,24],[2,13],[2,2],[1,23],[2,10],[1,30],[2,17],[2,6],[1,26],[2,14],[2,4],[1,24],[2,11],[1,31],[2,19],[2,8],[1,27],[2,15],[2,5],[1,25],[2,13],[2,2],[1,22],[2,10],[1,29],[2,17],[2,6],[1,27],[2,14],[2,3],[1,24],[2,12],[1,31],[2,18],[2,8],[1,28],[2,15],[2,5],[1,25],[2,13],[2,2],[1,21],[2,9],[1,30],[2,17],[2,6],[1,27],[2,15],[2,3],[1,23],[2,11],[1,31],[2,18],[2,7],[1,28],[2,16],[2,5],[1,25],[2,13],[2,2],[2,20],[2,9],[1,29],[2,17],[2,6],[1,27],[2,15],[2,4],[1,23],[2,10],[1,31],[2,19],[2,7],[1,28],[2,16],[2,5],[1,24],[2,12],[2,1],[1,22],[2,9],[1,29],[2,18],[2,7],[1,26],[2,14],[2,3],[1,23],[2,10],[1,31],[2,19],[2,8],[1,28],[2,16],[2,5],[1,25],[2,12],[2,1],[1,22],[2,10],[1,29],[2,17],[2,6],[1,26],[2,13],[2,3],[1,23],[2,11],[1,31],[2,19],[2,8],[1,28],[2,15],[2,4],[1,24],[2,12],[2,1],[1,22],[2,10],[1,30],[2,17],[2,6],[1,26],[2,14],[2,2],[1,23],[2,11],[2,1],[2,19],[2,8],[1,28],[2,15],[2,4],[1,24],[2,12],[2,2],[1,21],[2,9],[1,29],[2,17],[2,5],[1,26],[2,14],[2,3],[1,23],[2,11],[1,31],[2,19],[2,7],[1,27],[2,15],[2,5],[1,24],[2,12],[2,2],[1,22],[2,9],[1,29],[2,17],[2,6],[1,26],[2,14],[2,3],[1,24],[2,10],[1,30],[2,18],[2,7],[1,27],[2,15],[2,5],[1,25],[2,12],[2,1],[1,21],[2,9]
    ],

    // Solar term data (minutes from start of year)
    termInfo: [0,21208,42467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758],

    // Chinese names and strings
    lunarCalendarData: {
        heavenlyStems: ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"],
        earthlyBranches: ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"],
        zodiac: ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"],
        solarTerm: ["小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"],
        monthCn: ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "腊"],
        dateCn: ["初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十", "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十", "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十", "卅一"]
    },

    // Work/holiday schedule
    worktime: {
        "y2013": {"d0101":2,"d0102":2,"d0103":2,"d0105":1,"d0106":1,"d0209":2,"d0210":2,"d0211":2,"d0212":2,"d0213":2,"d0214":2,"d0215":2,"d0216":1,"d0217":1,"d0404":2,"d0405":2,"d0406":2,"d0407":1,"d0427":1,"d0428":1,"d0429":2,"d0430":2,"d0501":2,"d0608":1,"d0609":1,"d0610":2,"d0611":2,"d0612":2,"d0919":2,"d0920":2,"d0921":2,"d0922":1,"d0929":1,"d1001":2,"d1002":2,"d1003":2,"d1004":2,"d1005":2,"d1006":2,"d1007":2,"d1012":1},
        "y2014": {"d0101":2,"d0126":1,"d0131":2,"d0201":2,"d0202":2,"d0203":2,"d0204":2,"d0205":2,"d0206":2,"d0208":1,"d0405":2,"d0407":2,"d0501":2,"d0502":2,"d0503":2,"d0504":1,"d0602":2,"d0908":2,"d0928":1,"d1001":2,"d1002":2,"d1003":2,"d1004":2,"d1005":2,"d1006":2,"d1007":2,"d1011":1},
        "y2015": {"d0101":2,"d0102":2,"d0103":2,"d0104":1,"d0215":1,"d0218":2,"d0219":2,"d0220":2,"d0221":2,"d0222":2,"d0223":2,"d0224":2,"d0228":1,"d0404":2,"d0405":2,"d0406":2,"d0501":2,"d0502":2,"d0503":2,"d0620":2,"d0621":2,"d0622":2,"d0903":2,"d0904":2,"d0905":2,"d0906":1,"d0926":2,"d0927":2,"d1001":2,"d1002":2,"d1003":2,"d1004":2,"d1005":2,"d1006":2,"d1007":2,"d1010":1},
        "y2016": {"d0101":2,"d0102":2,"d0103":2,"d0206":1,"d0207":2,"d0208":2,"d0209":2,"d0210":2,"d0211":2,"d0212":2,"d0213":2,"d0214":1,"d0402":2,"d0403":2,"d0404":2,"d0430":2,"d0501":2,"d0502":2,"d0609":2,"d0610":2,"d0611":2,"d0612":1,"d0915":2,"d0916":2,"d0917":2,"d0918":1,"d1001":2,"d1002":2,"d1003":2,"d1004":2,"d1005":2,"d1006":2,"d1007":2,"d1008":1,"d1009":1}
    },

    // Solar festivals
    solarFestival: {
        "d0101":"元旦节", "d0120":"水瓶", "d0202":"湿地日-世界湿地日", "d0210":"*国际气象节", "d0214":"情人节", "d0219":"双鱼", "d0301":"*国际海豹日", "d0303":"*全国爱耳日", "d0305":"学雷锋-学雷锋纪念日", "d0308":"妇女节", "d0312":"植树节 孙中山逝世纪念日", "d0314":"*国际警察日", "d0315":"消费者-消费者权益日", "d0317":"*中国国医节 国际航海日", "d0321":"白羊 世界森林日 消除种族歧视国际日 世界儿歌日", "d0322":"*世界水日", "d0323":"*世界气象日", "d0324":"*世界防治结核病日", "d0325":"*全国中小学生安全教育日", "d0330":"*巴勒斯坦国土日", "d0401":"愚人节 全国爱国卫生运动月 税收宣传月", "d0407":"*世界卫生日", "d0420":"金牛", "d0422":"地球日-世界地球日", "d0423":"*世界图书和版权日", "d0424":"*亚非新闻工作者日", "d0501":"劳动节", "d0504":"青年节", "d0505":"*碘缺乏病防治日", "d0508":"*世界红十字日", "d0512":"护士节-国际护士节", "d0515":"*国际家庭日", "d0517":"*世界电信日", "d0518":"博物馆-国际博物馆日", "d0520":"*全国学生营养日", "d0521":"双子", "d0522":"*国际生物多样性日", "d0531":"*世界无烟日", "d0601":"儿童节-国际儿童节", "d0605":"环境日-世界环境日", "d0606":"*全国爱眼日", "d0617":"*防治荒漠化和干旱日", "d0622":"巨蟹", "d0623":"奥林匹克-国际奥林匹克日", "d0625":"*全国土地日", "d0626":"*国际禁毒日", "d0701":"建党节 香港回归纪念日 中共诞辰 世界建筑日", "d0702":"*国际体育记者日", "d0707":"*抗日战争纪念日", "d0711":"*世界人口日", "d0723":"狮子", "d0730":"*非洲妇女日", "d0801":"建军节", "d0808":"*中国男子节(爸爸节)", "d0823":"处女", "d0903":"抗日战争-抗日战争胜利纪念", "d0908":"*国际扫盲日 国际新闻工作者日", "d0909":"*毛泽东逝世纪念", "d0910":"教师节-中国教师节", "d0914":"*世界清洁地球日", "d0916":"*国际臭氧层保护日", "d0918":"*九一八事变纪念日", "d0920":"*国际爱牙日", "d0923":"天秤", "d0927":"*世界旅游日", "d0928":"*孔子诞辰", "d1001":"国庆节 世界音乐日 国际老人节", "d1002":"*国际和平与民主自由斗争日", "d1004":"*世界动物日", "d1006":"*老人节", "d1008":"*全国高血压日", "d1009":"*世界邮政日 万国邮联日", "d1010":"*辛亥革命纪念日 世界精神卫生日", "d1013":"*世界保健日 国际教师节", "d1014":"*世界标准日", "d1015":"*国际盲人节(白手杖节)", "d1016":"*世界粮食日", "d1017":"*世界消除贫困日", "d1022":"*世界传统医药日", "d1024":"天蝎 联合国日 世界发展信息日", "d1031":"万圣节 世界勤俭日", "d1107":"*十月社会主义革命纪念日", "d1108":"*中国记者日", "d1109":"*全国消防安全宣传教育日", "d1110":"*世界青年节", "d1111":"光棍节 国际科学与和平周(本日所属的一周)", "d1112":"*孙中山诞辰纪念日", "d1114":"*世界糖尿病日", "d1117":"*国际大学生节 世界学生节", "d1121":"*世界问候日 世界电视日", "d1123":"射手", "d1129":"*国际声援巴勒斯坦人民国际日", "d1201":"艾滋病-世界艾滋病日", "d1203":"*世界残疾人日", "d1205":"*国际经济和社会发展志愿人员日", "d1208":"*国际儿童电视日", "d1209":"*世界足球日", "d1210":"*世界人权日", "d1212":"*西安事变纪念日", "d1213":"*南京大屠杀(1937年)纪念日！紧记血泪史！", "d1220":"*澳门回归纪念", "d1221":"*国际篮球日", "d1222":"摩羯", "d1224":"平安夜", "d1225":"圣诞节", "d1226":"*毛泽东诞辰纪念"
    },

    // Lunar festivals
    lunarFestival: {
        "d0101":"春节", "d0115":"元宵节", "d0202":"龙抬头节", "d0505":"端午节", "d0707":"七夕节", "d0715":"中元节", "d0815":"中秋节", "d0909":"重阳节", "d1001":"寒衣节", "d1015":"下元节", "d1208":"腊八节", "d1223":"小年", "d0100":"除夕"
    },

    // Week-based festivals
    weekFestival: {
        "0513":"*世界哮喘日", "0521":"母亲节-国际母亲节 救助贫困母亲日", "0531":"*全国助残日", "0533":"*国际牛奶日", "0627":"*中国文化遗产日", "0631":"父亲节", "0717":"*国际合作节", "0731":"*被奴役国家周", "0933":"*国际和平日", "0937":"*全民国防教育日", "0941":"*国际聋人节 世界儿童日", "0951":"*世界海事日 世界心脏病日", "1012":"*国际住房日 世界建筑日 世界人居日", "1024":"*国际减灾日", "1025":"*世界视觉日", "1145":"感恩节", "1221":"*国际儿童电视广播日"
    },

    solarDaysOfMonth: [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],

    // --- Caching ---
    _cache: {},
    _currentYear: -1,
    
    _clearCache: function() {
        this._cache = {};
    },
    
    _setCache: function(key, value) {
        this._cache[key] = value;
    },
    
    _getCache: function(key) {
        return this._cache[key];
    },
    
    _updateCurrentYear: function(year) {
        if (this._currentYear !== year) {
            this._currentYear = year;
            this._clearCache();
        }
    },

    // --- Helper Functions ---

    _$: (text) => text || "",

    _formatDay: (month, day) => `d${(month + 1).toString().padStart(2, '0')}${day.toString().padStart(2, '0')}`,

    _getLunarLeapYear: function(year) {
        const yearData = this.lunarInfo[year - this.minYear];
        return yearData ? yearData[0] : 0;
    },

    _getLunarYearDays: function(year) {
        const yearData = this.lunarInfo[year - this.minYear];
        if (!yearData) return { yearDays: 0, monthDays: [] };

        const leapMonth = yearData[0];
        const monthData = yearData[3];
        
        let monthDataArr = [];
        let num = monthData;
        while(num > 0) {
            monthDataArr.unshift(num & 1);
            num >>= 1;
        }
        
        // Pad to 16 bits
        while(monthDataArr.length < 16) {
            monthDataArr.unshift(0);
        }

        const len = leapMonth ? 13 : 12;
        let yearDays = 0;
        const monthDays = [];

        for (let i = 0; i < len; ++i) {
            const days = (monthDataArr[i] === 0) ? 29 : 30;
            yearDays += days;
            monthDays.push(days);
        }

        return { yearDays, monthDays };
    },

    _getLunarDateByBetween: function(year, between) {
        const { yearDays, monthDays } = this._getLunarYearDays(year);
        const end = between > 0 ? between : yearDays + between;
        
        let tempDays = 0;
        let month = 0;
        for (let i = 0; i < monthDays.length; ++i) {
            const currentMonthDays = monthDays[i];
            tempDays += currentMonthDays;
            if (tempDays > end) {
                month = i;
                tempDays -= currentMonthDays;
                break;
            }
        }
        return [year, month, end - tempDays + 1];
    },

    _getDaysBetweenSolar: function(year, month, day, year1, month1, day1) {
        const date1 = Date.UTC(year, month, day);
        const date2 = Date.UTC(year1, month1, day1);
        return (date2 - date1) / 86400000;
    },

    _getLunarByBetween: function(year, month, day) {
        const yearData = this.lunarInfo[year - this.minYear];
        const zenMonth = yearData[1];
        const zenDay = yearData[2];
        const between = this._getDaysBetweenSolar(year, zenMonth - 1, zenDay, year, month, day);

        if (between === 0) {
            return [year, 0, 1];
        } else {
            const lunarYear = (between > 0) ? year : (year - 1);
            return this._getLunarDateByBetween(lunarYear, between);
        }
    },

    _getTerm: function(y, n) {
        const sec = Date.UTC(1890, 0, 5, 16, 2, 31);
        const termMillis = (31556925974.7 * (y - 1890)) + (this.termInfo[n] * 60000.0);
        const date = new Date(sec + termMillis);
        return date.getUTCDate();
    },

    _getYearTerm: function(year) {
        const res = {};
        let month = 0;
        const solarTerm = this.lunarCalendarData.solarTerm;
        for (let i = 0; i < 24; ++i) {
            const day = this._getTerm(year, i);
            if ((i & 1) === 0) {
                month++;
            }
            const key = this._formatDay(month - 1, day);
            res[key] = solarTerm[i];
        }
        return res;
    },

    _getYearZodiac: function(year) {
        const num = year - 1890 + 25;
        return this.lunarCalendarData.zodiac[num % 12];
    },

    _cyclical: function(num) {
        const tiangan = this.lunarCalendarData.heavenlyStems[num % 10];
        const dizhi = this.lunarCalendarData.earthlyBranches[num % 12];
        return `${tiangan}${dizhi}`;
    },

    _getLunarYearName: function(year, offset = 0) {
        return this._cyclical(year - 1890 + 25 + offset);
    },

    _isLeapYear: function(year) {
        return ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0));
    },

    _getSolarMonthDays: function(year, month) {
        if (month === 1) { // February
            return this._isLeapYear(year) ? 29 : 28;
        } else {
            return this.solarDaysOfMonth[month];
        }
    },

    _formatDate: function(year, month, day) {
        const now = new Date();
        let _year = year;
        let _month = month - 1;
        let _day = (day > 0) ? day : now.getDate();

        if (year < this.minYear || year > this.maxYear) {
            return { error: 100, msg: `Year must be between ${this.minYear} and ${this.maxYear}` };
        }
        return { year: _year, month: _month, day: _day };
    },

    _isNewLunarYear: function(_year, _month, _day) {
        const springFestivalDate = this.springFestival[_year - this.minYear];
        const springFestivalMonth = springFestivalDate[0];
        const springFestivalDay = springFestivalDate[1];

        if (_month + 1 > springFestivalMonth) {
            return true;
        } else if (_month + 1 === springFestivalMonth) {
            return (_day >= springFestivalDay);
        } else {
            return false;
        }
    },
    
    _getWeekFestival: function(year, month, day) {
        const date = new Date(year, month - 1, day);
        const weekDay = date.getDay(); // 0=Sun, 1=Mon...
        
        let weekDayCount = 0;
        for (let curDay = 1; curDay <= day; ++curDay) {
            const curDate = new Date(year, month - 1, curDay);
            if (curDate.getDay() === weekDay) {
                weekDayCount++;
            }
        }
        
        const key = `${month.toString().padStart(2, '0')}${weekDayCount}${weekDay + 1}`; // Original logic seems to use 1-based weekday
        return this.weekFestival[key] || null;
    },

    // --- Main Conversion Function ---

    solarToLunar: function(year, month, day) {
        const inputDate = this._formatDate(year, month, day);
        if (inputDate.error) {
            return inputDate;
        }

        const { year: y, month: m, day: d } = inputDate;
        
        this._updateCurrentYear(y);

        let termList = this._getCache('termList');
        if (!termList) {
            termList = this._getYearTerm(y);
            this._setCache('termList', termList);
        }

        const GanZhiYear = this._isNewLunarYear(y, m, d) ? (y + 1) : y;
        
        const lunarDate = this._getLunarByBetween(y, m, d);
        const [lunarY, lunarM, lunarD] = lunarDate;

        const lunarLeapMonth = this._getLunarLeapYear(lunarY);
        let lunarMonthName;

        if (lunarLeapMonth > 0 && lunarLeapMonth === lunarM) {
            lunarMonthName = `闰${this.lunarCalendarData.monthCn[lunarM - 1]}月`;
        } else if (lunarLeapMonth > 0 && lunarM > lunarLeapMonth) {
            lunarMonthName = `${this.lunarCalendarData.monthCn[lunarM - 1]}月`;
        } else {
            lunarMonthName = `${this.lunarCalendarData.monthCn[lunarM]}月`;
        }

        let lunarFtv;
        const { monthDays } = this._getLunarYearDays(lunarY);
        if (lunarM === monthDays.length - 1 && lunarD === monthDays[monthDays.length - 1]) {
            lunarFtv = this.lunarFestival["d0100"]; // New Year's Eve
        } else {
            const keyMonth = (lunarLeapMonth > 0 && lunarM > lunarLeapMonth) ? lunarM - 1 : lunarM;
            const dateKey = this._formatDay(keyMonth, lunarD);
            lunarFtv = this.lunarFestival[dateKey];
        }

        const yearKey = `y${y}`;
        const dayKey = this._formatDay(m, d);
        let workTime = 0;
        if (this.worktime[yearKey] && this.worktime[yearKey][dayKey]) {
            workTime = this.worktime[yearKey][dayKey];
        }

        return {
            lunarDay: lunarD,
            lunarMonthName: this._$(lunarMonthName),
            lunarDayName: this._$(this.lunarCalendarData.dateCn[lunarD - 1]),
            solarFestival: this._$(this.solarFestival[dayKey]),
            lunarFestival: this._$(lunarFtv),
            weekFestival: this._$(this._getWeekFestival(y, m + 1, d)),
            worktime: workTime,
            GanZhiYear: this._$(this._getLunarYearName(GanZhiYear)),
            zodiac: this._$(this._getYearZodiac(GanZhiYear)),
            term: this._$(termList[dayKey])
        };
    },

    // --- Calendar Generation ---

    solarCalendar: function(year, month) {
        const inputDate = this._formatDate(year, month, -1);
        if (inputDate.error) {
            return inputDate;
        }

        const { year: y, month: m } = inputDate;
        const firstDate = new Date(y, m, 1);
        const firstDay = firstDate.getDay(); // 0=Sun, 1=Mon...
        const monthDays = this._getSolarMonthDays(y, m);

        let monthData = [];
        for (let i = 1; i <= monthDays; i++) {
            monthData.push({ year: y, month: m + 1, day: i });
        }

        // Pad previous month
        const moveDays = (firstDay >= this.weekStart) ? firstDay : (firstDay + 7);
        const preFillDays = moveDays - this.weekStart;
        const preYear = (m - 1 < 0) ? (y - 1) : y;
        const preMonth = (m - 1 < 0) ? 11 : (m - 1);
        const preMonthDays = this._getSolarMonthDays(preYear, preMonth);
        
        let preMonthData = [];
        for (let i = 0; i < preFillDays; i++) {
            preMonthData.push({
                year: preYear,
                month: preMonth + 1,
                day: preMonthDays - preFillDays + 1 + i
            });
        }

        // Pad next month
        const totalDays = preFillDays + monthDays;
        const fillLen = (totalDays % 7 === 0) ? 0 : (7 - (totalDays % 7));
        const nextYear = (m + 1 > 11) ? (y + 1) : y;
        const nextMonth = (m + 1 > 11) ? 0 : (m + 1);

        let nextMonthData = [];
        for (let i = 1; i <= fillLen; i++) {
            nextMonthData.push({ year: nextYear, month: nextMonth + 1, day: i });
        }
        
        // For a full 6x7 grid
        const finalGridLength = preMonthData.length + monthData.length + nextMonthData.length;
        if (finalGridLength < 42) {
             for (let i = 1; i <= 7; i++) {
                nextMonthData.push({ year: nextYear, month: nextMonth + 1, day: fillLen + i });
            }
        }


        const finalMonthData = [...preMonthData, ...monthData, ...nextMonthData];

        return {
            firstDay: firstDay,
            monthDays: monthDays,
            monthData: finalMonthData
        };
    },

    /**
     * The main public function to get calendar data for a specific month.
     * @param {number} year - The solar year (e.g., 2024).
     * @param {number} month - The solar month (1-12).
     * @returns {object} An object containing the full calendar data for the month.
     */
    calendar: function(year, month) {
        const inputDate = this._formatDate(year, month, -1);
        if (inputDate.error) {
            return inputDate;
        }

        const calendarData = this.solarCalendar(year, month);
        if (calendarData.error) {
            return calendarData;
        }

        for (let i = 0; i < calendarData.monthData.length; i++) {
            const dayData = calendarData.monthData[i];
            const lunarData = this.solarToLunar(dayData.year, dayData.month, dayData.day);
            Object.assign(dayData, lunarData);
        }

        return calendarData;
    }
};

// If used in a CommonJS environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LunarCalendar;
}
