import App from './App'
// 该指令是c/c++中的预处理命令，uni-app参考该模式为跨平台不同特性编译不同代码
// #ifndef VUE3
// 使用方法：#ifdef或者#ifndef加上%platform%开头，以#endif结尾
// #ifdef：仅在某平台存在
// #ifndef除了某平台均存在 
// 具体可查看https://uniapp.dcloud.net.cn/tutorial/platform.html
import Vue from 'vue'
import './uni.promisify.adaptor'
// uni.promisify.adaptor是一个适配器，主要是用来适配一些API的，比如uni.request， 作为一个异步操作的适配器，可以将其变成同步的promise
Vue.config.productionTip = false
// vue.config是vue中的全局配置，productionTip设置为false为了阻止vue在启动时生成生产提示
App.mpType = 'app'
// mpType 是一个uni-app的内置变量，用于标识应用程序的类型，包括app、h5、weixin、alipay等。app表示原生应用程序，而其他值则表示在不同平台上运行的Web应用程序,当app.mptype值为app时，开发者可以使用原生API进行一些操作，如打开相机、调用系统通讯录等。如果是Web应用程序，则无法使用这些原生AP,注意只能在uniapp框架中使用
const app = new Vue({
	...App
})
//创建vue组件并挂载
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue' //服务器渲染方法
export function createApp() {
	const app = createSSRApp(App) //利用SSR创建APP
	return {
		app
	}
}
// #endif