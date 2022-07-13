<template>
    <canvas ref="canvas" @click="reload" width="500" height="500"
        style="border:1px solid #000;background: #000;"></canvas>
</template>

<script lang="ts" setup>
import type { ComputedRef } from 'vue';

const canvas = ref<HTMLCanvasElement>();
const ctx: ComputedRef<CanvasRenderingContext2D> = computed(() => canvas.value?.getContext('2d')!)

type Point = {
    x: number,
    y: number
}
type Branch = {
    start: Point,
    length: number,
    theta: number
}

function lineTo(startPoint: Point, endPoint: Point) {
    ctx.value.strokeStyle = 'rgba(123,123,123,0.5)';
    ctx.value.beginPath()
    ctx.value.moveTo(startPoint.x, startPoint.y);
    ctx.value.lineTo(endPoint.x, endPoint.y);
    ctx.value.stroke();
}

function getEndPoint(barnch: Branch) {
    const { start, length, theta } = barnch;
    return {
        x: start.x + length * Math.cos(theta),
        y: start.y + length * Math.sin(theta)
    }
}


function drawBranch(barnch: Branch) {
    const { start } = barnch;
    lineTo(start, getEndPoint(barnch))
}
const DEPTH = 3

const pendingTasks: Function[] = [];

function step(b: Branch, depth = 0) {
    const end = getEndPoint(b);
    drawBranch(b);
    if (depth < DEPTH || Math.random() < 0.5) {
        pendingTasks.push(() => step({
            start: end,
            length: b.length + (Math.random() * 2 - 1),
            theta: b.theta + 0.3 * Math.random()
        }, depth + 1));
    }
    if (depth < DEPTH || Math.random() < 0.5) {
        pendingTasks.push(() => step({
            start: end,
            length: b.length + (Math.random() * 2 - 1),
            theta: b.theta - 0.3 * Math.random()
        }, depth + 1));
    }
}

function execute() {
    const clone = [...pendingTasks];
    pendingTasks.length = 0;
    clone.forEach(fn => fn())
}


let timer = 0, req: number;

function startAnimation() {
    req = window.requestAnimationFrame(() => {
        timer += 1;
        if (timer % 3 == 0) {
            execute();
        }
        startAnimation();
    })
}
const reload = () => {
    cancelAnimationFrame(req);
    ctx.value.clearRect(0, 0, 500, 500);
    pendingTasks.length = 0;
    init();
    startAnimation();
}

startAnimation();

function init() {
    step({
        start: {
            x: 0,
            y: 0
        },
        length: 10,
        theta: Math.PI * (1 / 4)
    })
    step({
        start: {
            x: 500,
            y: 500
        },
        length: 10,
        theta: Math.PI * (5 / 4)
    })

}


onMounted(() => {
    init();
})



</script>

<style scoped>
</style>