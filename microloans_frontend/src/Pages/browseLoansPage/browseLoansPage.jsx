import React from 'react';
import { NavigationMain} from '../../Components/NavigationMain/index.jsx';
import { useState } from 'react';
import './browseLoansPage.scss';
import borrowerImg from '../../Assets/borrowerImg.png';

export function BrowseLoansPage() {
  
    const [proposalCount, setProposalCount] = useState(0);

    const Post = ({ image, title, subtitle }) => {
        return (
          <div className="post">
            <img src={borrowerImg} alt={title} className="post-image" />
            <h3 className="post-title">{title}</h3>
            <p className="post-subtitle">{subtitle}</p>
          </div>
        );
      };
    
    
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
            {currentPosts.map((post, index) => (
              <Post key={index} image={post.borrowerImg} title={post.title} subtitle={post.subtitle} />
            ))}
          </div>
          <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
        </div>
      );
    };
    
    const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
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
    
    const posts = [
        { borrowerImg: 'borrowerImg.png', title: 'Loan 1', subtitle: 'Subtitle 1' },
        { borrowerImg: 'borrowerImg.png', title: 'Loan 2', subtitle: 'Subtitle 2' },
        { borrowerImg: 'borrowerImg.png', title: 'Loan 3', subtitle: 'Subtitle 3' },
        { borrowerImg: 'borrowerImg.png', title: 'Loan 4', subtitle: 'Subtitle 4' },
        { borrowerImg: 'borrowerImg.png', title: 'Loan 5', subtitle: 'Subtitle 5' },
        { borrowerImg: 'borrowerImg.png', title: 'Loan 6', subtitle: 'Subtitle 6' },
        { borrowerImg: 'borrowerImg.png', title: 'Loan 7', subtitle: 'Subtitle 7' },
        { borrowerImg: 'borrowerImg.png', title: 'Loan 8', subtitle: 'Subtitle 8' },
      ];
      


    return (
    <>
    <NavigationMain />
    <div className="browse-loans-page">
        <h1 className="title">Borrower Proposals</h1>
        <p className="subtitle">Found {proposalCount} proposals</p>
        <h1>Posts</h1>
            <PostsGrid posts={posts} />
    </div></>
    

    
  
    );
    

}


