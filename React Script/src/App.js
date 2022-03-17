
import './App.css';
import MainPage from './components/MainPage/mainpage';
import React, { Component } from "react";



class App extends Component {


	constructor(props) {
		super(props)
		this.state = {
			page: null,
			token: ''
		}
		this.setPage = this.setPage.bind(this)
	}
	componentDidMount() {
		this.setPage(<MainPage setPage={this.setPage} setToken={this.setToken} />)
	}
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
