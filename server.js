const express = require('express');

const app = express();
const server = require('http').Server(app);

const io = require('socket.io')(server, {
	cors: {
		origin: '*',
		transports: ['websocket'],
	},
});

app.use(express.json());

const rooms = new Map();

app.get('/rooms', (req, res) => {
	res.json(rooms);
});

app.post('/rooms', (req, res) => {
	const { roomId, username } = req.body;
	if (!rooms.has(roomId)) {
		rooms.set(
			roomId,
			new Map([
				['users', new Map()],
				['messages', []],
			]),
		);
	}
	res.send();
});

io.on('connection', (socket) => {
	socket.on('ROOM:JOIN', ({ roomId, username }) => {
		socket.join(roomId);
		rooms.get(roomId).get('users').set(socket.id, username);
		const users = [...rooms.get(roomId).get('users')].map((user) => ({ id: user[0], name: user[1] }));
		const messages = rooms.get(roomId).get('messages');
		io.in(roomId).emit('ROOM:INFO', { users, messages });
	});

	socket.on('ROOM:MESSAGE', ({ roomId, username, message }) => {
		const messages = rooms.get(roomId).get('messages');
		messages.push({ username, message });
		io.in(roomId).emit('ROOM:MESSAGES', messages);
	});

	socket.on('disconnect', () => {
		rooms.forEach((room, roomId) => {
			if (room.get('users').delete(socket.id)) {
				const users = [...rooms.get(roomId).get('users')].map((user) => ({ id: user[0], name: user[1] }));
				const messages = rooms.get(roomId).get('messages');
				io.in(roomId).emit('ROOM:INFO', { users, messages });
			}
		});
	});
});

server.listen(9999, (err) => {
	if (err) {
		throw Error(err);
	}
	console.log('server started');
});
