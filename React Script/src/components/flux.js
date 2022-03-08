
import React, { Component, Profiler } from 'react'
import './flux.css'
import Message from './message'
import Profile from './profile';
import pic1 from '../images/profilepic1.png'
import pic2 from '../images/Amine YK.png'
import pic3 from '../images/amine1.JPG'
class Flux extends Component {

    constructor(props){
        super(props)
        this.state = {
            active : "home",
            username : this.props.username,
            profilepic : this.props.profilepic,
            btnState : '',
            listmessages : this.props.listmessages
        }
        this.handleBtnState.bind(this)
        this.toggletab.bind(this)
    }

   
    render() {
        const tagsList = ['paris','follow','sunset','mode','jean','adidas']
        const mesMessages = [{author:this.state.username ,profilepic:this.state.profilepic ,  value:"Je viens de debuter sur Newsly",datePubli:"25/02/2022" , timePublic:"5:02am" , nblikes:"27",nbcomments:"12"},{author:this.state.username , profilepic:this.state.profilepic , value:"L'application est superbement bien faite ! Wow",datePubli:"17/09/2021" , timePublic:"3:18pm" , nblikes:"546",nbcomments:"1"},{author:this.state.username , profilepic:this.state.profilepic , value:"C'est fini pour aujourd'hui",datePubli:"25/02/2022" , timePublic:"5:52pm",nblikes:"996",nbcomments:"0"}]
        const mesFollowers = [{username:"Amine",profilepic:pic1},{username:"Aya",profilepic:pic2},{username:"Sabrina",profilepic:pic3},{username:"Farid",profilepic:pic1},{username:"Kader",profilepic:pic2},{username:"Soumeya",profilepic:pic3},{username:"Nour",profilepic:pic1},{username:"Titis",profilepic:pic2},{username:"Malik",profilepic:pic3}]
        const mesFollowing = [{username:"Amine",profilepic:pic1},{username:"Aya",profilepic:pic2},{username:"Sabrina",profilepic:pic3},{username:"Farid",profilepic:pic1},{username:"Kader",profilepic:pic2},{username:"Soumeya",profilepic:pic3},{username:"Nour",profilepic:pic1},{username:"Titis",profilepic:pic2},{username:"Malik",profilepic:pic3}] 
        return (
            <div className='flux'>
                <div className='flux-header'>
                    <ul>
                        <li >
                            <p onClick={() => this.toggletab("home")} >Home</p>
                        </li>
                        <li>
                            <p onClick={() => this.toggletab("profile")} >Profile</p>
                        </li>
                    </ul>
                </div>

                <div className='containers'>
                <div className= {this.state.active === "home" ? 'home-container-active' : 'home-container'}>
                    <div className='flux-status'>
                        <div className='flux-my-infos'>
                            <img src={this.state.profilepic} />
                            <p>{this.state.username}</p>
                        </div>
                        <textarea className='flux-textarea' rows="7" placeholder=" what's the news" onKeyDown={(event) => this.handleBtnState(event)}></textarea>
                        <div className='tags'>
                            {tagsList.map((tag) =>
                                <p className='tags-element' >#{tag}</p>
                            )}
                        </div>
                        <button  disabled={this.state.btnState === ""} className='flux-btn-publish'>Publish</button>
                    </div>
                    <div className='flux-messages'>
                        {this.state.listmessages.map((mess)=>
                            <Message author={mess.author} profilepic={mess.profilepic} value={mess.value} datePubli={mess.datePubli}  timePublic={mess.timePublic} nblikes={mess.nblikes} nbcomments={mess.nbcomments}/>
                        )}
                    </div>
                </div>

                <div className={this.state.active === "profile" ? 'profile-container-active' : 'profile-container'}>
                        <Profile username={this.state.username} profilepic={this.state.profilepic} messages={mesMessages} followers={mesFollowers} following={mesFollowing}/>
                </div>

            </div>
            </div>
        )
    }
    toggletab = (actv) =>{
        this.setState({active:actv})
        console.log(this.state.active)
    }
    
    handleBtnState(event){
        this.setState({btnState : event.target.value})
    }
}
export default Flux; 
