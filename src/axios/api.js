import axios from './index'

//登陆接口
export const login = (params) => {
    return axios.post('/user/login', {
        ...params
    })
}

//获取天性数据
export const TXdataList = () => {
    return axios.get('/user/worldmap')
}

//获取全部的数据
export const TogetMapListData = () => {
    return axios.get('/user/worldmaplist')
}

//获取安科的疫情数据
export const toSourceData = () => {
    return axios.get('/user/ankemap')
}

//获取地图的信息
export const toGetCityOption = () => {
    return axios.get('/user/vacfind')
}


//判断是否已经订阅
export const toHasEmail = () => {
    return axios.get('/user/hasemail')
}

//进行邮件绑定的接口
export const toBindEmail = (params) => {
    return axios.post('/user/bindemail', {
        ...params
    })
}

//解绑邮件的接口
export const toUntieEmail = () => {
    return axios.delete('/user/untiemail')
}

//请假的接口
export const toLeave = (params) => {
    return axios.post('/user/leave', {
        ...params
    })
}

//请假状态的接口
export const ToleaveStatus = () => {
    return axios.get('/user/leavestatus')
}


//获取目的地风险状态
export const TogetDesStatus = (value) => {
    return axios.get('/user/destination?destination=' + value)
}


//根据数组返回请假人风险的状态
export const TogetArrBySeven = (params) => {
    return axios.post('/user/sevendayperson', {
        ...params
    })
}

//获取审批状态的接口
export const ToApproval = () => {
    return axios.get('/user/approval')
}

//同意或者不同意的审批状态
export const ToAgree = (params) => {
    return axios.put('/user/argeeappro', {
        ...params
    })
}

//销假的接口
export const ToDeleteAgree = (params) => {
    return axios.delete('/user/deleteagree/' + params.sid)
}

//获取个人信息
export const ToPersonInfo = () => {
    return axios.get('/user/personinfo')
}

//修改安科确诊人数
export const ToChangePerson = (params) => {
    return axios.put('/user/ankemapmanage', {
        ...params
    })
}

//获取全部订阅的人
export const allPersonEmail = () => {
    return axios.get('/user/showemail')
}