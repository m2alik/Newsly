import React, { Component } from 'react'
import '../../../styles/search.css'
import SearchComponent from '../Containers/searchComponent'
class Search extends Component {
	constructor() {
		super()
		this.state={
			keyword : ""
		}
	}


	efface = () =>{
		this.setState({keyword:""})
	}


	sendSearching = () =>{
		this.props.setContainer(<SearchComponent keyword={this.state.keyword} />)
		setTimeout(() => {
			this.efface();
		  }, 1000);
	}

	render() {
		return (
			<div className='search'>
				<div className='search-fields'>
					<div className='search-infos'>
						
						<input type="text" className="input-search" value={this.state.keyword} placeholder='search for keywords e.g Book , Livre ...' onChange={(e) => this.setState({keyword:e.target.value})}></input>
						<i className="fa fa-search" onClick={() => this.sendSearching()}></i>
					</div>
					<div className='bloc-search-check'>
						<input className="check-search" type="checkbox"></input>
						<p>only followers</p>
					</div>
				</div>

			</div>
		)
	}
}
export default Search;
