import React, { Component } from 'react'
import './settingsmessage.css'
class SettingsMessage extends Component {

    constructor(props){
        super(props)
        this.state = {
            trigger : this.props.trigger
        }
    }

    render() {
        return (
        <div className='settingsmessage'>
            {this.state.trigger === true ?
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
            :"" }
        </div>
        )
    }
}
export default SettingsMessage;