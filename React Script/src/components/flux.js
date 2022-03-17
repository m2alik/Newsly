
import React, { Component } from 'react'
import './flux.css'
import Home from './home';
import Profile from './profile';

class Flux extends Component {

    constructor(props){
        super(props)
        this.state = {
            container : null,
            btnState : ''
        }
        this.setContainer.bind(this.setContainer)
    }

    componentDidMount(){
        this.setContainer(<Home setContainer={this.setContainer}/>) 
    }

    setContainer = (newContainer) =>{
        this.setState({container:newContainer})
    }


   
    render() {    
        return (
            <div className='flux'>
                {/* <div className='flux-header'>
                    <ul>
                        <li >
                            <p onClick={() => this.setContainer(<Home setContainer={this.state.setContainer}/>)} >Home</p>
                        </li>
                        <li>
                            <p onClick={() => this.setContainer(<Profile setContainer={this.state.setContainer}/>)} >Profile</p>
                        </li>
                    </ul>
                </div> */}

                
                {this.state.container}
                

                {/* <div className={this.state.active === "profile" ? 'profile-container-active' : 'profile-container'}>
                        <Profile username={user.username} profilepic={pic} messages={mesMessages} followers={mesFollowers} following={mesFollowing}/>
                </div> */}

            </div>
            
        )
    }
}
export default Flux; 
