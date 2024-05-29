import React from 'react';
import { NavigationMain} from '../../Components/NavigationMain/index.jsx';
import { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User } from '../../Components/User/index.jsx'
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

	useEffect(() => {
		fetchCast();
	}, [isLoadedDone])    
    
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


