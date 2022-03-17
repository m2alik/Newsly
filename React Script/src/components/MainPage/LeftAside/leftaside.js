import React, { Component } from 'react'
import Login from '../../Login/login';
import logo from '../../../images/1.png'
import profilepic from '../../../images/amine1.JPG'
import Profile from "../Containers/profile"
import Home from "../Containers/home"
import Notifications from "../Containers/notifications"
import Statistics from "../Containers/statistics"
import '../../../styles/leftaside.css'


const user = { firstname: "Doufene", lastname: "malik", username: "Malik DF" }
class LeftAside extends Component {
	constructor(props) {
		super(props);
		this.state = {
			setPage: props.setPage,
			setContainer :props.setContainer
		}

	}



	render() {
		return (
			<div className='leftaside'>
				<div className='logo'>
					<img className='logo-img' src={logo} alt="Error" />
				</div>
				<div className='leftaside-menu'>
					<ul>
						<li >
							<i class="fa fa-home fa-2x" aria-hidden="true"></i>
							<p onClick={() =>this.state.setContainer(<Home/>)} >Home</p>
						</li>
						<li>
							<i class="fa fa-user fa-2x" aria-hidden="true"></i>
							<p onClick={() =>this.state.setContainer(<Profile/>)} >Profile</p>
						</li>
						<li >
							<i class="fa fa-bell fa-2x" aria-hidden="true"></i>
							<p onClick={() =>this.state.setContainer(<Notifications/>)} >Notifications</p>
						</li>
						<li >
							<i class="fa fa-cog fa-2x" aria-hidden="true"></i>
							<p>Settings</p>
						</li>
						<li >
							<i class="fa fa-pie-chart fa-2x" aria-hidden="true"></i>
							<p onClick={() =>this.state.setContainer(<Statistics/>)} >Statistics</p>
						</li>
					</ul>

				</div>
				
				<div className='leftaside-my-infos'>
					<img src={profilepic} />
					<p>{user.username}</p>
					<i class="fa fa-ellipsis-h" aria-hidden="true"></i>
				</div>
			</div>
		)
	}
}


export default LeftAside
