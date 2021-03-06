import React, { Component } from 'react'

import logo from '../../images/2.png'
import discord from "../../images/discord.png"
import facebook from "../../images/fb.png"
import google from "../../images/google.png"
import Login from '../Login/login'
import axios from 'axios'

import '../../styles/register.css'


class Register extends Component {
	constructor(props) {
		super(props)
		this.state = {
			accessToken: "",
			firstname: "",
			lastname: "",
			email: "",
			password: "",
			confirmpassword: "",
			username : "",
			day: "6",
			month: "11",
			year:"1998",
			gender: "",
			errorMessage: "",
			setPage: props.setPage
		}
	}
	api = axios.create({
		baseURL: "http://localhost:4000",
		timeout: 1000,
	})


	checkConfirmPassword = ()=>{
		if(this.state.confirmpassword === this.state.password){
			return true
		}
		this.setState({errorMessage:"You have to confirm password"})
		return false
	}

	generateDate = (d,m,y) =>{
		return y+"-"+m+"-"+d
	}

	sendUser = () => {
		if(this.checkConfirmPassword()){
		this.api.put('/api/user', { login: this.state.username, password: this.state.password, firstname: this.state.firstname, lastname: this.state.lastname , email:this.state.email,gender:this.state.gender,dateNaissance:this.generateDate(this.state.day,this.state.month,this.state.year)} ).then(
			(response) => {
				this.props.setPage(<Login setPage={this.props.setPage} />)
				console.log(response.data)
			}
		)
		.catch((err)=>{
			if(err.response.status === 400){
				this.setState({errorMessage:"Missing Fields"})
			}
		})
	}
}
	// api facebook
	// responseFacebook = (response) => {
	// 	this.setState({accessToken : response.accessToken})
	// 	console.log(response.accessToken);
	// }

	// componentClicked = (data)=>{
	// 	console.log("data ",data)
	// }


	render() {
		return (
			<div className='register'>
				{/* api facebook */}
				{/* <FacebookLogin
    appId="1318622208651278"
    autoLoad={true}
    fields="name,email,picture"
    onClick={this.componentClicked}
    callback={this.responseFacebook} /> */}

					<div className="register-content">
						<div className="register-logo">
							<img className="register-logo-img" src={logo} alt="logo" />
						</div>
						<div className="register-main">
							{this.state.errorMessage ? <h3 className='error-message'>{this.state.errorMessage}</h3> : ""}
							<h1>Sign In</h1>
							<div className="register-icons">
								<a href="https://www.discord.com">
									<img className="register-icons-img" src={discord} alt="logo discord" />
								</a>
								<a href="https://www.facebook.com">
									<img className="register-icons-img" src={facebook} alt="logo google" />
								</a>
								<a href="https://www.google.com">
									<img className="register-icons-img" src={google} alt="logo facebook" />
								</a>
							</div>
							<hr width="80%" color="grey" />
							{/* <form className="register-htmlForm"> */}
							<div className="register-fields">
								<div className="register-nameSurname">
									<input className="register-id" type="text" required name="firstName" placeholder="First Name" onChange={(e) => this.setState({ firstname: e.target.value })} />
									<input className="register-id" type="text" required name="lastName" placeholder="Last Name" onChange={(e) => this.setState({ lastname: e.target.value })} />
								</div>
								<div className="register-genderSelect">
									<p className='register-p'>Gender</p>
									<div className="register-genders">
										<label htmlFor="male">Male</label>
										<input className='register-radio' type="radio" id="male" name="gender" value="male" onChange={(e) => this.setState({gender:e.target.value})} />
									</div>
									<div className="register-genders">
										<label htmlFor="female">Female</label>
										<input className='register-radio' type="radio" id="female" name="gender" value="female" onChange={(e) => this.setState({gender:e.target.value})} />
									</div>
									<div className="register-genders">
										<label htmlFor="notConsidered">Other</label>
										<input className='register-radio' type="radio" id="notConsidered" name="gender" value="notConsidered" onChange={(e) => this.setState({gender:e.target.value})}/>
									</div>
								</div>
								<div className="register-dateOfBirth">
									
									<p className="register-p">Date of birth</p>
									<select className='register-select' defaultValue="6" name="day" id="day" onChange={(e) => this.setState({day:e.target.value})}>
										<option name="day" htmlFor="day" value="1" >1</option>
										<option name="day" value="2">2</option>
										<option name="day" value="3">3</option>
										<option value="4" name="day">4</option>
										<option value="5" name="day">5</option>
										<option value="6" name="day" >6</option>
										<option value="7" name="day">7</option>
										<option value="8" name="day">8</option>
										<option value="9" name="day">9</option>
										<option value="10" name="day">10</option>
										<option value="11" name="day">11</option>
										<option value="12" name="day">12</option>
										<option value="13" name="day">13</option>
										<option value="14" name="day">14</option>
										<option value="15" name="day">15</option>
										<option value="16" name="day">16</option>
										<option value="17" name="day">17</option>
										<option value="18" name="day">18</option>
										<option value="19" name="day">19</option>
										<option value="20" name="day">20</option>
										<option value="21" name="day">21</option>
										<option value="22" name="day">22</option>
										<option value="23" name="day">23</option>
										<option value="24" name="day">24</option>
										<option value="25" name="day">25</option>
										<option value="26" name="day">26</option>
										<option value="27" name="day">27</option>
										<option value="28" name="day">28</option>
										<option value="29" name="day">29</option>
										<option value="30" name="day">30</option>
										<option value="31" name="day">31</option>
									</select>
									<select className='register-select' defaultChecked="11" name="month" id="month" onChange={(e) => this.setState({ month: e.target.value})}>
										<option value="1">January</option>
										<option value="2">February</option>
										<option value="3">March</option>
										<option value="4">April</option>
										<option value="5">May</option>
										<option value="6">June</option>
										<option value="7">July</option>
										<option value="8">August</option>
										<option value="9">September</option>
										<option value="10">October</option>
										<option value="11">November</option>
										<option value="12">December</option>
									</select>
									<select className='register-select' defaultValue="1998" name="year" id="year" onChange={(e) => this.setState({ year: e.target.value})}>
										<option value="2022">2022</option>
										<option value="2021">2021</option>
										<option value="2020">2020</option>
										<option value="2019">2019</option>
										<option value="2018">2018</option>
										<option value="2017">2017</option>
										<option value="2016">2016</option>
										<option value="2015">2015</option>
										<option value="2014">2014</option>
										<option value="2013">2013</option>
										<option value="2012">2012</option>
										<option value="2011">2011</option>
										<option value="2010">2010</option>
										<option value="2009">2009</option>
										<option value="2008">2008</option>
										<option value="2007">2007</option>
										<option value="2006">2006</option>
										<option value="2005">2005</option>
										<option value="2004">2004</option>
										<option value="2003">2003</option>
										<option value="2002">2002</option>
										<option value="2001">2001</option>
										<option value="2000">2000</option>
										<option value="1999">1999</option>
										<option value="1998" >1998</option>
										<option value="1997">1997</option>
										<option value="1996">1996</option>
										<option value="1995">1995</option>
										<option value="1994">1994</option>
										<option value="1993">1993</option>
										<option value="1992">1992</option>
										<option value="1991">1991</option>
										<option value="1990">1990</option>
										<option value="1989">1989</option>
										<option value="1988">1988</option>
										<option value="1987">1987</option>
										<option value="1986">1986</option>
										<option value="1985">1985</option>
										<option value="1984">1984</option>
										<option value="1983">1983</option>
										<option value="1982">1982</option>
										<option value="1981">1981</option>
										<option value="1980">1980</option>
										<option value="1979">1979</option>
										<option value="1978">1978</option>
										<option value="1977">1977</option>
										<option value="1976">1976</option>
										<option value="1975">1975</option>
										<option value="1974">1974</option>
										<option value="1973">1973</option>
										<option value="1972">1972</option>
										<option value="1971">1971</option>
										<option value="1970">1970</option>
										<option value="1969">1969</option>
										<option value="1968">1968</option>
										<option value="1967">1967</option>
										<option value="1966">1966</option>
										<option value="1965">1965</option>
										<option value="1964">1964</option>
										<option value="1963">1963</option>
										<option value="1962">1962</option>
										<option value="1961">1961</option>
										<option value="1960">1960</option>
										<option value="1959">1959</option>
										<option value="1958">1958</option>
										<option value="1957">1957</option>
										<option value="1956">1956</option>
										<option value="1955">1955</option>
										<option value="1954">1954</option>
										<option value="1953">1953</option>
										<option value="1952">1952</option>
										<option value="1951">1951</option>
										<option value="1950">1950</option>
										<option value="1949">1949</option>
										<option value="1948">1948</option>
										<option value="1947">1947</option>
										<option value="1946">1946</option>
										<option value="1945">1945</option>
										<option value="1944">1944</option>
										<option value="1943">1943</option>
										<option value="1942">1942</option>
										<option value="1941">1941</option>
										<option value="1940">1940</option>
										<option value="1939">1939</option>
										<option value="1938">1938</option>
										<option value="1937">1937</option>
										<option value="1936">1936</option>
										<option value="1935">1935</option>
										<option value="1934">1934</option>
										<option value="1933">1933</option>
										<option value="1932">1932</option>
										<option value="1931">1931</option>
										<option value="1930">1930</option>
										<option value="1929">1929</option>
										<option value="1928">1928</option>
										<option value="1927">1927</option>
										<option value="1926">1926</option>
										<option value="1925">1925</option>
										<option value="1924">1924</option>
										<option value="1923">1923</option>
										<option value="1922">1922</option>
										<option value="1921">1921</option>
										<option value="1920">1920</option>
										<option value="1919">1919</option>
										<option value="1918">1918</option>
										<option value="1917">1917</option>
										<option value="1916">1916</option>
										<option value="1915">1915</option>
										<option value="1914">1914</option>
										<option value="1913">1913</option>
										<option value="1912">1912</option>
										<option value="1911">1911</option>
										<option value="1910">1910</option>
										<option value="1909">1909</option>
										<option value="1908">1908</option>
										<option value="1907">1907</option>
										<option value="1906">1906</option>
										<option value="1905">1905</option>
									</select>
								</div>
								<div className="register-loginInfos">
									<input className="register-loginInfo" required type="email" name="email" placeholder="email" onChange={(e) => this.setState({ email: e.target.value })} />
									<input className="register-loginInfo" required type="text" name="username" placeholder="username" onChange={(e) => this.setState({ username: e.target.value})} />
									<input className="register-loginInfo" required type="password" name="password" placeholder="Password" onChange={(e) => this.setState({ password: e.target.value })} />
									<input className="register-loginInfo" required type="password" name="confirmPassword" placeholder="Confirm Password" onChange={(e) => this.setState({ confirmpassword: e.target.value })} />
								</div>
							</div>
							<button className="register-btn-signin" onClick={() => this.sendUser()}>Sign In </button>
							
						</div>
					</div>
				</div>
			
		)
	}
}

export default Register;
