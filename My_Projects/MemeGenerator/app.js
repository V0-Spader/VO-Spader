const imageFileInput = document.querySelector("#imageFileInput");
const topTextInput = document.querySelector("#topTextInput");
const bottomTextInput = document.querySelector("#bottomTextInput");
const canvas = document.querySelector("#meme");

let image;

imageFileInput.addEventListener('change', () => {
    const imageDataUrl = URL.createObjectURL(imageFileInput.files[0]);

    image = new Image();
    image.src = imageDataUrl;

    image.addEventListener("load", () => {
        updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
    }, { once: true });
});

topTextInput.addEventListener("change", () => {
    updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value)
} );

bottomTextInput.addEventListener("change", () => {
    updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value)
});

function updateMemeCanvas(canvas, image, topText, bottomText) {
    const context = canvas.getContext('2d');
    const width = image.width;
    const height = image.height; 
    const fontSize = Math.floor(width/10);
    const yOffset = height / 25;

    // Update Canvas Background
    canvas.width = width;
    canvas.height = height;
    context.drawImage(image, 0, 0);

    // Prepare Text
    context.strokeStyle = "black";
    context.lineWidth = Math.floor(fontSize /4);
    context.fillStyle = "white";
    context.textAlign = "center";
    context.lineJoin = "round";
    context.font = `${fontSize}px sans-serif`;

    // Add Top Text
    context.textBaseline = "top";
    context.strokeText(topText, width/2, yOffset);
    context.fillText(topText, width / 2, yOffset);

    // Bottom Text
    context.textBaseline = "bottom";
    context.strokeText(bottomText, width / 2, height - yOffset);
    context.fillText(bottomText, width / 2, height - yOffset);
}