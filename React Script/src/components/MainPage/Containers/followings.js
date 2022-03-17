import React, { Component } from 'react'
import pic1 from '../../../images/profilepic1.png'
import pic2 from '../../../images/Amine YK.png'
import pic3 from '../../../images/amine1.JPG'
import Following from './following'
// import '../../../styles/followings.css'

const followings = [{ username: "Amine", profilepic: pic1 }, { username: "Aya", profilepic: pic2 }, { username: "Sabrina", profilepic: pic3 }, { username: "Farid", profilepic: pic1 }, { username: "Kader", profilepic: pic2 }, { username: "Soumeya", profilepic: pic3 }, { username: "Nour", profilepic: pic1 }, { username: "Titis", profilepic: pic2 }, { username: "Malik", profilepic: pic3 }]


class Followings extends Component {

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className='followings'>
				{followings.map((mess) =>
					< Following username={mess.username} profilepic={mess.profilepic} />
				)}
			</div>
		)
	}
}
export default Followings
