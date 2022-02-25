import React, { Component } from 'react'
import './stats.css'
import Stat from './stat';
class Stats extends Component {

    constructor(props) {
        super(props);
        this.state = {
            liststats : this.props.liststats,
            username : this.props.username,
            profilepic : this.props.profilepic
        }
        
    }
    


    render() {
        return (
            <div className='stats'>
                <div className='stats-my-infos'>
                    <img src={this.state.profilepic} />
                    <p>{this.state.username}</p>
                </div>
                <hr />
                {this.state.liststats.map((st) =>
                    <Stat name={st.name} value={st.value} />
                )}
            </div>
        )
    }
}


export default Stats
