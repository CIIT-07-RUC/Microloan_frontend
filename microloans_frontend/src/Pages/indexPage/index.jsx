import { NavigationMain} from '../../Components/NavigationMain/index.jsx';
import { Row, Container, Col   } from 'react-bootstrap';
import React, {useEffect, useState} from 'react';
import banner from '../../Assets/hero.png';
import investorImg from '../../Assets/investorImg.png';
import borrowerImg from '../../Assets/borrowerImg.png';

import './index.scss';
import Button from 'react-bootstrap/Button';

export function IndexPage() {


	return (
		<>
			<NavigationMain/>
			<div className='index__banner'>
				<img src={banner}/>
				<div className="index__banner__content">
					<div className="index__banner__content--inner">
						<h3>Simple and easy loans for all types of situations</h3>
						<h6>Blabla bla lorem ipsum dolor sit amet blablaBlabla bla lorem ipsum dolor sit amet blabla</h6>
						<Button style={{marginBottom: '20px'}} variant="primary">I want to invest money</Button>
						<Button variant="primary">I want to borrow money</Button>
					</div>
				</div>
			</div>
			<Container>
				<div className="index__presentation" style={{ textAlign: 'center', marginTop: '20px'}}>
						<h1 style={{ marginTop: '40px'}}>Simple and easy loans for all types of situations</h1>
						<Button style={{ width: '530px', marginTop: '20px', height: '60px'}} variant="primary">Get started today!</Button>
				</div>
				<div className="separator"></div>
				<div className="borrower__section" style={{ textAlign: 'center', marginTop: '20px'}}>
					<h1 style={{ marginTop: '40px'}}>As a borrower</h1>
					<Row style={{ alignItems: 'center'}}>
						<Col>
						<img src={borrowerImg}/>
						</Col>
						<Col>
							<div className="borrower__points--wrapper">
								<div className="borrower__point">
									<div className='number--circle--wrapper'>
										<div className="number--circle">1</div>
										<div className="vertical--separator"></div>
									</div>
									<div className='borrower__point--content'>
										<p className='highlight'>Create an account</p>
										<p className='downplay'>It is easy and free of charge</p>
									</div>
								</div>
								<div className="borrower__point">
									<div className='number--circle--wrapper'>
										<div className="number--circle">2</div>
										<div className="vertical--separator"></div>
									</div>
									<div className='borrower__point--content'>
										<p className='highlight'>Fill all required information</p>
										<p className='downplay'>We need your information in  order to create contract</p>
									</div>
								</div>
								<div className="borrower__point">
									<div className='number--circle--wrapper'>
										<div className="number--circle">3</div>
										<div className="vertical--separator"></div>
									</div>
									<div className='borrower__point--content'>
										<p className='highlight'>Apply for a loan</p>
										<p className='downplay'>Apply for a loan up to 50.000 DKK</p>
									</div>
								</div>
								<div className="borrower__point">
									<div className='number--circle--wrapper'>
										<div className="number--circle">4</div>
										<div className="vertical--separator"></div>
									</div>
									<div className='borrower__point--content'>
										<p className='highlight'>Negotiate interest rate with investor</p>
										<p className='downplay'>Communicate with client directly </p>
									</div>
								</div>
								<div className="borrower__point">
									<div className='number--circle--wrapper'>
										<div className="number--circle">5</div>
									</div>
									<div className='borrower__point--content'>
										<p className='highlight'>Get funding</p>
										<p className='downplay'>Get money within 48 hours!</p>
									</div>
								</div>
							</div>
						</Col>
					</Row>
				</div>

				<div className="separator"></div>

				<div className="borrower__section" style={{ textAlign: 'center', marginTop: '20px'}}>
					<h1 style={{ marginTop: '40px'}}>As a investor</h1>
					<Row style={{ alignItems: 'center'}}>
						<Col>
						<img src={investorImg}/>
						</Col>
						<Col>
							<div className="borrower__points--wrapper">
								<div className="borrower__point">
									<div className='number--circle--wrapper'>
										<div className="number--circle">1</div>
										<div className="vertical--separator"></div>
									</div>
									<div className='borrower__point--content'>
										<p className='highlight'>Create an account</p>
										<p className='downplay'>It is easy and free of charge</p>
									</div>
								</div>
								<div className="borrower__point">
									<div className='number--circle--wrapper'>
										<div className="number--circle">2</div>
										<div className="vertical--separator"></div>
									</div>
									<div className='borrower__point--content'>
										<p className='highlight'>Fill all required information</p>
										<p className='downplay'>We need your information in  order to create contract</p>
									</div>
								</div>
								<div className="borrower__point">
									<div className='number--circle--wrapper'>
										<div className="number--circle">3</div>
										<div className="vertical--separator"></div>
									</div>
									<div className='borrower__point--content'>
										<p className='highlight'>Search for a loans</p>
										<p className='downplay'>Search in loan list and choose in which you want to invest</p>
									</div>
								</div>
								<div className="borrower__point">
									<div className='number--circle--wrapper'>
										<div className="number--circle">4</div>
										<div className="vertical--separator"></div>
									</div>
									<div className='borrower__point--content'>
										<p className='highlight'>Negotiate interest rate with borrower</p>
										<p className='downplay'>Communicate with client directly  </p>
									</div>
								</div>
								<div className="borrower__point">
									<div className='number--circle--wrapper'>
										<div className="number--circle">5</div>
									</div>
									<div className='borrower__point--content'>
										<p className='highlight'>Fund money </p>
										<p className='downplay'>And receive money back each month! </p>
									</div>
								</div>
							</div>
						</Col>
					</Row>
				</div>


			</Container>

		</>

	);
}