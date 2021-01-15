import React, { useEffect, useState } from "react";
import "./Chat.css";
import {
	Container,
	Row,
	Col,
	Image,
	ListGroup,
	ListGroupItem,
	Form,
} from "react-bootstrap";
import profilePic from "../../Images/profile_pic.png";

const Chat = (props) => {
	const [person, setPerson] = useState("");
	const [chat, setChat] = useState([]);

	useEffect(() => {
		const currChat = chats.filter(({ name, chat }) => name === person);
		console.log("here", currChat);
		if (currChat.length !== 0) setChat(currChat[0].chat);
	}, [person]);

	const chats = [
		{
			name: "Dips",
			chat: [
				{ msg: "B", sender: "me" },
				{ msg: "Hello", sender: "dips" },
				{ msg: "Chal", sender: "me" },
			],
		},
		{ name: "Bhav", chat: [{ msg: "Bye", sender: "other" }] },
		{ name: "Nisha", chat: [{ msg: "Yo", sender: "me" }] },
	];

	const personChatDisplay = ({ name, chat }) => {
		const color = name === person ? "#a5fff1" : "#a56cc1";
		return (
			<ListGroupItem
				style={{ backgroundColor: color, border: "0px" }}
				className="person"
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
						<p className="display__chat">{chat[0].msg}</p>
					</Col>
				</Row>
			</ListGroupItem>
		);
	};

	return (
		<Container>
			<Row>
				<Col>
					<Row style={{ margin: "10px" }}>
						<Form>
							<Form.Control placeholder="Search" />
						</Form>
					</Row>
					<Row style={{ margin: "10px" }}>
						<ListGroup style={{ backgroundColor: "#a56cc1" }}>
							{chats.map(personChatDisplay)}
						</ListGroup>
					</Row>
				</Col>
				<Col>
					{person === "" ? (
						<h1>Choose a person to chat</h1>
					) : (
						<div>
							<div className="justify-content-end">
								{chat.map(({ msg, sender }) => (
									<div>
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
							<Form style={{ position: "absolute", bottom: "10px" }}>
								<Form.Control placeholder="Type your message" />
							</Form>
						</div>
					)}
				</Col>
			</Row>
		</Container>
	);
};

export default Chat;
