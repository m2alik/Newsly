import React, { Component } from 'react'
import './stat.css'
class Stat extends Component {
    
    
    constructor(props){
        super(props)
        this.state = {
            name : this.props.name,
            value : this.props.value
        }
    }
    
    render() {
        return (
            <div className='stat'>
                <p className='stat-name'>{this.state.name}</p>
                <p className='stat-value'>{this.state.value}</p>
            </div>
        )
    }
}

export default Stat;

