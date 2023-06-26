import http from './interface'

//干渠流量上报列表
export const getFillChannelList = (data) => {
	return http.request({
		// url: '/report/wrsBranchChannelReport/list',
		url: '/api/muw/wrsMuwWfData/list',
		method: 'post',
		data,
	})
}

//干渠上报详情
export const getFillChannelDetail = (data) => {
	return http.request({
		url: `/api/muw/wrsMuwWfData/listByTime`,
		method: 'post',
		data
	})
}

//干渠修改提交
export const fillChannelSubmit = (data) => {
	return http.request({
		url: `/api/muw/wrsMuwWfData/add`,
		method: 'post',
    data
	})
}

//斗口水量上报列表
export const queryDoukouReport = (data) => {
	return http.request({
		url: '/api/plan/wrsReportWaterDay/list',
		method: 'post',
		data,
	})
}

//斗口水量根据角色查询权限
export const queryManageDoukou = (data) => {
	return http.request({
		url: '/api/plan/wrsReportRelation/queryList',
		method: 'post',
		data,
	})
}

//斗口水量数据上报
export const fillDoukou = (data) => {
	return http.request({
		url: `/api/plan/wrsReportWaterDay/add`,
		method: 'post',
		data
	})
}

//排水沟流量上报列表
export const getFillPsgList = (data) => {
	return http.request({
		url: '/report/wrsBranchDrainage/list',
		method: 'post',
		data,
	})
}

//排水沟上报详情
export const getFillPsgDetail = (id) => {
	return http.request({
		url: `/report/wrsBranchDrainage/${id}`,
		method: 'post'
	})
}

//排水沟修改提交
export const fillPsgSubmit = (data) => {
	return http.request({
		url: `/report/wrsBranchDrainage/submit`,
		method: 'post',
    data
	})
}


export default {
	getFillChannelList,
	getFillPsgList,
	getFillChannelDetail,
	getFillPsgDetail,
  fillChannelSubmit,
	fillPsgSubmit,
	queryDoukouReport,
	queryManageDoukou,
	fillDoukou
}
