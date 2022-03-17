import { Component } from "react";

import Aside from "./aside";
import Flux from "./flux";
import Stats from "./stats";
import pic from '../images/amine1.JPG'
import './mainpage.css'
import Login from "./login";
class MainPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            setPage:props.setPage  
        }
    }



    render(){
        return(
            <div className="rootpage">
                <div className="mainpage">
                    <Stats setPage={this.state.setPage} setContainer={this.state.setContainer} />
                    <Flux className='flux'/>
                    <Aside className='aside'/>
                    {/* <button onClick={() => this.props.setPage(<Login setPage = {this.props.setPage}/>) }>IZANNN</button> */}
                </div>  
            </div>
        )
    }
}

export default MainPage;