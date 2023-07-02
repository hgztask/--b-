const Search = {
    video: {
        getVideoDataList() {
            const ENList = document.querySelectorAll(".video-list.row>*");
            const dataList = [];
            ENList.forEach(v => {
                const data = {};
                const info = v.querySelector(".bili-video-card__info--right");
                data["title"] = info.querySelector("h3").getAttribute("title").trim();
                const videoAddress = info.querySelector("a").getAttribute("href");
                data["videoAddress"] = videoAddress;
                const userInfo = info.querySelector(".bili-video-card__info--owner");
                const userAddress = userInfo.getAttribute("href");
                data["userAddress"] = userAddress;
                data["name"] = userInfo.querySelector(".bili-video-card__info--author").textContent;
                const tempDate = userInfo.querySelector(".bili-video-card__info--date").textContent;
                data["date"] = tempDate.substring(3);
                dataList.push(data);
            });
            return dataList;
        },
        getAllVideoDataList() {
            let dataList = [];
            return new Promise(resolve => {
                const interval = setInterval(() => {
                    const tempDataList = Search.video.getVideoDataList();
                    dataList = dataList.concat(tempDataList);
                    const nextPageBut = $(".vui_pagenation--btns>button:contains('下一页')");
                    if (nextPageBut.prop("disabled")) {
                        clearInterval(interval);
                        resolve(dataList);
                    }
                    nextPageBut.click();
                }, 2110);
            });
        }
    },
    upuser: {
        getKeyword() {//返回搜索页面中搜索关键词
            const match = Util.getWindowUrl().match(/keyword=([^&]+)/);
            if (match) {
                return decodeURIComponent(match[1]);
            } else {
                return null;
            }
        },
        getTabTheSelectedSort() {//排序
            const e = document.querySelector(".condition-row>.vui_button--active");
            return e == null ? "默认排序" : e.textContent;
        },
        getTwoTabTheSelectedSort() {//二级筛选
            return document.querySelector(".more-conditions.hide.ov_hidden>.condition-row>.vui_button--active").textContent;
        },
        getUserInfoList() {//获取搜索用户页面列表(当前页面可见)
            const elementNodeList = document.querySelectorAll(".media-list.row.mt_x40>*");
            const dataList = [];
            elementNodeList.forEach(v => {
                const data = {};
                const userInfo = v.querySelector("h2>a");
                data["name"] = userInfo.getAttribute("title");
                const address = userInfo.getAttribute("href");
                data["uid"] = parseInt(Util.getSubWebUrlUid(address));
                const lvSvgVar = v.querySelector("h2>.level-icon>use").getAttribute("xlink:href");
                data["lv"] = parseInt(lvSvgVar.replace("#lv_", ""));
                data["address"] = address;
                data["text_ellipsis"] = v.querySelector(".user-content>.text_ellipsis").getAttribute("title");
                dataList.push(data);
            });
            return dataList;
        }, getUserInfoAllList() {//获取搜索用户页面列表(当前页面全部可见)
            let dataList = [];
            return new Promise(resolve => {
                const interval = setInterval(() => {
                    const tempDataList = Search.upuser.getUserInfoList();
                    dataList = dataList.concat(tempDataList);
                    const nextPageBut = $(".vui_pagenation--btns>button:contains('下一页')");
                    if (nextPageBut.prop("disabled")) {
                        clearInterval(interval);
                        resolve(dataList);
                    }
                    nextPageBut.click();
                }, 2110);
            });
        }

    }
}