import React, { useState, useEffect, useContext } from 'react';
import * as signalR from "@microsoft/signalr";
import { NavigationMain } from '../../Components/NavigationMain/index.jsx';
import { ChatMessage } from '../../Components/ChatMessage/index.js';
import { Row, Container, Col } from 'react-bootstrap';
import './index.scss';
import { ThemeContext } from '../../index.js';
import { useHistory ,useLocation } from 'react-router-dom';


export function ChatPage() {
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(ThemeContext);
  const { userEmail } = useContext(ThemeContext);
  const { userId} = useContext(ThemeContext);
  const location = useLocation();


  const [recipientId, setRecipientId] = useState(0);


  const [connection, setConnection] = useState(null);
  const [groupName, setGroupName] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5205/chatHub")
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    const pathnameurlArr = location.pathname.split('/');
    const recId = pathnameurlArr[pathnameurlArr.length - 1];
    setGroupName(recId);
  }, [])

  useEffect(() => {
    if (connection && groupName !== null) {
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
  }, [connection, groupName, groupName]);

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
        </div>
      </Container>
    </>
  );
}

export default ChatPage;
