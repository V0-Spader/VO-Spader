import React from "react";
import "./FoodMenu.css";

/** This the the customr 404 section if the route couldnt find anything match*/
const My404 = () => {
  return (
    <div className="card">
      <h1>Hmmm. I can't seem to find what you want.</h1>
      <img
        src="https://i2.wp.com/learn.onemonth.com/wp-content/uploads/2017/08/1-10.png?w=845&ssl=1"
        alt="404 page"
      />
    </div>
  );
};

export default My404;