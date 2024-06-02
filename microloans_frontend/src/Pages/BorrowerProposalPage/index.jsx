import React from 'react';
import { NavigationMain} from '../../Components/NavigationMain/index.jsx';
import { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import borrowerImg from '../../Assets/borrowerImg.png';
import { ThemeContext } from '../../index.js';

import './index.scss';
import Container from 'react-bootstrap/Container';
import { Alert } from 'react-bootstrap';

import { BorrowerProposalsAPI } from '../../Apis//BorrowerProposalsAPI.js';
import { UsersAPI } from '../../Apis//UserAPI.js';

export function BorrowerProposalPage() {
  let {id} = useParams();
  const { isUserLoggedIn, userEmail, userId, isInvestor, roleId } = useContext(ThemeContext);

  const navigate = useNavigate();
  const [proposalCount, setProposalCount] = useState(0);
  const [isLoadedDone, setIsLoadedDone] = useState(false);
  const [isUserLoadedDone, setIsUserLoadedDone] = useState(false);
  const [proposalStatus, setProposalStatus] = useState(false);

  const [borrowerProposalAccepted, setBorrowerProposalAccepted] = useState(false);


  const [borrowerProposal, setBorrowerProposal] = useState(null);
  const [userData, setUserData] = useState(null);

  const createConnectionToChat = (id) => {
		navigate(`/chat/${id}`, {replace:true});
		window.location.reload();
  }

  console.log("isInvestor", isInvestor)

  const createConnectionOtherLoans = () => {
    navigate(`/browseLoansPage`, {replace:true});
		window.location.reload();
  }

  const createLoanConfirmationFunc = async (borrowerProposalId) => {
    try{
      const result = await BorrowerProposalsAPI.createLoanConfirmation(parseInt(roleId), parseInt(borrowerProposalId), new Date().toISOString().split('T')[0]);
      setBorrowerProposalAccepted(result);
      console.log("RESULT ", result)

    }
    catch(ex){
      console.warn("EEXXX", ex)

    }
  }


  useEffect(() => {
    if (!isLoadedDone) {
      fetchAllBorrowerProposals();
    }
  }, [isLoadedDone])

  const fetchAllBorrowerProposals = async () => {
    try {
      const result = await BorrowerProposalsAPI.getAllBorrowerProposalsById(id);
      setProposalCount(result.length)
      setBorrowerProposal(result);
      setIsLoadedDone(true);
      const proposalStatus = await BorrowerProposalsAPI.getAllBorrowerProposalStatus(result.id);
      console.log("proposalStatus", proposalStatus)
      setProposalStatus(proposalStatus);
      const borrowerResult = await UsersAPI.getBorrowerById(result.borrowerId);
      const userResult = await UsersAPI.getUserById(borrowerResult.userAccountId);
      setUserData(userResult)
      setIsUserLoadedDone(true)
      console.log("userResult", userResult)

     //  setCastData(result);
    } catch (e) {
      console.warn("ERROR", e);
    }
  }
    
      return (
        <>
		    <NavigationMain />
        { isLoadedDone && isUserLoadedDone? 
        
        <Container className="borrower-proposal__page">
            <h1 style={{  marginBottom: '50px', textAlign: 'center'}}>Borrower proposal:</h1>

          <h1>{borrowerProposal.title}</h1>
          <img src={borrowerImg} className="post-image" />
          <p>{borrowerProposal.description}</p>

          <div className="additional-info">
            <div>Loan Amount: {borrowerProposal.proposalAmount}DKK </div>
            <div>Organization: {borrowerProposal.organization}</div>
            <div>Proposed months: {borrowerProposal.proposalMonths}</div>
            <div>Proposed interest rate: {borrowerProposal.proposalInterestRate}%</div>
          </div>

          <div className="additional-info">
            <div>First name: {userData.firstName}</div>
            <div>Last name: {userData.lastName}</div>
            <div>Phone: {userData.phoneNumber}</div>
            <div>Email Adress: {userData.emailAdress}</div>
            <div>Borrower rating: Not yet</div>
          </div>
          { proposalStatus ? 
          <Alert variant='warning' >
            Proposal is not available anymore 
          </Alert>
          : 
          <Alert variant='info' >
          Proposal is still available  
        </Alert>
          }
          <div className="button-wrapper" style={{ marginBottom: '50px'}}>
          {isUserLoggedIn? 
            <>
              { isInvestor !== "False" ?
               !borrowerProposalAccepted  ? 
               <> 
                { !proposalStatus  ? 
               <Button variant="primary" type='submit' onClick={() => createLoanConfirmationFunc(borrowerProposal.id)}>Invest money in loan</Button>
               : null }
               </>
              : 
              <Alert variant='success'>
              Borrower proposal was accepted
              </Alert>
              : 
              <Alert variant='danger'>
              You are not investor  
              </Alert>
              }
              <Button variant="primary" type='submit' onClick={() => createConnectionToChat(userData.id)}>Send private message</Button>
            </>
            : 
            <Alert variant='danger'>
            Login first to interract with this borrower-proposal
            </Alert>
          }
            <Button variant="primary" type='submit' onClick={() => createConnectionOtherLoans()}>Check other loans</Button>
          </div>



        </Container>
        : null }

        </>
      );

}


