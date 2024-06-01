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
  const [proposalCount, setProposalCount] = useState(0);
  const [isLoadedDone, setIsLoadedDone] = useState(false);
  const [borrowerProposal, setBorrowerProposal] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!isLoadedDone) {
      fetchAllBorrowerProposals();
    }
  }, [isLoadedDone])

  const fetchAllBorrowerProposals = async () => {
    try {
      const result = await BorrowerProposalsAPI.getAllBorrowerProposalsById(id);
      console.log("RESULT BAM", result)
      setProposalCount(result.length)
      setBorrowerProposal(result);
      //const userResult = await UsersAPI.getUserById(result)
      setIsLoadedDone(true);
     //  setCastData(result);
    } catch (e) {
      console.warn("ERROR", e);
    }
  }
    
      return (
        <>
		    <NavigationMain />
        { isLoadedDone ? 
        <Container className="borrower-proposal__page">
          <h1>{borrowerProposal.title}</h1>
          <img src={borrowerImg} className="post-image" />
          <p>{borrowerProposal.description}</p>

          <div className="additional-info">
            <div>Loan Amount: {borrowerProposal.proposalAmount}DKK </div>
            <div>Name of borrower: {borrowerProposal.proposalAmount}</div>
            <div>Organization: {borrowerProposal.organization}</div>
            <div>Proposed months: {borrowerProposal.proposalMonths}</div>
            <div>Proposed interest rate: {borrowerProposal.proposalInterestRate}%</div>
            <div>Borrower rating: Not yet</div>


          </div>


        </Container>
        : null }

        </>
      );

}


