import React from 'react';
import { NavigationMain} from '../../Components/NavigationMain/index.jsx';
import { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User } from '../../Components/User/index.jsx'
import Button from 'react-bootstrap/Button';
import borrowerImg from '../../Assets/borrowerImg.png';

import './index.scss';
import Container from 'react-bootstrap/Container';

import { BorrowerProposalsAPI } from '../../Apis//BorrowerProposalsAPI.js';
import { UsersAPI } from '../../Apis//UserAPI.js';
import userImg from '../../Assets/user.png';

export function BorrowerProposalPage() {
  let {id} = useParams();
  const navigate = useNavigate();
  const [proposalCount, setProposalCount] = useState(0);
  const [isLoadedDone, setIsLoadedDone] = useState(false);
  const [isUserLoadedDone, setIsUserLoadedDone] = useState(false);

  const [borrowerProposal, setBorrowerProposal] = useState(null);
  const [userData, setUserData] = useState(null);

  const createConnectionToChat = (id) => {
		navigate(`/chat/${id}`, {replace:true});
		window.location.reload();
  }

  const createConnectionOtherLoans = () => {
    navigate(`/browseLoansPage`, {replace:true});
		window.location.reload();
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
          <div className="button-wrapper">
            <Button variant="primary" type='submit' onClick={() => createConnectionToChat(userData.id)}>Invest money in loan</Button>
            <Button variant="primary" type='submit' onClick={() => createConnectionToChat(userData.id)}>Send private message</Button>
            <Button variant="primary" type='submit' onClick={() => createConnectionOtherLoans()}>Check other loans</Button>
          </div>



        </Container>
        : null }

        </>
      );

}


