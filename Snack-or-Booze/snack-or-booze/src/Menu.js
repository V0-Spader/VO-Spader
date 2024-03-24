import React from "react";
import { Link } from "react-router-dom";
import "./FoodMenu.css";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

/*You can pass either snacks or drinks*/

function Menu({ items, title }) {
  const linkName = title.toLowerCase();

  return (
    <section className="col-md-4">
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            {title} Menu
          </CardTitle>
          <CardText>
            {title} is a great for you. Pick anything you like! Enjoy!
          </CardText>
          <ListGroup>
            {items.map((item) => (
              <Link to={`/${linkName}/${item.id}`} key={item.id}>
                <ListGroupItem>{item.name}</ListGroupItem>
              </Link>
            ))}

            <Link to={`/${linkName}/new`}>
              <ListGroupItem>Add a new {linkName}!</ListGroupItem>
            </Link>
          </ListGroup>
        </CardBody>
      </Card>
    </section>
  );
}

export default Menu;