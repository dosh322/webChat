import React, { useState, useEffect, useRef } from 'react';

/* eslint-disable react/prop-types */
export const Chat = ({ users, onSendMessage, messages, currentUser }) => {
	const [messageValue, setMessageValue] = useState('');
	const messagesRef = useRef();

	const onSend = () => {
		onSendMessage(messageValue);
		setMessageValue('');
	};

	useEffect(() => {
		messagesRef.current.scrollTo(0, 99999);
	}, [messages]);

	return (
		<div className="chat">
			<div className="chat-users">
				<b>Users: ({users.length})</b>
				<ul>
					{users.map(({ id, name }) => (
						<li key={id}>
							{name} {name === currentUser && '(You)'}
						</li>
					))}
				</ul>
			</div>
			<div className="chat-messages">
				<div className="messages" ref={messagesRef}>
					{messages.map(({ message, username }) => (
						<div
							className="message"
							style={{
								...(username === currentUser && { alignSelf: 'flex-end' }),
							}}
						>
							<p style={{ ...(username === currentUser && { backgroundColor: 'grey' }) }}>{message}</p>
							<div>
								<span>{username}</span>
							</div>
						</div>
					))}
				</div>
				<form>
					<textarea
						value={messageValue}
						onChange={(e) => setMessageValue(e.target.value)}
						className="form-control"
						rows="3"
					/>
					<button onClick={onSend} type="button" className="btn btn-primary">
						Send
					</button>
				</form>
			</div>
		</div>
	);
};

export default Chat;
