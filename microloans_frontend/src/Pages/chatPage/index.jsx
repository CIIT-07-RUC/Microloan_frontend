import React, { useState, useEffect } from 'react';
import * as signalR from "@microsoft/signalr";
import { NavigationMain} from '../../Components/NavigationMain/index.jsx';
import { ChatMessage } from '../../Components/ChatMessage/index.js';
import { Row, Container, Col   } from 'react-bootstrap';
import './index.scss';

export function ChatPage() {
  const [connection, setConnection] = useState(null);
  const [userInput, setUserInput] = useState("");
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
        .then(() => {
          console.log("SignalR connection established.");
        })
        .catch((err) => {
          console.error(err.toString());
        });

      connection.on("ReceiveMessage", (user, message) => {
        setMessages([...messages, `${user} says ${message}`]);
      });
    }
  }, [connection, messages]);

  const sendMessage = async () => {
    if (connection && messageInput) {
      try {
        await connection.invoke("SendMessage", "sad",  messageInput);
        setMessageInput("");
      } catch (error) {
        console.error(error.toString());
      }
    }
  };

  return (
    <>
    <NavigationMain/>
      <Container className='chat-page' >

        <div className="chat-page__message-wrap">
        <ul>
          {messages.map((msg, index) => (
            <ChatMessage msg={msg} index={index} typeOfUser="client_1"/>
          ))}
        </ul>

        </div>
        <div className="chat-page__bottom--section">
          <div>
          <textarea type="text" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} placeholder="Message" />
              <button onClick={sendMessage}>Send</button>
          </div>
{/*           <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="User" />
 */}          
        </div>

      </Container>

    </>
  );
}

export default ChatPage;
