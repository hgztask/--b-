const HttpUtil = {
    httpRequest: function (method, url, headers, resolve, reject) {
        let tempHraders = {
            "User-Agent": navigator.userAgent
        };
        if (headers !== null || headers !== undefined) {
            tempHraders = Object.assign({}, tempHraders, headers)
        }
        Util.httpRequest({
            method: method,
            url: url,
            headers: tempHraders,
            onload: resolve,
            onerror: reject
        });
    },
    httpRequestPost: function (url, data, headers, resolve, reject) {
        let temp = {
            "Content-Type": "application/json"
        };
        if (headers !== null || headers !== undefined) {
            temp = headers;
        }
        Util.httpRequest({
            method: "POST",
            url: url,
            headers: temp,
            data: JSON.stringify(data),
            onload: resolve,
            onerror: reject
        });

    }, post: function (url, data, resolve, reject) {
        this.httpRequestPost(url, data, null, resolve, reject);
    },
    /**
     *封装get请求
     * @param {string}url 请求URL
     * @param {function}resolve 相应成功
     * @param {function}reject 相应失败
     */
    get: function (url, resolve, reject) {
        this.httpRequest("get", url, {
            "User-Agent": navigator.userAgent,
        }, resolve, reject);
    },
    /**
     *携带cookioie发起get请求
     * @param url
     * @param {string}cookie
     * @param resolve
     * @param reject
     */
    getCookie: function (url, cookie, resolve, reject) {
        this.httpRequest("get", url, {
            "User-Agent": navigator.userAgent,
            "cookie": cookie
        }, resolve, reject);
    },
    /**
     * 发送请求获取视频的基本信息
     * @param {string|number}bvOrAv
     * @param {function}resolve
     * @param {function}reject
     */
    getVideoInfo: function (bvOrAv, resolve, reject) {
        let url = "https://api.bilibili.com/x/player/pagelist?";
        if (bvOrAv + "".startsWith("BV")) {
            url = url + "bvid=" + bvOrAv;//需要带上BV号
        } else {
            url = url + "aid=" + bvOrAv;//不需要带上AV号
        }
        this.get(url, resolve, reject);
    },
    /**
     * 发送请求获取直播间基本信息
     * @param id 直播间房间号
     * @param resolve
     * @param reject
     */
    getLiveInfo: function (id, resolve, reject) {
        this.get("https://api.live.bilibili.com/room/v1/Room/get_info?room_id=" + id, resolve, reject);
    },
    /**
     * 获取用户关注的用户直播列表
     * @param cookie
     * @param page 页数，每页最多29个
     * @param resolve
     * @param reject
     */
    getUsersFollowTheLiveList: function (cookie, page, resolve, reject) {
        this.getCookie(`https://api.live.bilibili.com/xlive/web-ucenter/user/following?page=${page}&page_size=29`, cookie, resolve, reject);
    },
    /**
     * 获取指定分区下的用户直播列表
     * @param parent_id 父级分区
     * @param id 子级分区
     * @param page 页数
     * @param sort 排序-如综合或者最新，最新live_time 为空着综合
     */
    getLiveList: function (parent_id, id, page, sort, resolve, reject) {
        //https://api.live.bilibili.com/xlive/web-interface/v1/second/getList?platform=web&parent_area_id=3&area_id=0&sort_type=sort_type_121&page=3
        this.get(`https://api.live.bilibili.com/xlive/web-interface/v1/second/getList?platform=web&parent_area_id=${parent_id}&area_id=${id}&sort_type=${sort}&page=${page}`, resolve, reject);
    }
};