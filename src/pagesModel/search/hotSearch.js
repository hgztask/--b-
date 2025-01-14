import elUtil from "../../utils/elUtil.js";
import ruleKeyListData from "../../data/ruleKeyListData.js";
import ruleMatchingUtil from "../../utils/ruleMatchingUtil.js";
import output_informationTab from "../../layout/output_informationTab.js";
import {Tip} from "../../utils/Tip.js";


/**
 * 开始屏蔽热门搜索
 * @returns {Promise<void>|null}
 */
export const startShieldingHotList = async () => {
    const elList = await elUtil
        .findElementsUntilFound(".trendings-col>.trending-item",
            {interval: 2000})
    Tip.infoBottomRight("检查热搜关键词中...");
    const hotSearchKeyArr = ruleKeyListData.getHotSearchKeyArr();
    const hotSearchKeyCanonicalArr = ruleKeyListData.getHotSearchKeyCanonicalArr();
    for (let el of elList) {
        const label = el.textContent.trim()
        let match = ruleMatchingUtil.fuzzyMatch(hotSearchKeyArr, label);
        if (match) {
            el.remove();
            output_informationTab.addInfo(`根据模糊热搜关键词-【${match}】-屏蔽-${label}`);
            continue;
        }
        match = ruleMatchingUtil.regexMatch(hotSearchKeyCanonicalArr, label);
        if (match) {
            output_informationTab.addInfo(`根据正则热搜关键词-【${match}】-屏蔽-${label}`);
            el.remove();
        }
    }
}

export default {
    startShieldingHotList
}


