interface OriginPoint {
    x: number,
    y: number,
}

interface Color {
    color: string | any[],
}

interface Size {
    width: number,
    height: number
}

interface Angle {
    startAngle: number,
    endAngle: number
}


export interface ArcOption extends OriginPoint, Color, Angle {
    lineWidth: number,
    lineCap?: CanvasLineCap,
    radius: number,
}

export interface RectOption extends OriginPoint, Color, Size {

}

export interface ImageOption extends OriginPoint, Size {
    imgSrc: string | HTMLCanvasElement,
}


export type SeriesItem = {
    name: string,
    value: number,
    disabled?: boolean
}
