import defUtil from "./defUtil.js";

/**
 *获取url中的uid
 * @param url{string}
 * @return {number}
 */
const getUrlUID = (url) => {
    let uid;
    if (url.startsWith('http')) {
        const parseUrl = defUtil.parseUrl(url);
        uid = parseUrl.pathSegments[0]?.trim()
        return parseInt(uid)
    }
    //是否有参数
    const isDoYouHaveAnyParameters = url.indexOf('?');
    const lastIndexOf = url.lastIndexOf("/");
    if (isDoYouHaveAnyParameters === -1) {
        if (url.endsWith('/')) {
            // 当url以/结尾时，取倒数第二个/
            const nTheIndexOfTheLastSecondOccurrenceOfTheSlash = url.lastIndexOf('/', url.length - 2);
            uid = url.substring(nTheIndexOfTheLastSecondOccurrenceOfTheSlash + 1, url.length - 1);
        } else {
            // 当没有参数时，取url的最后一个/之后的内容
            uid = url.substring(lastIndexOf + 1);
        }
    } else {
        //当url中有参数时，取参数前的uid
        uid = url.substring(lastIndexOf + 1, isDoYouHaveAnyParameters);
    }
    return parseInt(uid);
}

/**
 * 获取url中的BV号
 * @param url {string}
 * @returns {string|null}
 */
const getUrlBV = (url) => {
    //例子：https://www.bilibili.com/video/BV1gLCWYAE5C/?spm_id_from=333.788.recommend_more_video.1
    let match = url.match(/video\/(.+)\//);
    if (match === null) {
        //例子：https://www.bilibili.com/video/BV1wB421r7NX?spm_id_from=333.1245.recommend_more_video.1
        match = url.match(/video\/(.+)\?/)
    }
    if (match === null) {
        //例子:https://www.bilibili.com/video/BV1B1cxewECr
        match=url.match(/video\/(.+)/)
    }
    return match?.[1]?.trim() || null;
}

/**
 * 事件监听器注册表
 * @type {Map<any, {events:[],attrs:[]}>}
 */
const eventRegistry = new Map();

/**
 * 添加事件监听器，同时将事件监听器添加到事件注册表中，以进行跟踪。
 * @param element {Document|Element} - 要监听的事件的目标元素。
 * @param eventName 事件名
 * @param handler - 事件处理函数。
 */
function addEventListenerWithTracking(element, eventName, handler) {
    if (!element) {
        console.error(element)
        throw new Error('错误的元素！')
    }
    if (!eventRegistry.has(element)) {
        //当事件监听器注册表没有该元素时，添加并初始化
        eventRegistry.set(element, {events: [], attrs: []});
    }
    // 获取该元素对应的事件监听器表
    const {events, attrs} = eventRegistry.get(element);
    if (attrs.includes(eventName)) {
        return
    }
    attrs.push(eventName)
    events.push({eventName, handler})
    element.setAttribute(`event-${eventName}`, eventName)
    // 如果该元素还没有对应的事件监听器表，则创建一个空的事件监听器表
    element.addEventListener(eventName, handler);
}

/**
 * 检查事件监听器是否已注册的对应事件
 * @param element {Element|Document}
 * @param eventName
 * @returns {boolean}
 */
function hasEventListener(element, eventName) {
    const elementEvents = eventRegistry.get(element)
    if (!elementEvents) {
        // 如果事件监听器注册表中没有该元素，则返回false
        return false
    }
    const attr = element.getAttribute(`event-${eventName}`);
    if (attr) {
        return true
    }
    const {events} = elementEvents
    // 遍历事件监听器表，如果事件名存在于事件监听器表中，则返回true
    return events.some(item => item === eventName);
}


/**
 * 按次数查找单个元素，每次查找之间有指定的间隔时间
 * @param {string} selector - CSS 选择器，用于选择元素
 * @param config{Object} 配置对象
 * @param config.doc {Document|Element|ShadowRoot}- 查找的文档对象，默认为document
 * @param config.interval  {number} - 每次查找之间的间隔时间（毫秒）默认1秒，即1000毫秒
 * @param config.attempts  {number} - 尝试查找的次数, 默认为5
 * @returns {Promise<Element>} - 返回找到的元素
 */
function
findElementByAttempts(selector, config) {
    const defConfig = {doc: document, interval: 1000, attempts: 5}
    config = {...defConfig, ...config}
    return new Promise((resolve, reject) => {
        let attemptCount = 0;

        function attemptToFind() {
            const element = config.doc.querySelector(selector);
            if (element) {
                resolve(element);
            } else if (++attemptCount < config.attempts) {
                setTimeout(attemptToFind, config.interval);
            } else {
                reject(); // 找不到的情况
            }
        }

        attemptToFind();
    });
}

/**
 * 按次数查找多个元素，每次查找之间有指定的间隔时间
 * @param {string} selector - CSS 选择器，用于选择元素
 * @param config{Object} 配置对象
 * @param config.doc {Document|Element|ShadowRoot}- 查找的文档对象，默认为document
 * @param config.interval  {number} - 每次查找之间的间隔时间（毫秒）默认1秒，即1000毫秒
 * @param config.attempts  {number} - 尝试查找的次数, 默认为5
 * @returns {Promise<NodeListOf<Element>|null>} - 返回找到的 NodeList 或 null
 */
function findElementsByAttempts(selector, config) {
    const defConfig = {doc: document, interval: 1000, attempts: 5}
    config = {...defConfig, ...config}
    return new Promise((resolve, reject) => {
        let attemptCount = 0;

        function attemptToFind() {
            const elements = config.doc.querySelectorAll(selector);
            if (elements.length > 0) {
                resolve(elements);
            } else if (++attemptCount < config.attempts) {
                setTimeout(attemptToFind, config.interval);
            } else {
                reject(null); // 找不到则返回 null
            }
        }

        attemptToFind();
    });
}

/**
 * 不断尝试查找单个元素，每次查找之间有指定的间隔时间，直到找到为止
 * 结合异步操作await可用于监听元素加载完成之后继续执行
 * 如设置超时时间，则当超过指定时间后，将返回null，需要cry异常处理
 * @param {string} selector - CSS 选择器，用于选择元素
 * @param config{Object} 配置对象
 * @param config.doc {Document|Element|ShadowRoot}- 查找的文档对象，默认为document
 * @param config.interval  {number} - 每次查找之间的间隔时间（毫秒）默认1秒，即1000毫秒
 * @param config.timeout  {number} - 超时时间（毫秒）默认-1，即无限等待
 * @returns {Promise<Element|Document>} - 成功时返回找到的元素，失败时需要cry处理
 */
function findElementUntilFound(selector, config = {}) {
    const defConfig = {
        doc: document,
        interval: 1000,
        timeout: -1,
    }
    config = {...defConfig, ...config}
    return new Promise((resolve, reject) => {
        const i1 = setInterval(() => {
            const element = config.doc.querySelector(selector);
            if (element) {
                resolve(element);
                clearInterval(i1);
            }
        }, config.interval);
        if (config.timeout > 0) {
            setTimeout(() => {
                clearInterval(i1);
                reject(null); // 超时则返回 null
            }, config.timeout);
        }
    });
}

/**
 * 不断尝试查找多个元素，每次查找之间有指定的间隔时间，直到找到为止
 * 结合异步操作await可用于监听元素加载完成之后继续执行
 * 如设置超时时间，则当超过指定时间后，将返回null，需要cry异常处理
 * @param {string} selector - CSS 选择器，用于选择元素
 * @param config{Object} 配置对象
 * @param config.doc {Document|Element|ShadowRoot}- 查找的文档对象，默认为document
 * @param config.interval  {number} - 每次查找之间的间隔时间（毫秒）默认1秒，即1000毫秒
 * @param config.timeout  {number} - 超时时间（毫秒）默认-1，即无限等待
 * @returns {Promise<NodeListOf<Element|Document>>} - 返回找到的 Element列表
 */
function findElementsUntilFound(selector, config = {}) {
    const defConfig = {doc: document, interval: 1000, timeout: -1}
    config = {...defConfig, ...config}
    return new Promise((resolve, reject) => {
        const i1 = setInterval(() => {
            const elements = config.doc.querySelectorAll(selector);
            if (elements.length > 0) {
                resolve(elements);
                clearInterval(i1)
            }
        }, config.interval);
        if (config.timeout > 0) {
            setTimeout(() => {
                clearInterval(i1);
                reject(null); // 超时则返回 null
            }, config.timeout);
        }
    });
}

/**
 * 在指定时间内不断尝试查找单个元素，每次查找之间有指定的间隔时间
 * 如果在指定时间内找不到，则返回 null
 * @param {string} selector - CSS 选择器，用于选择元素
 * @param config{Object} 配置对象
 * @param config.doc {Document|Element|ShadowRoot}- 查找的文档对象，默认为document
 * @param config.interval  {number} - 每次查找之间的间隔时间（毫秒）默认1秒，即1000毫秒
 * @param config.timeout  {number} - 查找的总超时时间（毫秒），默认为60秒，即 60 000 毫秒
 * @returns {Promise<{state:boolean,msg:string,el:Element|null}>} - 返回找到的元素或 null
 */
function findElementWithTimeout(selector, config = {}) {
    const defConfig = {
        doc: document,
        interval: 1000,
        timeout: 60000
    }
    config = {...defConfig, ...config}
    return new Promise((resolve) => {
        let intervalId;

        function attemptToFind() {
            const element = config.doc.querySelector(selector);
            if (element) {
                clearInterval(intervalId);
                resolve({
                    state: true,
                    msg: "已找到元素",
                    el: element
                });
            }
        }

        intervalId = setInterval(attemptToFind, config.interval);
        const timeout = setTimeout(() => {
            clearInterval(intervalId);
            resolve({
                state: false,
                msg: "已超时:" + config.timeout
            }); // 超时后提示信息
            clearTimeout(timeout);
        }, config.timeout);
        attemptToFind(); // 立即尝试一次
    });
}

/**
 * 尝试查找元素，并绑定事件，直到找到为止
 * @param css {string} - CSS 选择器
 * @param callback {function} - 回调函数
 * @param config{Object}
 * @param config.interval {number} - 每次查找之间的间隔时间（毫秒）默认1秒，即1000毫秒
 * @param config.timeOut {number} - 延迟查找的时间（毫秒），默认为3000毫秒
 */
const findElementsAndBindEvents = (css, callback, config = {}) => {
    config = {
        ...{
            interval: 2000,
            timeOut: 3000
        }, config
    }
    setTimeout(() => {
        findElementUntilFound(css, {interval: config.interval}).then((el) => {
            el.addEventListener("click", () => {
                callback();
            })
        });
    }, config.timeOut);
}


/**
 * 设置悬停计时器，当鼠标悬停在元素上xxx秒后执行回调函数
 * @param {Element} element - 要设置悬停计时器的元素
 * @param {number} timeout - 悬停触发回调的时间（毫秒），默认为2000毫秒
 * @param {Function} callback - 悬停超时后执行的回调函数
 */
function hoverTimeout(element, callback, timeout = 2000) {
    const attribute = element.getAttribute('data-hover-timeout');
    // 清除之前的计时器，避免重复绑定事件
    if (attribute !== null) {
        return
    }
    element.setAttribute('data-hover-timeout', 'true');
    // 设置一个新的计时器
    let time = null;
    element.addEventListener('mouseenter', () => {
        time = setTimeout(() => {
            callback();
        }, timeout);
    });

    // 鼠标离开元素时清除计时器
    element.addEventListener('mouseleave', () => {
        if (time === null) {
            return;
        }
        clearTimeout(time);
    });
}


/**
 * @version 0.2.0
 */
export default {
    getUrlUID,
    getUrlBV,
    addEventListenerWithTracking,
    findElementUntilFound,
    findElementWithTimeout,
    findElementsUntilFound,
    findElementsAndBindEvents,
    hasEventListener
}
