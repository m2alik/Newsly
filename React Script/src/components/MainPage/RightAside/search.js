import React, { Component } from 'react'
import '../../../styles/search.css'
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
						<i className="fa fa-search"></i>
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
