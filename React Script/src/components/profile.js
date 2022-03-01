import React, { Component } from 'react'
import './profile.css'
import Message from './message'
import Follower from './follower'
import Following from './following'
class Profile extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            active : "messages",
            username : this.props.username,
            profilepic : this.props.profilepic,
            messages : this.props.messages,
            followers : this.props.followers,
            following : this.props.following
        }
    }

    toggletab = (actv)=>{
        this.setState({active:actv})
    }
    
    render() {
        return (
            <div className='profile'>
            <div className='profile-informations'>
                <div className='profile-infos'>  
                    <div className='profile-infos-bloc'>
                        <img src={this.state.profilepic} />
                    </div>
                    <button className='profile-btn-edit'>Edit Profile</button>
                </div>
                <div className='profile-stats'>
                    <p className='profile-stats-name'>{this.state.username}</p>
                    <div className='profile-stats-followers'>
                        <p className='profile-stats-followers-value'>123</p>
                        <p className='profile-stats-followers-title'>Followers</p>
                    </div>
                    <div className='profile-stats-following'>
                        <p className='profile-stats-following-value'>81</p>
                        <p className='profile-stats-following-title'>Following</p>
                    </div>
                </div>
            </div>
                <div className='profile-header'>
                    <ul>
                        <li >
                            <p onClick={() => this.toggletab("messages")} >Messages</p>
                        </li>
                        <li>
                            <p onClick={() => this.toggletab("followers")}>Followers</p>
                        </li>
                        <li>
                            <p onClick={() => this.toggletab("following")}>Following</p>
                        </li>
                    </ul>
                </div>
                <div className='profile-containers'>
                    <div className= {this.state.active === "messages" ? 'messages-container-active' : 'messages-container'}>
                        {this.state.messages.map((mess)=>
                            <Message author={mess.author} profilepic={mess.profilepic} value={mess.value} datePubli={mess.datePubli}  timePublic={mess.timePublic} nblikes={mess.nblikes} nbcomments={mess.nbcomments}/>
                        )}
                    </div>
                    <div className= {this.state.active === "followers" ? 'followers-container-active' : 'followers-container'}>
                        {this.state.followers.map((foll)=>
                            <Follower username={foll.username} profilepic={foll.profilepic} />
                        )}
                    </div>
                    <div className= {this.state.active === "following" ? 'following-container-active' : 'following-container'}>
                    {this.state.following.map((foll)=>
                            <Following username={foll.username} profilepic={foll.profilepic} />
                        )}
                    </div>
                </div>
            </div>

        )
    }
}
export default Profile;
