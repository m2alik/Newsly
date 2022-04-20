import React, { Component } from 'react'
import Search from '../RightAside/search'
import ListMessages from './listMessages'
import axios from 'axios'
import Home from './home'

class SearchComponent extends Component {


	constructor(props){
		super(props)
		this.state = {
			messages_search : [],
			keyword :this.props.keyword,
			errorMessage  : "",
			clicked :""
		}
	}


	api = axios.create({
		baseURL: "http://localhost:4000",
		timeout: 1000
	})

	maj_returnMessage = () =>{
		this.setState({errorMessage:""})
	}


	extraireMessagesFollowers = () =>{ 
		const ll = []
		const url = "api/user/"+sessionStorage.getItem("id_user")+"/followers/messages"
		this.api.get(url).then((response)=>{
			console.log(response.data.messages)
			ll = response.data.messages
		})
		.catch((err)=>{
			console.log(err)
		})

		return ll
	}


	// Recherche un message dans la base de données selon le mot clés saisie dans la bare de recherche
	searchMessage = () =>{
		this.setState({clicked:"true"})
		if(this.state.keyword === ""){
			this.setState({errorMessage:"Insert keywords please"})
			setTimeout(() => {
				this.maj_returnMessage();
			  }, 2000);
		}else{
			const url = "/api/messages/search/"+this.state.keyword
			this.api.get(url).then((response)=>{
				// verifier si l'utilisateur veut que les messages de ses followers
				if(this.verifyCheckbox()){
					this.setState({messages_search:this.extraireMessagesFollowers(response.data.messages)})
				}else{
					this.setState({messages_search:response.data.messages})
				}
			})
		}
	}

	verifyCheckbox = () =>{
		// document.getElementsByClassName("check-search_bis")[0].checked && this.setState({isChecked:"checked"})
		// !document.getElementsByClassName("check-search_bis")[0].checked && this.setState({isChecked:""})
		return document.getElementsByClassName("check-search_bis")[0].checked
	}

	componentDidMount(){
		this.searchMessage()
	}

	render() {
		return (
		<>
			<div className='search'>
				<div className='search-fields'>
					{this.state.errorMessage ? <h3 className='error-message'>{this.state.errorMessage}</h3> : ""}
					<div className='search-infos'>
						<input type="text" className="input-search" value={this.state.keyword} placeholder='search for keywords e.g Book , Livre , Etablissement ...' onChange={(e) => this.setState({keyword:e.target.value})}></input>
						<i className="fa fa-search" onClick={() => this.searchMessage()}></i>

					</div>
					<div className='bloc-search-check'>
						
						<input className="check-search_bis" type="checkbox" value="checked" onClick={()=>this.verifyCheckbox()}></input>
						<p>only followers</p>
						
					</div>
				</div>

			</div>
			{
			this.state.messages_search.length === 0 && this.state.clicked &&
			<div className='no-message'>
				<p>No newsly found for this search</p>
				<button className='no-message-for-user' onClick={() => this.props.setContainer(<Home setContainer={this.props.setContainer}/>)  } >Verify the newsly</button>
			</div> }
			
			<ListMessages listM={this.state.messages_search} id_user={sessionStorage.getItem("id_user")} setContainer={this.props.setContainer}/>
			
			

		</>
		)
	}
}
export default SearchComponent