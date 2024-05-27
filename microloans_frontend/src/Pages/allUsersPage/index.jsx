import React from 'react';
import { NavigationMain} from '../../Components/NavigationMain/index.jsx';
import { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import './index.scss';
import Container from 'react-bootstrap/Container';

import userImg from '../../Assets/user.png';
import { UsersAPI } from '../../Apis/UserAPI.js';

export function AllUsersPage() {
	const navigate = useNavigate();

	const [isLoadedDone, setIsLoadedDone] = useState(false);
	const [allUsers, setAllUsers] = useState([]);

	const fetchCast = async () => {
		try {
		  const result = await UsersAPI.allUsers();
		  setAllUsers([...result]);
		  setIsLoadedDone(true);
		 //  setCastData(result);
		} catch (e) {
		  console.warn("ERROR", e);
		}
	  };

	  const createConnection = (id) => {
		navigate(`/chat/${id}`, {replace:true});
		window.location.reload();
	  }


	useEffect(() => {
		fetchCast();
	}, [isLoadedDone])

    const User = (props) => {
        return (
          <div className="user">
            <img src={userImg} className="post-image" />
            <h3 className="user-name">{props.name}</h3>
            <p className="user-email">{props.email}</p>
			<p>Role: {props.role}</p>
			<Button variant="primary" type='submit' onClick={() => createConnection(props["id"])}>Send private message</Button>

			
          </div>
        );
      };
    
    
    
    
      return (
        <>
		<NavigationMain/>
		<Container>
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
		</Container>
        </>
      );

}


