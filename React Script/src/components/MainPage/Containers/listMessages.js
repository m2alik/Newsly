import React, { Component } from 'react'
import Message from './message'

import pic from '../../../images/amine1.JPG'

class ListMessages extends Component {

	constructor(props){
		super(props)
	}


	render() {
		return (
		<>
		<div id='home-messages' className='home-messages' >
					{this.props.listM.map((mess,i)=>
						<Message key={i} author={mess.id_author} profilepic={pic} value={mess.value_message} datePubli={mess.date_publi} timePublic={mess.time_publi} nblikes={mess.nb_likes} nbcomments={mess.nbcomments} image={mess.image} id={mess.id_message} id_user={this.props.id_user} retweetedFrom={mess.retweetedFrom} id_message_original={mess.id_message_original} setContainer={this.props.setContainer} getAllMessages={this.props.getAllMessages} ifComplete={0} />	
					)}
				</div>
		</>
		)
	}
}

export default ListMessages
