<template>
    <canvas ref="canvas" width="1000" height="800"></canvas>
</template>

<script lang="ts" setup>

const canvas = ref<HTMLCanvasElement>();
const ctx = computed(() => canvas.value?.getContext('2d')!);


type Point = {
    x: number,
    y: number
}


const draw = (ctx: CanvasRenderingContext2D) => {


    const LENHTH = 100;
    const X = 500;
    const Y = 500;

    const creatxAxis = ({ x, y }: Point, endPoint: Point, index: string) => {
        ctx.beginPath();
        ctx.strokeStyle = 'red'
        ctx.moveTo(x, y);
        ctx.lineTo(endPoint.x, endPoint.y);
        ctx.fillText(index, endPoint.x, endPoint.y + 22)
        ctx.stroke();
        ctx.closePath();
    }
    const creatyAxis = ({ x, y }: Point, endPoint: Point, index: string) => {
        ctx.beginPath();
        ctx.strokeStyle = 'red'
        ctx.moveTo(x, y);
        ctx.lineTo(endPoint.x, endPoint.y);
        if (index !== '0') {
            ctx.fillText(index, endPoint.x - 22, endPoint.y,)
        }

        ctx.stroke();
        ctx.closePath();
    }

    for (let i = 0; i < LENHTH; i++) {
        creatxAxis(
            {
                x: i * 10 + X,
                y: Y
            },
            {
                x: i * 10 + X,
                y: Y - 10
            },
            `${i}`
        )
        creatyAxis(
            {
                x: X,
                y: Y - i * 10
            },
            {
                x: X + 10,
                y: Y - i * 10
            },
            `${i}`
        )
    }


    const drawAxis = () => {
        ctx.beginPath();
        ctx.strokeStyle = '#f00'
        ctx.moveTo(X, Y);
        ctx.lineTo(X, -Y)
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.strokeStyle = '#f00'
        ctx.moveTo(X, Y);
        ctx.lineTo(X + 500, Y)
        ctx.stroke();
        ctx.closePath();
    }
    drawAxis()
}

onMounted(() => {
    draw(ctx.value);
})

</script>

<style scoped>
</style>