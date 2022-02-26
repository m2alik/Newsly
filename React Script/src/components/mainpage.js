import { Component } from "react";

import Aside from "./aside";
import Flux from "./flux";
import Stats from "./stats";
import pic from '../images/profilepic1.png'
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
        const listS = [{name:"Followers" , value:"1628"},{name:"Following" , value:"92"},{name:"Likes" , value:"12448"},{name:"Messages" , value:"23"}]
        const listM = [{author:"Vladimir Putin" ,profilepic:pic ,  value:"C'est la guerre en ukraine",datePubli:"25/02/2022" , timePublic:"5:02am" , nblikes:"199",nbcomments:"12"},{author:"Maes" , profilepic:pic , value:"C'est la 7ess aujourd'hui",datePubli:"17/09/2021" , timePublic:"3:18pm" , nblikes:"199",nbcomments:"12"},{author:"Soolking " , profilepic:pic , value:"Je t'aime mon Algeria",datePubli:"25/02/2022" , timePublic:"5:52pm",nblikes:"199",nbcomments:"12"}]
        return(
            <div className="mainpage">
               <Stats className='stats' liststats = {listS} username={this.state.username} profilepic={this.state.profilepic} />
               <Flux className='flux' listmessages={listM} username={this.state.username} profilepic={this.state.profilepic}/>
               <Aside className='aside'/>
            </div>
        )
    }
}

export default MainPage;