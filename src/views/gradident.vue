<template>
    <canvas ref="canvas" width="1000" height="800"></canvas>
</template>

<script lang="ts" setup>
const canvas = ref<HTMLCanvasElement>();
const ctx = computed(() => canvas.value?.getContext('2d')!);

const createGradident = (ctx: CanvasRenderingContext2D) => {
    // const liner = ctx.createLinearGradient();
    // const Radial = ctx.createRadialGradient();

}

onMounted(() => {
    createGradident(ctx.value)
})

</script>

<style scoped>
</style>