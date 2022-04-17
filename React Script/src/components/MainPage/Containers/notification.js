import React, { Component } from 'react'
import '../../../styles/notification.css'
class Notification extends Component {


	constructor(props){
		super(props)
	}


	render() {
		return (
			<div className='notification'>
				<p>{this.props.value}</p>
				<i class="fa fa-trash-o" aria-hidden="true"></i>
			</div>
		)
	}
}

export default Notification
