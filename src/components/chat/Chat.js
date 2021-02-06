import React, { useEffect, useState } from "react";
import "./Chat.css";
import { Container, Row, Col, Form } from "react-bootstrap";
import ChatSideBar from "./ChatSideBar";
import { baseUrl } from "../../shared/baseUrl";
const axios = require("axios");
const Pusher = require("pusher-js");

const Chat = () => {
	const [person, setPerson] = useState("");
	const [chat, setChat] = useState([]);
	const [msg, setMsg] = useState("");

	useEffect(() => {
		const pusher = new Pusher("563987a4f9fd4750ba5e", {
			cluster: "ap2",
		});

		const channel = pusher.subscribe("messages");
		channel.bind("inserted", (data) => {
			console.log(data);
			const bearer_token =
				"Bearer " +
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDFjMmJjYTQ0MjdlYTg5N2NlMjk1MTgiLCJpYXQiOjE2MTI0NTg5NTV9.RpALxpHS3VvoaBSeEBkRjL_1TQrUczSjRRzU6VLnw8A";
			axios({
				method: "get",
				url: baseUrl + "messages",
				headers: {
					"Content-Type": "application/json",
					Authorization: bearer_token,
				},
			}).then((res) => console.log(res));
		});
	}, []);

	useEffect(() => {
		const bearer_token =
			"Bearer " +
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDFjMmJjYTQ0MjdlYTg5N2NlMjk1MTgiLCJpYXQiOjE2MTI0NTg5NTV9.RpALxpHS3VvoaBSeEBkRjL_1TQrUczSjRRzU6VLnw8A";
		axios({
			method: "get",
			url: baseUrl + "messages",
			headers: {
				"Content-Type": "application/json",
				Authorization: bearer_token,
			},
		}).then((res) => console.log(res));
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
		setChat((chat) => [...chat, { msg, sender: "me" }]);
		const bearer_token =
			"Bearer " +
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDFjMmJjYTQ0MjdlYTg5N2NlMjk1MTgiLCJpYXQiOjE2MTI0NTg5NTV9.RpALxpHS3VvoaBSeEBkRjL_1TQrUczSjRRzU6VLnw8A";
		axios({
			method: "post",
			url: baseUrl + "messages",
			headers: {
				"Content-Type": "application/json",
				Authorization: bearer_token,
			},
			data: { msg, to: "601c44b6fa5d9b3b64f57194" },
		}).then((res) => console.log(res));
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
