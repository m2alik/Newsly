
import React, { Component } from 'react'
import '../../../styles/message.css'
import Profile from '../Containers/profile'
import Comment from './comment';
import CompletMessage from './completmessage';
import { ImagePicker } from "react-file-picker";
import pic from '../../../images/amine1.JPG'
import axios from 'axios'
import ListComments from './listComments';
import Login from '../../Login/login';

const listComments = [{profilepic:pic,username:"Amine YK",datepubli:"13/08/2022",value:"Belle tof hbb !"},{profilepic:pic,username:"Amine YK",datepubli:"13/08/2022",value:"Belle tof kho !"},{profilepic:pic,username:"Amine YK",datepubli:"13/08/2022",value:"Belle tof khey !"}]






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
				ifMyMessage:"",
				value_comment:"",
				listComments : [],
				authorRetweeted : ""
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

	// Insert un like au niveau de la base de données du message concerné via une requete POST
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

	// renvoie le login de l'utilisateur via son ID
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

	// Permet d'avoir d'une maniere reguliere le login de l'utilisateur et du from lors d'un retweet
	componentDidUpdate(){
		// this.getAuthor(this.props.author).then((aut)=>{
		// 	this.setState({author:aut})
		// })
		// .catch((err)=>{
		// 	console.log(err)
		// })


		// this.getAuthor(this.props.retweetedFrom).then((aut)=>{
		// 	this.setState({authorRetweeted:aut})
		// })
		// .catch((err)=>{
		// 	console.log(err)
		// })
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
		this.gettAllComments()
		// this.setState({id_original_message:response.data.id_original_message}) 
	}

	// Supprime un message de la base de données
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

	// verifie si le message est publie par l'utilisateur connecté
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

	// inserer un commentaire
	insertComment = () =>{
		if(this.props.id_user === null){
			this.setState({errorMessage:"You have to login"})
			setTimeout(() => {
				this.maj_returnMessage();
			  }, 2000);
		}else{
			if(this.state.value_comment===""){
				this.setState({errorMessage:"Invalid Comment"})
					setTimeout(() => {
					this.maj_returnMessage();
			 	 }, 2000);
			}
			else{
		const url = "api/messages/"+this.props.id+"/comments"
		this.api.post(url,{id_commenter:sessionStorage.getItem("id_user"),value_comment:this.state.value_comment}).then((response)=>{
			this.setState({value_comment:""})
			this.gettAllComments()

		})
		.catch((err)=>{
			console.log(err)
		})
	}}}

	// renvoie tous les commentaires du message 
	gettAllComments = () =>{
		const url = "api/messages/"+this.props.id+"/comments"
		this.api.get(url).then((response)=>{
			this.setState({listComments:response.data.listComments})
		})
	}

	// Extrait que tois premiers commentaires de la liste des commentaires
	extraire = (liste)=>{
		var ll = []
		if(liste.length > 2){
			for(var i=0;i<3;i++){
				ll.push(liste[i])	
			}
			return ll
		}
		else{
			return liste
		}
	}

	// cree un message pour l'utilisateur avec le meme contenu que celui qui vient d'etre retweeter
	retweetMessage = () =>{
		if(this.props.id_user === null){
			this.setState({errorMessage:"You have to login"})
			setTimeout(() => {
				this.maj_returnMessage();
			  }, 3000);
		}else{
		const url = "api/messages/"+this.props.id+"/retweets"
		this.api.put(url,{id_user:sessionStorage.getItem("id_user")}).then((response)=>{
			this.getAllMessages()
		})
		.catch((err)=>{
			if(err.response.status === 401){
				this.setState({errorMessage:"You can't retweet you own Newsly"})
				setTimeout(() => {
					this.maj_returnMessage();
				  }, 3000);
			}
			if(err.response.status === 400 ){
				this.setState({errorMessage:"You have already retweet it"})
				setTimeout(() => {
					this.maj_returnMessage();
				  }, 3000);
			}
		})
	}}
	



	render() {
		return (

			<div className='message' >
				{this.props.retweetedFrom !== 0 ? <p className='retweeted-from'>Retweeted from {this.state.authorRetweeted} </p> : ""}
				{this.state.errorMessage ? <h3 className='error-message'>{this.state.errorMessage}</h3> : ""}
				<div className='message-infos'>	
					<img src={this.state.profilepic} onClick={() => this.props.setContainer(<Profile setContainer={this.props.setContainer} id={this.props.author} />)} />
					<div className='message-properties'>
						<p onClick={() => this.props.setContainer(<Profile setContainer={this.props.setContainer} id={this.props.author} />)}>{this.state.author}</p>
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





				<div className='message-contenu'>
					<p onClick={(event) => this.props.setContainer(<CompletMessage id={this.state.id} id_user={this.props.id_user} setContainer={this.props.setContainer} />)}>{this.props.value}</p>
					{this.props.retweetedFrom !== 0 ? <p className='comments-showmore' onClick={()=> this.props.setContainer(<CompletMessage id={this.props.id_message_original} id_user={this.props.id_user} setContainer={this.props.setContainer}/>)}>View Original Newsly from {this.state.authorRetweeted} </p> : ""}
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
						<button className='message-footer-btn' onClick={() => this.retweetMessage()}><i className="fa fa-retweet fa-2x" aria-hidden="true"></i>
						</button>
					</div>
				</div>
				
					{
						this.state.btnComment && 
						<>
						
						{this.props.ifComplete !== 1 ?
						<ListComments listComments={this.extraire(this.state.listComments)}/>
						:<ListComments listComments={this.state.listComments}/>
	}
						{this.props.ifComplete !== 1 && (this.state.listComments.length > 2 ) &&
							<p className='comments-showmore' onClick={(event) => this.props.setContainer(<CompletMessage id={this.props.id} listComments={this.state.listComments}/>)}>View all comments</p>
						}
						<div className='add-comment'>
						<div className='add-comment-content'>
							<img src={this.state.profilepic}/>
							<textarea className='comment-textarea' rows="1" value={this.state.value_comment} placeholder=" write a comment" onChange={(e)=> this.setState({value_comment:e.target.value})}></textarea>	
							<i className="fa fa-paper-plane-o" aria-hidden="true" onClick={()=> this.insertComment()}></i>
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
