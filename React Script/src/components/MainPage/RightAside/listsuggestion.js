



import React, { Component } from 'react'
import Suggestion from './suggestion'
import '../../../styles/listsuggestion.css'
import pic1 from '../../../images/profilepic1.png'

import Suggestions from '../Containers/suggestions'
const list = [{ username: "Amine", profilepic: pic1 }, { username: "Aya", profilepic: pic1 }, { username: "Sabrina", profilepic: pic1 }, { username: "Farid", profilepic: pic1 }]


class ListSuggestion extends Component {


	constructor(props) {
		super(props)
	}



	render() {
		return (
			<div className='listsuggestion'>
				<p className='aside-title'>You might know</p>
				<hr />
				{list.map((sugg,i) =>
					<Suggestion key={i} username={sugg.username} profilepic={sugg.profilepic} setContainer={this.props.setContainer} />
				)}
				
				<p className='comments-showmore' onClick={() => this.props.setContainer(<Suggestions setContainer={this.props.setContainer} />)}>View all suggestions</p>

			</div>
		)
	}
}

export default ListSuggestion;
