import React, { Component } from 'react'
import profilepic from '../../../images/Amine YK.png'
import pic from '../../../images/amine1.JPG'
import Home from './home'
import ListMessages from './listMessages'
import axios from 'axios'
const listComments = [{profilepic:pic,username:"Amine YK",datepubli:"13/08/2022",value:"Belle tof hbb !"},{profilepic:pic,username:"Amine YK",datepubli:"13/08/2022",value:"Belle tof kho !"},{profilepic:pic,username:"Amine YK",datepubli:"13/08/2022",value:"Belle tof khey !"}]

// import '../../../styles/messages.css'

const user = { firstname: "Doufene", lastname: "malik", username: "Amine YK" }

const messages = [{ author: user.username, profilepic: profilepic, value: "Je viens de debuter sur Newsly", datePubli: "25/02/2022", timePublic: "5:02am", nblikes: "27", nbcomments: "12" }, { author: user.username, profilepic: profilepic, value: "L'application est superbement bien faite ! Wow", datePubli: "17/09/2021", timePublic: "3:18pm", nblikes: "546", nbcomments: "1" }, { author: user.username, profilepic: profilepic, value: "C'est fini pour aujourd'hui", datePubli: "25/02/2022", timePublic: "5:52pm", nblikes: "996", nbcomments: "0" }]

class Messages extends Component {

	constructor(props) {
		super(props)
		this.state = {
			all_messages : []
		}
	}

	api = axios.create({
		baseURL: "http://localhost:4000",
		timeout: 1000
	})

	getAllMessagesForUser(){
		const url = "api/user/messages/"+sessionStorage.getItem("id_user")
		this.api.get(url).then((response)=>{
			this.setState({all_messages:response.data})
		})
		.catch((err)=>{
			console.log(err)
		})
	}

	componentDidMount(){
		this.getAllMessagesForUser()
	}

	render() {
		return (
			<div>
				{this.state.all_messages.length !== 0 ?
					<ListMessages listM={this.state.all_messages} id_user={sessionStorage.getItem("id_user")} setContainer={this.props.setContainer}/>
				: 
				<div className='no-message'>
					<p>You don't publish any Newsly</p>
					<button className='no-message-for-user' onClick={() => this.props.setContainer(<Home setContainer={this.props.setContainer}/>)  } >Let's Start</button>
				</div>
	}
			</div>
		)
	}
}
export default Messages
