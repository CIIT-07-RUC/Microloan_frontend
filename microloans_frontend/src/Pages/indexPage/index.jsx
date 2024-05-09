import { NavigationMain} from '../../Components/NavigationMain/index.jsx';
import { Row, Container, Col   } from 'react-bootstrap';
import React, {useEffect, useState} from 'react';
import banner from '../../Assets/hero.png';
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
						<h1>Simple and easy loans for all types of situations</h1>
						<Button style={{ width: '530px'}} variant="primary">Get started today!</Button>
				</div>
			</Container>

		</>

	);
}