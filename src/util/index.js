//根据状态判断风险类型
export const getRiskStatus = (status) => {
    switch (status) {
        case 0: return '低风险地区'
        case 1: return '中风险地区'
        case 2: return '高风险地区'
    }
}