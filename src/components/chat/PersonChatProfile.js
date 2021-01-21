import React from "react";
import "./Chat.css";
import { Row, Col, Image, ListGroupItem } from "react-bootstrap";
import profilePic from "../../Images/profile_pic.png";

const PersonChatProfile = ({ name, chat, setPerson, person }) => {
	console.log(name, chat);
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
					{chat.length > 0 ? (
						<p className="display__chat">{chat[chat.length - 1].msg}</p>
					) : (
						<p></p>
					)}
				</Col>
			</Row>
		</ListGroupItem>
	);
};

export default PersonChatProfile;
