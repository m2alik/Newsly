


import React, { Component } from 'react'
import './follower.css'
class Follower extends Component {

    constructor(props){
        super(props)
        this.state ={
            username : this.props.username,
            profilepic : this.props.profilepic
        }
    }

    render() {
        return (
        <div className='follower'>
                <div className='message-infos'>
                    <img src={this.state.profilepic} />
                    <p>{this.state.username}</p> 
                </div>
                <button className='follower-btn'>Remove</button>
        </div>
        )
    }
}

export default Follower;
