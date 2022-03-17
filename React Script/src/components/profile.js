import React, { Component } from 'react'
import './profile.css'
import Messages from './messages'
import Followers from './followers'
import Followings from './followings'
import pic from '../images/Amine YK.png'


const user = {firstname:"Doufene",lastname:"malik",username:"Malik DF"}
        

class Profile extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            setContainer : props.setContainer,
            profContainer : null
        }
        this.setProfContainer.bind(this.setProfContainer)
    }

    componentDidMount(){
        this.setProfContainer(<Messages/>)
    }

    setProfContainer = (container) =>{
        this.setState({profContainer:container})
    }



    handleProfilePic = (e) =>{
        const reader = new FileReader();
        reader.onload = ()=>{
            // 2 if the  operation is complete , 1 if it loading
            if(reader.readyState === 2){
                this.setState({profilepic:reader.result})
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }
    
    render() {
        return (
            <div className='profile'>
            <div className='profile-informations'>
                <div className='profile-infos'>  
                    <div className='profile-infos-bloc'>
                        <input type="file" name="image-upload" id="input-img" accept='images/*' onChange={this.handleProfilePic}/>
                        <label htmlFor='input-img' className='image-input'></label>
                        <img src={pic} htmlFor='input-img' />
                    </div>
                    <button className='profile-btn-edit'>Edit Profile</button>
                </div>
                <div className='profile-stats'>
                    <p className='profile-stats-name'>{user.username}</p>
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
                            <p onClick={() => this.setProfContainer(<Messages />)} >Messages</p>
                        </li>
                        <li>
                            <p onClick={() => this.setProfContainer(<Followers />)}>Followers</p>
                        </li>
                        <li>
                            <p onClick={() => this.setProfContainer(<Followings />)}>Following</p>
                        </li>
                    </ul>
                </div> 
                
                {this.state.profContainer}
            </div>


        )
    }
}
export default Profile;
