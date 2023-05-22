function randomNumberGame();{
let num;
let timesRun = 0;
let timer = setInterval(function(){
    num = Math.random();
    timesRun++
    if(num > .75){
        clearInterval(timer);
        console.log("It took" + timesRun + "try/times.")
    }
}, 1000)

}
