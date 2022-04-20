import React, { Component } from 'react'
import ListSuggestion from './listsuggestion';
import Search from './search';
import Stats from './stats';
import '../../../styles/rightaside.css'
import Devloppers from '../../Devs-Informations/devloppers';
import axios from 'axios';


class RightAside extends Component {


	constructor(props) {
		super(props);
		this.state = {
			setContainer: this.props.setContainer,
			currentToken: ''
		}

	}


	api = axios.create({
		baseURL: "http://localhost:4000",
		timeout: 1000
	})


	getUserConnected = () => {
		// if(this.props.id !== undefined){
		var url = "/api/user/"+sessionStorage.getItem("id_user")
		this.api.get(url).then(
			(response) => {
				this.setState({user_infos:response.data,currentToken:sessionStorage.getItem("token")})
				if (response.data["status"] === "error") {
					this.setState({ error: response.data["status"] })
					this.setState({ errorMessage: response.data["texterror"] })
					console.log("error ! ")
				}
			}
		)
		.catch((err)=>{
			this.setState({currentToken:""})
		})
	// }
	}

	componentDidMount = ()=>{
		if(sessionStorage.getItem("id_user") !== null){
			this.getUserConnected()   
		}
	}

	render() {
		return (
			// this.state.currentToken !== '' &&
			<div className='rightaside'>
				<Search setContainer={this.props.setContainer} />
				{this.state.currentToken &&
					<div className='rightaside-connected'>
						<ListSuggestion setContainer={this.state.setContainer}/>
						<Stats setContainer={this.state.setContainer} />
					</div>}
				<div className='footer'>
					<div className='footer-infos'>
						<p>Privacy</p>
						<p>Contacts</p>
						{/* <p onClick={this.props.setContainer(<Devloppers />)}>Devloppers</p> */}
					</div>
					<p>© 2022 Amine YK - Amine YK , SU</p>
				</div>

			</div>
				)
	}
}

export default RightAside;