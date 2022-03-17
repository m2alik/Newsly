import React, { Component } from 'react'
import './stats.css'
import Stat from './stat';
import Login from './login';
import logo from '../images/logoHeader.png'
import profilepic from '../images/Amine YK.png'
const listS = [{ name: "Followers", value: "1628" }, { name: "Following", value: "92" }, { name: "Likes", value: "12448" }, { name: "Messages", value: "23" }]
const user = { firstname: "Doufene", lastname: "malik", username: "Malik DF" }
class Stats extends Component {
	// liststats = {listS} username={this.state.username} profilepic={this.state.profilepic} connected={this.state.connected} 

	constructor(props) {
		super(props);
		this.state = {
			setPage: props.setPage,

			triggerMessage: false,
			nbClick: 0
		}

	}



	render() {
		return (
			<div className='stats'>
				<div className='logo'>
					<img className='logo-img' src={logo} alt="Error" />
				</div>
				<div className='stats-menu'>
					<ul>
						<li >
							<i class="fa fa-home fa-2x" aria-hidden="true"></i>
							<p onClick={() => this.toggletab("home")} >Home</p>
						</li>
						<li>
							<i class="fa fa-user fa-2x" aria-hidden="true"></i>
							<p onClick={() => this.toggletab("profile")} >Profile</p>
						</li>
						<li >
							<i class="fa fa-bell fa-2x" aria-hidden="true"></i>
							<p onClick={() => this.toggletab("notifications")} >Notifications</p>
						</li>
						<li >
							<i class="fa fa-cog fa-2x" aria-hidden="true"></i>
							<p onClick={() => this.toggletab("settings")} >Settings</p>
						</li>
					</ul>

				</div>
				<div className='stats-my-infos'>
					<img src={profilepic} />
					<div className="stats-my-infos-joined" onClick={() => this.props.setPage(<Login setPage={this.props.setPage} />)}>
						<p>{user.username}</p>
						<p className='joined'>Joined October 2021</p>
					</div>
				</div>
				<div className='stats-container'>
					<hr />
					<div className='stats-listing'>
						{listS.map((st) =>
							<Stat name={st.name} value={st.value} />
						)}
					</div>
				</div>
			</div>
		)
	}
}


export default Stats
