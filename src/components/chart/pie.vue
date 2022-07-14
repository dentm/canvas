<template>
    <div class='canvas-wrapper'>
        <canvas ref='el' width="180" height="180"></canvas>
    </div>

</template>

<script lang="ts" setup>
import type { ComputedRef } from 'vue';
import { colorGroup } from '@/utils/index'
import { OuterOption, SeriesItem, InnerOption, RectOption, ImageOption } from '@/types/chartType';

import icon1 from '@/assets/icon/icon1.png'

type Props = {
    series: Array<SeriesItem>
}
const props = defineProps<Props>()

const total = computed(() => {
    return props.series.reduce((pre, cur) => {
        return pre + cur.value
    }, 0)
})

const SPACING = 0.1;
const el = ref<HTMLCanvasElement>()
const ctx: ComputedRef<CanvasRenderingContext2D> = computed(() => el.value?.getContext('2d')!);

function drawOuterArc({ ctx, lineWidth = 10, color, x = 0, y = 0, radius = 30, startAngle = 0, endAngle = Math.PI * 2 }: OuterOption) {
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.strokeStyle = color ?? '#fff';
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.stroke();
    ctx.closePath();
}

function drawInnerArc({ ctx, lineWidth = 10, color, x = 0, y = 0, radius = 30, startAngle = 0, endAngle = Math.PI * 2 }: InnerOption) {
    const linear = color && color();
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.strokeStyle = linear;
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.stroke();
    ctx.closePath();

}

function drawRect({ ctx, color, x, y, width, height }: RectOption) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x - 21, y - 20, width, height)
    ctx.closePath();
}

function drawImage({ ctx, x, y, imgSrc, width, height }: ImageOption) {
    const img = new Image();
    img.src = imgSrc;
    img.onload = () => {
        ctx.drawImage(img, x - width / 2, y - height / 2, width, height)
    }
}


const createPie = (ctx: CanvasRenderingContext2D) => {
    if (!ctx) return
    ctx.clearRect(0, 0, 500, 500);

    let startAngle = 0;
    let endAngle = 0;
    console.log(props.series);

    props.series.forEach((ele: SeriesItem, index: number) => {
        startAngle = endAngle + SPACING;
        endAngle = endAngle + (ele.value / total.value) * (2 * Math.PI)
        drawOuterArc({
            ctx,
            lineWidth: 12,
            x: 90,
            y: 90,
            color: colorGroup[index],
            radius: 75,
            startAngle,
            endAngle
        })
    });
    drawInnerArc({
        ctx, lineWidth: 3, x: 90, y: 90, radius: 50,
        color: () => {
            const colors = [
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
            ]
            const linear = ctx.createLinearGradient(140, 90, 90, 140);
            colors.forEach((ele: Record<string, any>) => {
                linear.addColorStop(ele.l, ele.color);
            })
            return linear
        },
        startAngle: Math.PI * -0.1,
        endAngle: Math.PI * 0.4
    });
    drawInnerArc({
        ctx, lineWidth: 3, x: 90, y: 90, radius: 50,
        color: () => {
            const colors = [
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
            ]
            const linear = ctx.createLinearGradient(40, 140, 90, 40);
            colors.forEach((ele: Record<string, any>) => {
                linear.addColorStop(ele.l, ele.color);
            })
            return linear
        },
        startAngle: Math.PI * 0.9, endAngle: Math.PI * 1.4
    });
    drawRect({ ctx, color: '#3A4249', x: 90, y: 90, width: 42, height: 40 })
    drawImage({ ctx, x: 90, y: 90, width: 27, height: 27, imgSrc: icon1 })

}

watch(() => props.series, (newVal, oldVal) => {
    createPie(ctx.value);
}, {
    deep: true
})

onMounted(() => {
    createPie(ctx.value);
})


</script>

<style scoped lang="scss">
.canvas-wrapper {
    width: 180px;
    height: 180px;
}
</style>