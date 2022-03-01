


import React, { Component } from 'react'
import './message.css'
import SettingsMessage from './settingsmessage'
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
            nbcomments : this.props.nbcomments,
            triggerMessage : false
        }
    }

    

    render() {
        return (
            <div className='message'>
                
                <div className='message-infos'>
                    <img src={this.state.profilepic} />
                    <div className='message-properties'>
                        <button onClick={() => this.setState({triggerMessage:true})}>
                            <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
                        </button>
                        {this.state.triggerMessage === true ?
                <div className='settings-container'>
                    <div className='delete'>
                        <button><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                        <p>Delete</p>
                    </div>
                    <div className='update'>
                        <button><i class="fa fa-pencil" aria-hidden="true"></i></button>
                        <p>Update</p>
                    </div>
                </div>
                : "" }
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
                        <button className='message-footer-btn'>
                        <i class="fa fa-heart-o fa-2x"></i>
                        </button>   
                        <p>{this.state.nblikes}</p>                 
                    </div>
                    <div className='message-comments'>
                        <button className='message-footer-btn'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <path d="M8.2881437,19.1950792 C8.38869181,19.1783212 8.49195996,19.1926955 8.58410926,19.2362761 C9.64260561,19.7368747 10.8021412,20 12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 C7.581722,4 4,7.581722 4,12 C4,13.7069096 4.53528582,15.3318588 5.51454846,16.6849571 C5.62010923,16.830816 5.63909672,17.022166 5.5642591,17.1859256 L4.34581002,19.8521348 L8.2881437,19.1950792 Z M3.58219949,20.993197 C3.18698783,21.0590656 2.87870208,20.6565881 3.04523765,20.2921751 L4.53592782,17.0302482 C3.54143337,15.5576047 3,13.818993 3,12 C3,7.02943725 7.02943725,3 12,3 C16.9705627,3 21,7.02943725 21,12 C21,16.9705627 16.9705627,21 12,21 C10.707529,21 9.4528641,20.727055 8.30053434,20.2068078 L3.58219949,20.993197 Z"/>
</svg></button>   
                        <p>{this.state.nbcomments}</p>                 
                    </div>
                    <div className='message-republish'>
                        <button className='message-footer-btn'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
                            <g fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M10 6 L3 14 10 22 M3 14 L18 14 C26 14 30 18 30 26" />
                             </g>
                            </svg>
                        </button>                  
                    </div>         
                </div>
            </div>
            
        )
    }
}

export default Message;
