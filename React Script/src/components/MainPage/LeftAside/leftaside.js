import React, { Component } from 'react'
import Login from '../../Login/login';
import logo from '../../../images/1.png'
import profilepic from '../../../images/amine1.JPG'
import Profile from "../Containers/profile"
import Home from "../Containers/home"
import Notifications from "../Containers/notifications"
import Statistics from "../Containers/statistics"
import '../../../styles/leftaside.css'
import Register from '../../Register/register'
import axios from 'axios'
import { useState, useEffect } from "react";



// const user = { firstname: "Doufene", lastname: "malik", username: "Amine YK" }
class LeftAside extends Component {
	constructor(props) {
		super(props);
		this.state = {
			setPage: props.setPage,
			setContainer: props.setContainer,
			currentToken: '',
			settings : false,
			user_infos : ""
		}

	}

	// componentDidMount () {
	// 	document.addEventListener("mousedown" , (event) =>{
	// 		if(event.target.className !== 'settings-popup-changetheme'){
	// 		this.setState({settings:false})
	// 	}
	// })}


	api = axios.create({
		baseURL: "http://localhost:4000",
		timeout: 1000
	})
	// [user_infos,setUser_infos] = useState([])



	getUserConnected = () => {
		// if(this.props.id !== undefined){
		var url = "/api/user/"+sessionStorage.getItem("id_user")
		this.api.get(url).then(
			(response) => {
				this.setState({user_infos:response.data,currentToken:sessionStorage.getItem("token")})
				if (response.data["status"] === "error") {
					this.setState({ error: response.data["status"] })
					this.setState({ errorMessage: response.data["texterror"] })
					console.log("error ! ")
				}
			}
		)
		.catch((err)=>{
			this.setState({currentToken:""})
		})
	// }
	}


	// Elle l'est facultifive !!!
	logOut = () => {
		var url = "/api/user/"+sessionStorage.getItem("id_user")
		this.api.delete(url).then(
			(response) => {
				sessionStorage.clear();
				this.props.setPage(<Login setPage={this.state.setPage}/>)
				this.setState({user_infos:response.data})
				if (response.data["status"] === "error") {
					this.setState({ error: response.data["status"] })
					this.setState({ errorMessage: response.data["texterror"] })
					console.log("error ! ")
				}
			}
		)
	}

	componentDidMount = ()=>{
		if(sessionStorage.getItem("id_user") !== null){
			this.getUserConnected()   
		}
	}



	render() {
		return (
			<div className='leftaside'>
				<div className='logo'>
					<img className='logo-img' src={logo} alt="Error" onClick={() => this.props.setContainer(<Home setContainer={this.props.setContainer}/>)} />
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
								<i className="fa fa-home fa-2x" aria-hidden="true"></i>
								<p onClick={() => this.props.setContainer(<Home setContainer={this.props.setContainer}  />)} >Home</p>
							</li>
							<li>
								<i className="fa fa-user fa-2x" aria-hidden="true"></i>
								<p onClick={() => this.props.setContainer(<Profile setContainer={this.props.setContainer}   />)} >Profile</p>
							</li>
							<li >
								<i className="fa fa-bell fa-2x" aria-hidden="true"></i>
								<p onClick={() => this.props.setContainer(<Notifications setContainer={this.props.setContainer}   />)} >Notifications</p>
							</li>
							<li >
								<i className="fa fa-cog fa-2x" aria-hidden="true"></i>
								<p>Settings</p>
							</li>
							{/* <button onClick={()=> this.getUserConnected()}>IIIZZLKZBKHJGVH</button> */}
							<li >
								<i className="fa fa-pie-chart fa-2x" aria-hidden="true"></i>
								<p onClick={() => this.props.setContainer(<Statistics />)} >Statistics</p>
							</li>
						</ul>


						<div className='leftaside-my-infos'>
							<img src={profilepic} />
							<p>{this.state.user_infos.login}</p>
							<i className="fa fa-ellipsis-h" aria-hidden="true" onClick={() => this.setState({settings:!this.state.settings})}></i>
						</div>
						{
							this.state.settings && 
							<div className='settings-popup'>
								<div className='settings-popup-changetheme'>
									<i className="fa fa-moon-o" aria-hidden="true"></i>
									<p>Change Theme</p>
								</div>
								<div className='settings-popup-logout' onClick={() => this.logOut()}>
									<i className="fa fa-sign-out" aria-hidden="true"></i>
									<p>Log Out</p>
								</div>
							</div>
						}
					</div>}
			</div>
		)
	}
}


export default LeftAside
