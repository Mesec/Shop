import React from "react";
import classes from "./CommentBar.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Button from "react-bootstrap/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faThumbsDown } from "@fortawesome/free-regular-svg-icons";
import userImg from "../../images/deno.png";

const commentBar = () => {
  return (
    <Container className={classes.CommentBar}>
      <Row className={classes.Header}>
        <h6>Comments</h6>
      </Row>
      <Row className={classes.AddComment}>
        <div className={classes.InputActions}>
          <img src={userImg} className={classes.UserImage} alt="user image" />
          <input type="text" placeholder="Add a public comment..." />
        </div>
        <div className={classes.ButtonContainer}>
          <Button variant="info" size="sm">
            Comment
          </Button>
        </div>
      </Row>
      <Row className={classes.Wrapper}>
        <div>
          <img src={userImg} className={classes.UserImage} alt="user image" />
        </div>
        <div className={classes.CommentContainer}>
          <Row className={classes.UserInfo}>
            <p>Stefan</p>
            <p>12.03.2020 14:23:44</p>
          </Row>
          <Row className={classes.Comment}>
            <p>
              This is a very nice product ! I'm visiting this page for a couple
              of years, always the best !
            </p>
          </Row>
        </div>
      </Row>
      <Row className={classes.CommentControls}>
        <FontAwesomeIcon icon={faThumbsUp} className={classes.Like} />
        <FontAwesomeIcon icon={faThumbsDown} className={classes.Unlike} />

        <Button variant="info" size="sm">
          Reply
        </Button>
      </Row>
    </Container>
  );
};

export default commentBar;
