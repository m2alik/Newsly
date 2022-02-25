


import React, { Component } from 'react'
import "./connected.css"

class Connected extends Component {

    constructor(props){
        super(props);
        this.state={
            username : this.props.username,
            profilepic : this.props.profilepic
        }
    }
        
    render() {
        return (
        <div className='connected'>
            <img src={this.state.profilepic} alt={this.state.username} className='connected-profile-pic'/>
            <label className='connected-username'>{this.state.username}</label>
            <div className='connected-dot'>
                
            </div>
        </div>
        )
    }
}

export default Connected;
