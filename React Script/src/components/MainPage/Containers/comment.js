import React, { Component } from 'react'
import '../../../styles/comment.css'
import pic from '../../../images/amine1.JPG'
import axios from 'axios'


class Comment extends Component {

	constructor(props){
		super(props)
		this.state={
			author : ""
		}
	}


	api = axios.create({
		baseURL: "http://localhost:4000",
		timeout: 1000
	})

	
	// renvoie le login de l'utilisateur via son numero d'ID
	getAuthor = async(id_commenter)=>{
		return new Promise((resolve,reject)=>{
			var url = "/api/user/"+id_commenter
			this.api.get(url).then(
				(response) => {
					resolve(response.data.login)
				}
			)
			.catch((err)=>{
				reject(err.response)
			})
		})
	}

	// A chaque modification mettre a jour le login du commenteur
	componentDidUpdate(){
		this.getAuthor(this.props.id_commenter).then((aut)=>{
			this.setState({author:aut})
		})
		.catch((err)=>{
			console.log(err)
		})
	}

	// a chaque fois mettre a jour le login du commenteur
	componentDidMount(){
		this.getAuthor(this.props.id_commenter).then((aut)=>{
			this.setState({author:aut})
		})
		.catch((err)=>{
			console.log(err)
		})
	}

	render() {
		return (
		<div className='comment'>
			<div className='comment-content'>
				<img src={pic} />
				<div className='comment-informations'>
					<div className='comment-infos'>
						<p className='comment-username'>{this.state.author}</p>
						<p className='comment-datepubli'>{this.props.datepubli}</p>
					</div>
					<p className='comment-value'>{this.props.value}</p>
				</div>
				
			</div>
		</div>
		)
	}
}

export default Comment
