<template>
    <div class='canvas-wrapper'>
        <canvas ref='el' :width="WIDTTH" :height="HEIGHT"></canvas>
        <canvas ref='img' width="30" height="30" style="display: none;"></canvas>
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
const el = ref<HTMLCanvasElement>();
const ctx: ComputedRef<CanvasRenderingContext2D> = computed(() => el.value?.getContext('2d')!);

const img = ref<HTMLCanvasElement>();
const img_ctx = computed(() => img.value?.getContext('2d')!);

let topCanvas: CanvasType;


const count = ref(0);
const speed = ref(0.05);
let timer: number;
let points: any[] = [];

const getPoint = (val: any[]) => {
    let startAngle = 0;
    let endAngle = 0;
    let step = 50;
    val.forEach((ele: SeriesItem, index: number) => {
        if (!ele.disabled) {
            startAngle = endAngle + SPACING;
            endAngle = endAngle + (ele.value / total.value) * (2 * Math.PI);
            points.push({
                startAngle,
                endAngle,
                step: (endAngle - startAngle) / step,
                index
            })
        }
    });
}

const createPie = () => {
    timer = requestAnimationFrame(() => {
        topCanvas.clearCanvas();

        points.forEach((ele: any, index: number) => {
            topCanvas.drawArc({
                lineWidth: 12,
                x: 90,
                y: 90,
                color: colorGroup[ele.index],
                radius: 75,
                startAngle: ele.startAngle,
                endAngle: ele.startAngle + ele.step * count.value > ele.endAngle
                    ? ele.endAngle
                    : ele.startAngle + ele.step * count.value,
            })
        })

        topCanvas.drawArc({
            lineWidth: 3, x: 90, y: 90, radius: 50,
            lineCap: 'round',
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
            startAngle: Math.PI * -0.1 + count.value * speed.value,
            endAngle: Math.PI * 0.4 + count.value * speed.value
        });
        topCanvas.drawArc({
            lineWidth: 3, x: 90, y: 90, radius: 50,
            lineCap: 'round',
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
            startAngle: Math.PI * 0.9 + count.value * speed.value,
            endAngle: Math.PI * 1.4 + count.value * speed.value
        });
        // 绘制图片背景
        topCanvas.drawRect({ color: '#3A4249', x: 90, y: 90, width: 42, height: 40 })
        // 绘制图片
        topCanvas.drawImage({ x: 92, y: 92, width: 28, height: 28, imgSrc: img.value as HTMLCanvasElement });
        count.value++
        createPie();
    })

}

const drawImage = () => {
    const img = new Image();
    img.src = icon1;
    img.onload = () => {
        img_ctx.value.drawImage(img, 0, 0, 27, 27);
    }
}


watch(() => props.series, newVal => {
    if (!topCanvas) {
        topCanvas = new TopCanvas(ctx.value, WIDTTH, HEIGHT)
    }
    cancelAnimationFrame(timer);
    points.length = 0;
    count.value = 0;
    getPoint(newVal)
    createPie();

}, {
    deep: true,
    flush: 'post'
})
onMounted(() => {
    if (!topCanvas) {
        topCanvas = new TopCanvas(ctx.value, WIDTTH, HEIGHT)
    }
    cancelAnimationFrame(timer);
    getPoint(props.series)
    createPie();
    // 额外绘制图片 解决图片加载问题
    drawImage();
})

</script>

<style scoped lang="scss">
.canvas-wrapper {
    width: 180px;
    height: 180px;
}
</style>