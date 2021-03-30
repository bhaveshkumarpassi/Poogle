import React, { useEffect, useState } from "react";
import "./Chat.css";
import { Container, Row, Col, ListGroup, Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import PersonChatProfile from "./PersonChatProfile";
import { connect } from "react-redux";
import { BsChatDots } from "react-icons/bs";

const ChatSideBar = (props) => {
  console.log(props);
  const {
    person,
    setPerson,
    chats,
    chat,
    setChat,
    modalOpen,
    setModalOpen,
    newPerson,
  } = props;
  const [search, setSearch] = useState("");

  useEffect(() => {
    const currChat = chats.filter(({ name }) => name === person);
    if (currChat.length !== 0) setChat(currChat[0].chat);
  }, [person, chats]);

  return (
    <Col xs={6} md={4} style={{ maxHeight: "60%" }}>
      <Row style={{ width: "100%" }}>
        <FaSearch style={{ margin: "12px" }} />
        <input
          type="text"
          placeholder="Search person"
          value={search}
          style={{
            border: "none",
            outlineWidth: "0",
            background: "transparent",
            padding: "10px",
          }}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        ></input>
      </Row>
      <h4 style={{marginTop: 10, marginBottom: 10}}>PREVIOUS CHATS</h4>
      <Row style={{ overflow: "scroll", height: "70vh", width: "100%" }}>
        <ListGroup style={{ width: "100%" }}>
          {search === ""
            ? chats.map(({ name, chat, _id }) => (
                <PersonChatProfile
                  name={name}
                  chat={chat}
                  setPerson={setPerson}
                  person={person}
                  id={_id}
                />
              ))
            : chats
                .filter(({ name }) =>
                  name.toLowerCase().includes(search.toLowerCase())
                )
                .map(({ name, chat }) => (
                  <PersonChatProfile
                    name={name}
                    chat={chat}
                    setPerson={setPerson}
                    person={person}
                  />
                ))}
        </ListGroup>
        <button
          style={{
            position: "absolute",
            bottom: "50px",
            right: "90px",
            fontSize: "50px",
            border: "none",
            background: "none",
          }}
          onClick={() => {
            setModalOpen(true);
          }}
        >
          <span>
            <BsChatDots />
          </span>
        </button>
      </Row>
    </Col>
  );
};

const mapStateToProps = (state) => {
  return { ...state.chats };
};

export default connect(mapStateToProps)(ChatSideBar);
