


import React, { Component } from 'react'
import '../../../styles/following.css'
class Following extends Component {

	constructor(props) {
		super(props)
		this.state = {
			title: "Following",
			username: this.props.username,
			profilepic: this.props.profilepic,
			currentToken: ''
		}
	}

	changeLabel = (txt) => {
		this.setState({ title: txt })
	}

	render() {
		return (
			<div className='following'>
				<div className='message-infos'>
					<img src={this.state.profilepic} />
					<p>{this.state.username}</p>
				</div>
				{this.state.currentToken &&
					<button className='following-btn' onMouseEnter={() => this.changeLabel("Unfollow")} onMouseLeave={() => this.changeLabel("Following")}>{this.state.title}</button>

				}
			</div>
		)
	}
}

export default Following;
