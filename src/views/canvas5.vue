<template>
    <canvas ref="canvas" width="800" height="800"></canvas>
    <canvas ref="el"></canvas>
    <!-- <video ref="video" width="320" height="240" controls>
        <source src="movie.mp4" type="video/mp4">
        <source src="movie.ogg" type="video/ogg">
    </video> -->
</template>

<script lang="ts" setup>
import type { ComputedRef } from 'vue';
const canvas = ref<HTMLCanvasElement>();
const ctx = computed(() => canvas.value?.getContext('2d')!);


const el = ref<HTMLCanvasElement>();
const ctx_el = computed(() => el.value?.getContext('2d')!);


const video = ref();


const createGradident = (ctx: CanvasRenderingContext2D) => {
    const liner = ctx.createLinearGradient(0, 0, 0, 150);
    liner.addColorStop(0, 'blue')
    liner.addColorStop(0.5, 'white')
    liner.addColorStop(1, 'red');

    const radgrad = ctx.createRadialGradient(45, 45, 10, 52, 50, 30);
    // radgrad.addColorStop(0, '#A7D30C');
    // radgrad.addColorStop(0.9, '#019F62');
    // radgrad.addColorStop(1, 'rgba(1,159,98,0)');
    radgrad.addColorStop(0, '#FF5F98');
    radgrad.addColorStop(0.75, '#FF0188');
    radgrad.addColorStop(1, 'rgba(255,1,136,0)');
    ctx.fillStyle = liner;
    ctx.fillStyle = radgrad;
    ctx.fillRect(0, 0, 150, 150);
}


function draw(ctx: CanvasRenderingContext2D) {
    // 创建新 image 对象，用作图案
    var img = new Image();
    img.src = './favicon.ico';
    img.onload = function () {
        // 创建图案
        var ptrn = ctx.createPattern(img, 'repeat')!;
        ctx.fillStyle = ptrn;
        ctx.fillRect(0, 0, 150, 150);
    }
}

function drawText(ctx: CanvasRenderingContext2D) {

    ctx.shadowOffsetX = 22;
    ctx.shadowOffsetY = 22;
    ctx.shadowBlur = 11;
    ctx.shadowColor = "red";

    ctx.font = "80px Times New Roman";
    ctx.fillStyle = "Black";
    ctx.fillText("Sample String", 100, 300);
}

function circle(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = 'red'
    ctx.arc(50, 50, 30, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.arc(50, 50, 15, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.closePath();
}


function drawImage(ctx: CanvasRenderingContext2D) {
    var img = new Image();
    // var img = new Image();
    // img.onload = function () {
    //     for (var i = 0; i < 4; i++) {
    //         for (var j = 0; j < 3; j++) {
    //             ctx.drawImage(img, j * 50, i * 38, 50, 38);
    //         }
    //     }
    // };

    img.src = './favicon.ico';

    img.onload = () => {
        const cc = ctx.createPattern(img, 'no-repeat')!;
        ctx.fillStyle = cc;
        ctx.fillRect(0, 0, 100, 100)
    }




}

onMounted(() => {
    circle(ctx_el.value);
})

</script>

<style scoped>
</style>