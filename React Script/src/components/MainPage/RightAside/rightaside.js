import React, { Component } from 'react'
import pic1 from '../../../images/profilepic1.png'
import ListSuggestion from './listsuggestion';
import Search from './search';
import Stats from './stats';
import '../../../styles/rightaside.css'


class RightAside extends Component {


	constructor(props) {
		super(props);
		this.state = {
			setContainer: this.props.setContainer,
			currentToken: ''
		}

	}

	render() {
		const list = [{ username: "Amine", profilepic: pic1 }, { username: "Aya", profilepic: pic1 }, { username: "Sabrina", profilepic: pic1 }, { username: "Farid", profilepic: pic1 }]
		return (

			<div className='rightaside'>
				<Search />
				{this.state.currentToken &&
					<div className='rightaside-connected'>
						<ListSuggestion suggestions={list} />
						<Stats setContainer={this.state.setContainer} />
					</div>}
				<div className='footer'>
					<a href="#">Privacy</a>
					<a href="#">Contacts</a>
					<a href="#">Devloppers</a>
					<p>© 2022 Amine YK - Malik DF , SU</p>
				</div>

			</div>
		)
	}
}

export default RightAside;