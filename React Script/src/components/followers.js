import React, { Component } from 'react'
import Follower from './follower'
import pic1 from '../images/profilepic1.png'
import pic2 from '../images/Amine YK.png'
import pic3 from '../images/amine1.JPG'

const followers = [{ username: "Amine", profilepic: pic1 }, { username: "Aya", profilepic: pic2 }, { username: "Sabrina", profilepic: pic3 }, { username: "Farid", profilepic: pic1 }, { username: "Kader", profilepic: pic2 }, { username: "Soumeya", profilepic: pic3 }, { username: "Nour", profilepic: pic1 }, { username: "Titis", profilepic: pic2 }, { username: "Malik", profilepic: pic3 }]

class Followers extends Component {

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				{followers.map((mess) =>
					<Follower username={mess.username} profilepic={mess.profilepic} />
				)}
			</div>
		)
	}
}
export default Followers
