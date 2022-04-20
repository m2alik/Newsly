import React, { Component } from 'react'
import Comment from './comment';

class ListComments extends Component {


	constructor(props){
		super(props)
	}

	render() {
		return (
		<div>
			{this.props.listComments.map((comment,i) =>
			
				<Comment key={i} id_commenter={comment.id_commenter} datepubli={comment.date_publi+" on "+comment.time_publi} value={comment.value_comment} />
				)
			}
		</div>
		)
	}
}

export default ListComments;
