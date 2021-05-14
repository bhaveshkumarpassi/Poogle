import React, { useEffect, useState } from "react";
import "./Chat.css";
import { Button } from 'reactstrap';
import {
  Container,
  Row,
  Col,
  Form,
  Tab,
  Tabs,
  Nav,
  ListGroup,
  ListGroupItem,
  Image
} from "react-bootstrap";
import questionMan from "../../Images/chat-bubbles.webp";
import ChatSideBar from "./ChatSideBar";
import { getChats, sendMessage } from "../../redux/actions/chat";
import { baseUrl } from "../../shared/baseUrl";
import { connect } from "react-redux";
import background from "../../Images/chat_back.jpg";
import Modal from "react-modal";
import { spaces } from "../variables";
import { FaSearch } from "react-icons/fa";
const axios = require("axios");
const Pusher = require("pusher-js");

const Chat = ({ chats, token, dispatch }) => {
  console.log(chats);
  const [person, setPerson] = useState("");
  const [chat, setChat] = useState([]);
  const [msg, setMsg] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currSpace, setCurrSpace] = useState("");
  const [newPerson, setNewPerson] = useState("");
  const [search, setSearch] = useState("");
  const [newPersonId, setNewPersonId] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {

    const width  = window.innerWidth || document.documentElement.clientWidth || 
    document.body.clientWidth;
    const height = window.innerHeight|| document.documentElement.clientHeight|| 
    document.body.clientHeight;

    if(width <= 1200)
      alert("Chat is preferred to be used on large screen for better experience");

    const pusher = new Pusher("563987a4f9fd4750ba5e", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (data) => {
      dispatch(getChats(token));
    });
  }, []);

  const toggle = () => {
    setModalOpen(false);
  }

  useEffect(() => {
    dispatch(getChats(token));
  }, []);

  useEffect(() => {
    setMsg("");
  }, [person]);

  useEffect(() => {
    var list = document.getElementById("list");
    if (list) list.scrollTop = list.scrollHeight;
  }, [person, chat]);

  const handleMessageSent = (e) => {
    e.preventDefault();
    if (msg === "") return;
    setChat((chat) => [...chat, { msg, sender: "me" }]);
    const id =
      newPerson === person
        ? newPersonId
        : chats.chats.filter(({ name }) => person === name)[0]._id;
    console.log(token, msg, id);
    dispatch(sendMessage(token, msg, id));
    setMsg("");
  };

  const handleMsgChange = (e) => {
    e.preventDefault();
    setMsg(e.target.value);
  };

  const handleCurrSpace = async (e) => {
    setCurrSpace(e.target.innerHTML);
    const user = await axios({
      method: "get",
      url: baseUrl + "users",
      params: {
        interests: e.target.innerHTML,
      },
    });
    console.log(user);
    setUsers(user.data);
  };

  const handleNewChat = (e) => {
    console.log(e.target.innerHTML);
    console.log(e.target.getAttribute("id"));
    setNewPersonId(e.target.getAttribute("id"));
    console.log(e.target);
    setCurrSpace("");
    setNewPerson(e.target.innerHTML);
    setChat([]);
    setUsers([]);
    setPerson(e.target.innerHTML);
    setModalOpen(false);
  };

  return (
    <Container style={{ height: "80vh", marginTop: "20px" }}>
      <Modal isOpen={modalOpen} style={{ overlay: { zIndex: 1000010 } }}>
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
        {search !== "" && currSpace === "" ? (
          <ListGroup style={{ width: "100%" }}>
            {spaces
              .filter(({ value }) =>
                value.toLowerCase().includes(search.toLowerCase())
              )
              .map((space) => (
                <ListGroupItem>
                  <Nav.Link onClick={handleCurrSpace}>{space.value}</Nav.Link>
                </ListGroupItem>
              ))}
          </ListGroup>
        ) : currSpace === "" ? (
          <h1>Search for spaces</h1>
        ) : (
          <p></p>
        )}
        {currSpace === "" ? <p /> : <p>Showing results for, {currSpace}</p>}
        <ListGroup>
          {users.map((user) => (
            <ListGroupItem>
              <Nav.Link onClick={handleNewChat} id={user._id}>
                {user.name}
              </Nav.Link>
            </ListGroupItem>
          ))}
        </ListGroup>
        <Button onClick={toggle} color="danger" className='mt-2'><span className=' mr-3' />Close</Button>
      </Modal>
      <Row style={{ maxHeight: "60vh" }}>
        {/*Chat sidebar*/}
        <ChatSideBar
          person={person}
          setPerson={setPerson}
          chat={chat}
          setChat={setChat}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          newPerson={newPerson}
        />
        {/*Chat section*/}
        <Col xs={6} md={8}>
          {person === "" ? (
            <div>
              <h4>CHOOSE YOUR MENTOR</h4>
              <Image
                src={questionMan}
                className="header__side__manimage"
                fluid
              />
            </div>
          ) : (
            <div>
              <Row style={{ padding: "10px" }}>
                <div
                  className="justify-content-end"
                  style={{
                    overflowY: "scroll",
                    height: "74vh",
                    width: "100%",
                    backgroundImage: { background },
                    backgroundRepeat: "repeat",
                    backgroundPosition: "center",
                  }}
                  id="list"
                >
                  {chat.map(({ msg, sender, createdAt }) => (
                    <div
                      class={`${sender === "me" ? "sending__msg" : ""}`}
                      style={{ maxWidth: "50%", wordBreak: "break-all" }}
                    >
                      <div
                        className={`rounded px-2 py-1 ${
                          sender === "me" ? "bg-primary text-white" : "border"
                        }`}
                        style={{ margin: "10px" }}
                      >
                        {msg}
                      </div>
                      <div className={`text-muted small text-left`}>
                        {createdAt}
                      </div>
                      <div className={`text-muted small text-right`}>
                        {sender === "me" ? "You" : person}
                      </div>
                    </div>
                  ))}
                </div>
              </Row>
              <Row>
                <Form
                  style={{
                    bottom: "10px",
                    width: "85%",
                    margin: "auto",
                  }}
                  onSubmit={handleMessageSent}
                >
                  <Form.Control
                    placeholder="Type your message (right click cursor to insert emojies)"
                    value={msg}
                    onChange={handleMsgChange}
                  />
                </Form>
              </Row>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return { chats: state.chats, token: state.auth.token };
};

export default connect(mapStateToProps)(Chat);
