import React, { useEffect, useState } from "react";
import "./Chat.css";
import { Container, Row, Col, Form } from "react-bootstrap";
import ChatSideBar from "./ChatSideBar";

const Chat = () => {
	const [person, setPerson] = useState("");
	const [chat, setChat] = useState([]);
	const [msg, setMsg] = useState("");

	useEffect(() => {
		setMsg("");
	}, [person]);

	useEffect(() => {
		var list = document.getElementById("list");
		list.scrollTop = list.scrollHeight;
	}, [person, chat]);

	const handleMessageSent = (e) => {
		e.preventDefault();
		setChat((chat) => [...chat, { msg, sender: "me" }]);
		setMsg("");
	};

	const handleMsgChange = (e) => {
		e.preventDefault();
		setMsg(e.target.value);
	};

	return (
		<Container style={{ height: "80vh", marginTop: "20px" }}>
			<Row style={{ height: "100%" }}>
				{/*Chat sidebar*/}
				<ChatSideBar
					person={person}
					setPerson={setPerson}
					chat={chat}
					setChat={setChat}
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
									style={{ overflowY: "scroll", height: "70vh", width: "100%" }}
									id="list"
								>
									{console.log(chat)}
									{chat.map(({ msg, sender }) => (
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

export default Chat;
