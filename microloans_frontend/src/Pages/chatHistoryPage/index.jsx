import React, { useState, useEffect, useContext } from 'react';
import * as signalR from "@microsoft/signalr";
import { NavigationMain } from '../../Components/NavigationMain/index.jsx';
import { ChatMessage } from '../../Components/ChatMessage/index.js';
import { Container, Alert } from 'react-bootstrap';
import './index.scss';
import { ThemeContext } from '../../index.js';
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { UsersAPI } from '../../Apis/UserAPI.js';
import { User } from '../../Components/User/index.jsx'

export function ChatHistoryPage() {
  const { isUserLoggedIn, userEmail, userId } = useContext(ThemeContext);

  const location = useLocation();

  const [conversationList, setConversationList] = useState([]);
  
  const [connection, setConnection] = useState(null);
  const [groupName, setGroupName] = useState(null);


	const [isLoadedDone, setIsLoadedDone] = useState(false);
	const [allUsers, setAllUsers] = useState([]);

	const fetchCast = async () => {
		if (conversationList !== null || conversationList.lenghth !== 0 ) {
			try {
				conversationList.map(async (el) =>  {
					const result = await UsersAPI.getUserById(el)
					.catch(e => console.warn("ERROR", e))
					if (result !== null) {
                        setAllUsers(prevUsers => [...prevUsers, result]); // Add new user to existing array
					}
				})
				setIsLoadedDone(true);
			
			} catch (e) {
			  console.warn("ERROR", e);
			}
		}
	  };

	useEffect(() => {
		fetchCast();
	}, [conversationList])   
	
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
          const conversationListArr = await connection.invoke("GetConversationsByUser", userId);
          console.log("conversationList", conversationListArr)
		  setConversationList(conversationListArr);
        })
        .catch((err) => {
          console.error(err.toString());
        });



      return () => {
        connection.stop();
      };
    }
  }, [connection, groupName, userEmail]);

  return (
    <>
      <NavigationMain />
      <Container className='chat-page'>
	  <h1 style={{ marginTop: '50px',  marginBottom: '50px', textAlign: 'center'}}>Chat History</h1>

        <div className="user-grid">
		{ isLoadedDone ? 
			allUsers.map((el) => {
			 return	<User name={`${el.firstName} ${el.lastName}`}
				email={el.emailAdress}
				role={el.isInvestor}
				id={el.id}
			 />
			})
			: null}
        
        </div>
        <div className="chat-page__bottom--section">
          {isUserLoggedIn ? 
          <div>
	
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
