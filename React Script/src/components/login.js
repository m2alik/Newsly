import React, { Component } from 'react'
import './login.css'
import logo from '../images/2.png'
import Register from './register'
class Login extends Component {

    constructor(props){
        super(props)
		this.state={
			page : false
		}
		this.changePage.bind(this)
    }

	changePage = () =>{
		this.setState({page:true})
		console.log(this.state.page)
	}

    render() {
        return (
			
		< div className='login'>			
			{
			
			<div className={this.state.page === true ? "register-container" : "container-no-active"}>
				<Register />
			</div>
			}

			
			
			<div className={this.state.page === false ? "login-container" : "container-no-active"}>
                <div className="login-page">
		            <div className="login-logo">
			            <img className="login-logo-pic"src={logo} alt="logo" />
		            </div>
		        <div className="login-main">
			        <h1 className='login-main-title'>Login</h1>
			        <form className="login-form"action="post">
			        	<div className="login-fields">
				        	<input className=" login-input" type="text" name="login" placeholder="Login" br />
					        <input className=" login-password" type="password" name="password" placeholder="Password" br />
				        </div>
				        <a className="mdp-oublie" href="mdp_oublie.html">Forgot Password ?</a>
				        <input className=" login-submit-login" type="submit" value="Log In" />
			        </form>
			        <hr width=" 80%" />
			        <div className="login-register-div">
			        	<button className="login-btn-register" onClick={() => this.changePage()}>Create an account</button>
			         </div>
		         </div>
	            </div>
            </div>
		
		</div>

        )
    }
}


export default Login;
