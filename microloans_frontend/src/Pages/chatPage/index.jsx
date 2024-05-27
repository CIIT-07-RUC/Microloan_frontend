import React, { useState, useEffect, useContext } from 'react';
import * as signalR from "@microsoft/signalr";
import { NavigationMain } from '../../Components/NavigationMain/index.jsx';
import { ChatMessage } from '../../Components/ChatMessage/index.js';
import { Container, Alert } from 'react-bootstrap';
import './index.scss';
import { ThemeContext } from '../../index.js';
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export function ChatPage() {
  const { isUserLoggedIn, userEmail, userId } = useContext(ThemeContext);

  const location = useLocation();
  
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
    const pathnameUrlArr = location.pathname.split('/');
    const recId = pathnameUrlArr[pathnameUrlArr.length - 1];
    setGroupName(recId);
  }, [location]);

  useEffect(() => {
    if (connection && groupName) {
      connection.start()
        .then(async () => {
          await connection.invoke("AddToGroup", userId, groupName);

          connection.on("ReceiveMessage", (user, message) => {
            const userType = userEmail === user ? 'sender' : 'recipient';
            const messageArr = [message, userType, user, new Date(Date.now()).toLocaleTimeString()];
            setMessages((prevMessages) => [...prevMessages, messageArr]);
          });

          // Load previous messages when joining the group
          console.log("userEmail, groupNameuserEmail, groupName", userId, groupName)
          const previousMessages = await connection.invoke("LoadPreviousMessages", userId, groupName);
          console.log("previousMessagespreviousMessagespreviousMessagespreviousMessages", previousMessages)
          previousMessages.forEach((msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
          });
        })
        .catch((err) => {
          console.error(err.toString());
        });

      return () => {
        connection.stop();
      };
    }
  }, [connection, groupName, userEmail]);

  const sendMessage = async () => {
    if (connection && messageInput) {
      try {
        await connection.invoke("SendPrivateMessage",  userId, groupName, userEmail, messageInput);
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
                date={msg[3]}
                msg={msg[0]}
                index={index}
                user={msg[2]}
                typeOfUser={msg[1]}
              />
            ))}
          </ul>
        </div>
        <div className="chat-page__bottom--section">
          {isUserLoggedIn ? 
          <div>
            <textarea
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Message"
            />
            <Button onClick={sendMessage}>
              Send
            </Button>
          </div>
          :
          <Alert variant='danger'>
            Login first to access message-features
          </Alert>
          }
        </div>
      </Container>
    </>
  );
}

export default ChatPage;
