import React, { useReducer, useEffect } from 'react';
import { RegistrationForm, Chat } from './components';
import reducer from './reducer';
import socket from './socket';

function App() {
	const [state, dispatch] = useReducer(reducer, {
		joined: false,
		roomId: null,
		username: null,
		users: [],
		messages: [],
	});
	const onLogin = (loginData) => {
		dispatch({
			type: 'JOINED',
			payload: loginData,
		});
		socket.emit('ROOM:JOIN', loginData);
	};

	const onSendMessage = (message) => {
		socket.emit('ROOM:MESSAGE', { roomId: state.roomId, username: state.username, message });
	};

	const setRoomInfo = ({ users, messages }) => {
		console.log(users, messages);
		dispatch({
			type: 'SET_USERS',
			payload: users,
		});
		dispatch({
			type: 'SET_MESSAGES',
			payload: messages,
		});
	};

	useEffect(() => {
		socket.on('ROOM:INFO', setRoomInfo);
		socket.on('ROOM:MESSAGES', (messages) => {
			console.log(messages);
			dispatch({
				type: 'SET_MESSAGES',
				payload: messages,
			});
		});
	}, []);

	return (
		<div className="wrapper">
			{state.joined ? (
				<Chat
					users={state.users}
					messages={state.messages}
					currentUser={state.username}
					onSendMessage={onSendMessage}
				/>
			) : (
				<RegistrationForm onLogin={onLogin} />
			)}
		</div>
	);
}

export default App;
