import React, { useEffect, useState } from "react";
import "./Chat.css";
import { Container, Row, Col, Form, Tab, Tabs, Nav } from "react-bootstrap";
import ChatSideBar from "./ChatSideBar";
import { getChats, sendMessage } from "../../redux/actions/chat";
import { baseUrl } from "../../shared/baseUrl";
import { connect } from "react-redux";
import background from "../../Images/chat_back.jpg";
import Modal from "react-modal";
import { spaces } from "../variables";
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
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const pusher = new Pusher("563987a4f9fd4750ba5e", {
			cluster: "ap2",
		});

		const channel = pusher.subscribe("messages");
		channel.bind("inserted", (data) => {
			dispatch(getChats(token));
		});
	}, []);

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
		const id = chats.chats.filter(({ name }) => person === name)[0]._id;
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

	return (
		<Container style={{ height: "80vh", marginTop: "20px" }}>
			<Modal isOpen={modalOpen} style={{ overlay: { zIndex: 1000010 } }}>
				<Nav variant="tabs" activeKey={currSpace} onSelect={handleCurrSpace}>
					{spaces.map((space) => (
						<Nav.Item>
							<Nav.Link onClick={handleCurrSpace}>{space.value}</Nav.Link>
						</Nav.Item>
					))}
				</Nav>
				{currSpace === "" ? <p /> : <p>Showing results for, {currSpace}</p>}
				{users.map((user) => (
					<p>{user.name}</p>
				))}
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
				/>
				{/*Chat section*/}
				<Col xs={6} md={8}>
					{person === "" ? (
						<h1>Choose a person to chat</h1>
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
										placeholder="Type your message"
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
