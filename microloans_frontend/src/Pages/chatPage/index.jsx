import React, { useState, useEffect, useContext } from 'react';
import * as signalR from "@microsoft/signalr";
import { NavigationMain } from '../../Components/NavigationMain/index.jsx';
import { ChatMessage } from '../../Components/ChatMessage/index.js';
import { Row, Container, Col } from 'react-bootstrap';
import './index.scss';
import { ThemeContext } from '../../index.js';

export function ChatPage() {
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(ThemeContext);
  const { userEmail, setUserEmail } = useContext(ThemeContext);

  const [connection, setConnection] = useState(null);
  const [groupName, setGroupName] = useState("defaultGroup");
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5205/chatHub")
      .build();

    setConnection(newConnection);
    console.log("CONNECTION")
  }, []);

  useEffect(() => {
    if (connection) {
      connection.start()
        .then(async () => {
          console.log("SignalR connection established.");
          await connection.invoke("AddToGroup", groupName);

          connection.on("ReceiveMessage", (user, message) => {
            setMessages((prevMessages) => [...prevMessages, `${user} says: ${message}`]);
          });
        })
        .catch((err) => {
          console.error(err.toString());
        });

      return () => {
        connection.stop();
      };
    }
  }, [connection, groupName]);

  const sendMessage = async () => {
    if (connection && messageInput) {
      try {
        await connection.invoke("SendPrivateMessage", groupName, userEmail, messageInput);
        setMessageInput("");
      } catch (error) {
        console.error(error.toString());
      }
    }
  };

  return (
    <>
      <NavigationMain />
      <Container className='chat-page'>
        <div className="chat-page__message-wrap">
          <ul>
            {messages.map((msg, index) => (
              <ChatMessage
                key={index}
                date={new Date(Date.now()).toLocaleTimeString()}
                msg={msg}
                index={index}
                user={userEmail}
                typeOfUser="client_1"
              />
            ))}
          </ul>
        </div>
        <div className="chat-page__bottom--section">
          <div>
            <textarea
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Message"
            />
            <button onClick={sendMessage}>Send</button>
          </div>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Group Name"
          />
        </div>
      </Container>
    </>
  );
}

export default ChatPage;
