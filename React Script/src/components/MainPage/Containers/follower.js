


import React, { Component } from 'react'
import '../../../styles/follower.css'
import axios from 'axios'
class Follower extends Component {

	constructor(props) {
		super(props)
		this.state = {
			username: this.props.username,
			profilepic: this.props.profilepic,
			currentToken: 'a',
			author : "",
			firstname : "",
			lastname : ""
		}
	}

	api = axios.create({
		baseURL: "http://localhost:4000",
		timeout: 1000
	})


	getAuthor = async(id_author)=>{
		return new Promise((resolve,reject)=>{
			var url = "/api/user/"+id_author
			this.api.get(url).then(
				(response) => {
					resolve(response.data)
				}
			)
			.catch((err)=>{
				reject(err.response)
			})
		})
	}

		componentDidMount(){
			this.getAuthor(this.props.username).then((aut)=>{
				this.setState({author:aut.login})
				this.setState({firstname:aut.firstname})
				this.setState({lastname:aut.lastname})
			})
			.catch((err)=>{
				console.log(err)
			})
		}


		insertFollow = () =>{
			const url = "/api/user/"+sessionStorage.getItem("id_user")+"/followings_followers/"+this.props.username
			this.api.put(url).then((response)=>{
				console.log(response.data.isDone)
				if(response.data.isDone && this.state.followORunfollow === "Follow"){
					this.setState({followORunfollow:"Unfollow"}) 
				}else{
					if(response.data.isDone && this.state.followORunfollow === "Unfollow"){
						this.setState({followORunfollow:"Follow"}) 
					}
				}
				})
			.catch((err)=>{
				console.log(err)
			})
		}

	render() {
		return (
			<div className='follower'>
				<div className='message-infos'>
					<img src={this.props.profilepic} />
					<div className='left-aside-my-infos-bis'>
						<p className='left-aside-my-infos-bis--p'>{this.state.author}</p>
						<p className='left-aside-my-infos-bis-p'>{this.state.firstname+" "+this.state.lastname}</p>
					</div>
				</div>
				{this.state.currentToken &&
					<button className='follower-btn' onClick={() => this.insertFollow()}>Remove</button>
				}
			</div>
		)
	}
}

export default Follower;
