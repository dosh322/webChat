import React, { useState } from 'react';

/* eslint-disable react/prop-types */
export const Chat = ({ users, onSendMessage, messages }) => {
	const [messageValue, setMessageValue] = useState('');

	const onSend = () => {
		onSendMessage(messageValue);
		setMessageValue('');
	};

	return (
		<div className="chat">
			<div className="chat-users">
				<b>Users: ({users.length})</b>
				<ul>
					{users.map(({ id, name }) => (
						<li key={id}>{name}</li>
					))}
				</ul>
			</div>
			<div className="chat-messages">
				<div className="messages">
					{messages.map(({ message, username }) => (
						<div className="message">
							<p>{message}</p>
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
						Отправить
					</button>
				</form>
			</div>
		</div>
	);
};

export default Chat;
