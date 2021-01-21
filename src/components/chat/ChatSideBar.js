import React, { useEffect, useState } from "react";
import "./Chat.css";
import { Container, Row, Col, ListGroup, Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import PersonChatProfile from "./PersonChatProfile";

const ChatSideBar = ({ person, setPerson, chat, setChat }) => {
	const chats = [
		{
			name: "Dips",
			chat: [
				{ msg: "B", sender: "me" },
				{ msg: "Hello", sender: "dips" },
				{
					msg:
						"Cdfafffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffhal",
					sender: "me",
				},
				{ msg: "Chal", sender: "me" },
				{ msg: "Chal", sender: "me" },
				{ msg: "Chal", sender: "me" },
				{ msg: "Chal", sender: "me" },
				{ msg: "Chal", sender: "me" },
				{ msg: "Chal", sender: "me" },
				{ msg: "Chal", sender: "me" },
				{ msg: "Chal", sender: "me" },
				{ msg: "Chal", sender: "me" },
				{ msg: "Chal", sender: "me" },
			],
		},
		{ name: "Bhav", chat: [{ msg: "Bye", sender: "other" }] },
		{ name: "Nisha", chat: [{ msg: "Yo", sender: "me" }] },
	];

	useEffect(() => {
		const currChat = chats.filter(({ name }) => name === person);
		console.log("here", currChat);
		if (currChat.length !== 0) setChat(currChat[0].chat);
	});

	return (
		<Col xs={6} md={4}>
			<Row style={{ margin: "10px", backgroundColor: "bisque" }}>
				<FaSearch style={{ margin: "12px" }} />
				<input
					type="text"
					placeholder="Search person"
					style={{
						border: "none",
						outlineWidth: "0",
						background: "transparent",
						padding: "10px",
					}}
				></input>
			</Row>
			<Row style={{ margin: "10px", overflow: "scroll", height: "70vh" }}>
				<ListGroup>
					{chats.map(({ name, chat }) => (
						<PersonChatProfile
							name={name}
							chat={chat}
							setPerson={setPerson}
							person={person}
						/>
					))}
				</ListGroup>
			</Row>
		</Col>
	);
};

export default ChatSideBar;
