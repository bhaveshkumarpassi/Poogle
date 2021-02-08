export const Chat = (state = { chats: [] }, action) => {
	switch (action.type) {
		case "GET_CHAT":
			return { ...state, chats: action.payload };
		case "MSG_SENT":
			return { ...state };
		default:
			return { ...state };
	}
};
