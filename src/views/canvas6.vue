<template>
    <canvas ref="canvas" width="1000" height="800"></canvas>
    <!-- <div>
        <img id="source" src="icon.ico" width="300" height="227">
        <img id="frame" src="icon.ico" width="500" height="500">
    </div> -->
</template>

<script lang="ts" setup>
const canvas = ref();
const ctx = computed(() => canvas.value.getContext('2d')!);



function draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.strokeRect(0, 0, 1000, 800)
    ctx.stroke();
    ctx.closePath();


    ctx.imageSmoothingEnabled = false;

    setTimeout(() => {
        ctx.drawImage(
            document.getElementById('source') as HTMLImageElement,
            33, 71,
            104, 124,
            21, 20,
            87, 104
        );

        // Draw frame
        ctx.drawImage(
            document.getElementById('frame') as HTMLImageElement,
            0, 0,
            500, 500
        );
    }, 3000)

}

function saveCanvas(ctx: CanvasRenderingContext2D) {
    ctx.fillRect(0, 0, 150, 150);   // 使用默认设置绘制一个矩形
    ctx.save();                  // 保存默认状态

    ctx.fillStyle = '#09F'       // 在原有配置基础上对颜色做改变
    ctx.fillRect(15, 15, 120, 120); // 使用新的设置绘制一个矩形

    ctx.save();                  // 保存当前状态
    ctx.fillStyle = 'red'       // 再次改变颜色配置
    ctx.globalAlpha = 0.5;
    ctx.fillRect(30, 30, 90, 90);   // 使用新的配置绘制一个矩形

    ctx.restore();               // 重新加载之前的颜色状态    
    ctx.fillRect(45, 45, 60, 60);   // 使用上一次的配置绘制一个矩形

    // ctx.restore();               // 加载默认颜色配置
    // ctx.fillRect(60, 60, 30, 30);   // 使用加载的配置绘制一个矩形
}

function translate(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, 300, 300);
    var sin = Math.sin(Math.PI / 12);
    var cos = Math.cos(Math.PI / 12);
    ctx.translate(100, 100);
    var c = 0;
    for (var i = 0; i <= 24; i++) {
        c = Math.floor(255 / 24 * i);
        ctx.fillStyle = "rgb(" + c + "," + c + "," + c + ")";
        ctx.fillRect(0, 0, 100, 10);
        ctx.transform(cos, sin, -sin, cos, 0, 0);
    }
    // ctx.setTransform(-1, 0, 0, 1, 100, 100);
}


onMounted(() => {
    translate(ctx.value)
})


</script>

<style scoped>
</style>