



import React, { Component } from 'react'
import Suggestion from './suggestion'
import '../../../styles/listsuggestion.css'

class ListSuggestion extends Component {


	constructor(props) {
		super(props)
		this.state = {
			suggestions: this.props.suggestions
		}
	}



	render() {
		return (
			<div className='listsuggestion'>
				<p className='aside-title'>Suggestions</p>
				<hr />
				{this.state.suggestions.map((sugg) =>
					<Suggestion username={sugg.username} profilepic={sugg.profilepic} />
				)}
			</div>
		)
	}
}

export default ListSuggestion;
