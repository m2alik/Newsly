import React, { Component } from 'react'
import profilepic from '../../../images/Amine YK.png'
import Message from './message'
// import '../../../styles/messages.css'

const user = { firstname: "Doufene", lastname: "malik", username: "Malik DF" }

const messages = [{ author: user.username, profilepic: profilepic, value: "Je viens de debuter sur Newsly", datePubli: "25/02/2022", timePublic: "5:02am", nblikes: "27", nbcomments: "12" }, { author: user.username, profilepic: profilepic, value: "L'application est superbement bien faite ! Wow", datePubli: "17/09/2021", timePublic: "3:18pm", nblikes: "546", nbcomments: "1" }, { author: user.username, profilepic: profilepic, value: "C'est fini pour aujourd'hui", datePubli: "25/02/2022", timePublic: "5:52pm", nblikes: "996", nbcomments: "0" }]

class Messages extends Component {

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				{messages.map((mess) =>
					<Message author={mess.author} profilepic={mess.profilepic} value={mess.value} datePubli={mess.datePubli} timePublic={mess.timePublic} nblikes={mess.nblikes} nbcomments={mess.nbcomments} setContainer={this.props.setContainer} />
				)}
			</div>
		)
	}
}
export default Messages
