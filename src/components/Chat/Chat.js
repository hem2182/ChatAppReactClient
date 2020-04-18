import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import './Chat.css';

import TextContainer from '../TextContainer/TextContainer';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "localhost:5000";

  // useEffect hook lets you use lifecycle methods or side effects in function components.
  // it is similar to componentDidMount and componentDidUpdate
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    // now we need to emit different events from client side. on joining the room, we need to emit the name and room as the data.
    // the third parameter is a function that gets triggered by the server callback function.
    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });

    // we need to use return statement for completing useEffect Hook. this is equivalent to un-mounting/disconnection.
    return () => { socket.emit("disconnect"); socket.off(); };
  }, [ENDPOINT, location.search]);

  // this is for handling messages.
  useEffect(() => {
    // we will first listen to system messages form the server.
    socket.on('message', (message) => {
      setMessages([...messages, message])
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [messages]);

  // function for sending messages.
  const sendMessage = (event) => {
    // full browser refresh are not good. the onchange, onKeyPress events refresh the page.
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => { setMessage('') });
    }
  }

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name}></Messages>
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
