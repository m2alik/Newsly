import React, { Component , useState , useEffect } from 'react'
import pic from '../../../images/amine1.JPG'
import Message from './message'
import '../../../styles/home.css'
import nature from '../../../images/nature.jpg'
import EmojiPicker from "emoji-picker-react";
import nature1 from '../../../images/nature1.jpg'
import axios from 'axios'
import ReactDOM from 'react-dom'
import ListMessages from './listMessages'



const listComments = [{profilepic:pic,username:"Amine YK",datepubli:"13/08/2022",value:"Belle tof hbb !"},{profilepic:pic,username:"Amine YK",datepubli:"13/08/2022",value:"Belle tof kho !"},{profilepic:pic,username:"Amine YK",datepubli:"13/08/2022",value:"Belle tof khey !"}]



const user = { firstname: "nvj", lastname: "malik", username: "Amine YK" }
const listM = [{ author: "Vladimir Putin", profilepic: pic, value: "C'est la guerre en ukraine", datePubli: "25/02/2022", timePublic: "5:02am", nblikes: "199", nbcomments: "12",id:"1" }, { author: "Maes", profilepic: pic, value: "Cette famille parisienne va parcourir 2000 kilomètres pour livrer des dons aux réfugiés ukrainiens, dans une ville polonaise frontalière du pays en guerre.Ils apporteront avec eux l’équivalent de 250 colis recueillis auprès de 400 donateurs", datePubli: "17/09/2021", timePublic: "3:18pm", nblikes: "199", nbcomments: "12" ,image:nature,id:"2" }, { author: "Soolking ", profilepic: pic, value: "Je t'aime mon Algeria", datePubli: "25/02/2022", timePublic: "5:52pm", nblikes: "199", nbcomments: "12" ,image:nature1,id:"3"}, { author: "Maes", profilepic: pic, value: "Cette famille parisienne va parcourir 2000 kilomètres pour livrer des dons aux réfugiés ukrainiens, dans une ville polonaise frontalière du pays en guerre.Ils apporteront avec eux l’équivalent de 250 colis recueillis auprès de 400 donateurs", datePubli: "17/09/2021", timePublic: "3:18pm", nblikes: "199", nbcomments: "12",id:"4" }, { author: "Maes", profilepic: pic, value: "Cette famille parisienne va parcourir 2000 kilomètres pour livrer des dons aux réfugiés ukrainiens, dans une ville polonaise frontalière du pays en guerre.Ils apporteront avec eux l’équivalent de 250 colis recueillis auprès de 400 donateurs", datePubli: "17/09/2021", timePublic: "3:18pm", nblikes: "199", nbcomments: "12",id:"5" }, { author: "Maes", profilepic: pic, value: "Cette famille parisienne va parcourir 2000 kilomètres pour livrer des dons aux réfugiés ukrainiens, dans une ville polonaise frontalière du pays en guerre.Ils apporteront avec eux l’équivalent de 250 colis recueillis auprès de 400 donateurs", datePubli: "17/09/2021", timePublic: "3:18pm", nblikes: "199", nbcomments: "12" ,id:"6" }]
class Home extends Component {

	constructor(props) {
		super(props)
		this.state = {
			btnState: '',
			currentToken: '',
			showemojis : false,
			user_infos : [],
			value_message : "",
			message_return : "",
			all_messages : [],
			authors : [],
			IZAN:""
		}
	}


	api = axios.create({
		baseURL: "http://localhost:4000",
		timeout: 1000
	})
		getUserConnected = () => {
		var url = "/api/user/"+this.props.id
		this.api.get(url).then(
			(response) => {
				this.setState({user_infos:response.data,currentToken:response.data._id})
			}
		)
		}
	

	maj_returnMessage = ()=>{
		this.setState({message_return:""})
	} 

	insertMessage = () =>{
		var url = "/api/user/messages"
		this.api.put(url,{id_author:this.state.user_infos.id,login_author:this.state.user_infos.login,value_message:this.state.value_message}).then((response)=>{
			this.setState({value_message:"",message_return:"Done"})
			// met a jour le "message_return" a "" au bout de 3s
			setTimeout(()=>{this.maj_returnMessage()},3000);
			// 
			setTimeout(()=>{this.getAllMessages()},2000);
			this.getAllMessages()

		})
		.catch((err)=>{
			this.setState({message_return:"Error"})
			// met a jour le "message_return" --> "" au bout de 3s
			setTimeout(()=>{this.maj_returnMessage()},3000);
		})
	}


	
	getAllMessages = () =>{
		var url = "/api/messages"
		this.api.get(url).then((response)=>{
			this.setState({all_messages:response.data.list_Messages})  
		})
		.catch((err)=>{
			console.log(err)
		})
	}	
		// 	const new_messages = (this.state.all_messages.map(
				
		// 		(mess) => 
		// 		this.getAuthor(mess.id_author).then((aut)=>{
		// 			// <Message author={aut} profilepic={mess.profilepic} value={mess.value_message} datePubli={mess.date_publi} timePublic={mess.timePublic} nblikes={mess.nblikes} nbcomments={mess.nbcomments} image={mess.image} id={mess.id_message} setContainer={this.props.setContainer} listComments={listComments} />
		// 			<h1>{aut}</h1>
		// 			console.log(aut)
		// 		})
		// 		)
		// 		)
		// 		console.log(new_messages)
		// 		ReactDOM.render(new_messages,document.getElementById("home-messages"))
		
		// }


	handleBtnState(event) {
		this.setState({ btnState: event.target.value })
	}

	
	// getAuthor = (id_author)=>{
	// 	return
	// 		var url = "/api/user/"+id_author
	// 		this.api.get(url).then(
	// 			(response) => {
	// 				return response.data.login
	// 			}
	// 		)
	// 		.catch((err)=>{
	// 			return "Undefined"
	// 		})
	// }

	// test = ()=>{
	// 	var hdhd=[];
	// 	this.state.all_messages.map((mess)=>
	// 		{this.getAuthor(mess.id_author).then((auteur)=>
	// 		 	<Message author={auteur} profilepic={mess.profilepic} value={mess.value_message} datePubli={mess.date_publi} timePublic={mess.timePublic} nblikes={mess.nblikes} nbcomments={mess.nbcomments} image={mess.image} id={mess.id_message} setContainer={this.props.setContainer} listComments={listComments} />




	// 			// const list = this.state.authors
	// 			// list.push(auteur) 
	// 			// this.setState({authors:list})
	// 			// hdhd = this.state.authors
	// 			// console.log(this.state.authors)
	// 			// this.state.authors.map((aut)=>{
	// 			// 	console.log(aut+aut)
	// 			// 	const elem = this.state.authors.map((aut)=><h1>{aut}</h1>)
	// 			// 	ReactDOM.render(elem,document.getElementById("home-messages"))
	// 			// })
	// 		})}
			
	// 	)}


	

	componentDidMount =()=>{
		// document.addEventListener("mousedown" , (event) =>{
		// 		if(event.target.className !== 'emoji'){
		// 			this.setState({showemojis:false})
		// 		}
		// 	}
		
		this.getUserConnected()
		this.getAllMessages()	
	}

	


	render(){

		return (
			<>
				{this.state.currentToken && 
					<Statut/>
				}

				<ListMessages listM={this.state.all_messages} />
				
				</>
		)
	}
}
export default Home





class Statut extends Component {
	render() {
		return (
		<div>
			

<div className='home-status'>
	{this.state.message_return ? <p className='message_return'>{this.state.message_return}</p> : ""}
	<div className='home-my-infos'>
		<img src={pic} />
		<p>{this.state.user_infos.login}</p>
	</div>
	<textarea className='home-textarea' rows="4" placeholder=" what's the news" value={this.state.value_message} onKeyDown={(event) => this.handleBtnState(event)} onChange={(e) => this.setState({value_message:e.target.value})}></textarea>
		<div className='home-status-button-emojis'>
		<i className="fa fa-smile-o fa-2x" aria-hidden="true" onClick={() => this.setState({showemojis:true})}></i>
		{
			this.state.showemojis &&
		<EmojiPicker onEmojiClick={() => console.log("kljdsq")}/>
		}
	{/* <div className='tags'>
		{tagsList.map((tag) =>
			<p className='tags-element' >#{tag}</p>
		)}
	</div> */}
	<button disabled={this.state.btnState === ""} className='home-btn-publish' onClick={()=>this.insertMessage()}>Publish</button>
	</div>
</div>


		</div>
		)
	}
}
