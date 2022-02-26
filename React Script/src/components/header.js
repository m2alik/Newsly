
import React , {Component, useState} from 'react'



class Header extends Component{


    constructor(props){
        super(props);
        this.username=this.props.username;
        this.profilepic = this.props.profilepic;
        this.logo = this.props.logo;
    }

    render(){
    return (

    <div className='header'>
        <div className='logo'>
            <img src ={this.logo} alt="Error"/>
        </div>
        <div className="menu">
            <ul>
                <li>
                    <a href="#">Home</a>
                </li>
                <li>
                    <a href="#">Profil</a>
                </li>
                <li>
                    <a href="#">Messages</a>
                </li>
                <li>
                    <a href="#">Followers</a>
                </li>
            </ul>
        </div>
        <div className='search'>
            <div className='search-fields'>
                <input type="text" className="input-search" placeholder='search'></input>
                <button className="btn-search"><i class="fa fa-search"></i></button>
                <div className='bloc-search-check'>  
                    <input className="check-search" type="checkbox"></input>
                    <label>only followers</label>
                 </div>
            </div>
        </div>
    </div>
  )
}
}

export default Header;