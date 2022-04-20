



import React, { Component } from 'react'
import Suggestion from './suggestion'
import '../../../styles/listsuggestion.css'
import pic1 from '../../../images/profilepic1.png'
import axios from 'axios'

import Suggestions from '../Containers/suggestions'
const list = [{ username: "Amine", profilepic: pic1 }, { username: "Aya", profilepic: pic1 }, { username: "Sabrina", profilepic: pic1 }, { username: "Farid", profilepic: pic1 }]


class ListSuggestion extends Component {


	constructor(props) {
		super(props)
		this.state={
			listSuggestions : []
		}
	}


	
	api = axios.create({
		baseURL: "http://localhost:4000",
		timeout: 1000
	})

	getListSuggestions(){
		const url = "/api/user/"+sessionStorage.getItem("id_user")+"/suggestions"
		this.api.get(url).then((response)=>{
			console.log(response.data.listSuggestions)
			this.setState({listSuggestions:response.data.list_suggestions})
		})
	}

	componentDidMount = () => {
		this.getListSuggestions()
	}



	render() {
		return (
			<div className='listsuggestion'>
				<p className='aside-title'>You might know</p>
				<hr />
				{this.state.listSuggestions.map((sugg,i) =>
					<Suggestion key={i} username={sugg.username} profilepic={sugg.profilepic} setContainer={this.props.setContainer} />
				)}
				
				<p className='comments-showmore' onClick={() => this.props.setContainer(<Suggestions setContainer={this.props.setContainer} />)}>View all suggestions</p>

			</div>
		)
	}
}

export default ListSuggestion;
