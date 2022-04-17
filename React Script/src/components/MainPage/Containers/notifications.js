import React, { Component } from 'react'
import '../../../styles/notifications.css'
import Notification from './notification'


const notifs = [{ value: "Amine YK has followed you"},{ value: "Amine YK has followed you"},{ value: "Amine YK has followed you"},{ value: "Amine YK has followed you"}]
class Notifications extends Component {

	constructor(props) {
		super(props)
	}



	render() {
		return (
			<div className='notifications'>
				{
					notifs.map((notif) =>
						<Notification value={notif.value}/>
					)
				}
			</div>


		)
	}
}
export default Notifications;
