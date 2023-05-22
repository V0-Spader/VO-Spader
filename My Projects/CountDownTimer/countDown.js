function countDown(time){
    let timer = setInterval(function(){
        time--;
        if(time <= 0){
            clearInterval(timer);
            console.log('Done!');
        }
        else {
            console.log(time);
        }
    }, 1000)
}