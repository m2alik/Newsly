import React, { Component } from 'react'
import pic1 from '../../../images/profilepic1.png'
import pic2 from '../../../images/Amine YK.png'
import pic3 from '../../../images/amine1.JPG'
import Follower from './follower'
// import '../../../styles/followers.css'
import axios from 'axios'
import Suggestions from './suggestions'

const followers = [{ username: "Amine", profilepic: pic1 }, { username: "Aya", profilepic: pic2 }, { username: "Sabrina", profilepic: pic3 }, { username: "Farid", profilepic: pic1 }, { username: "Kader", profilepic: pic2 }, { username: "Soumeya", profilepic: pic3 }, { username: "Nour", profilepic: pic1 }, { username: "Titis", profilepic: pic2 }, { username: "Malik", profilepic: pic3 }]

class Followers extends Component {

	constructor(props) {
		super(props)
	}


	api = axios.create({
		baseURL: "http://localhost:4000",
		timeout: 1000
	})


	

	render() {
		return (
			<div>

				{this.props.listFollowers.length !== 0 ?
					this.props.listFollowers.map((mess,i) =>
						<Follower key={i} username={mess.id_follower} profilepic={pic3} setContainer={this.props.setContainer} />
					)			: 
				<div className='no-message'>
					<p>You don't have any Follower ! It's time to join Newsly Community</p>
					<button className='no-message-for-user' onClick={() => this.props.setContainer(<Suggestions setContainer={this.props.setContainer}/>)  } >Let's Start</button>
				</div>
	}


				
			</div>
		)
	}
}
export default Followers
