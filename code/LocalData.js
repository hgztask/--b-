const LocalData = {
    getSESSDATA: function () {
        const data = Util.getData("SESSDATA");
        if (data === undefined || data === null || data === "") {
            return null;
        }
        return "SESSDATA=" + data;
    },
    setSESSDATA: function (key) {
        Util.setData("SESSDATA", key);
    },
    getWebBili_jct: function () {
        const data = Util.getCookieList()["bili_jct"];
        if (data === undefined) {
            return null;
        }
        return data;
    },
    getBili_jct: function () {
        const data = Util.getData("bili_jct");
        if (data === undefined || data === null === "") {
            return null;
        }
        return data;
    },
    setBili_jct: function (key) {
        Util.setData("bili_jct", key);
    },
    temp: function (key) {
        const data = Util.getData(key);
        if (data === undefined || data === null) {
            return [];
        }
        return data;
    },
    getArrUID: function () {
        return this.temp("userUIDArr");
    },
    setArrUID: function (key) {
        Util.setData("userUIDArr", key);
    },
    getArrWhiteUID: function () {
        return this.temp("userWhiteUIDArr");
    },
    setArrWhiteUID: function (key) {
        Util.setData("userWhiteUIDArr", key);
    },
    getArrName: function () {
        return this.temp("userNameArr");
    },
    setArrName: function (key) {
        Util.setData("userNameArr", key);
    },
    getArrNameKey: function () {
        return this.temp("userNameKeyArr");
    },
    setArrNameKey: function (key) {
        Util.setData("userNameKeyArr", key);
    },
    getArrTitle: function () {
        return this.temp("titleKeyArr");
    },
    setArrTitle: function (key) {
        Util.setData("titleKeyArr", key);
    },
    getArrTitleKeyCanonical: function () {//标题黑名单模式(正则匹配)
        return this.temp("titleKeyCanonicalArr");
    },
    setArrTitleKeyCanonical: function (key) {//标题黑名单模式(正则匹配)
        Util.setData("titleKeyCanonicalArr", key);
    },
    getArrContentOnKeyCanonicalArr: function () {//获取评论关键词黑名单模式(正则匹配)
        return this.temp("contentOnKeyCanonicalArr");
    },
    getCommentOnKeyArr: function () {//获取评论关键词黑名单模式(模糊匹配)
        return this.temp("commentOnKeyArr");
    },
    setCommentOnKeyArr: function (data) {//设置评论关键词黑名单模式(模糊匹配)
        return Util.setData("commentOnKeyArr", data);
    },
    setArrContentOnKeyCanonicalArr: function (key) {//设置评论关键词黑名单模式(正则匹配)
        Util.setData("contentOnKeyCanonicalArr", key);
    },
    getDynamicArr: function () {//获取动态页屏蔽项目规则--模糊匹配
        return this.temp("dynamicArr");
    },
    setDynamicArr: function (key) {//设置动态页屏蔽项目规则-模糊匹配
        Util.setData("dynamicArr", key);
    },
    getDynamicCanonicalArr: function () {//获取动态页屏蔽项目规则--正则匹配
        return this.temp("dynamicCanonicalArr");
    },
    setDynamicCanonicalArr: function (key) {//设置动态页屏蔽项目规则-正则匹配
        Util.setData("dynamicCanonicalArr", key);
    },//粉丝牌
    getFanCardArr: function () {
        return this.temp("fanCardArr");
    },//粉丝牌
    setFanCardArr: function (key) {
        Util.setData("fanCardArr", key);
    },//专栏关键词内容黑名单模式(模糊匹配)
    getContentColumnKeyArr: function () {
        return this.temp("contentColumnKeyArr");
    },//专栏关键词内容黑名单模式(模糊匹配)
    setContentColumnKeyArr: function (key) {
        Util.setData("contentColumnKeyArr", key);
    },
    getVideo_zone: function () {
        const data = this.temp("video_zone");
        if (data === undefined || data === null) {
            return 1;
        }
        return parseInt(data);
    },
    setVideo_zone: function (key) {
        Util.setData("video_zone", key);
    },//获取已观看的视频数组
    getWatchedArr: function () {
        return this.temp("watchedArr");
    },//设置已观看的视频
    setWatchedArr: function (key) {
        Util.setData("watchedArr", key);
    },
    getHideVideoButtonCommentSections() {//是否隐藏视频底部评论区布局
        return Util.getData("isCommentArea") === true;
    },
    setHideVideoButtonCommentSections(key) {//是隐藏视频底部评论区布局
        Util.setData("isCommentArea", key === true);
    },
    setPrivacyMode: function (key) {
        Util.setData("isPrivacyMode", key === true);
    },
    getPrivacyMode: function () {//隐私模式
        return Util.getData("isPrivacyMode") === true;
    },
    setBWebNone(key) {//不可见模式
        Util.setData("isBWebNone", key === true);
    },
    getBWebNone() {//不可见模式
        return Util.getData("isBWebNone") === true;
    },
    getVideoInt: function (rule) {
        const data = Util.getData(rule);
        if (data === undefined || data === null) {
            return 0;
        }
        return parseInt(data);
    },
    video: {
        getFilterSMin: function () {//获取限制时长最小值
            return LocalData.getVideoInt("filterSMin");
        },
        getfilterSMax: function () {//获取时长最大值，为0则不生效
            return LocalData.getVideoInt("filterSMax");
        },
        getBroadcastMin: function () {//获取播放量最大值，为0则不生效
            return LocalData.getVideoInt("broadcastMin");
        },
        getBroadcastMax: function () {//获取播放量最大值，为0则不生效
            return LocalData.getVideoInt("broadcastMax");
        },
        getBarrageQuantityMin: function () {//获取弹幕量最小值，为0则不生效
            return LocalData.getVideoInt("barrageQuantityMin");
        },
        getBarrageQuantityMax: function () {//设置弹幕量最大值，为0则不生效
            return LocalData.getVideoInt("barrageQuantityMax");
        },
        getHideVideoRightLayout() {//是否隐藏视频右侧布局
            return Util.getData("isHideVideoRightLayout") === true;
        },
        setHideVideoRightLayout(key) {//是否隐藏视频右侧布局
            Util.setData("isHideVideoRightLayout", key === true);
        },
        getHideVideoTopTitleInfoLayout() {
            return Util.getData("isHideVideoTopTitleInfoLayout") === true;
        },
        setHideVideoTopTitleInfoLayout(key) {
            Util.setData("isHideVideoTopTitleInfoLayout", key === true);
        },
    },
    AccountCenter: {
        getInfo: function () {//读取本地账户信息
            const data = Util.getData("AccountCenterInfo");
            if (data === undefined || data === null) {
                return {};
            }
            return data;
        }, setInfo: function (key) {//设置本地账户信息
            Util.setData("AccountCenterInfo", key);
        }
    },
    getIsMainVideoList: function () {//获取是否使用脚本自带的针对于首页的处理效果状态值
        const data = Util.getData("isMainVideoList");
        if (data === null) {
            return false;
        }
        return Util.isBoolean(data);

    },
    setIsMainVideoList: function (bool) {//设置是否使用脚本自带的针对于首页的处理效果状态值
        Util.setData("isMainVideoList", Util.isBoolean(bool));
    },
}