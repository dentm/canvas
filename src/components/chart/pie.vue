<template>
    <div class='canvas-wrapper'>
        <canvas ref='el' :width="WIDTTH" :height="HEIGHT"></canvas>
    </div>

</template>

<script lang="ts" setup>
import type { ComputedRef } from 'vue';
import { colorGroup } from '@/utils/index'
import { SeriesItem } from '@/types/chartType';
import TopCanvas, { CanvasType } from '@/utils/useChart'
import icon1 from '@/assets/icon/icon1.png'
const WIDTTH = 180;
const HEIGHT = 180

type Props = {
    series: Array<SeriesItem>
}
const props = defineProps<Props>()

const total = computed(() => {
    return props.series.reduce((pre, cur) => {
        return pre + (cur?.disabled ? 0 : cur.value)
    }, 0)
})

const SPACING = 0.1;
const el = ref<HTMLCanvasElement>()
const ctx: ComputedRef<CanvasRenderingContext2D> = computed(() => el.value?.getContext('2d')!);


let topCanvas: CanvasType;

const createPie = (topCanvas: CanvasType) => {
    // 清空画布
    topCanvas.clearCanvas();
    // 绘制外层圆
    let startAngle = 0;
    let endAngle = 0;
    props.series.forEach((ele: SeriesItem, index: number) => {
        if (!ele.disabled) {
            startAngle = endAngle + SPACING;
            endAngle = endAngle + (ele.value / total.value) * (2 * Math.PI)
            topCanvas.drawArc({
                lineWidth: 12,
                x: 90,
                y: 90,
                color: colorGroup[index],
                radius: 75,
                startAngle,
                endAngle
            })
        }
    });
    // 绘制内圆
    topCanvas.drawArc({
        lineWidth: 3, x: 90, y: 90, radius: 50,
        color: [
            {
                l: 0,
                color: 'RGBA(87, 154, 207, 1)'
            },
            {
                l: 0.7,
                color: 'RGBA(87, 154, 207, 0.5)'
            },
            {
                l: 1,
                color: 'RGBA(87, 154, 207, 0.2)'
            }
        ],
        startAngle: Math.PI * -0.1,
        endAngle: Math.PI * 0.4
    });
    topCanvas.drawArc({
        lineWidth: 3, x: 90, y: 90, radius: 50,
        color: [
            {
                l: 0,
                color: 'RGBA(87, 154, 207, 1)'
            },
            {
                l: 0.7,
                color: 'RGBA(87, 154, 207, 0.5)'
            },
            {
                l: 1,
                color: 'RGBA(87, 154, 207, 0.2)'
            }
        ],
        startAngle: Math.PI * 0.9, endAngle: Math.PI * 1.4
    });
    // 绘制图片背景
    topCanvas.drawRect({ color: '#3A4249', x: 90, y: 90, width: 42, height: 40 })
    // 绘制图片
    topCanvas.drawImage({ x: 90, y: 90, width: 27, height: 27, imgSrc: icon1 });
}

watch(() => props.series, newVal => {
    if (!topCanvas) {
        topCanvas = new TopCanvas(ctx.value, WIDTTH, HEIGHT)
    }
    createPie(topCanvas);
}, {
    deep: true,
    flush: 'post'
})
onMounted(() => {
    if (!topCanvas) {
        topCanvas = new TopCanvas(ctx.value, WIDTTH, HEIGHT)
    }
    createPie(topCanvas);
})

</script>

<style scoped lang="scss">
.canvas-wrapper {
    width: 180px;
    height: 180px;
}
</style>