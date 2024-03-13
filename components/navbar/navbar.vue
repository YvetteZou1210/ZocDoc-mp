<template>
	<view class="navbar"></view>
</template>

<script setup lang="ts">
//计算navbar高度
import { onBeforeMount } from 'vue';
onBeforeMount(() => {
	setNavSize();
});
const setNavSize = () => {
	const res = uni.getSystemInfoSync();
	console.log(res);
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
