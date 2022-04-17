import React, { Component } from 'react'
import '../../../styles/comment.css'
class Comment extends Component {

	constructor(props){
		super(props)
		this.state={
			profilepic : this.props.profilepic,
			username : this.props.username,
			value : this.props.value,
			datepubli : this.props.datepubli
		}
	}

	render() {
		return (
		<div className='comment'>
			<div className='comment-content'>
				<img src={this.state.profilepic} />
				<div className='comment-informations'>
					<div className='comment-infos'>
						<p className='comment-username'>{this.state.username}</p>
						<p className='comment-datepubli'>{this.state.datepubli}</p>
					</div>
					<p className='comment-value'>{this.state.value}</p>
				</div>
				
			</div>
		</div>
		)
	}
}

export default Comment
