function randomRGB() {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    return `rgb(${r},${g},${b})`
}

const h1 = document.querySelector('h1');
h1.style.color = randomRGB();

const letters = document.querySelectorAll('.letter')

console.log (letters);

setInterval(function () {
    for (let letter of letters) {
        letter.style.color = randomRGB();

        // console.log(letter);
    }
}, 2000);


