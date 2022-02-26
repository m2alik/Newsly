

import React, { Component } from 'react'
import './tags.css'
const tagsList = ['paris','follow','sunset','mode','jean','adidas']

class Tags extends Component {

    constructor(){
        super()
    }

    render() {
        return (
        <div className='tags'>
            {tagsList.map((tag) =>
                <p className='tags-element'>#{tag}</p>
            )}
        </div>
        )
    }
}
export default Tags;