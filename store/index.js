import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userData: null,

		hasLogin: false,
		dkDetail: {},
		ggjdDetail: {},
		doukouData: {},
		roleData:''
	},
	mutations: {
		login(state, provider) {
			state.hasLogin = true;
			state.userData = provider;
			//缓存用户登陆状态
			uni.setStorageSync('userData', provider)
		},
		loginActive(state, provider) {
			state.hasLogin = true;
			state.roleData = provider;
			//缓存用户登陆状态
			uni.setStorageSync('roleData', provider)
		},
		logout(state) {
			state.hasLogin = false;
			state.userData = {};
			uni.removeStorageSync('userData')
		},
		historyUser(state, provider) {
			//缓存为历史登录用户
			uni.setStorageSync('historyUser', provider);
		},
		setDetailDK(state, item) {
			state.dkDetail = item
		},
		setDetailGgjd(state, item) {
			state.ggjdDetail = item
		},
		setDataDoukou(state, item) {
			state.doukouData = item
		}
	},
	actions: {
		setUserData: function (context, obj) {
			context.commit('login', obj)
		},
		setRoleData: function (context, obj) {
			context.commit('loginActive', obj)
		},
		logout: function (context) {
			context.commit('logout')
		},
		setHistoryUser: function (context, obj) {
			context.commit('historyUser', obj)
		},
		setDetailDK: function (context, item) {
			context.commit('setDetailDK', item)
		},
		setDetailGgjd: function (context, item) {
			context.commit('setDetailGgjd', item)
		},
		setDataDoukou: function (context, item) {
			context.commit('setDataDoukou', item)
		}
	}
})

export default store
