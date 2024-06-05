import React from 'react';
import { NavigationMain} from '../../Components/NavigationMain/index.jsx';
import { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User } from '../../Components/User/index.jsx'
import Button from 'react-bootstrap/Button';
import { ThemeContext } from '../../index.js';
import './index.scss';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import userImg from '../../Assets/user.png';
import { UsersAPI } from '../../Apis/UserAPI.js';
import { Alert } from 'react-bootstrap';
import { BorrowerProposalsAPI } from '../../Apis/BorrowerProposalsAPI.js';
import Table from 'react-bootstrap/Table';

export function LoansPage() {

	const { isUserLoggedIn, userEmail, userId, isInvestor, roleId } = useContext(ThemeContext);

	const navigate = useNavigate();
	const [isLoadedDone, setIsLoadedDone] = useState(false);

    
      return (
        <>
		<NavigationMain/>
		<h1 style={{ marginTop: '50px',  marginBottom: '50px', textAlign: 'center'}}>All your loans:</h1>
		<Container className='borrower-form' style={{ marginTop: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>

		{ isUserLoggedIn ? 
			<>

			<Table striped bordered hover>
				<thead>
					<tr>
					<th>#</th>
					<th>Investor loan confirmation ID</th>
					<th>Loan amount</th>
					</tr>
				</thead>
				<tbody>
					<tr>
					<td></td>
					<td></td>
					<td></td>
					</tr>
				</tbody>
				</Table>

			</>

			: 
		    <Alert variant='danger'>
				Login first in order to create proposal
            </Alert>	
		}
		
		</Container>
        </>
      );

}


