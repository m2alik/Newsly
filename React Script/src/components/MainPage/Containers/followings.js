import React, { Component } from 'react'
import pic1 from '../../../images/profilepic1.png'
import pic2 from '../../../images/Amine YK.png'
import pic3 from '../../../images/amine1.JPG'
import Following from './following'
import Suggestions from './suggestions'
import axios from 'axios'
// import '../../../styles/followings.css'

const followings = [{ username: "Amine", profilepic: pic1 }, { username: "Aya", profilepic: pic2 }, { username: "Sabrina", profilepic: pic3 }, { username: "Farid", profilepic: pic1 }, { username: "Kader", profilepic: pic2 }, { username: "Soumeya", profilepic: pic3 }, { username: "Nour", profilepic: pic1 }, { username: "Titis", profilepic: pic2 }, { username: "Malik", profilepic: pic3 }]


class Followings extends Component {

	constructor(props) {
		super(props)
	}



	render() {
		return (
			<div className='followings'>

				{this.props.listFollowings.length !== 0 ?
					this.props.listFollowings.map((mess,i) =>
					< Following key={i} username={mess.id_following} profilepic={pic2} setContainer={this.props.setContainer} />
				)		: 
				<div className='no-message'>
					<p>You don't follow anyone ! It's time to join Newsly Community</p>
					<button className='no-message-for-user' onClick={() => this.props.setContainer(<Suggestions setContainer={this.props.setContainer}/>)  } >Let's Start</button>
				</div>
	}


				
			</div>
		)
	}
}
export default Followings
