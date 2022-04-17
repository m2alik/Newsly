import React, { Component } from 'react'
import Message from './message'

import pic from '../../../images/amine1.JPG'

const listComments = [{profilepic:pic,username:"Amine YK",datepubli:"13/08/2022",value:"Belle tof hbb !"},{profilepic:pic,username:"Amine YK",datepubli:"13/08/2022",value:"Belle tof kho !"},{profilepic:pic,username:"Amine YK",datepubli:"13/08/2022",value:"Belle tof khey !"}]
class ListMessages extends Component {

	constructor(props){
		super(props)
	}


	render() {
		return (
		<>
		<div id='home-messages' className='home-messages' >
					{this.props.listM.map((mess,i)=>
						// console.log(this.props.id_user)
						// console.log(mess.date_publi)
						// <Message author={mess.login_author} profilepic={pic} value={mess.value_message} datePubli={mess.date_publi} timePublic={mess.time_publi} nblikes={mess.nb_likes} nbcomments={mess.nbcomments} image={mess.image} id={mess.id_message} id_user={this.props.id} setContainer={this.props.setContainer} listComments={listComments} />
						<Message key={i} author={mess.id_author} profilepic={pic} value={mess.value_message} datePubli={mess.date_publi} timePublic={mess.time_publi} nblikes={mess.nb_likes} nbcomments={mess.nbcomments} image={mess.image} id={mess.id_message} id_user={this.props.id_user} setContainer={this.props.setContainer} listComments={listComments} getAllMessages={this.props.getAllMessages} />
						// 
					)}
				</div>
		</>
		)
	}
}

export default ListMessages
