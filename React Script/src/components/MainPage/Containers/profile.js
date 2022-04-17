import React, { Component } from 'react'
import pic from '../../../images/amine1.JPG'
import Followers from './followers'
import Followings from './followings'
import Messages from './messages'
import '../../../styles/profile.css'
import phtotdecouverture from '../../../images/couv1.jpg'
import axios from 'axios'


class Profile extends Component {

	constructor(props) {
		super(props)
		this.state = {
			profContainer: null,
			editdiv : false,
			user_infos:"",
			firstname : "",
			lastname : "",
			email : "",
			username : "",
			password : "",
			confirmpassword :"",
			bio : "",
			errorMessage : ""
		}
	}

	api = axios.create({
		baseURL: "http://localhost:4000",
		timeout: 1000
	})
	

	componentDidMount() {
		this.setProfContainer(<Messages setContainer={this.props.setContainer} />)
		this.getUserConnected()
	}


	getUserConnected = () => {
		var url = "/api/user/"+sessionStorage.getItem("id_user")
		this.api.get(url).then(
			(response) => {
				this.setState({user_infos:response.data})
				this.setState(
					{
						firstname:this.state.user_infos.firstname,
						lastname:this.state.user_infos.lastname,
						username:this.state.user_infos.username,
						password:this.state.user_infos.password,
						email:this.state.user_infos.email					
					}
					)
				// console.log("Statut"+this.state.user_infos)
				if (response.data["status"] === "error") {
					this.setState({ error: response.data["status"] })
					this.setState({ errorMessage: response.data["texterror"] })
					console.log("error ! ")
				}
			}
		)
	}

	setProfContainer = (container) => {
		this.setState({ profContainer: container })
	}



	handleProfilePic = (e) => {
		const reader = new FileReader();
		reader.onload = () => {
			// 2 if the  operation is complete , 1 if it loading
			if (reader.readyState === 2) {
				this.setState({ profilepic: reader.result })
			}
		}
		reader.readAsDataURL(e.target.files[0])
	}

	checkConfirmPassword = ()=>{
		console.log(this.state.password)
		console.log(this.state.confirmpassword)
		if(this.state.confirmpassword === this.state.password){
			return true
		}
		this.setState({errorMessage:"You have to confirm password"})
		return false
	}

	saveEditProfile = ()=>{
		if(this.checkConfirmPassword()){
			const  url = "api/user/"+sessionStorage.getItem("id_user")
			this.api.post(url,{firstname:this.state.firstname,lastname:this.state.lastname,email:this.state.email,username:this.state.username,password:this.state.password,bio:this.state.bio}).then((response)=>{
				console.log(response.data)
				this.setState({editdiv:false})
			})
			.catch((err)=>{
				console.log(err.response.status)
			})
		}
	}

	updateInputs = (nb,e,classname) =>{
		document.getElementsByClassName(classname).value = e.target.value
		if(nb === 1){
			this.setState({firstname:e.target.value})
			return
		}
		if(nb === 2){
			this.setState({lastname:e.target.value})
			return
		}
		if(nb === 3){
			this.setState({email:e.target.value})
			return
		}
		if(nb === 4){
			this.setState({username:e.target.value})
			return
		}
		if(nb === 5){
			this.setState({password:e.target.value})
			return
		}
		if(nb === 6){
			this.setState({confirmpassword:e.target.value})
			return
		}
		if(nb === 7){
			this.setState({bio:e.target.value})
			return
		}
	}

	render() {
		return (
			<div className='profile'>
				<img className='photo-couverture' src ={phtotdecouverture}/>
				<div className='profile-informations'>
					<div className='profile-infos'>
						<div className='profile-infos-bloc'>
							<input type="file" name="image-upload" id="input-img" accept='images/*' onChange={this.handleProfilePic} />
							<label htmlFor='input-img' className='image-input'></label>
							<img src={pic} htmlFor='input-img' />
						</div>
						<button className='profile-btn-edit' onClick={() => this.setState({editdiv:true})}>Edit Profile</button>
					</div>
					<div className='profile-stats'>
						<p className='profile-stats-name'>{this.state.user_infos.login}</p>
						<p className='profile-stats-bio'>{this.state.user_infos.biography}</p>
						<div className='profile-stats-follow'>
						<div className='profile-stats-followers'>
							<p className='profile-stats-followers-value'>123</p>
							<p className='profile-stats-followers-title'>Followers</p>
						</div>
						<div className='profile-stats-following'>
							<p className='profile-stats-following-value'>81</p>
							<p className='profile-stats-following-title'>Following</p>
						</div>
						</div>
					</div>
				</div>
				<div className='profile-header'>
					<ul>
						<li >
							<p onClick={() => this.setProfContainer(<Messages setContainer={this.props.setContainer}  />)} >Messages</p>
						</li>
						<li>
							<p onClick={() => this.setProfContainer(<Followers setContainer={this.props.setContainer} />)}>Followers</p>
						</li>
						<li>
							<p onClick={() => this.setProfContainer(<Followings setContainer={this.props.setContainer} />)}>Following</p>
						</li>
					</ul>
				</div>

				{this.state.profContainer}

				<div >
						{this.state.editdiv && 
						<div className='editprofile'>
						 	<div className='editprofile-header'>
								<p>Edit Profile</p>
							{this.state.errorMessage ? <h3 className='error-message-editdiv'>{this.state.errorMessage}</h3> : ""}
								<div className='edit-profile-header-buttons'>
									<i class="fa fa-times fa-2x" aria-hidden="true" onClick={()=>this.setState({editdiv:false})}></i>
									<button onClick={()=>this.saveEditProfile()}>Save</button>
								</div>
							</div>
							{/* // this.setState({ firstname: e.target.value })}  */}
							<div className='editprofile-content'>
								<input className="editprofile-register-id1"  type="text" required name="firstName"   placeholder={this.state.firstname} onChange={(e) => this.updateInputs(1,e,"editprofile-register-id")}/>
								<input className="editprofile-register-id2" type="text" required name="lastName" placeholder={this.state.lastname} onChange={(e) => this.updateInputs(2,e,"editprofile-register-id2")} />
								<input className="editprofile-register-loginInfo1" type="email" name="email"  onChange={(e) => this.updateInputs(3,e,"editprofile-register-loginInfo1")} placeholder={this.state.email} />
								<input className="editprofile-register-loginInfo2" type="text" name="login"  onChange={(e) => this.updateInputs(4,e,"editprofile-register-loginInfo2")} placeholder={this.state.username} />
								<input className="editprofile-register-loginInfo3" type="password" name="password" placeholder={this.state.password} onChange={(e) => this.updateInputs(5,e,"editprofile-register-loginInfo3")} />
								<input className="editprofile-register-loginInfo4" type="password" name="confirmPassword" placeholder="Confirm Password" onChange={(e) => this.updateInputs(6,e,"editprofile-register-loginInfo4")}/>
								<textarea className='bio' placeholder='Your Bio' onChange={(e) => this.updateInputs(7,e,"bio")}>{this.state.user_infos.biography}</textarea>
							</div>	 
						</div>
					}
				</div>
				<div >
						{this.state.editdiv && 
						<div className='hide'>
							
						</div>
					}
				</div>


			</div>


		)
	}
}
export default Profile;
