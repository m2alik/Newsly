



import React, { Component } from 'react'
import '../../../styles/suggestion.css'
import Profile from '../Containers/profile'


class Suggestion extends Component {

	constructor(props) {
		super(props)
		this.state = {
			username: this.props.username,
			profilepic: this.props.profilepic

		}
	}


	render() {
		return (
			<div className='suggestion'>
				<img src={this.state.profilepic} alt={this.state.username} className='suggestion-profile-pic' onClick={() => this.props.setContainer(<Profile setContainer={this.props.setContainer}/>)} />
				<p className='suggestion-username' onClick={() => this.props.setContainer(<Profile setContainer={this.props.setContainer}/>)}>{this.state.username}</p>
				<a className='suggestion-follow' href='#'>Follow</a>
			</div>
		)
	}
}
export default Suggestion;
