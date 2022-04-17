import React, { Component } from 'react'
import logo from '../../images/2.png'
import Register from '../Register/register'
import axios from 'axios'
import '../../styles/login.css'
import MainPage from '../MainPage/mainpage';

class Login extends Component {

	constructor(props) {
		super(props)
		this.state = {
			page: false,
			login: "",
			password: "",
			status: "",
			errorMessage: "",
			id : "",
			errorMessage:""
		}


	}
	api = axios.create({
		baseURL: "http://localhost:4000",
		timeout: 1000
	})

	updatePassword = (e) => {
		this.setState({ password: e.target.value })
	}
	updateLogin = (e) => {
		this.setState({ login: e.target.value })
	}
	sendLoginRequest = () => {
		this.api.post('/api/user/login', { login: this.state.login, password: this.state.password } ).then(
			(response) => {
				sessionStorage.setItem('id_user',response.data.id)
				sessionStorage.setItem("token",response.data.token)
				this.setState({id:response.data.id})
				this.props.setPage(<MainPage setPage={this.props.setPage}/>)		
			}

		).catch((erreur)=>{
			console.log(erreur.response.status)
			const err = erreur.response.status 
			if(err === 400){
				this.setState({errorMessage:"Missing fields"})
			}
			if(err === 401 ){
				this.setState({errorMessage:"You have to register"})
			}
			if(err === 403){
				this.setState({errorMessage:"Wrong password "})
			}
		})
	}
	render() {
		return (
			<div className="login-page">
				<div className="login-logo">
					<img className="login-logo-pic" src={logo} alt="logo" />
				</div>
				<div className="login-main">
					{this.state.errorMessage ? <h3 className='error-message'>{this.state.errorMessage}</h3> : ""}
					<h1 className='login-main-title'>Login</h1>
					<div className="login-form">
						<div className="login-fields">
							<input className=" login-input" type="text" name="login" required placeholder="Login" onChange={(e) => this.updateLogin(e)} />
							<input className=" login-password" type="password" required name="password" placeholder="Password" onChange={(e) => this.updatePassword(e)} />
						</div>
						<a className="mdp-oublie" href="mdp_oublie.html">Forgot Password ?</a>
						<button className=" login-submit-login" onClick={() => this.sendLoginRequest()}>Login</button>
					</div>
					<hr width=" 80%" />
					<div className="login-register-div">
						<button className="login-btn-register" onClick={() => this.props.setPage(<Register setPage={this.props.setPage} />)}>Create an account</button>
					</div>
				</div>
			</div>

		)
	}
}


export default Login;
