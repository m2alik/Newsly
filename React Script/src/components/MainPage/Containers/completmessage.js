import React, { Component } from 'react'
import pic from '../../../images/amine1.JPG'
import Comment from './comment'
import Message from './message'
import axios from 'axios'

// le message "mess" va se recuperer via l'id passé en props 
const mess = { author: "Vladimir Putin", profilepic: pic, value: "C'est la guerre en ukraine", datePubli: "25/02/2022", timePublic: "5:02am", nblikes: "199", nbcomments: "12",id:"1" }
// recuperer ensuite la liste complete des commentaires de cette publication
const listComments = [{profilepic:pic,username:"Amine YK",datepubli:"13/08/2022",value:"Belle tof hbb !"},{profilepic:pic,username:"Amine YK",datepubli:"13/08/2022",value:"Belle tof kho !"},{profilepic:pic,username:"Amine YK",datepubli:"13/08/2022",value:"Belle tof khey !"},{profilepic:pic,username:"Amine YK",datepubli:"13/08/2022",value:"Belle tof hbb !"},{profilepic:pic,username:"Amine YK",datepubli:"13/08/2022",value:"Belle tof hbb !"},{profilepic:pic,username:"Amine YK",datepubli:"13/08/2022",value:"Belle tof hbb !"},{profilepic:pic,username:"Amine YK",datepubli:"13/08/2022",value:"Belle tof hbb !"},{profilepic:pic,username:"Amine YK",datepubli:"13/08/2022",value:"Belle tof hbb !"},{profilepic:pic,username:"Amine YK",datepubli:"13/08/2022",value:"Belle tof hbb !"},{profilepic:pic,username:"Amine YK",datepubli:"13/08/2022",value:"Belle tof hbb !"},{profilepic:pic,username:"Amine YK",datepubli:"13/08/2022",value:"Belle tof hbb !"},{profilepic:pic,username:"Amine YK",datepubli:"13/08/2022",value:"Belle tof hbb !"}]

class CompletMessage extends Component {

	constructor(props){
		super(props)
		this.state={
			message_infos : [],
			isLoad : ""
		}
	}



	api = axios.create({
		baseURL: "http://localhost:4000",
		timeout: 1000,
	  });

	getMessage = ()=>{
		const url = "api/messages/"+this.props.id
		this.api.get(url).then((response)=>{
			this.setState({message_infos:response.data.message,isLoad:"Done"})
		})
	}

	componentDidMount = ()=>{
		this.getMessage()
	}

	render() {
		return (
		<div>
			{/* <p>{this.state.message_infos}</p> */}
			{this.state.isLoad !== "" ?
				<Message author={this.state.message_infos.id_author} id_user={this.props.id_user} profilepic={mess.profilepic} value={this.state.message_infos.value_message} datePubli={this.state.message_infos.date_publi} timePublic={this.state.message_infos.time_publi} nblikes={this.state.message_infos.nb_likes} nbcomments={this.state.message_infos.nbcomments} image={this.state.message_infos.image} id={this.props.id} setContainer={this.props.setContainer} listComments={listComments}  />
			:<p>Unloaded</p>}
			</div>
		)
	}
}

export default CompletMessage
