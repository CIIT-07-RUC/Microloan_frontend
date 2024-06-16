import React from 'react';
import { NavigationMain} from '../../Components/NavigationMain/index.jsx';
import { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import './index.scss';
import Container from 'react-bootstrap/Container';

import userImg from '../../Assets/user.png';
import { UsersAPI } from '../../Apis/UserAPI.js';

export function User(props) {
	const navigate = useNavigate();

	const createConnection = (id) => {
		navigate(`/chat/${id}`, {replace:true});
		window.location.reload();
	  }
      return (
		<div className="user">
			<img src={userImg} className="post-image" />
			<h3 className="user-name"></h3>
			<p className="user-email">{props.email}</p>
			<p>Role: {props.role ? 'Investor' : 'Borrower' }{props.role}</p>
			<Button variant="primary" type='submit' onClick={() => createConnection(props["id"])}>Send private message</Button>
		</div>
      );

}


