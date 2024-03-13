<template>
	<view class="content">
		<view class="text-area">
			<text class="title">{{ title }}</text>
			<view v-for="item in list" :key="item.name">
				{{ item.name }}-{{ item.num }}
				<br />
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
const title = ref('Hello');
const list = reactive([
	{ name: 'apple', num: 1 },
	{ name: 'orange', num: 2 }
]);
</script>

<style>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.logo {
	height: 200rpx;
	width: 200rpx;
	margin-top: 200rpx;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 50rpx;
}

.text-area {
	display: flex;
	justify-content: center;
}

.title {
	font-size: 36rpx;
	color: #8f8f94;
}
</style>
