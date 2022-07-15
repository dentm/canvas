import { ArcOption, RectOption, ImageOption } from './../types/chartType';
import gsap from 'gsap'

export declare class CanvasType {
    drawArc(option: ArcOption): void
    drawRect(option: RectOption): void
    drawImage(option: ImageOption): void
    getLinearGradient(colors: any[]): any
    clearCanvas(): void
}


class TopCanvas implements CanvasType {

    ctx: CanvasRenderingContext2D
    width: number
    height: number

    constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
    }

    public drawArc({ lineWidth = 10, color, x = 0, y = 0, radius = 30, startAngle = 0, endAngle = Math.PI * 2, lineCap = 'butt' }: ArcOption) {
        this.ctx.lineWidth = lineWidth;
        this.ctx.lineCap = lineCap;
        this.ctx.beginPath();
        this.ctx.strokeStyle = Array.isArray(color) ? this.getLinearGradient(color) : color;
        this.ctx.arc(x, y, radius, startAngle, endAngle);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    public drawRect({ color, x, y, width, height }: RectOption) {
        this.ctx.beginPath();
        this.ctx.fillStyle = Array.isArray(color) ? this.getLinearGradient(color) : color;
        this.ctx.fillRect(x - width / 2, y - height / 2, width, height)
        this.ctx.closePath();
    }

    public drawImage({ x, y, imgSrc, width, height }: ImageOption) {
        if (typeof imgSrc === 'string') {
            const img = new Image();
            img.src = imgSrc;
            img.onload = () => {
                this.ctx.drawImage(img, x - width / 2, y - height / 2, width, height)
            }
        } else {
            this.ctx.drawImage(imgSrc, x - width / 2, y - height / 2, width, height)
        }
    }

    public getLinearGradient(colors: any[]) {
        const linear = this.ctx.createLinearGradient(140, 90, 90, 140);
        colors.forEach((ele: Record<string, any>) => {
            linear.addColorStop(ele.l, ele.color);
        })
        return linear
    }

    public clearCanvas() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

}

export default TopCanvas;