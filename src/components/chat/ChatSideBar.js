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

const mapStateToProps = (state) => {
	return { ...state.chats };
};

export default connect(mapStateToProps)(ChatSideBar);
