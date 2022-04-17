import React, { Component } from 'react'
import pic1 from '../../../images/profilepic1.png'
import Suggestion from '../RightAside/suggestion'

const list = [{ username: "Jack", profilepic: pic1 },{ username: "Amine", profilepic: pic1 },{ username: "Amine", profilepic: pic1 },{ username: "Amine", profilepic: pic1 },{ username: "Amine", profilepic: pic1 },{ username: "Amine", profilepic: pic1 },{ username: "Amine", profilepic: pic1 }, { username: "Aya", profilepic: pic1 }, { username: "Sabrina", profilepic: pic1 }, { username: "Farid", profilepic: pic1 }]

class Suggestions extends Component {

	constructor(props){
		super(props)
	}

	render() {
		return (
		<div>
			{list.map((sugg) =>
				<Suggestion username={sugg.username} profilepic={sugg.profilepic} setContainer={this.props.setContainer} />
			)}
		</div>
		)
	}
}
export default Suggestions
