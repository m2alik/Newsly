


import React, { Component } from 'react'
import './flux.css'

class Flux extends Component {

    constructor(props){
        super(props)
    }

    
    render() {
        return (
            <div className='flux'>
                <div className='flux-status'>
                    <img />
                    <textarea className='flux-textarea' rows="5" placeholder='Publish your message'></textarea>
                </div>
                <div className='flux-messages'>

                </div>
            </div>
        )
    }
}
export default Flux; 
