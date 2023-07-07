import http from './interface'
export const baseUrl='http://175.27.187.172:8001'
// export const baseUrl='http://192.168.1.192:8001'

export const login = (data) => {

    return http.request({
        baseUrl: baseUrl,
        url: '/personal_collection/accountInfo/login',
        method: 'POST',
        header: {
            'content-type': 'application/x-www-form-urlencoded',
        },
        data,


    })
}
export const getMyInfo = (data) => {

    return http.request({
        baseUrl: baseUrl,
        url: '/personal_collection/accountInfo/getMyInfo',
        method: 'POST',
        header: {
            'sID': JSON.parse(localStorage.getItem('userData')),
            'content-type': 'application/x-www-form-urlencoded',
        },
        data,


    })
}
export const updateNick = (data) => {

    return http.request({
        baseUrl: baseUrl,
        url: '/personal_collection/accountInfo/updateNick',
        method: 'POST',
        header: {
            'sID': JSON.parse(localStorage.getItem('userData')),
            'content-type': 'application/x-www-form-urlencoded',
        },
        data,


    })
}

export const register = (data) => {
    return http.request({
        baseUrl: baseUrl,
        url: '/personal_collection/accountInfo/newAccount',
        method: 'POST',
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        data,
    })
}
export const forgetPwd = (data) => {
    return http.request({
        baseUrl: baseUrl,
        url: '/personal_collection/accountInfo/forgetPwd',
        method: 'POST',
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        data,
    })
}

export const getItem = (data) => {
    return http.request({
        baseUrl: baseUrl,
        url: '/personal_collection/myCollection/getItem',
        method: 'POST',
        header: {
            'sID': JSON.parse(localStorage.getItem('userData')),
            // 'content-type': 'application/x-www-form-urlencoded'
        },

        data,


    })
}
export const deleteItem = (data) => {
    return http.request({
        baseUrl: baseUrl,
        url: '/personal_collection/myCollection/deleteCollection',
        method: 'POST',
        header: {
            'sID': JSON.parse(localStorage.getItem('userData')),
            'content-type': 'application/x-www-form-urlencoded'
        },

        data,


    })
}
export const updateAnnouncement = (data) => {
    return http.request({
        baseUrl: baseUrl,
        url: '/personal_collection/myCollection/updateAnnouncement',
        method: 'POST',
        header: {
            'sID': JSON.parse(localStorage.getItem('userData')),
            'content-type': 'application/x-www-form-urlencoded'
        },
        data,

    })
}
export const getVisitTotal = (data) => {
    return http.request({
        baseUrl: baseUrl,
        url: '/personal_collection/myCollection/getVisitTotal',
        method: 'POST',
        header: {
            'sID': JSON.parse(localStorage.getItem('userData')),
            'content-type': 'application/x-www-form-urlencoded'
        },
        data,

    })
}
export const getInviteCode = (data) => {
    return http.request({
        baseUrl: baseUrl,
        url: '/personal_collection/service/getInviteCode',
        method: 'POST',
        header: {
            'sID': JSON.parse(localStorage.getItem('userData')),
            'content-type': 'application/x-www-form-urlencoded'
        },
        data,

    })
}
export const makeInviteCode = (data) => {
    return http.request({
        baseUrl: baseUrl,
        url: '/personal_collection/service/makeInviteCode',
        method: 'POST',
        header: {
            'sID': JSON.parse(localStorage.getItem('userData')),
            'content-type': 'application/x-www-form-urlencoded'
        },
        data,

    })
}
export const getPlatformInfo = (data) => {
    return http.request({
        baseUrl: baseUrl,
        url: '/personal_collection/service/getPlatformInfo',
        method: 'POST',
        header: {
            'sID': JSON.parse(localStorage.getItem('userData')),
            'content-type': 'application/x-www-form-urlencoded'
        },
        data,

    })
}
export const getCollections = (data,param) => {
    return http.request({
        baseUrl: baseUrl,
        url: '/customer/collections/'+param,
        method: 'POST',
        header: {
           // 'sID': JSON.parse(localStorage.getItem('userData')),
           //'Content-Type': 'application/json'
        },
        data,

    })
}
export const makeShareURL = (data) => {
    return http.request({
        baseUrl: baseUrl,
        url: '/personal_collection/myCollection/makeShareURL',
        method: 'POST',
        header: {
            'sID': JSON.parse(localStorage.getItem('userData')),
            'content-type': 'application/x-www-form-urlencoded'
        },
        data,

    })
}
export const putLabel = (data) => {
    return http.request({
        baseUrl: baseUrl,
        url: '/personal_collection/myCollection/putLabel',
        method: 'POST',
        header: {
            'sID': JSON.parse(localStorage.getItem('userData')),
            // 'content-type': 'application/x-www-form-urlencoded'
        },
        data,

    })
}
export const getLabel = (data) => {
    return http.request({
        baseUrl: baseUrl,
        url: '/personal_collection/myCollection/getLabel',
        method: 'POST',
        header: {
            'sID': JSON.parse(localStorage.getItem('userData')),
            // 'content-type': 'application/x-www-form-urlencoded'
        },
        data,

    })
}
export const getAgreement = (data) => {
    return http.request({
        baseUrl: baseUrl,
        url: '/doc/agreement',
        method: 'get',
        header: {
           // 'sID': JSON.parse(localStorage.getItem('userData')),
            // 'content-type': 'application/x-www-form-urlencoded'
        },
        data,

    })
}

export const getOwnerInfo = (data) => {
    return http.request({
        baseUrl: baseUrl,
        url: '/customer/getOwnerInfo/'+data,
        method: 'POST',
        header: {
            // 'sID': JSON.parse(localStorage.getItem('userData')),
            //'Content-Type': 'application/json'
        },

    })
}


//退出登录
export const logout = () => {
    return http.request({
        url: '/logout',
        method: 'GET',
    })
}

/**
 * 修改密码
 * account    账户
 * password    旧密码
 * newPassWord    新密码
 */
export const updatePassword = (data) => {
    return http.request({
        url: '/api/changePassWord',
        method: 'POST',
        data,
    })
}

/**
 * 密码验证
 * oldPwd    原密码
 * newPwd    新密码
 */
export const passwordValidation = (data) => {
    return http.request({
        url: '/password/validation',
        method: 'POST',
        data,
    })
}

// app电子签名上传
export const signUpload = (data) => {
    return http.request({
        baseUrl: 'http://120.253.31.50:8084',
        url: '/app/comm/file/signatureUpload',
        method: 'POST',
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        data,
    })
}

// 根据用户查询电子签名
export const querySign = (data) => {
    return http.request({
        baseUrl: 'http://120.253.31.50:8084',
        url: '/app/sys/yjqUserSignature/queryByUserid',
        method: 'get',
        data,
    })
}


export default {
    login,
    logout,
    register,
    getItem,
    getVisitTotal,
    deleteItem,
    makeShareURL,
    updatePassword,
    passwordValidation,
    getCollections,
    signUpload,
    makeInviteCode,
    querySign,
    getPlatformInfo,
    forgetPwd,
    getInviteCode,
    updateAnnouncement,
    getMyInfo,
    updateNick,
    putLabel,
    getLabel,
    getOwnerInfo,
    getAgreement,
    baseUrl

}

