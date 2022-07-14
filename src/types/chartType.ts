export type OuterOption = {
    ctx: CanvasRenderingContext2D,
    lineWidth: number,
    color?: string,
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number
}

export type InnerOption = {
    ctx: CanvasRenderingContext2D,
    [propName: string]: any
}

export type RectOption = {
    ctx: CanvasRenderingContext2D,
    [propName: string]: any
}

export type ImageOption = {
    ctx: CanvasRenderingContext2D,
    [propName: string]: any
}

export type SeriesItem = {
    name: string,
    value: number,
    disabled?: boolean
}
