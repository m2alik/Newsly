



import React, { Component } from 'react'
import './suggestion.css'
 class Suggestion extends Component {

    constructor(props){
        super(props)
        this.state = {
            username : this.props.username,
            profilepic : this.props.profilepic

        }
    }


    render() {
        return (
        <div className='suggestion'>
            <img src={this.state.profilepic} alt={this.state.username} className='suggestion-profile-pic'/>
            <p className='suggestion-username'>{this.state.username}</p>
            <a className='suggestion-follow' href='#'>Follow</a>
        </div>
        )
    }
}
export default Suggestion;
