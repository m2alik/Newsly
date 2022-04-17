import React, { Component } from 'react'
import ListSuggestion from './listsuggestion';
import Search from './search';
import Stats from './stats';
import '../../../styles/rightaside.css'
import Devloppers from '../../Devs-Informations/devloppers';


class RightAside extends Component {


	constructor(props) {
		super(props);
		this.state = {
			setContainer: this.props.setContainer,
			currentToken: 'a'
		}

	}

	render() {
		return (

			<div className='rightaside'>
				<Search />
				{this.state.currentToken &&
					<div className='rightaside-connected'>
						<ListSuggestion setContainer={this.state.setContainer}/>
						<Stats setContainer={this.state.setContainer} />
					</div>}
				<div className='footer'>
					<div className='footer-infos'>
						<p>Privacy</p>
						<p>Contacts</p>
						{/* <p onClick={this.props.setContainer(<Devloppers />)}>Devloppers</p> */}
					</div>
					<p>© 2022 Amine YK - Amine YK , SU</p>
				</div>

			</div>
		)
	}
}

export default RightAside;