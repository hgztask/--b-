const VideoPlayVue = {
    returnVue() {
        const vue = new Vue({
            el: "#rightLayout",
            data: {
                isHideButtonLayoutButText: this.showHideButtonLayoutButText(),
                subItemButShow: true,
                subItemButText: "收起",
            },
            methods: {
                subItemShowBut() {
                    this.subItemButShow = !this.subItemButShow;
                },
                //TODO 发现bug，不知为什么获取失败，vue之后的事
                addUid() {
                    debugger;
                    const userList = DefVideo.getCreativeTeam();
                    if (userList.length === 0) {
                        alert("获取失败！");
                        return;
                    }
                    if (userList.length === 1) {
                        const data = userList[0];
                        const name = data["name"];
                        const uid = data["uid"];
                        if (!confirm(`是要屏蔽用户【${name}】吗？屏蔽方式为uid=${uid}`)) {
                            return;
                        }
                        UrleCrud.addShow("userUIDArr", "用户uid黑名单模式(精确匹配)", uid);
                        return;
                    }
                    alert("暂不支持屏蔽多作者方式.");
                },
                getTheVideoBarrage() {
                    const windowUrl = Util.getWindowUrl();
                    if (!windowUrl.includes("www.bilibili.com/video")) {
                        alert("当前不是播放页!");
                        return;
                    }
                    const urlBVID = Util.getUrlBVID(windowUrl);
                    if (urlBVID === null) {
                        alert("获取不到BV号!");
                        return;
                    }
                    if (!confirm(`当前视频BV号是 ${urlBVID} 吗`)) {
                        return;
                    }
                    const loading = Qmsg.loading("正在获取数据中!");
                    HttpUtil.getVideoInfo(urlBVID, (res) => {
                        const body = JSON.parse(res.responseText);
                        const code = body["code"];
                        const message = body["message"];
                        if (code !== 0) {
                            Qmsg.error("获取失败!" + message);
                            loading.close();
                            return;
                        }
                        let data;
                        try {
                            data = body["data"][0];
                        } catch (e) {
                            Qmsg.error("获取数据失败!" + e);
                            loading.close();
                            return;
                        }
                        if (data === null || data === undefined) {
                            Qmsg.error("获取到的数据为空的!");
                            loading.close();
                            return;
                        }
                        loading.close();
                        const cid = data["cid"];
                        Qmsg.success("cid=" + cid);
                        Util.openWindow(`https://comment.bilibili.com/${cid}.xml`);
                    }, (err) => {
                        loading.close();
                        Qmsg.error("错误状态!");
                        Qmsg.error(err);
                    });
                },
                getTheVideoAVNumber() {
                    const urlId = Util.getUrlBVID(Util.getWindowUrl());
                    if (urlId === null) {
                        alert("获取不到BV号!");
                        return;
                    }
                    if (!confirm(`当前视频BV号是 ${urlId} 吗`)) {
                        return;
                    }
                    alert(Util.BilibiliEncoder.dec(urlId));
                },
                getVideoCommentArea() {//获取视频的评论区列表可见的内容
                    const list = document.querySelectorAll(".reply-list>.reply-item");
                    if (list.length === 0) {
                        Qmsg.error("未获取评论区内容，可能是当前并未有人评论！");
                        return;
                    }
                    const arr = [];
                    for (let v of list) {
                        const rootName = v.querySelector(".user-name").textContent;
                        const rootUid = v.querySelector(".user-name").getAttribute("data-user-id");
                        const rootContent = v.querySelector(".root-reply .reply-content").textContent;
                        const subList = v.querySelectorAll(".sub-reply-list>.sub-reply-item");
                        const data = {
                            name: rootName, uid: parseInt(rootUid), content: rootContent,
                        };
                        if (subList.length === 0) {
                            arr.push(data);
                            continue;
                        }
                        const subArr = [];
                        for (let j of subList) {
                            const subName = j.querySelector(".sub-user-name").textContent;
                            const subUid = j.querySelector(".sub-user-name").getAttribute("data-user-id");
                            const subContent = j.querySelector(".reply-content").textContent;
                            const subData = {
                                name: subName, uid: parseInt(subUid), content: subContent
                            };
                            subArr.push(subData);
                        }
                        data["sub"] = subArr;
                        arr.push(data);
                    }
                    Util.fileDownload(JSON.stringify(arr, null, 3), `评论区列表-${Util.toTimeString()}.json`);
                    Qmsg.success("已获取成功！");
                },
                getLeftTopVideoListBut() {
                    const videoCollection = DefVideo.videoCollection;
                    if (!videoCollection.isMulti_page()) {
                        alert("并未有视频选集列表！");
                        return;
                    }
                    let dataList;
                    if (videoCollection.isList()) {
                        dataList = videoCollection.getVideoList();
                    } else {
                        dataList = videoCollection.getVIdeoGridList();
                    }
                    Util.fileDownload(JSON.stringify(dataList, null, 3), `${DefVideo.getVIdeoTitle()}的视频选集列表(${dataList.length})个.json`);

                },
                localGetVideoInfo() {
                    const upInfo = document.querySelector(".up-name");
                    let data;
                    try {
                        data = {
                            upName: upInfo.textContent.trim(),
                            uid: parseInt(Util.getSubWebUrlUid(upInfo.href)),
                            title: document.querySelector(".video-title").textContent,
                            bv: Util.getSubWebUrlBV(Util.getWindowUrl())
                        };
                    } catch (e) {
                        console.error("获取视频信息出现错误！", e);
                        return null;
                    }
                    return data;
                },
                //TODO 发现bug，不知为什么获取失败，vue之后的事
                addLefToWatchedBut() {
                    Watched.addWatched(this.localGetVideoInfo())
                },
                //TODO 发现bug，不知为什么获取失败，vue之后的事
                addLefToLookAtItLaterListBut() {
                    LookAtItLater.addLookAtItLater(this.localGetVideoInfo())
                },
                isHideButtonLayoutBut() {//隐藏评论区
                    const e = $("#comment");
                    if (e.is(":hidden")) {
                        e.show();
                        this.isHideButtonLayoutButText = "隐藏评论区";
                        return;
                    }
                    e.hide();
                    this.isHideButtonLayoutButText = "显示评论区";
                }


            },
            watch: {
                subItemButShow(newval) {
                    if (newval) {
                        this.subItemButText = "收起";
                    } else {
                        this.subItemButText = "展开";
                    }
                }
            }
        });
        return function () {
            return vue;
        }
    },
    showHideButtonLayoutButText() {
        if (LocalData.getHideVideoButtonCommentSections()) {
            return "显示评论区";
        }
        return "隐藏评论区";
    }

}