


import React, { Component } from 'react'
import Connected from './connected';
import './listconnected.css'

class ListConnected extends Component {


	constructor(props) {
		super(props);
		this.state = {
			connecteds: this.props.connecteds
		};
	}



	render() {
		return (
			<div className='listconnected'>
				<p className='aside-title'>Contacts</p>
				<hr />
				{this.state.connecteds.map((conn) =>
					<Connected username={conn.username} profilepic={conn.profilepic} />
				)}
			</div>
		)
	}
}
export default ListConnected;