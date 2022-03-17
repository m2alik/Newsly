import React, { Component } from 'react'
import logo from '../../images/2.png'
import Register from '../Register/register'
import axios from 'axios'
import '../../styles/login.css'
class Login extends Component {

	constructor(props) {
		super(props)
		this.state = {
			page: false,
			login: "",
			password: "",
			status: "",
			errorMessage: ""
		}


	}
	api = axios.create({
		baseURL: "http://technoweb.lip6.fr:4443",
		timeout: 1000
	})

	updatePassword = (e) => {
		this.setState({ password: e.target.value })
	}
	updateLogin = (e) => {
		this.setState({ login: e.target.value })
	}
	sendLoginRequest = () => {
		this.api.post('/api/user', { parameters: { login: this.state.login, password: this.state.password }, data: {} }).then(
			(response) => {
				console.log(response.data)
				if (response.data["status"] === "error") {
					this.setState({ error: response.data["status"] })
					this.setState({ errorMessage: response.data["texterror"] })
					console.log("error ! ")
				}
			}

		)
	}
	render() {
		return (

			<div className="login-page">
				<div className="login-logo">
					<img className="login-logo-pic" src={logo} alt="logo" />
				</div>
				<div className="login-main">
					<h1 className='login-main-title'>Login</h1>
					<form className="login-form" action="post">
						<div className="login-fields">
							<input className=" login-input" type="text" name="login" placeholder="Login" onChange={() => this.updateLogin} />
							<input className=" login-password" type="password" name="password" placeholder="Password" onChange={() => this.updatePassword} />
						</div>
						<a className="mdp-oublie" href="mdp_oublie.html">Forgot Password ?</a>
						<input className=" login-submit-login" type="submit" value="Log In" onClick={() => this.sendLoginRequest} />
					</form>
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
