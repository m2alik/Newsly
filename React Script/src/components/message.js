


import React, { Component } from 'react'
import './message.css'
class Message extends Component {


    constructor(props){
        super(props)
        this.state={
            author : this.props.author,
            profilepic : this.props.profilepic,
            value : this.props.value,
            datePubli : this.props.datePubli,
            timePublic : this.props.timePublic,
            nblikes : this.props.nblikes,
            nbcomments : this.props.nbcomments
        }
    }

    render() {
        return (
            <div className='message'>
                <div className='message-infos'>
                    <img src={this.state.profilepic} />
                    <div className='message-properties'>
                        <p>{this.state.author}</p>
                        <div className='message-horaire'>
                            <p>{this.state.datePubli}</p>
                            <p>-{this.state.timePublic}</p>
                        </div>
                    </div>
                </div>
                
                <div className='message-contenu'>
                    <p>{this.state.value}</p>
                </div>
                <div className='message-footer'>
                    <div className='message-likes'>
                        <button className='message-footer-btn'><i class="fa fa-heart-o fa-2x"></i></button>   
                        <p>{this.state.nblikes}</p>                 
                    </div>
                    <div className='message-comments'>
                        <button className='message-footer-btn'><i class="fa fa-comment-o fa-2x"></i></button>   
                        <p>{this.state.nbcomments}</p>                 
                    </div>
                    <div className='message-republish'>
                        <button className='message-footer-btn'><i class="fa fa-retweet fa-2x"></i></button>                  
                    </div>         
                </div>
            </div>
        )
    }
}

export default Message;
