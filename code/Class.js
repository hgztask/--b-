/**
 * 用户基本信息
 */
class UserClass {
    upName;
    uid;
    upAddress;

    setUpName(upName) {
        this.upName = upName;
        return this;
    }

    setUpAddress(upAddress) {
        this.upAddress = upAddress;
        return this;
    }

    setUid(uid) {
        this.uid = uid;
        this.setUpAddress(`https://space.bilibili.com/${uid}`)
        return this;
    }
}

/**
 * 视频基本信息
 */
class VideoClass extends UserClass {
    title;
    bv;
    av;
    videoAddress;
    videoTime;
    playbackVolume;
    barrageQuantity;
    e;

    setTitle(title) {
        this.title = title;
        return this;
    }

    setBv(bv) {
        this.bv = bv;
        return this;
    }

    setAv(av) {
        this.av = av;
        return this;
    }

    setVideoAddress(videoAddress) {//设置视频地址
        this.videoAddress = videoAddress;
        return this;
    }

    setVideoTime(videoTime) {//设置时长
        this.videoTime = videoTime;
        return this;
    }

    //设置播放量
    setPlaybackVolume(playbackVolume) {
        this.playbackVolume = playbackVolume;
        return this;
    }

    setE(element) {//元素
        this.e = element;
        return this;
    }

    setBarrageQuantity(value) {//弹幕量
        this.barrageQuantity = value;
        return this;
    }

}


/**
 * 用户评论内容
 */
class ContentCLass extends UserClass {
    content;

    setContent(content) {
        this.content = content;
        return this;
    }
}
