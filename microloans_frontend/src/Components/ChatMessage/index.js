import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './index.scss';
import { useState } from 'react';
import AuthModal from '../AuthModal';
import { useContext } from 'react';
import { ThemeContext } from '../../index';

export function ChatMessage(props) {

  return (
    <>
		<div className='chat__message'>
			<div className={props.typeOfUser}>
				<div className='chat__message--content-top'>

					<span>
						23.13.2023
					</span>
					<span>
						Namedsadksaokdo
					</span>
				</div>
				<div className='chat__message--content-bottom'>
					<span>{props.msg}</span>
				</div>
			</div>
		</div>

    </>
  );
}
