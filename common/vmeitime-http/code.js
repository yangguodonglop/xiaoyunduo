//所有获取手机验证码的接口

import http from './interface'


/**
 * 获取更新手机号的验证码
 * phone	手机号
 */
export const updatePhone = (data) => {
    return http.request({
        url: '/api/sys/sysApiInfo/queryApiData',
		method:'post',
        data,
    })
}

export const queryApiData = (data) => {
    return http.request({
        url: 'api/sys/sysApiInfo/queryApiData',
		method:'POST',
        data,
    })
}

export default {
	updatePhone,
	queryApiData
}
