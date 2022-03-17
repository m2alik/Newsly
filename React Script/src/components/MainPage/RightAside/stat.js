import React, { Component } from 'react'
import '../../../styles/stat.css'
import Profile from '../Containers/profile'
class Stat extends Component {


	constructor(props) {
		super(props)
		this.state = {
			name: this.props.name,
			value: this.props.value,
			setContainer : this.props.setContainer
		}
	}

	render() {
		return (
			<div className='stat' onClick={() =>this.state.setContainer(<Profile/>)}>
				<p className='stat-name'>{this.state.name}</p>
				<p className='stat-value'>{this.state.value}</p>
			</div>
		)
	}
}

export default Stat;

