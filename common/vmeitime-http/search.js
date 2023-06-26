import http from './interface'

//天气列表
export const getWeatherList = (data) => {
	return http.request({
		baseUrl: 'http://120.253.31.50:8084/app',
		url: '/query/weather/list',
		method: 'post',
		data,
	})
}

//天气详情
export const getWeatherDetail = (data) => {
	return http.request({
		baseUrl: 'http://120.253.31.50:8084/app',
		url: '/query/weather/detail',
		method: 'post',
		data,
	})
}

//黄河水情列表
export const getHhsqList = (data) => {
	return http.request({
		baseUrl: 'http://120.253.31.50:8084/app',
		url: '/query/brstadia/list',
		method: 'post',
		data,
	})
}

//黄河水情详情
export const getHhsqDetail = (data) => {
	return http.request({
		baseUrl: 'http://120.253.31.50:8084/app',
		url: '/query/brstadia/detail',
		method: 'post',
		data,
	})
}

//干渠水情列表
export const getGqsqList = (data) => {
	return http.request({
		baseUrl: 'http://120.253.31.50:8084',
		url: '/app/query/muwWf/list',
		method: 'post',
		data,
	})
}

//干渠水情详情
export const getGqsqDetail = (data) => {
	return http.request({
			baseUrl: 'http://120.253.31.50:8084',
		url: '/app/query/muwWf/detail',
		method: 'post',
		data,
	})
}

//干渠饮水站点列表
export const getListSite = (data) => {
	return http.request({
		baseUrl: 'http://120.253.31.50:8084',
		url: '/app/query/muwWf/listSite',
		method: 'post',
		data,
	})
}

//灌溉进度列表
export const getGgjdList = (data) => {
	return http.request({
		url: '/api/schedule/yjqPlanCropStructureIrrArea/list',
		method: 'post',
		data,
	})
}
//灌溉进度--种植结构
export const getGgjdCrop = (data) => {
	return http.request({
		url: '/api/schedule/yjqCropStructureIrrArea/list',
		method: 'post',
		data,
	})
}

//灌溉进度详情
export const getGgjdDetail = (data) => {
	return http.request({
		url: '/query/muwIrr/detail',
		method: 'post',
		data,
	})
}

//灌溉进度站点列表
export const getGgjdListSite = (data) => {
	return http.request({
		url: '/query/muwIrr/listSite',
		method: 'post',
		data,
	})
}

//湖泊湿地列表
export const getHpsdList = (data) => {
	return http.request({
		url: '/query/muwLw/list',
		method: 'post',
		data,
	})
}

//湖泊湿地详情
export const getHpsdDetail = (data) => {
	return http.request({
		url: '/query/muwLw/detail',
		method: 'post',
		data,
	})
}

//湖泊湿地站点列表
export const getHpsdListSite = (data) => {
	return http.request({
		url: '/query/muwLw/listSite',
		method: 'post',
		data,
	})
}

//实时监测列表
export const getSsjcList = (data) => {
	return http.request({
		url: '/query/brcross/list',
		method: 'post',
		data,
	})
}

//实时监测详情
export const getSsjcDetail = (data) => {
	return http.request({
		url: '/query/brcross/detail',
		method: 'post',
		data,
	})
}

//实时监测站点列表
export const getSsjcListSite = (data) => {
	return http.request({
		url: '/query/brcross/listSite',
		method: 'post',
		data,
	})
}

// 建筑运行状态
export const getJzyxztList = (data) => {
  return http.request({
		url: '/base/wrsBrwaterGate/listLast',
		method: 'post',
		data,
	})
}

// 闸门列表
export const getJzyxztListSite = (data) => {
  return http.request({
		url: '/base/wrsBrwaterGate/listSite',
		method: 'post',
		data,
	})
}

// 闸门曲线
export const getGateLineData = (data) => {
  return http.request({
		url: '/base/wrsBrwaterGate/query',
		method: 'post',
		data,
	})
}

// 斗口监测-列表查询
export const getGateListDK = (data) => {
  return http.request({
		url: '/api/base/wrsBrwaterDam/queryDamInfoList',
		method: 'post',
		data,
	})
}
// 断面-列表查询
export const getGateListDM = (data) => {
	return http.request({
	url: '/api/wrs/wrsBrcrossSection/info',
	method: 'post',
	data,
})
}
// 断面-详情查询
export const querySectionHistory = (data) => {
	return http.request({
	url: '/api/wrs/wrsBrcrossSection/queryHistory',
	method: 'post',
	data,
})
}
// 斗口监测-过程线
export const getProcessListDK = (data) => {
  return http.request({
		url: '/api/base/wrsBrwaterDam/queryProcessLinList',
		method: 'post',
		data,
	})
}
// 水费统计-列表
export const getStationList = (data) => {
	return http.request({
		url: '/api/schedule/yjqDiversionB/list',
		method: 'post',
		data,
	})
}

// 视频-列表
export const getVideoList = (data) => {
	return http.request({
		url: '/api/wrs/wrsBmanage/list',
		method: 'post',
		data,
	})
}
// 视频-设备-列表
export const getVideoEquipmentList = (data) => {
	return http.request({
		url: '/api/video/wrsVideoRelation/list',
		method: 'post',
		data,
	})
}
// 视频-设备-视频地址
export const getVideoUrl = (data) => {
	return http.request({
		url: '/api/hik/queryRtspUrl',
		method: 'post',
		data,
	})
}

export default {
	getWeatherList,
	getWeatherDetail,
	getHhsqList,
	getHhsqDetail,
	getGqsqList,
	getGqsqDetail,
	getGgjdCrop,
	getListSite,
	getGgjdList,
	getGgjdDetail,
	getGgjdListSite,
	getHpsdList,
	getHpsdDetail,
	getHpsdListSite,
	getSsjcList,
	getSsjcDetail,
	getSsjcListSite,
    getJzyxztList,
    getJzyxztListSite,
	getGateLineData,
	getGateListDK,
	getGateListDM,
	getProcessListDK,
	querySectionHistory,
	getStationList,
	getVideoList,
	getVideoEquipmentList,
	getVideoUrl
}
