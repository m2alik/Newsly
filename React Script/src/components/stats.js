import React, { Component } from 'react'
import './stats.css'
import Stat from './stat';
import logo from '../images/logoHeader.png'
class Stats extends Component {

    constructor(props) {
        super(props);
        this.state = {
            liststats : this.props.liststats,
            username : this.props.username,
            profilepic : this.props.profilepic,
            connected : this.props.connected
        }
        
    }
    


    render() {
        return (
            <div className='stats'>
               <div className='logo'>
                    <img className='logo-img' src ={logo} alt="Error"/>
                </div>
                <div className='stats-container'>
                    <div className='stats-my-infos'>
                        <img src={this.state.profilepic} />
                        <p>{this.state.username}</p>
                        {/* <button className="btn-settings"><i class="fa fa-bars"></i></button> */}
                    </div>
                
                <hr />
                {this.state.liststats.map((st) =>
                    <Stat name={st.name} value={st.value} />
                )}
            </div>
            </div>
        )
    }
}


export default Stats
