import React, { Component } from 'react'
import Stat from './stat'
import '../../../styles/stats.css'
import Profile from '../Containers/profile'
const listS = [{ name: "Followers", value: "1628" }, { name: "Following", value: "92" }, { name: "Likes", value: "12448" },{ name: "You liked", value: "96" }, { name: "Messages", value: "23" },{ name: "Comments", value: "96" }]
class Stats extends Component {


	constructor(props){
		super(props)
		this.state = {
			setContainer : this.props.setContainer
		}
	}

	render() {
		return (
			<div className='stats-my-stats'>
					<hr />
					<div className='stats-listing'>
						{listS.map((st,i) =>
							<Stat key={i} name={st.name} value={st.value} setContainer={this.state.setContainer}/>
						)}
					</div>
			</div>
		)
	}
}

export default Stats
