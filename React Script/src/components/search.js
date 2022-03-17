import React, { Component } from 'react'
import './search.css'
class Search extends Component {

	constructor() {
		super()
	}

	render() {
		return (
			<div className='search'>
				<div className='search-fields'>
					<div className='search-infos'>
						<input type="text" className="input-search" placeholder='search'></input>
						<button className="btn-search"><i class="fa fa-search"></i></button>
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
