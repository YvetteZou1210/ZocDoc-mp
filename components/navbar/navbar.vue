<template>
	<view :style="'height:' + status + 'rpx;' + containerStyle"></view>
	<view class="navbar"></view>
</template>

<script setup lang="ts">
//计算navbar高度
import { onBeforeMount, ref, defineProps } from 'vue';
const props = defineProps({
	background: {
		type: String,
		default: 'rgba(255,255,255,1)'
	},
	color: {
		type: String,
		default: 'rgba(0,0,0,1)'
	},
	fontSize: {
		type: String,
		default: '32'
	},
	iconHeight: {
		type: String,
		default: '32'
	},
	iconWidth: {
		type: String,
		default: '116'
	}
});
onBeforeMount(() => {
	setNavSize();
});
//状态栏初始高度
const status = ref(0);
//内容初始高度
const navHeight = ref(0);
//背景颜色
const containerStyle = ref('');
//字体样式
const textStyle = ref('');
//icon样式
const iconStyle = ref('');
const setNavSize = () => {
	const { system, statusBarHeight } = uni.getSystemInfoSync();
	// console.log(res);查看设备数据
	status.value = statusBarHeight * 2;
	if (system.indexOf('iOS')) {
		navHeight.value = 88;
	} else {
		navHeight.value = 96;
	}
};
//样式设置
const setStyle = () => {
	containerStyle.value = ['background:' + props.background].join(';');
	textStyle.value = ['color:' + props.color, 'font-size:' + props.fontSize + 'rpx'].join(';');
	iconStyle.value = ['width:' + props.iconWidth + 'rpx', 'height:' + props.iconHeight + 'rpx'].join(';');
};
</script>

<style lang="scss" scoped>
.navbar {
	position: fixed;
	width: 100%;
	top: 0%;
	left: 0%;
	z-index: 2;
}
</style>
