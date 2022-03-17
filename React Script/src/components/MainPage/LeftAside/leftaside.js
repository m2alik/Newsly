import React, { Component } from 'react'
import Login from '../../Login/login';
import logo from '../../../images/1.png'
import profilepic from '../../../images/amine1.JPG'
import Profile from "../Containers/profile"
import Home from "../Containers/home"
import Notifications from "../Containers/notifications"
import Statistics from "../Containers/statistics"
import '../../../styles/leftaside.css'
import Register from '../../Register/register';


const user = { firstname: "Doufene", lastname: "malik", username: "Malik DF" }
class LeftAside extends Component {
	constructor(props) {
		super(props);
		this.state = {
			setPage: props.setPage,
			setContainer: props.setContainer,
			currentToken: 'a'
		}

	}



	render() {
		return (
			<div className='leftaside'>
				<div className='logo'>
					<img className='logo-img' src={logo} alt="Error" />
				</div>

				{this.state.currentToken === '' ?
					<div className='leftaside-notconnected'>
						<button className="notconnected-btn-login" onClick={() => this.props.setPage(<Login setPage={this.props.setPage} />)}>Log In</button>
						<hr width='70%' />
						<p> You don't have an account?</p>
						<button className="notconnected-btn-register" onClick={() => this.props.setPage(<Register setPage={this.props.setPage} />)}>Create an account</button>
					</div> :
					< div className='leftaside-connected'>
						<ul className='leftaside-menu'>

							<li >
								<i class="fa fa-home fa-2x" aria-hidden="true"></i>
								<p onClick={() => this.props.setContainer(<Home setContainer={this.props.setContainer} />)} >Home</p>
							</li>
							<li>
								<i class="fa fa-user fa-2x" aria-hidden="true"></i>
								<p onClick={() => this.props.setContainer(<Profile setContainer={this.props.setContainer} />)} >Profile</p>
							</li>
							<li >
								<i class="fa fa-bell fa-2x" aria-hidden="true"></i>
								<p onClick={() => this.props.setContainer(<Notifications />)} >Notifications</p>
							</li>
							<li >
								<i class="fa fa-cog fa-2x" aria-hidden="true"></i>
								<p>Settings</p>
							</li>
							<li >
								<i class="fa fa-pie-chart fa-2x" aria-hidden="true"></i>
								<p onClick={() => this.props.setContainer(<Statistics />)} >Statistics</p>
							</li>
						</ul>


						<div className='leftaside-my-infos'>
							<img src={profilepic} />
							<p>{user.username}</p>
							<i class="fa fa-ellipsis-h" aria-hidden="true"></i>
						</div>
					</div>}
			</div>
		)
	}
}


export default LeftAside
