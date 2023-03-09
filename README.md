# b站屏蔽增强器

<hr>
b站根据用户名、uid、粉丝牌（目前还在测试）、视频关键词、言论关键词和视频时长限制（设置允许视频时长最小值和最大值）进行屏蔽

页面的精简处理
<hr>

[传送门](https://space.bilibili.com/473239155/dynamic)作者b站，最快更新状态和内容以及追进，也方便反馈相关问题

屏蔽规则默认的仅供参考，用户可按需修改；

用户只需要修改js中的rule对象里对应的规则类型即可。注释很全，不担心看不懂

<hr>

**作用场所**

| 频道的视频 |  首页推荐   |  搜索页面   | 播放页右侧视频 |
|------|-----|-----|---------|
| 视频评论区 |  专栏的评论区   |  消息中心的【回复我的】   | 消息中心的【@我的】 |
| 直播间  |           |                |            |

<hr>
需要添加要屏蔽的关键词，根据下面表格描述，修改js中的对应数组内容即可

| 类型      | 变量名 | 值类型        | 说明                                                                                     |
|---------|-----|------------|----------------------------------------------------------------------------------------|
| 用户名     |  userNameArr | 字符串（字符）    | 根据用户名进行屏蔽                                                                              |
| 用户名     | userNameKeyArr  | 字符串（字符）   | 根据包含了该关键词的用户名进行屏蔽                                                                      |
| 用户uid   |   userUIDArr | int类型（纯数字） | 根据用户UID进行屏蔽                                                                            |
| 标题      |  titleKeyArr | 字符串（字符）    | 根据标题关键词进行屏蔽，包含的都会屏蔽                                                                    |
| 评论违禁词   |   commentOnKeyArr | 字符串（字符）    | 根据评论的关键词进行屏蔽，包含的都会屏蔽                                                                   |
| 视频时长最小值 | filterSMin| int类型（纯数字) | 设置允许出现的视频时长最小值，单位秒<br/>比如小于60秒的都会被屏蔽<br/>反之大于则不屏蔽<br/>该值优先级比是视频时长最大值高<br/>设置0则不生效该屏蔽模式 |
| 视频时长最大值 | filterSMax | int类型（纯数字) | 设置允许出现的视频时长最大值，单位秒<br/>比如大于120秒的都会被屏蔽<br/>反之小于则不屏蔽<br/>设置0则不生效该屏蔽模式                    |
| 粉丝牌     |   fanCardArr   | 字符串(字符)    | 根据粉丝牌进行屏蔽（目前还在测试，尚未完善，仅在直播间生效）                                                         |

对着注释对应的数组后面添加即可
<hr>
精简处理的地方有：

搜索页面右侧悬浮按钮（貌似是新版的，没留意）

搜索页面底部信息

视频播放界面右侧个别悬浮按钮，和一些推广广告

首页右侧的个别悬浮按钮、左上角的导航栏，顶部大图的跳转链接

<hr>
直播间的底部信息可针对性屏蔽处理

直播间精简处理

关键变量 **liveData**

根据该对象内部的属性描述修改对应的值的状态，true表示启用，false反之不启用，按需修改即可


