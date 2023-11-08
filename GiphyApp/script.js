 let submitBtn = document.getElementById("submit-btn");

 let generateGif = () => {
    //display loader until gif loads
    let loader = document.querySelector(".loader");
    loader.style.display = "block";
    document.querySelector(".wrapper").style.display = "none";

    //Get search value (default => laugh)
    let q = document.getElementById("search-box").value;
    //Lets have 10 Gifs displayed
    let gifCount = 15;
    //API URL =
    let finalURL = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${q}&limit=${gifCount}&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;
    document.querySelector(".wrapper").innerHTML = "";

    //make a call for api
    fetch(finalURL)
        .then(resp => resp.json())
        .then((info) => {
            console.log(info.data);
            //All gifs
            let gifsData = info.data;
            gifsData.forEach((gif) => {
                //Generate cards for each gif
                let container = document.createElement("div");
                container.classList.add("container");
                let iframe = document.createElement("img");
                console.log(gif);
                iframe.setAttribute("src", gif.images.fixed_width.url);
                iframe.onload = () => {
                    //if iframes has loaded correctly reduce the count when each gif laods
                    gifCount--;
                    if (gifCount == 0) {
                        //If all gifs loaded then hide loader and display gifs UI
                        loader.style.display = "none";
                        document.querySelector(".wrapper").style.display = "grid";
                    }
                };
                container.append(iframe);


                //Copy link button
                let copyBtn = document.createElement("button");
                copyBtn.innerText = "Copy Link";
                copyBtn.onclick = () => {
                    //Append the obtained ID to default URL
                    let copyLink = `https://media4.giphy.com/media/${gif.id}/giphy.mp4`;
                    //Copy text inside the text field
                    navigator.clipboard.writeText(copyLink).then(() => {
                        alert("Gif copied to clipboard!");
                    })
                    .catch(() => {
                        //If navigator is not supperted
                        alert("Gif copied to clipboard!");
                        //create temporary input
                        let hiddenInput = document.createElement("input");
                        hiddenInput.setAttribute("type", "text");
                        document.body.appendChild(hiddenInput);
                        hiddenInput.value = copyLink;
                        //Select input
                        hiddenInput.select();
                        //Copy the value 
                        document.execCommand("copy");
                        //remove the input
                        document.body.removeChild(hiddenInput);
                    });
                };
                container.append(copyBtn);
                document.querySelector(".wrapper").append(container);
            });
        });
};
 //generate Gifs on screen load or when you click on submit
 submitBtn.addEventListener("click", generateGif);
 window.addEventListener("load", generateGif);