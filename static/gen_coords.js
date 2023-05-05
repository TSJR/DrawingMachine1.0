import {progress_bar, progress_counter} from "./index.js";
export class Pixel {
    constructor(row, col, color) {
        this.row = row;
        this.col = col;
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

        cur_row.push([brightness, brightness, brightness]);

    }

    obj_data.push(cur_row);
    return [bw_raw, obj_data];
}

let positions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
let color_map = {
    "10": 245,
    "9": 220,
    "8": 195,
    "7": 170,
    "6": 145,
    "5": 120,
    "4": 95,
    "3": 70,
    "2": 45,
    "1": 20,
    "0": 0
};

function get_mapped(b) {
    let brightness = b[0];
    for (let i = 10; i > 0; i--) {
        let level = `${i}`;
        //console.log(level);
        let value = color_map[level];
        //console.log(brightness);
        if (brightness >= value) {
            //console.log(typeof(level));
            return level;

        }
    }

        return "0";

}

function is_in(arr, item) {
    for (let i = 0; i < arr.length; i++) {
        if (item[0] === arr[i][0] && item[1] === arr[i][1]) {
            return true;
        }
    }
    return false;
}

function get_adjacent(pixels, checked, body, brightness, pixel) {
    let to_return = [];
    let new_checked = [];

    let row = pixel[0];
    let col = pixel[1];
    for (let i = 0; i < positions.length; i++) {
        let pos = positions[i];

        try {
            //console.log(`${get_mapped(pixels[row + pos[0]][col + pos[1]])} to ${brightness}`);
            if (get_mapped(pixels[row + pos[0]][col + pos[1]]) === brightness) {
                // console.log("valid");
                new_checked.push([[row + pos[0]], [col + pos[1]]]);
                to_return.push([[row + pos[0]], [col + pos[1]]]);
            }
        } catch {
            //console.log([row, col]);
            //console.log([pixels.length, pixels[0].length]);
        }

    }
    return [to_return, new_checked];

}
function update_bar(size, i) {
    progress_bar.style.width = `${Math.round(i / size * 100)}%`;
    progress_counter.innerText = `${Math.round(i / size * 100)}%`;
    if (i === size) {
        progress_counter.innerText = `Done!`;
    }
}
export var progress = 0;
export async function get_bodies(obj_data) {
    const sleep = ms => new Promise(res => setTimeout(res, ms));
    let i = 0;
    let checked = [];
    let to_check = []
    let cur_body = [];
    let bodies = [];

    let size = obj_data.length * obj_data[0].length;

    for (let row = 0; row < obj_data.length; row++) {
        for (let col = 0; col < obj_data[0].length; col++) {

            //console.log(checked.length);
            if (!is_in(checked, [row, col])) {
                i++;
                let brightness = get_mapped(obj_data[row][col]);
                //console.log(`brightness is ${(obj_data[row][col])}`);
                cur_body.push([row, col, brightness]);
                //NOT A NEW PIXEL
                let raw = get_adjacent(obj_data, checked, cur_body, brightness, [row, col]);
                let adjacents = raw[0];
                checked = checked.concat(raw[1]);
                //console.log(raw[1].length);
                to_check = to_check.concat(adjacents);

                if (i % 100 === 0 || i === size) {
                    update_bar(size, i);
                    await sleep(20);
                }

                while (to_check.length !== 0) {
                    let next_check = [];
                    for (let i = 0; i < to_check.length; i++) {
                        let check = to_check[i];
                        //NOT A NEW PIXEL
                        cur_body.push([check[0][0], check[1][0], brightness]);
                        let raw = get_adjacent(obj_data, checked, cur_body, brightness, [check[0], check[1]]);
                        next_check = next_check.concat(raw[0]);
                        try {
                            checked = checked.concat(raw[1])
                        } catch (e) {
                            //console.log(e);

                       }

                    }
                    to_check = next_check;


                }

                bodies.push(cur_body);
                cur_body = [];

            } else {
                console.log("already there");
            }
        }
    }
    console.log(bodies.length);
    return bodies;
}