import React from "react";
import "./Chat.css";
import {
	Container,
	Row,
	Col,
	Image,
	ListGroup,
	ListGroupItem,
} from "react-bootstrap";
import profilePic from "../../Images/profile_pic.png";

const Chat = (props) => {
	const chats = [
		{ name: "Dips", chat: [{ msg: "B", sender: "me" }] },
		{ name: "Bhav", chat: [{ msg: "Bye", sender: "other" }] },
		{ name: "Nisha", chat: [{ msg: "Yo", sender: "me" }] },
	];

	const personChat = ({ name, chat }) => (
		<ListGroupItem
			style={{ backgroundColor: "#a56cc1", border: "0px" }}
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
					<h3>{name}</h3>
					<p className="display__chat">{chat[0].msg}</p>
				</Col>
			</Row>
		</ListGroupItem>
	);

	return (
		<Container>
			<Row>
				<Col>
					<Row>Search person</Row>
					<Row>
						<ListGroup style={{ backgroundColor: "#a56cc1" }}>
							{chats.map(personChat)}
						</ListGroup>
					</Row>
				</Col>
				<Col>
					<div className="col-3">Chat</div>
				</Col>
			</Row>
		</Container>
	);
};

export default Chat;
