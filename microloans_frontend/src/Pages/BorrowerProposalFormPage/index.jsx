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

export function BorrowerProposalFormPage() {

	const { isUserLoggedIn, userEmail, userId, isInvestor, roleId } = useContext(ThemeContext);

	const navigate = useNavigate();
	const [isLoadedDone, setIsLoadedDone] = useState(false);

	const [proposalInterestRate, setProposalInterestRate] = useState(0);
	const [proposalAmount, setProposalAmount] = useState(0);
	const [proposalMonths, setProposalMonths] = useState(0);
	const [organization, setOrganization] = useState("");
	const [responseMessage, setResponseMessage] = useState("");
	const [isOperationSuccessful, setIsOperationSuccessful] = useState(false);

  
  
	const createBorrowerProposalFunc = async (e) => {
		e.preventDefault();
		try{
			const result = await BorrowerProposalsAPI.createBorrowerProposal(roleId, proposalInterestRate, proposalAmount, proposalMonths, organization );
			setIsOperationSuccessful(result.isRegistrationSuccessful)
			setResponseMessage(result.responseMessage);
			console.log("RESULTTT", result);
		}
		catch(ex){
			console.warn("err", ex)
		}
	};
    
      return (
        <>
		<NavigationMain/>
		<h1 style={{ marginTop: '50px',  marginBottom: '50px', textAlign: 'center'}}>Create borrower proposal</h1>
		<Container style={{ marginTop: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>


		{ isUserLoggedIn ? 
			<>

			{ isInvestor == "True" ?
				<Alert variant='danger'>
				You are investor. Cannot create borrower proposal
				</Alert>
				:
					
				<Form style={{width: '50%'}} onSubmit={createBorrowerProposalFunc}>

					<Form.Group className="mb-3" controlId="">
						<Form.Label>Proposal interest rate</Form.Label>
						<Form.Control
							type="text"
							onChange={e => setProposalInterestRate(e.target.value)}
							autoFocus
						/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="">
						<Form.Label>Proposal amount</Form.Label>
						<Form.Control
							type="text"
							onChange={e => setProposalAmount(e.target.value)}
							placeholder=""
							autoFocus
						/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="">
						<Form.Label>Months proposed</Form.Label>
						<Form.Control
							type="text"
							onChange={e => setProposalMonths(e.target.value)}
							placeholder=""
							autoFocus
						/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="">
						<Form.Label>Organization: (optional)</Form.Label>
						<Form.Control
							type="text"
							placeholder=""
							onChange={e => setOrganization(e.target.value)}
							autoFocus
						/>
					</Form.Group>
					<Button variant="primary" type='submit'>
					Save Changes
					</Button>
				</Form>


				}

				{ isOperationSuccessful && responseMessage !== "" ? 
					
					<Alert style={{ marginTop: '50px'}} variant='success'>
					{ responseMessage }
					</Alert>: null
				}

			</>

			: 
		    <Alert variant='danger'>
				{responseMessage}
            </Alert>	
		}
		
		</Container>
        </>
      );

}


