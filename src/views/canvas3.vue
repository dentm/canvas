<template>
    <canvas ref="el" width="1000" height="800" class="b-1"></canvas>
    <div class="b-1" style="width:100px; height:100px; position:fixed; top:0; right:10px; border-radius: 15px;"></div>
</template>

<script lang="ts" setup>
import type { ComputedRef } from 'vue'
const el = ref<HTMLCanvasElement>()
const ctx: ComputedRef<CanvasRenderingContext2D> = computed(() => el.value?.getContext('2d')!)

function drawColorBlock() {
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 6; j++) {
            ctx.value.fillStyle = `rgb(${~~(Math.random() * 255)}, ${~~(Math.random() * 255)}, 0)`;
            ctx.value.fillRect(j * 25, i * 25, 25, 25);
        }
    }
}
function drawLine() {
    ctx.value.beginPath();
    ctx.value.arc(75, 75, 50, 0, Math.PI * 2, true); // 绘制
    // ctx.value.moveTo(110, 75);
    ctx.value.arc(75, 75, 35, 0, Math.PI, false);   // 口 (顺时针)
    // ctx.value.moveTo(65, 65);
    // ctx.value.arc(60, 65, 5, 0, Math.PI * 2, true);  // 左眼
    // ctx.value.moveTo(95, 65);
    // ctx.value.arc(90, 65, 5, 0, Math.PI * 2, true);  // 右眼
    ctx.value.stroke();
}
function drawCurve2() {
    // ctx.value.beginPath();
    // ctx.value.moveTo(75, 25);
    // ctx.value.quadraticCurveTo(100, 200, 200, 400)
    // ctx.value.stroke();
    // ctx.value.closePath();

    // ctx.value.beginPath();
    // ctx.value.moveTo(75, 25);
    // ctx.value.lineTo(200, 400)
    // ctx.value.stroke();
    // ctx.value.closePath();


    // ctx.value.beginPath();
    // ctx.value.strokeStyle = '#f00'
    // ctx.value.moveTo(75, 25);
    // ctx.value.lineTo(100, 200)
    // ctx.value.stroke();
    // ctx.value.closePath();

    ctx.value.beginPath();
    ctx.value.moveTo(75, 25);
    ctx.value.quadraticCurveTo(25, 25, 25, 62.5);
    // ctx.value.quadraticCurveTo(25, 100, 50, 100);
    // ctx.value.quadraticCurveTo(50, 120, 30, 125);
    // ctx.value.quadraticCurveTo(60, 120, 65, 100);
    // ctx.value.quadraticCurveTo(125, 100, 125, 62.5);
    // ctx.value.quadraticCurveTo(125, 25, 75, 25);
    ctx.value.stroke();
}
const drawHeart = () => {
    //三次贝塞尔曲线
    ctx.value.beginPath();
    ctx.value.moveTo(75, 40);
    ctx.value.quadraticCurveTo(70, 25, 50, 25);
    // ctx.value.quadraticCurveTo(70, 25, 25, 65);
    ctx.value.quadraticCurveTo(20, 30.5, 20, 62.5);
    // ctx.value.quadraticCurveTo(20, 62.5, 20, 62.5);
    ctx.value.quadraticCurveTo(40, 102, 75, 120);
    ctx.value.quadraticCurveTo(130, 80, 130, 62.5);
    ctx.value.quadraticCurveTo(130, 25, 100, 25);
    ctx.value.quadraticCurveTo(75, 37, 75, 40);
    ctx.value.fill();
}
function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    ctx.lineTo(x, y + height - radius);
    ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
    ctx.lineTo(x + width - radius, y + height);
    ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
    ctx.lineTo(x + width, y + radius);
    ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
    ctx.lineTo(x + radius, y);
    ctx.quadraticCurveTo(x, y, x, y + radius);
    ctx.stroke();
}

function drawRect(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    let i = 0;
    while (i < 300) {
        i++
        ctx.fillRect(Math.random() * 1000, Math.random() * 800, 5, 5)
    }
    ctx.fill();
    ctx.closePath()
}

const drawGamer = (ctx: CanvasRenderingContext2D) => {

    ctx.beginPath();
    ctx.arc(37, 37, 13, Math.PI / 7, -Math.PI / 7, false);
    ctx.lineTo(31, 37);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(83, 116);
    ctx.lineTo(83, 102);
    ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);
    ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);
    ctx.lineTo(111, 116);
    ctx.lineTo(106.333, 111.333);
    ctx.lineTo(101.666, 116);
    ctx.lineTo(97, 111.333);
    ctx.lineTo(92.333, 116);
    ctx.lineTo(87.666, 111.333);
    ctx.lineTo(83, 116);
    ctx.stroke();

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(91, 96);
    ctx.bezierCurveTo(88, 96, 87, 99, 87, 101);
    ctx.bezierCurveTo(87, 103, 88, 106, 91, 106);
    ctx.bezierCurveTo(94, 106, 95, 103, 95, 101);
    ctx.bezierCurveTo(95, 99, 94, 96, 91, 96);
    ctx.moveTo(103, 96);
    ctx.bezierCurveTo(100, 96, 99, 99, 99, 101);
    ctx.bezierCurveTo(99, 103, 100, 106, 103, 106);
    ctx.bezierCurveTo(106, 106, 107, 103, 107, 101);
    ctx.bezierCurveTo(107, 99, 106, 96, 103, 96);
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(101, 102, 2, 0, Math.PI * 2, true);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(89, 102, 2, 0, Math.PI * 2, true);
    ctx.fill();

}

const drawPath2D = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    const rectBlock = new Path2D();
    rectBlock.arc(100, 100, 30, 0, 2 * Math.PI, false);
    ctx.stroke(rectBlock);
    ctx.quadraticCurveTo
    const fillBlcok = new Path2D();
    fillBlcok.rect(200, 200, 100, 100);
    ctx.fill(fillBlcok)
    ctx.closePath();
}

onMounted(() => {
    // roundedRect(ctx.value, 100, 100, 100, 100, 15);
    // drawRect(ctx.value)
    // drawGamer(ctx.value);
    drawPath2D(ctx.value)
})


</script>

<style scoped>
</style>