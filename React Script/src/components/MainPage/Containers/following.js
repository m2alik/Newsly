


import React, { Component } from 'react'
import '../../../styles/following.css'
import axios from 'axios'
class Following extends Component {

	constructor(props) {
		super(props)
		this.state = {
			title: "Following",
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

	changeLabel = (txt) => {
		this.setState({ title: txt })
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
			<div className='following'>
				<div className='message-infos'>
					<img src={this.state.profilepic} />
					<div className='left-aside-my-infos-bis'>
						<p className='left-aside-my-infos-bis--p'>{this.state.author}</p>
						<p className='left-aside-my-infos-bis-p'>{this.state.firstname+" "+this.state.lastname}</p>
					</div>
				</div>
				{this.state.currentToken &&
					<button className='following-btn' onMouseEnter={() => this.changeLabel("Unfollow")} onMouseLeave={() => this.changeLabel("Following")} onClick={() => this.insertFollow()}>{this.state.title}</button>

				}
			</div>
		)
	}
}

export default Following;
