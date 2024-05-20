import React from 'react';
import { NavigationMain} from '../../Components/NavigationMain/index.jsx';
import { useState } from 'react';
import './browseLoansPage.scss';

export function BrowseLoansPage() {
  
    const [proposalCount, setProposalCount] = useState(0);

    return (
    <>
    <NavigationMain />
    <div className="browse-loans-page">
        <h1 className="title">Borrower Proposals</h1>
        <p className="subtitle">Found {proposalCount} proposals</p>
    </div></>

  
    );
}
