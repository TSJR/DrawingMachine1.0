export class Pixel {
    constructor(row, col, color) {
        this.row = row;
        this.col = col;
        this.color = color;
    }
}

export class Body {
    constructor(pixels, color) {
        this.pixels = pixels;
        this.color = color;
    }
}

export function to_img(img, len) {

}
export function get_bw() {
    let c = document.querySelector("canvas");
    let ctx = c.getContext("2d");

    let raw_data = ctx.getImageData(0, 0, c.width, c.height).data;
    let obj_data = []
    let bw_raw = []
    let cur_row = []

    for (let i = 0; i < raw_data.length - 3; i += 4) {
        if (cur_row.length % c.width === 0 && cur_row.length > 0) {
            obj_data.push(cur_row);
            cur_row = [];
        }
        let brightness = 0;
        brightness += raw_data[i] / 255 * 0.21;
        brightness += raw_data[i + 1] / 255 * 0.72;
        brightness += raw_data[i + 2] / 255 * 0.07;
        brightness *= 255;
        brightness = Math.trunc(brightness);

        bw_raw.push(brightness, brightness, brightness, 255);

        cur_row.push(new Pixel(Math.trunc(cur_row.length / c.width), cur_row.length % c.width, [brightness, brightness, brightness]));

    }

    obj_data.push(cur_row);
    return [bw_raw, obj_data];
}