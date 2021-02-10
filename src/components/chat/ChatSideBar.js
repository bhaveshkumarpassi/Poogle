import React, { useEffect, useState } from "react";
import "./Chat.css";
import { Container, Row, Col, ListGroup, Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import PersonChatProfile from "./PersonChatProfile";
import { connect } from "react-redux";

const ChatSideBar = (props) => {
	console.log(props);
	const { person, setPerson, chats, chat, setChat } = props;

	useEffect(() => {
		const currChat = chats.filter(({ name }) => name === person);
		if (currChat.length !== 0) setChat(currChat[0].chat);
	}, [person]);

	return (
		<Col xs={6} md={4} style={{ maxHeight: "60%" }}>
			<Row style={{ width: "100%" }}>
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
			<h1>Chats</h1>
			<Row style={{ overflow: "scroll", height: "70vh", width: "100%" }}>
				<ListGroup style={{ width: "100%" }}>
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

const mapStateToProps = (state) => {
	return { ...state.chats };
};

export default connect(mapStateToProps)(ChatSideBar);
