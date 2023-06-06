document.addEventListener('mousemove', function(e) {
    // console.log(e.pageX, e.pageY);
   const r = Math.round(e.pageX * 255 / window.innerWidth);
   const b = Math.round(e.pageY * 255 / window.innerHeight);
   const color = `rgb(${r}, 0, ${b})`;
//    can move the r & b ^^ variables around for different color combo: `rgb(0, ${r}, ${b})`; to put green and blue colors in or 0 for blue to have reds and greens. 
   document.body.style.backgroundColor = color;
   console.log(color);
});