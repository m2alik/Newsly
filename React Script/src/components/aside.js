


import React, { Component } from 'react'
import pic1 from '../images/profilepic1.png'
import ListConnected from './listconnected';
import ListSuggestion from './listsuggestion';
import Search from './search';
import './aside.css'
class Aside extends Component {

    
    constructor(props){
        super(props);
        
    }

    render() {
        const list = [{username:"Amine",profilepic:pic1},{username:"Aya",profilepic:pic1},{username:"Sabrina",profilepic:pic1},{username:"Farid",profilepic:pic1},{username:"Kader",profilepic:pic1},{username:"Soumeya",profilepic:pic1},{username:"Nour",profilepic:pic1},{username:"Titis",profilepic:pic1},{username:"Malik",profilepic:pic1}]
        return (
            
            <div className='aside'>
               <Search />
               <ListConnected connecteds={list} /> 
               <ListSuggestion suggestions={list} />

            </div>
        )
    }
}

export default Aside;
