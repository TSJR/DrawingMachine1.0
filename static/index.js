import {get_bw} from "./gen_coords.js";

let dialog = document.querySelector("#file-select");
let upload_btn = document.querySelector("#upload-img");
let del_btn = document.querySelector("#del-img");
let send_btn = document.querySelector("#send-img");
let img_area = document.querySelector("#img-area");

function open_dialog() {
    dialog.click();
}

function update_buttons(upload) {
    if (!upload) {
        send_btn.style.display = "inline-block";
        del_btn.style.display = "inline-block";
        upload_btn.style.display = "none";
    }
    else {
        send_btn.style.display = "none";
        del_btn.style.display = "none";
        upload_btn.style.display = "inline-block";
    }
}

function update_img() {
    if (dialog.files.length > 0) {
        let file = dialog.files[0];
        let image = new Image();
        let canvas = document.querySelector("canvas");
        image.src = URL.createObjectURL(file);
        canvas.style.width = "30vw";
        let ctx = canvas.getContext("2d", { willReadFrequently: true });
        image.onload = function(){
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);
        }

        img_area.appendChild(canvas);

        update_buttons(false);
    }
    else {
        update_buttons(true);
    }
}

function del_img() {
    let canvas = document.querySelector("canvas");
    let ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.height = 0;

    update_buttons(true);
}

function upload_img() {
    let all = get_bw();

    let img_data = all[0]
    let obj_data = all[1];
    let canvas = document.querySelector("canvas");
    let ctx = canvas.getContext("2d", { willReadFrequently: true });

    img_data = new ImageData(new Uint8ClampedArray(img_data), canvas.width);
    ctx.putImageData(img_data, 0, 0);


}

upload_btn.addEventListener("click", open_dialog);
dialog.addEventListener("change", update_img);
del_btn.addEventListener("click", del_img);
send_btn.addEventListener("click", upload_img);