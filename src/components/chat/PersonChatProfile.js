import React from "react";
import "./Chat.css";
import { Row, Col, Image, ListGroupItem } from "react-bootstrap";
import profilePic from "../../Images/profile_pic.png";

const PersonChatProfile = ({ name, chat, setPerson, person }) => {
  const color = name === person ? "#e5e5e5" : "white";
  return (
    <ListGroupItem
      style={{
        backgroundColor: color,
        border: "0px",
        borderBottom: "2px solid grey",
      }}
      className={`person ` + name === person ? "ce-active-chat-card" : ""}
    >
      <Row>
        <Col>
          <Image
            src={profilePic}
            className="user__profile__pic"
            roundedCircle
            style={{
              maxHeight: "70px",
            }}
          />
        </Col>
        <Col>
          <h3
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              setPerson(e.target.innerHTML);
            }}
          >
            {name}
          </h3>
          <Row>
            {name === person ? <p>{person}: &nbsp; </p> : <p>You:&nbsp;</p>}
            {chat.length > 0 ? (
              <p className="display__chat">{chat[chat.length - 1].msg}</p>
            ) : (
              <p></p>
            )}
          </Row>
        </Col>
      </Row>
    </ListGroupItem>
  );
};

export default PersonChatProfile;
