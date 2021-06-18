import React, { useState } from 'react';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
const RegistrationForm = ({ onLogin }) => {
	const [roomId, setRoomId] = useState('');
	const [username, setUsername] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const isDisabled = !username || !roomId;

	const onEnter = async () => {
		setIsLoading(true);
		const loginData = {
			roomId,
			username,
		};
		await axios.post('/rooms', loginData);
		onLogin(loginData);
	};
	return (
		<div className="registrationPanel">
			<input
				type="text"
				className="form-control"
				placeholder="Room ID"
				value={roomId}
				onChange={(e) => setRoomId(e.target.value)}
			/>
			<input
				type="text"
				className="form-control"
				placeholder="Your name"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<button type="button" className="btn btn-danger" onClick={onEnter} disabled={isDisabled || isLoading}>
				{isLoading ? 'Connecting...' : 'Join'}
			</button>
		</div>
	);
};

export default RegistrationForm;
