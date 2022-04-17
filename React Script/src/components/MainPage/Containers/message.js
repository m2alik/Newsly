
import React, { Component } from 'react'
import '../../../styles/message.css'
import Profile from '../Containers/profile'
import Comment from './comment';
import CompletMessage from './completmessage';
import { ImagePicker } from "react-file-picker";

import axios from 'axios'




class Message extends Component {


	constructor(props) {
		super(props)
			this.state = {
				author:this.props.id,
				profilepic: this.props.profilepic,
				value: this.props.value,
				datePubli: this.props.datePubli,
				timePublic: this.props.timePublic,
				nblikes: this.props.nblikes,
				nbcomments: this.props.nbcomments,
				currentToken: '',
				btnComment : false,
				id : this.props.id,
				errorMessage : "",
				ifMyMessage:""
			}
			// this.props.getAllMessages = this.props.getAllMessages.bind(this)
		// })
	}


	
	api = axios.create({
		baseURL: "http://localhost:4000",
		timeout: 1000
	})

	maj_returnMessage = ()=>{
		this.setState({errorMessage:""})
	}


	insertLikeMessage = (id_message,id_liker) =>{
		if(id_liker === null){
			this.setState({errorMessage:"You have to login"})
			setTimeout(() => {
				this.maj_returnMessage();
			  }, 3000);
		}else{
		var url = "api/messages/likes"
		this.api.post(url,{id_message,id_liker}).then((response)=>{
			console.log(response.data)
			this.setState({nblikes:response.data.nb_likes})
		})
		.catch((err)=>{
			console.log(err)
		})
	}
}


	getAuthor = async(id_author)=>{
		return new Promise((resolve,reject)=>{
			var url = "/api/user/"+id_author
			this.api.get(url).then(
				(response) => {
					resolve(response.data.login)
				}
			)
			.catch((err)=>{
				reject(err.response)
			})
		})
	}


	componentDidUpdate(){
		this.getAuthor(this.props.author).then((aut)=>{
			this.setState({author:aut})
		})
		.catch((err)=>{
			console.log(err)
		})
	}
	componentDidMount(){
		this.setState({nblikes:this.props.nblikes})
		this.getAuthor(this.props.author).then((aut)=>{
			this.setState({author:aut})
		})
		.catch((err)=>{
			console.log(err)
		})
		this.checkIfMyMessage()
	}


	deleteMessage = () =>{
		const url = "/api/user/messages/"+this.props.id
		this.api.delete(url).then((response)=>{
			console.log(response.data)
			this.props.getAllMessages()
		})
		.catch((err)=>{
			console.log(err.response.data)
		})
	}

	checkIfMyMessage = () =>{
		const url = "/api/messages/"+this.props.id
		this.api.get(url).then((response)=>{
			if(response.data.message.id_author === parseInt(sessionStorage.getItem("id_user"))){
				this.setState({ifMyMessage:"it's_mine"})
			}
		}) 
		.catch((err)=>{
			console.log(err)
		})
	}
	



	render() {
		return (

			<div className='message' >

				{this.state.errorMessage ? <h3 className='error-message'>{this.state.errorMessage}</h3> : ""}
				<div className='message-infos'>	
					<img src={this.state.profilepic} onClick={() => this.props.setContainer(<Profile setContainer={this.props.setContainer} />)} />
					<div className='message-properties'>
						<p onClick={() => this.props.setContainer(<Profile setContainer={this.props.setContainer} />)}>{this.state.author}</p>
						<div className='message-horaire'>
							<p>{this.state.datePubli} on {this.state.timePublic}</p>
						</div>

					</div>
					{this.state.ifMyMessage !== "" ?

						<button onClick={() => this.deleteMessage()}>
							<i className="fa fa-trash-o fa-2x" aria-hidden="true"></i>
						</button>
						: ""
					}


				</div>





				<div className='message-contenu' onClick={(event) => this.props.setContainer(<CompletMessage id={this.state.id} id_user={this.props.id_user}/>)}>
					<p>{this.props.value}</p>
					<img className='message-contenu-image' src={this.props.image}/>
				</div>
				<div className='message-footer'>
					<div className='message-likes' onClick={()=>this.insertLikeMessage(this.props.id,this.props.id_user)}>
						<button className='message-footer-btn'>
							<i className="fa fa-heart-o fa-2x"></i>
						</button>
						<p>{this.state.nblikes}</p>
					</div>
					<div className='message-comments'>
						<button className='message-footer-btn' onClick={() => this.setState({btnComment:!this.state.btnComment})}>
						<i className="fa fa-commenting-o fa-2x" aria-hidden="true"></i>
						</button>
						<p>{this.state.nbcomments}</p>
					</div>
					<div className='message-republish'>
						<button className='message-footer-btn'><i className="fa fa-retweet fa-2x" aria-hidden="true"></i>
						</button>
					</div>
				</div>
				
					{
						this.state.btnComment  &&
						<>
						{this.props.listComments.map((comment) =>
						<Comment profilepic={comment.profilepic} username={comment.username} datepubli={comment.datepubli} value={comment.value} />
							)
							// this.props.setContainer(<Profile />)
						}
						{(this.props.listComments.length > 2 ) &&
							<p className='comments-showmore' onClick={(event) => this.props.setContainer(<CompletMessage id={this.state.id}/>)}>View all comments</p>
						}
						<div className='add-comment'>
						<div className='add-comment-content'>
							<img src={this.state.profilepic}/>
							<textarea className='comment-textarea' rows="1" placeholder=" write a comment"></textarea>	
							<i className="fa fa-paper-plane-o" aria-hidden="true"></i>
						</div>
					</div>
					</> 
					}
					<div/>

			</div >

		)
	}
}
export default Message;
