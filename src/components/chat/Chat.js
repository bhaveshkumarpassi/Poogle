import React from "react";
import "./Chat.css";
import { Image, ListGroup, ListGroupItem } from "react-bootstrap";
import profilePic from "../../Images/profile_pic.png";

const Chat = (props) => {
	const chats = [
		{ name: "Dips", chat: [{ msg: "Hello", sender: "me" }] },
		{ name: "Bhav", chat: [{ msg: "Bye", sender: "other" }] },
		{ name: "Nisha", chat: [{ msg: "Yo", sender: "me" }] },
	];

	return (
		<div className="grid">
			<div className="col-1 section-1">Search person</div>
			<div className="col-2 section-2">
				<ListGroup style={{ backgroundColor: "#a56cc1" }}>
					{chats.map(({ name, chat }) => (
						<ListGroupItem
							style={{ backgroundColor: "#a56cc1", border: "0px" }}
							className="person"
						>
							<div className="image">
								<Image
									src={profilePic}
									className="user__profile__pic"
									roundedCircle
									style={{
										maxHeight: "70px",
									}}
								/>
							</div>
							<div className="name">
								<h3>{name}</h3>
							</div>
							<div className="display__chat">
								<p className="display__chat">{chat[0].msg}</p>
							</div>
						</ListGroupItem>
					))}
				</ListGroup>
			</div>
			<div className="col-3 section-3">Chat</div>
		</div>
	);
};

export default Chat;
