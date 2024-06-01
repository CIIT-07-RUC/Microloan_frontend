import React, {useEffect, useState } from 'react';
import { NavigationMain} from '../../Components/NavigationMain/index.jsx';
import './browseLoansPage.scss';
import borrowerImg from '../../Assets/borrowerImg.png';
import { BorrowerProposalsAPI } from '../../Apis//BorrowerProposalsAPI.js';
import { UsersAPI } from '../../Apis//UserAPI.js';


export function BrowseLoansPage() {
  
    const [proposalCount, setProposalCount] = useState(0);
    const [isLoadedDone, setIsLoadedDone] = useState(false);
  	const [borrowerProposals, setBorrowerProposals] = useState([]);


    useEffect(() => {
      if (!isLoadedDone) {
        fetchAllBorrowerProposals();
      }
    }, [isLoadedDone])

    const fetchAllBorrowerProposals = async () => {
      try {
        const result = await BorrowerProposalsAPI.getAllBorrowerProposals();
        console.log("RESULT BAM", result)
        setProposalCount(result.length)
        setBorrowerProposals([...result]);
        setIsLoadedDone(true);
       //  setCastData(result);
      } catch (e) {
        console.warn("ERROR", e);
      }
    }

      
    
    
      const PostsGrid = ({ posts }) => {
      const [currentPage, setCurrentPage] = useState(1);
      const postsPerPage = 6;
    
      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    
      const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
      return (
        <div>
          <div className="posts-grid">
            {borrowerProposals.map((post, index) => (
              <>
               <div className="post">
                  <img src={borrowerImg} alt={post.title} className="post-image" />
                  <h3 className="post-title">{post.title}</h3>
                  <h1>BorrowerId  {post.borrowerId} </h1>
                  <p className="post-subtitle">Proposal amount: {post.proposalAmount}DKK</p>
                  <p className="post-subtitle">Proposal Interest Rate: {post.proposalInterestRate}%</p>

                </div>
              </>
            ))}
          </div>
          {/* <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} /> */}
        </div>
      );
    };
    
/*     const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
      const pageNumbers = [];
    
      for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
      }
    
      return (
        <nav>
          <ul className="pagination">
            {pageNumbers.map((number) => (
              <li key={number} className="page-item">
                <a onClick={() => paginate(number)} href="" className="page-link">
                  {number}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      );
    };
 */

    return (
    <>
    <NavigationMain />
      <div className="browse-loans-page">
        <h1 className="title">Borrower Proposals</h1>
        <p className="subtitle">Found {proposalCount} proposals</p>
        <PostsGrid posts={borrowerProposals} />
      </div></>
    

    
  
    );
    

}


