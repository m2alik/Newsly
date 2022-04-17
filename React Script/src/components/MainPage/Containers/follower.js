


import React, { Component } from 'react'
import '../../../styles/follower.css'
class Follower extends Component {

	constructor(props) {
		super(props)
		this.state = {
			username: this.props.username,
			profilepic: this.props.profilepic,
			currentToken: 'a'
		}
	}

	render() {
		return (
			<div className='follower'>
				<div className='message-infos'>
					<img src={this.state.profilepic} />
					<p>{this.state.username}</p>
				</div>
				{this.state.currentToken &&
					<button className='follower-btn'>Remove</button>
				}
			</div>
		)
	}
}

export default Follower;
