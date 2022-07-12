<template>
    <canvas ref="canvas" width="400" height="400" style="border:1px solid #000"></canvas>
</template>

<script lang="ts" setup>
const canvas = ref<HTMLCanvasElement>()
const ctx = computed(() => canvas.value?.getContext('2d'))

const drawLine = () => {
    ctx.value?.beginPath();
    ctx.value?.moveTo(75, 50);
    ctx.value?.lineTo(100, 100);
    ctx.value?.lineTo(200, 200);
    ctx.value?.stroke();
    (ctx.value as CanvasRenderingContext2D).strokeStyle = '#fff'
    ctx.value?.fill();
}

onMounted(() => {
    drawLine()
})
</script>

<style scoped>
</style>