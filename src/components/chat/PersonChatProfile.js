import React from "react";
import "./Chat.css";
import { Row, Col, Image, ListGroupItem } from "react-bootstrap";
import { baseUrl } from "../../shared/baseUrl";
import profilePic from "../../Images/profile_pic.png";

const setAlternateImage = (e)=>{
  console.log(e.target);
  e.target.src=profilePic;
  console.log("Done task");
}

const PersonChatProfile = ({ name, chat, setPerson, person, id }) => {
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
            src={baseUrl + "users/" + id + "/image"}
            onError={setAlternateImage}
            className="user__profile__pic"
            roundedCircle
            style={{
              maxHeight: "70px",
            }}
          />
        </Col>
        <Col>
          <h6
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              setPerson(e.target.innerHTML);
            }}
          >
            <span>{name.substr(0, 12)}</span>
            <span>
              {name.length > 12 ? <p>...</p> : <p />}
            </span>
          </h6>
          <Row>
            {name === person ? <p>{person}: &nbsp; </p> : <p>You:&nbsp;</p>}
            {chat.length > 0 ? (
              <div>
                <p className="display__chat">
                  <span>{chat[chat.length - 1].msg.substr(0, 10)}</span>
                  <span>
                    {chat[chat.length - 1].msg.length > 10 ? <p>...</p> : <p />}
                  </span>
                </p>
              </div>
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
