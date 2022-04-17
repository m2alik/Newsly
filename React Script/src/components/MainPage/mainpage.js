import React, { Component } from "react";
import LeftAside from "./LeftAside/leftaside";
import RightAside from "./RightAside/rightaside";
import Home from "./Containers/home";
import '../../styles/mainpage.css'
class MainPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			container: <Home setContainer={this.setContainer} id={this.props.id} />
		}

	}

	setContainer = (newContainer) => {
		this.setState({ container: newContainer })
	}

	// componentDidMount() {
	// 	this.setContainer(
	// }


	render() {
		return (
			<div className="rootpage">
				<LeftAside setContainer={this.setContainer} setPage={this.props.setPage}  />
				<div className="middlecontainer">
					<div className="middlecontainer-header">
					<div className="middlecontainer-header2">
						{this.state.container.type.name === "CompletMessage" ? <i className="fa fa-arrow-left" aria-hidden="true" onClick={()=>this.setContainer(<Home setContainer={this.setContainer} id={this.props.id} />)}></i> : ""}
						<p>{this.state.container.type.name}</p>
					</div> 
					</div> 
					{this.state.container}
				</div>
				<RightAside setContainer={this.setContainer} id={this.props.id} />

			</div>
		)
	}
}

export default MainPage;