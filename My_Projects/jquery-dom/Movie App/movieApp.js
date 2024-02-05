/*
Build an application that uses jQuery to do the following:

  1. Contains a form with two inputs for a title and rating along with a button to submit the form.
  2. When the form is submitted, capture the values for each of the inputs and append them to the 
     DOM along with a button to remove each title and rating from the DOM.
  3. When the button to remove is clicked, remove each title and rating from the DOM.

*/

function clearError () {

    $("#msg").text('');

    // clear the error class (red font) from labels
    $("#movie-title").prev().removeClass('error');
    $("#movie-rating").prev().removeClass('error');
    $("#msg").removeClass('error');

}


function formInputsAreValid() {

    let validValues = false;

    let movieTitle = $("#movie-title").val();

    if (movieTitle) {

        if (movieTitle.length > 1) {
            validValues = true;
        } else {
            $("#msg").text('Movie titles must be at least 2 characters.');
            $("#movie-title").prev().addClass('error');
        }
    } else {
        $("#msg").text('Movie titles must be at least 2 characters.');
        $("#movie-title").prev().addClass('error');
    }

    // if we have a valid movie title from above, check the rating range
    if (validValues) {

        validValues = false;

        // force a 0 so they don't have to type 0.
        let movieRating = 0 + $("#movie-rating").val();

        if ((movieRating >= 0) && (movieRating <= 10)) {
            validValues = true;
        } else {
            $("#msg").text('Movie rating must be between 0 and 10.');
            $("#movie-rating").prev().addClass('error');
        }

    }

    return validValues;

}


function buildStarString(inRating) {

    let outRating = ("&#x2B50;").repeat(Math.round(inRating));

    return outRating;
};


// handle the add movie button click
$("#button-add").on("click", (event) => {

    event.preventDefault();

    clearError();

    if (formInputsAreValid()) {

        // build:
        //  <div>
        //    "Title" star rating  <button>test button3</button>
        //  </div>
        let movieDetails = `"${$("#movie-title").val()}"&nbsp;&nbsp;`
        movieDetails = movieDetails + `  ${buildStarString($("#movie-rating").val())}`

        let $movieDiv = $("<div>").html(movieDetails).addClass("movie-details");
        $("<button>").text("X").addClass("rmvbutton").appendTo($movieDiv);
        $(".movies").append($movieDiv);

        // clear all inputs
        $('input').val('');

    }

});


// handle the delete button click
$(".movies").on("click", ".rmvbutton", () => {

    // the event is added to the movies container, but the button we need to 
    //  monitor for the click is .rmvbutton. 
    // Ironically, the rmvbutton class was created just to style the button!
    // jQuery properly determines 'this' is the button that was clicked so 
    //  no event.target rot is needed.

    //console.dir(event.target);
    //console.log($(this).parent())

    $(this).parent().remove();

});