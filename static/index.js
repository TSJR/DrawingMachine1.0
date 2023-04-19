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
        while (img_area.firstChild) {
            img_area.removeChild(img_area.firstChild);
        }
        let file = dialog.files[0];
        let image = document.createElement("img");
        image.src = URL.createObjectURL(file);
        image.style.width = "30vw";
        image.id = "color-image"
        img_area.appendChild(image);
        update_buttons(false);
    }
    else {
        update_buttons(true);
    }
}

function del_img() {
    while (img_area.firstChild) {
        img_area.removeChild(img_area.firstChild);
    }
    update_buttons(true);
}

function upload_img() {
    let img =  document.querySelector("img");
    get_bw(img);
}

upload_btn.addEventListener("click", open_dialog);
dialog.addEventListener("change", update_img);
del_btn.addEventListener("click", del_img);
send_btn.addEventListener("click", upload_img);