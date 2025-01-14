import Vue from 'vue'


const returnVue = () => {
    return new Vue({
        el: "#station_b_shield_donate",
        template: `<div>
          <div style="border: 3px solid #000;">
            <div style="display: flex;align-items: center;">
              <h2>零钱赞助</h2>
              <ul>
                <li>1元不嫌少，10元不嫌多哦！感谢支持！</li>
                <li>生活不易，作者叹息</li>
                <li>您的支持是我最大的更新动力</li>
              </ul>
            </div>
            <hr>
            <div style="display: flex;justify-content: center;">
              <div v-for="item in list" :title="item.name"><img :src="item.src" :alt="item.alt"
                                                                style="max-height: 500px;">
                <span style="display: flex;justify-content: center;">{{ item.name }}</span>
              </div>
            </div>
            <hr>
            <h1 style=" display: flex; justify-content: center;">打赏点猫粮</h1>
          </div>
        </div>`,
        data: {
            list: [
                {
                    name: "支付宝赞助",
                    alt: "支付宝支持",
                    src: "https://www.mikuchase.ltd/img/paymentCodeZFB.webp"
                },
                {name: "微信赞助", alt: "微信支持", src: "https://www.mikuchase.ltd/img/paymentCodeWX.webp"},
                {name: "QQ赞助", alt: "QQ支持", src: "https://www.mikuchase.ltd/img/paymentCodeQQ.webp"},
            ]
        }
    });
}

//捐赠与赞助打赏
export default returnVue
