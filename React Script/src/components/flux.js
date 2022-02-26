


import { eventWrapper } from '@testing-library/user-event/dist/utils';
import React, { Component } from 'react'
import './flux.css'
import Tags from "./tags";
import Message from './message'
class Flux extends Component {

    constructor(props){
        super(props)
        this.state = {
            username : this.props.username,
            profilepic : this.props.profilepic,
            btnState : '',
            listmessages : this.props.listmessages
        }
        this.handleBtnState.bind(this)
    }

    
    render() {
        return (
            <div className='flux'>
                <div className='flux-status'>
                    <div className='flux-my-infos'>
                        <img src={this.state.profilepic} />
                        <p>{this.state.username}</p>
                    </div>
                    <textarea className='flux-textarea' rows="7" placeholder='Publish your message' onKeyDown={(event) => this.handleBtnState(event)}></textarea>
                    <Tags />
                    <button  disabled={this.state.btnState === ""} className='flux-btn-publish'>Publish</button>
                </div>
                <div className='flux-messages'>
                    {this.state.listmessages.map((mess)=>
                        <Message author={mess.author} profilepic={mess.profilepic} value={mess.value} datePubli={mess.datePubli}  timePublic={mess.timePublic} nblikes={mess.nblikes} nbcomments={mess.nbcomments}/>
                    )}
                </div>
            </div>
        )
    }
    handleBtnState(event){
        this.setState({btnState : event.target.value})
    }
}
export default Flux; 
