import React, { useReducer, useEffect } from 'react';
import { RegistrationForm } from './components';
import reducer from './reducer';
import socket from './socket';

function App() {
	const [state, dispatch] = useReducer(reducer, { joined: false, roomId: null, username: null });
	const onLogin = (loginData) => {
		dispatch({
			type: 'JOINED',
			payload: loginData,
		});
		socket.emit('ROOM:JOIN', loginData);
	};
	console.log(state);

	useEffect(() => {
		socket.on('ROOM:JOINED', (users) => {
			console.log(users);
		});
	}, []);

	return <div className="wrapper">{!state.joined && <RegistrationForm onLogin={onLogin} />}</div>;
}

export default App;
