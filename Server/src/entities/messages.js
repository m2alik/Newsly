const { resolve } = require("path")
const Users = require("./users.js");


class Messages{
	constructor(db){
		db = this.db

	}

	users = new Users.default(db);
	// inserer un message a la base de données
	insertMessage(id_author,value_message){
		return new Promise((resolve,reject)=>{
				insertMessages_DB(id_author,value_message).then((id_message)=>{
					resolve(id_message)
				})
				.catch((err)=>{
					reject(err)
				})
			})
	}

	getMessage(id_message){
		return new Promise((resolve,reject)=>{
			getMessage_DB(id_message).then((message)=>{
				resolve(message)
			})
			.catch((err)=>{
				reject(err)
			})
		})
	}

	deleteMessage(id_message){
		return new Promise((resolve,reject)=>{
			deleteMessages_DB(id_message).then((ifDeleted)=>{
				resolve(ifDeleted)
			})
			.catch((err)=>{
				reject(err)
			})
		})
	}

	updateMessage(id_message,newMessage){
		return new Promise((resolve,reject)=>{
			updateMessage_DB(id_message,newMessage).then((message)=>{
				resolve(message)
			})
			.catch((err)=>{
				reject(err)
			})
		})
	}

	insertLikeMessage(id_message,id_liker){
		return new Promise((resolve,reject)=>{
			insertLikeMessage_DB(id_message,id_liker).then((nb_likes)=>{
				resolve(nb_likes)
			})
		})
		.catch((err)=>{
			reject(err)
		})
	}

	insertCommentMessage(id_message,id_commenter,value_comment){
		return new Promise((resolve,reject)=>{
			insertCommentMessage_DB(id_message,id_commenter,value_comment).then((ifDone)=>{
				resolve(ifDone)
			})
			.catch((err)=>{
				reject(err)
			})
		})
	}


	async getAllMessages(){
		return new Promise((resolve,reject)=>{
			getAllMessages_DB().then((allMessages)=>{
				resolve(allMessages)
			})
			.catch((err)=>{
				reject(err)
			})
		})
	}

	getAllMessagesForUser(id_user){
		return new Promise((resolve,reject)=>{
			getAllMessagesForUser_DB(id_user).then((allMessages)=>{
				resolve(allMessages)
			})
			.catch((err)=>{
				reject(err)
			})
		})
	}

	getAllComments(id_message){
		return new Promise((resolve,reject)=>{
			getAllComments_DB(id_message).then((listComments)=>{
				resolve(listComments)
			})
			.catch((err)=>{
				reject(err)
			})
		})
	}


	retweetMessage(id_message,id_user){
		return new Promise((resolve,reject)=>{
			retweetMessage_DB(id_message,id_user).then((bool)=>{
				resolve(bool)
			})
			.catch((err)=>{
				reject(err)
			})
		})
	}

	searchMessage(keyword){
		return new Promise((resolve,reject)=>{
			searchMessage_DB(keyword).then((messages)=>{
				resolve(messages)
			})
			.catch((err)=>{
				reject(err)
			})
		})
	}


}



// --=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-==-=-=-==-=-=-=-=-==-=-=-=-=-
// --=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= BASE DE DONNEES -=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-==-=-=-=-=
// --=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-==-=-=-==-=-=-=-=-==-=-=-=-=-



const getIdentif_DB = function(){
	return new Promise((resolve,reject)=>{
		this.db.messages.find({},{id_message:1,_id:0},(err,doc)=>{
			if(err){
				reject("Error DataBase")
			}
			else{
				if(doc.length == 0){
					identif = 0
				}else{
				list = []
				for(i=0;i<doc.length;i++){
					list.push(doc[i].id_message)
				}
				identif = Math.max(...list)
			}
			resolve(identif)
		}
		})
	})
}


	const getTimePubli = function(date){
		var tt = ""
		for (var i =11;i<16;i++){
			tt += date.toISOString()[i]
		}
		return tt
	} 
	const getDatePubli = function(date){
		var tt = ""
		for (var i =0;i<10;i++){
			tt += date.toISOString()[i]
		}
		return tt
	} 

	const insertMessages_DB = function(id_author,value_message){
		return new Promise((resolve,reject)=>{
			getIdentif_DB().then((res)=>{
				identif_messages = res
				identif_messages = identif_messages +  1
			db.messages.insert({
				id_author : id_author,
				value_message : value_message,
				id_message : identif_messages,
				likes : [],
				comments : [],
				retweets : [],
				retweetedFrom : 0,
				nb_likes : 0,
				nb_comments :0,
				id_message_original : 0,
				date_publi : getDatePubli(new Date(Date.now())),
				time_publi : getTimePubli(new Date(Date.now())),

			},(err,doc)=>{
				if(err){
					reject("Error Data Base")
				}else{
					resolve(doc.id_message)
				}
			})
		})
	})
	}

	const insertLikeMessage_DB = function(id_message,id_liker){
		return new Promise((resolve,reject)=>{
			this.db.messages.find({id_message:id_message},(err,doc)=>{
				if(err){
					reject("Error DataBase")
				}
				else{
					
					var liste_likes = doc[0].likes
					var flag = 0
					for (var i=0;i<liste_likes.length;i++){
						if(liste_likes[i].id_liker == id_liker){
							flag = 1
						}
					}
					if(flag == 0){
						liste_likes.push({id_liker:id_liker})
					}
					else{
						liste_likes.pop({id_liker:id_liker})
					}
						const nb_likes = liste_likes.length
						db.messages.update({id_message:id_message},{$set:{likes:liste_likes,nb_likes:nb_likes}},(err,doc)=>{
							if(err){
								reject("Error DataBase")
							}
							else{
								resolve(nb_likes)
							}
						})
					
				}
		})
			}

	)}


	const insertCommentMessage_DB = function(id_message,id_commenter,value_comment){
		return new Promise((resolve,reject)=>{
			this.db.messages.find({id_message:id_message},(err,doc)=>{
				if(err){
					reject("Error DataBase")
				}
				else{
					var liste_comments = doc[0].comments
						liste_comments.push({id_commenter:id_commenter,value_comment:value_comment,date_publi : getDatePubli(new Date(Date.now())),
							time_publi : getTimePubli(new Date(Date.now()))})
						const nb_comments = liste_comments.length
						db.messages.update({id_message:id_message},{$set:{comments:liste_comments,nb_comments:nb_comments}},(err,doc)=>{
							if(err){
								reject("Error DataBase")
							}
							else{
								resolve(nb_comments)
							}
						})
					
				}
		})
			}

		)}

	const retweetMessage_DB = function(id_message,id_user){
		return new Promise((resolve,reject)=>{
			this.db.messages.find({id_message:id_message},(err,doc)=>{
							if(err){
								reject("Error DataBase")
							}
							else{
								if(doc[0].id_author === parseInt(id_user)){
									resolve(0)
								}else{
									
									var liste_retweets = doc[0].retweets
									var flag = 0
									for (var i=0;i<liste_retweets.length;i++){
										if(liste_retweets[i].id_user == id_user){
											flag = 1
										}
									}
									if(flag == 1){
										resolve(1)
									}else{
										liste_retweets.push({id_user:id_user})
										db.messages.update({id_message:id_message},{$set:{retweets:liste_retweets}},(err,doc2)=>{
											if(err){
												reject("Error DataBase")
											}
											else{
												console.log("hereee ! ")
												console.log(doc[0])
												getIdentif_DB().then((res)=>{
													identif_messages = res
													identif_messages = identif_messages +  1
												db.messages.insert({
													id_author : parseInt(id_user),
													value_message : doc[0].value_message,
													id_message : identif_messages,
													likes : [],
													comments : [],
													retweets : [],
													retweetedFrom : doc[0].id_author,
													nb_likes : 0,
													nb_comments :0,
													id_message_original : id_message, 
													date_publi : getDatePubli(new Date(Date.now())),
													time_publi : getTimePubli(new Date(Date.now())),
									
												},(err,doc3)=>{
													if(err){
														reject("Error Data Base")
													}else{
														console.log("IIC")
														console.log(doc3)
														resolve(doc3)
													}
												})
											}
												)}
										})
									}
								}
								
							}
					})	
		})
	}
				

	const getMessage_DB = function(id_message){
		return new Promise((resolve,reject)=>{
			db.messages.find({id_message:id_message},(err,doc)=>{
				if(err){
					reject("Error Data Base")
				}else{
					resolve(doc[0])
				}
			})
		})
	}

	

	const deleteMessages_DB = function(id_message){
		return new Promise((resolve,reject)=>{
			db.messages.remove({id_message:id_message},{},(err,nb_removed)=>{
				if(err){
					bool = false
					reject("Error Data Base")
				}else{
					bool = true
				}
				resolve(id_message)
			})
		})
	}

	const updateMessage_DB = function(id_message,newMessage_value){
		return new Promise((resolve,reject)=>{
		getMessage_DB(id_message).then((messageBeforeUpdating)=>{
				oldmessage_value = messageBeforeUpdating.value_message
				db.messages.update({value_message:oldmessage_value},{$set : {value_message:newMessage_value}},{multi:true},(err,nb_replaced)=>{
					if(err){
						reject("Error Data Base")
					}else{
						if(nb_replaced == 0){
							bool = false
						}else{
							bool = true
						}
						resolve(bool)
					}
				})
			})

		})
	}

	const getAllMessages_DB = function(){
		return new Promise((resolve,reject)=>{
			db.messages.find({},{},(err,doc)=>{
				if(err){
					reject("Error Data Base")
				}else{
					console.log(doc)
					resolve(doc)
				}
			})
		})
	}


	const getAllMessagesForUser_DB = function(id_user){
		return new Promise((resolve,reject)=>{
			db.messages.find({id_author:id_user},(err,doc)=>{
				if(err){
					reject("Error Database")
				}
				else{
					console.log(doc)
					resolve(doc)
				}
			})
		})
	}

	const getAllComments_DB = function(id_message){
		return new Promise((resolve,reject)=>{
			db.messages.find({id_message:id_message},(err,doc)=>{
				if(err){
					reject("Error Database")
				}else{
					resolve(doc[0].comments)
				}
			})
		})
	}

	const searchMessage_DB = function(keyword){
		return new Promise((resolve,reject)=>{
		console.log(keyword)
		db.messages.find({value_message:{$regex :new RegExp(keyword)}},(err,doc)=>{
				if(err){
					reject("Error Database")
				}else{
					console.log("Here")
					console.log(doc)
					resolve(doc)
				}
			})
		})
	}


// TESTS SUR CONSOLE
// var Datastore = require('nedb');
// db  ={}
// db.messages = new Datastore(
// {	
// 	filename: __dirname + '/Messages_DataBase.db', 
// 	autoload: false}
// )
// db.messages.loadDatabase()
// const messages = new Messages(db);
// messages.insertMessage(14,"Second message publié sur Newsly")
// messages.insertMessage(14,"Premier message publié sur ")
// messages.searchMessage("NeQwsly")
// messages.retweetMessage(1,45)
// messages.retweetMessage(1,98)
// messages.retweetMessage(1,10298)
// messages.retweetMessage(1,102)
// messages.insertCommentMessage(1,14,"IZAN")
// messages.insertCommentMessage(1,164,"IZAN2")
// messages.insertCommentMessage(1,144,"IZAN4")
// messages.getAllComments(1)
// messages.insertLikeMessage(1,14)
// messages.insertLikeMessage(1,55)
// messages.insertLikeMessage(1,28)
// messages.insertLikeMessage(1,102)
// messages.insertCommentMessage(1,14,"First comment dessu !")
// messages.insertCommentMessage(1,14,"fourth comment dessu !")

// messages.insertLikeMessage(1,54)
// messages.insertLikeMessage(1,555)
// messages.insertLikeMessage(1,51)
// messages.insertMessage(22,"Deuxieme message publié sur Newsly","2022-11-26")
// messages.updateMessage(1,"Message 1 Updated")
// messages.updateMessage(2,"Message 2 Updated")
// // messages.getMessage(1)
// // messages.getMessage(2)
// // messages.deleteMessage(1)
// // messages.deleteMessage(2)
// // messages.getAllMessages()
// // messages.getMessage(1)
// // messages.getMessage(1)
// messages.getAllMessages()


exports.default = Messages;
