
import './App.css';
import Header from './components/header';
import profilepic from './images/amine1.JPG';
import logo from './images/logoHeader.png';
import MainPage from './components/mainpage';
import { Component } from "react";



class App extends Component {


	constructor(props) {
		super(props)
		this.state = {
			page: null
		}
		this.setPage = this.setPage.bind(this)
	}
	componentDidMount() {
		this.setPage(<MainPage setPage={this.setPage} />)
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
