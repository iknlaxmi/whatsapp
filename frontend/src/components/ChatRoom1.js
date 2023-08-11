import React from 'react';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Settings from './Settings';

const ChatRoom = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [to, setTo] = useState('');
  const [myData, setMyData] = useState({
    name: '',
    mobile_number: '',
  });

  useEffect(() => {
    // connect to WebSocket server
    const WEB_URL = `ws://localhost:8080?session_id= ${myData.name}`;
    console.log(WEB_URL);
    const newSocket = io(WEB_URL);
    setSocket(newSocket);

    // set up event listeners for incoming messages
    newSocket.on('connect', () => console.log('Connected to WebSocket'));
    newSocket.on('disconnect', () =>
      console.log('Disconnected from WebSocket')
    );
    newSocket.on('message', (data) => {
      setMessages((msgs) => [...msgs, data.message]);
    });

    // clean up on unmount
    return () => {
      newSocket.disconnect();
    };
  }, [myData]);

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      // send message to WebSocket server
      socket.emit('message', { to, message });
      setMessage('');
      setTo('');
    }
  };

  //set data from settings component

  const handleMyData = (e, name_data, mobile_num_data) => {
    myData.name = name_data;
    myData.mobile_number = mobile_num_data;
    e.preventDefault();

    setMyData({ ...myData });
  };

  return (
    <div>
      <Settings setDataMethod={handleMyData} />
      <h1>Chat Room</h1>
      <h3>My Name: {myData.name}</h3>
      <h3>My Mobile: {myData.mobile_number}</h3>

      <div>
        <h3>Received Messages</h3>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <form onSubmit={handleSend}>
        <h3>To:</h3>
        <input type="text" value={to} onChange={(e) => setTo(e.target.value)} />
        <h3>Message:</h3>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatRoom;
