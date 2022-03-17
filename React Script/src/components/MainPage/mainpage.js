import { Component } from "react";
import LeftAside from "./LeftAside/leftaside";
import RightAside from "./RightAside/rightaside";
import Home from "./Containers/home";
import '../../styles/mainpage.css'
class MainPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			setPage: props.setPage,
			container : null
		}

	}

	setContainer=(newContainer)=>{
		this.setState({container:newContainer})
	}

	componentDidMount(){
		this.setContainer(<Home />)
	}


	render() {
		return (
			<div className="rootpage">
						<LeftAside setContainer={this.setContainer} setPage={this.state.setPage}/>
						<div className="middlecontainer">
							{/* <div className="middlecontainer-header">
								<p>Home</p>
							</div> */}
							{this.state.container}
						</div>
						<RightAside setContainer={this.setContainer} setPage={this.state.setPage}/>
				
			</div>
		)
	}
}

export default MainPage;