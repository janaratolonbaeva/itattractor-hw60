import React, {useState, useEffect} from 'react';
import Send from "../../components/Send/Send";
import axios from "axios";
import Message from "../../components/Message/Message";
import './Chat.css';

const Chat = () => {
	const [messages, setMessages] = useState([]);
	const [lastDate, setLastDate] = useState('');
	const [message, setMessage] = useState('');
	const [name, setName] = useState('');
	const url = 'http://146.185.154.90:8000/messages';
	let interval = null;

	useEffect(() => {
		getMessages();
	}, []);

	useEffect(() => {
		const newMessages = () => {
			const lastUrl = url + `?datetime=${lastDate}`
			try {
				axios.get(lastUrl).then(response => {
					if(response.data.length > 0) {
						setLastDate(response.data[response.data.length - 1].datetime);
						setMessages(prev => [...prev, ...response.data]);
					}
				})
			} catch (e) {
				console.log(e);
			}
		}
		if(lastDate) {
			interval = setInterval(newMessages, 2000)
		}
		return () => clearInterval(interval)
	}, [lastDate])

	const getMessages = async () => {
		try {
			const response = await axios.get(url);
			setLastDate(response.data[response.data.length - 1].datetime);
			setMessages(response.data);
		} catch (e) {
			console.log(e);
		}
	}

	const messageWrite = e => {
		setMessage(e.target.value);
	}

	const nameWrite = e => {
		setName(e.target.value);
	}

	const sendMessage = async (e) => {
		try {
			const data = new URLSearchParams();
			data.set('message', message);
			data.set('author', name);
			await axios.post(url, data);
		} catch (e) {
			console.log(e);
		}
	}

	return (
		<>
			<div className="container mt-2">
				<Send message={message} author={name} messageWrite={messageWrite} nameWrite={nameWrite} sendMessage={sendMessage}/>
				<div className="messages-block mt-3">
					{messages.reverse().map((item, index) => {
						return (
							<Message key={index} message={item.message} author={item.author}/>
						)
					})}
				</div>
			</div>
		</>
	);
};

export default Chat;