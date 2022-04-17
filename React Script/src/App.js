
import './App.css';
import MainPage from './components/MainPage/mainpage';
import Login from "./components/Login/login.js"
import React, { Component } from "react";



class App extends Component {


	constructor(props) {
		super(props)
		this.state = {
			// page: <MainPage setPage={this.setPage} setToken={this.setToken} />,
			page: <MainPage setPage={this.setPage} />,
			token: ''
		}
		this.setPage = this.setPage.bind(this)
	}
	// componentDidMount() {
	// 	this.setPage)
	// }
	setToken = (newToken) => {
		this.setState({ token: newToken })
	}
	setPage = (nouvellePage) => {
		this.setState({ page: nouvellePage })
	}

	render() {
		return (
			<div className="App">
				{this.state.page}
			</div>
		);
	}
}

export default App;
