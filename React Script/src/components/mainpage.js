import { Component } from "react";

import Aside from "./aside";
import Flux from "./flux";
import Stats from "./stats";
import './mainpage.css'
class MainPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            username : this.props.username,
            profilepic : this.props.profilepic
        }
    }


    render(){
        const list = [{name:"Followers" , value:"1628"},{name:"Following" , value:"92"},{name:"Likes" , value:"12448"},{name:"Messages" , value:"23"}]
        return(
            <div className="mainpage">
               <Stats className='stats' liststats = {list} username={this.state.username} profilepic={this.state.profilepic} />
               <Flux className='flux'/>
               <Aside className='aside'/>
            </div>
        )
    }
}

export default MainPage;