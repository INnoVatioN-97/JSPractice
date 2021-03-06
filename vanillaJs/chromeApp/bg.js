const body = document.querySelector("body");

const IMG_NUMBER = 5;

function paintImg(IMG_NUMBER){
    const image = new Image();
    image.src = `./bgPictures/${IMG_NUMBER + 1}.jpg`;
    image.classList.add("bgImage");
    body.prepend(image);
}

function genRandom(){
    const number = Math.floor(Math.random()* IMG_NUMBER);
    return number;
}

function init(){
    const randomNumber = genRandom();
    paintImg(randomNumber)
}
init();