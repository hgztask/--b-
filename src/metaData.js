//{"weight":-1}
// ==UserScript==
// @name         b站屏蔽增强器
// @namespace    http://tampermonkey.net/
// @license      MIT
// @version      1.2.1
// @description  支持动态屏蔽、评论区过滤屏蔽，视频屏蔽（标题、用户、uid等）、蔽根据用户名、uid、视频关键词、言论关键词和视频时长进行屏蔽和精简处理，支持获取b站相关数据并导出为json(用户收藏夹导出，历史记录导出、关注列表导出、粉丝列表导出)(详情看脚本主页描述)
// @author       byhgz
// @exclude      *://message.bilibili.com/pages/nav/header_sync
// @exclude      *://message.bilibili.com/pages/nav/index_new_pc_sync
// @exclude      *://live.bilibili.com/blackboard/dropdown-menu.html
// @exclude      *://live.bilibili.com/p/html/live-web-mng/*
// @exclude      *://www.bilibili.com/correspond/*
// @match        *://search.bilibili.com/*
// @match        *://www.bilibili.com/v/food/*
// @match        *://message.bilibili.com/*
// @match        *://www.bilibili.com/read/*
// @match        *://www.bilibili.com/v/topic/detail/?topic_id=*
// @match        *://www.bilibili.com/v/kichiku/*
// @match        *://t.bilibili.com/*
// @match        *://space.bilibili.com/*
// @match        *://www.bilibili.com/video/*
// @match        *://live.bilibili.com/?spm_id_from=*
// @match        *://live.bilibili.com/p/eden/area-tags?*
// @match        *://live.bilibili.com/*
// @match        *://www.bilibili.com/opus/*
// @match        *://www.bilibili.com/*
// @require      https://unpkg.com/vue@2.6.14/dist/vue.js
// @require      https://code.jquery.com/jquery-3.5.1.min.js
// @require      https://greasyfork.org/scripts/462234-message/code/Message.js?version=1170653
// @icon         https://static.hdslb.com/images/favicon.ico
// @connect      bilibili.com
// @connect      api.mikuchase.ltd
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_addValueChangeListener
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @noframes
// @downloadURL https://update.greasyfork.org/scripts/461382/b站屏蔽增强器.user.js
// @updateURL https://update.greasyfork.org/scripts/461382/b站屏蔽增强器.meta.js
// ==/UserScript==
'use strict';
