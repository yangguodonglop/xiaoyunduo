import http from './interface'

export const queryApiData = (data) => {
	return http.request({
		url: '/api/sys/sysApiInfo/queryApiData',
		method: 'POST',
		data,
	})
}

export const getWeather = () => {
	return http.request({
		url: '/api/schedule/wrsActualDispatchApply/weather',
		method: 'POST'
	})
}

// 首页-渠道水情
export const queryQdsq = () => { 
	return http.request({
		url: '/api/muw/wrsMuwWfData/currentRecord',
		method: 'POST'
	})
}
// 首页-每日实引水量查询
export const queryYsl = () => { 
	return http.request({
		url: '/api/plan/wrsReportWaterDay/queryReportDayInfo',
		method: 'POST'
	})
}
// 首页-每日灌溉面积查询
export const queryGgmj = (data) => { 
	return http.request({
		url: '/api/schedule/yjqCropStructureIrrArea/queryReportDayInfo',
		method: 'POST',
		data
	})
}

// 首页-黄河水情
export const getHhsq = () => { 
	return http.request({
		url: '/homepage/index/query1',
		method: 'POST'
	})
}

// 首页-水量调度-渠道水情
export const getDispatchQd = () => { 
	return http.request({
		url: '/homepage/index/query2',
		method: 'POST'
	})
}

// 首页-水量调度-加减水
export const getDispatchJjs = (data) => { 
	return http.request({
		baseUrl: 'http://120.253.31.50:8084',
		url: '/app/process/applyNew/queryByDate',
		method: 'POST',
		data
	})
}

// 首页-警情数据
export const getWarningData = () => { 
	return http.request({
		url: '/homepage/index/query3',
		method: 'POST'
	})
}

// 首页-气象数据
export const getWeatherData = () => { 
	return http.request({
		url: '/homepage/index/query4',
		method: 'POST'
	})
}

// 首页-用水情况-用水量
export const getYsl = () => { 
	return http.request({
		url: '/homepage/index/query5',
		method: 'POST'
	})
}

// 首页-用水情况-灌溉面积
export const getGgmj = () => { 
	return http.request({
		url: '/homepage/index/query6',
		method: 'POST'
	})
}

// 首页-用水情况-生态补水
export const getStbs = () => { 
	return http.request({
		url: '/homepage/index/query7',
		method: 'POST'
	})
}

// 首页-用水情况-灌溉进度详情
export const getGgjdDetai = () => { 
	return http.request({
		url: '/homepage/index/query8',
		method: 'POST'
	})
}


export default {
	queryApiData,
	getWeather,
	queryQdsq,
	queryYsl,
	queryGgmj,
	getHhsq,
	getWarningData,
	getWeatherData,
	getDispatchQd,
	getDispatchJjs,
	getYsl,
	getGgmj,
	getStbs,
	getGgjdDetai
}
