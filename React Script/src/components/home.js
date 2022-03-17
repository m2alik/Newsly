import React, { Component } from 'react'
import pic from '../images/Amine YK.png'
import Message from './message'
const user = { firstname: "Doufene", lastname: "malik", username: "Malik DF" }
const listM = [{ author: "Vladimir Putin", profilepic: pic, value: "C'est la guerre en ukraine", datePubli: "25/02/2022", timePublic: "5:02am", nblikes: "199", nbcomments: "12" }, { author: "Maes", profilepic: pic, value: "Cette famille parisienne va parcourir 2000 kilomètres pour livrer des dons aux réfugiés ukrainiens, dans une ville polonaise frontalière du pays en guerre.Ils apporteront avec eux l’équivalent de 250 colis recueillis auprès de 400 donateurs", datePubli: "17/09/2021", timePublic: "3:18pm", nblikes: "199", nbcomments: "12" }, { author: "Soolking ", profilepic: pic, value: "Je t'aime mon Algeria", datePubli: "25/02/2022", timePublic: "5:52pm", nblikes: "199", nbcomments: "12" }, { author: "Maes", profilepic: pic, value: "Cette famille parisienne va parcourir 2000 kilomètres pour livrer des dons aux réfugiés ukrainiens, dans une ville polonaise frontalière du pays en guerre.Ils apporteront avec eux l’équivalent de 250 colis recueillis auprès de 400 donateurs", datePubli: "17/09/2021", timePublic: "3:18pm", nblikes: "199", nbcomments: "12" }, { author: "Maes", profilepic: pic, value: "Cette famille parisienne va parcourir 2000 kilomètres pour livrer des dons aux réfugiés ukrainiens, dans une ville polonaise frontalière du pays en guerre.Ils apporteront avec eux l’équivalent de 250 colis recueillis auprès de 400 donateurs", datePubli: "17/09/2021", timePublic: "3:18pm", nblikes: "199", nbcomments: "12" }, { author: "Maes", profilepic: pic, value: "Cette famille parisienne va parcourir 2000 kilomètres pour livrer des dons aux réfugiés ukrainiens, dans une ville polonaise frontalière du pays en guerre.Ils apporteront avec eux l’équivalent de 250 colis recueillis auprès de 400 donateurs", datePubli: "17/09/2021", timePublic: "3:18pm", nblikes: "199", nbcomments: "12" }]
const tagsList = ['paris', 'follow', 'sunset', 'mode', 'jean', 'adidas']
class Home extends Component {

	constructor(props) {
		super(props)
		this.state = {
			setContainer: props.setContainer,
			btnState: ''
		}
	}

	handleBtnState(event) {
		this.setState({ btnState: event.target.value })
	}

	render() {
		return (
			<div>
				<div className='flux-status'>
					<div className='flux-my-infos'>
						<img src={pic} />
						<p>{user.username}</p>
					</div>
					<textarea className='flux-textarea' rows="7" placeholder=" what's the news" onKeyDown={(event) => this.handleBtnState(event)}></textarea>
					<div className='tags'>
						{tagsList.map((tag) =>
							<p className='tags-element' >#{tag}</p>
						)}
					</div>
					<button disabled={this.state.btnState === ""} className='flux-btn-publish'>Publish</button>
				</div>
				<div className='flux-messages'>
					{listM.map((mess) =>
						<Message author={mess.author} profilepic={mess.profilepic} value={mess.value} datePubli={mess.datePubli} timePublic={mess.timePublic} nblikes={mess.nblikes} nbcomments={mess.nbcomments} />
					)}
				</div>
			</div>
		)
	}
}
export default Home
