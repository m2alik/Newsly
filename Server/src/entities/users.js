class Users {
  constructor(db) {
    this.db = db
    // suite plus tard avec la BD
}
  
  create(login, password, lastname, firstname,email,gender,dateNaissance) {
    return new Promise((resolve, reject) => {
	insert_user_DB(login,password,lastname,firstname,email,gender,dateNaissance).then((userid)=>{
		resolve(userid);
	  })
	  .catch((err)=>{
		reject(err)
		console.log(err)
	})
    });
  }

  async get(userid) {
    return new Promise((resolve, reject) => {
      get_user_DB(userid).then((user)=>{
		  resolve(user)
	  })
	  .catch((err)=>{
		reject("Error")
		console.log(err)
	})
    });
  }

  async exists(login) {
    return new Promise((resolve, reject) => {
      exsits_DB(login).then((bool)=>{
		  console.log(bool)
		  resolve(bool)
	  })
	  .catch((err)=>{
		reject(err)
		console.log(err)
	})
    });
  }

  checkpassword(login, password) {
    return new Promise((resolve, reject) => {
		checkpassword_DB(login,password).then((userid)=>{
			// console.log(bool)
			resolve(userid)
		})
		.catch((err)=>{
			// reject(err)
			console.log(err)
		})
    });
  }

  delete(userid){
	  return new Promise((resolve,reject)=>{
		  delete_DB(userid).then((bool)=>{
			  resolve(bool)
		  })
		  .catch((err)=>{
			  reject(err)
			  console.log(err)
		  })
	  })
  }

  update(userid,firstname,lastname,email,login,password,bio){
	  return new Promise((resolve,reject)=>{
		update_DB(userid,firstname,lastname,email,login,password,bio).then((bool)=>{
			resolve(bool)
		})
		.catch((err)=>{
			reject(err)
			console.log(err)
		})	  
	  })
  }

  // l'utilisateur follow un ami ---> user.followings++ ET ami.followers++
  insertUserFollow(id_user,id_ami){
	  return new Promise((resolve,reject)=>{
		  insertUserFollow_DB(id_user,id_ami).then((bool)=>{
			  resolve(bool)
		  })
		  .catch((err)=>{
			  reject(err)
		  })
	  })
  }


  getFollowersFollowings(id_user){
	  return new Promise((resolve,reject)=>{
			getFollowersFollowings_DB(id_user).then((lists)=>{
				resolve(lists)
			})
			.catch((err)=>{
				reject(lists)
			})
	  })
  }


  getFollowersMessages(id_user){
	  return new Promise((resolve,reject)=>{
		  getFollowersMessages_DB(id_user).then((messages)=>{
			  resolve(messages)
		  })
		  .catch((err)=>{
			  reject(err)
		  })
	  })
  }


  getSuggestions(id_user){
	  return new Promise((resolve,reject)=>{
		  getSuggestions_DB(id_user).then((listSuggestions)=>{
			  resolve(listSuggestions)
		  })
		  .catch((err)=>{
			  reject(err)
		  })
	  })
  }

  show(){
	  return new Promise((resolve,reject)=>{
		  show_DB().then((liste_users)=>{
			  resolve(liste_users)
		  })
	  })
  }

  
}
// --=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-==-=-=-==-=-=-=-=-==-=-=-=-=-
// --=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= BASE DE DONNEES -=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-==-=-=-=-=
// --=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-==-=-=-==-=-=-=-=-==-=-=-=-=-

// Initialisation de l'id de la base de données

// init_id(){
// 	return new Promise((resolve,reject)=>{
// 		this.db.users.find({},(err,doc)=>{
// 			if(err){
// 				reject(err)
// 			}else{
// 				if(doc == []){
// 					resolve(1)
// 				}else{
// 					resolve(doc[doc.length-1].id)
// 				}
// 			}
// 		})
// 	})
// }

// var identif_users;

// init_id().then((id)=>{
// 	identif_users = id
// })



const getIdentif_DB = function(){
	return new Promise((resolve,reject)=>{
		this.db.users.find({},{id:1,_id:0},(err,doc)=>{
			if(err){
				reject("Error DataBase")
			}
			else{
				if(doc.length == 0){
					identif = 0
				}else{
				list = []
				for(i=0;i<doc.length;i++){
					list.push(doc[i].id)
				}
				identif = Math.max(...list)
				// console.log(identif)
			}
			resolve(identif)
		}
		})
	})
}
 
const insert_user_DB = function(login,password,firstname,lastname,email,gender,dateNaissance){
	return new Promise((resolve,reject)=>{
	getIdentif_DB().then((res)=>{
		identif_users = res
		console.log(identif_users)
		identif_users = identif_users +  1
		console.log(identif_users)
		this.db.users.insert({
				login : login,
				password : password,
				firstname: firstname,
				lastname:lastname,
				id:identif_users,
				email:email,
				gender:gender,
				date_Naissance : new Date(dateNaissance),
				biography : "insert you biography",
				followers : [],
				nb_followers : 0,
				followings : []	,
				nb_followings : 0
			},(err,doc)=>{
				if(err){
					reject("Error Data Base")
				}else{
					// console.log(doc)
					resolve(doc.id)
				}
			}
			)
			
		})
	})
}

const get_user_DB = function(userid){
	return new Promise((resolve,reject)=>{
		this.db.users.find({id:userid},(err,doc)=>{
			if(err){
				reject("Error Data Base")
			}else{
				// console.log("-------------")
				console.log(doc[0])
				resolve(doc[0])
			}
		})
	})
}

const exsits_DB = function(login){
	return new Promise((resolve,reject)=>{
		this.db.users.find({login:login},(err,doc,bool)=>{
			if(err){
				reject("Error Data Base")
			}else{
				if(doc.length == 0){
					bool=false
				}else{
					bool=true
				}
				resolve(bool)
			}
		})
	})
}
const checkpassword_DB = function(login,password){
	return new Promise((resolve,reject)=>{
				this.db.users.find({login:login},(err,doc,bool)=>{
					if(err){
						reject("Error Data Base")
					}else{
						if(doc.length == 0){
							reject("User Not found")
						}else{
						bool = doc[0].password
					}
					if(bool == password){
						resolve(doc[0])
					}else{
						resolve("0/")
					}
				}
				})
			}			
	)}



	const delete_DB = function(userid){
		return new Promise((resolve,reject)=>{
			this.db.users.find({id:userid},(err,doc,bool)=>{
				if(err){
					reject("Error Data Base")
				}
				else{
					if(doc.length == 0){
						bool = false
					}
					else{
						db.users.remove({id:userid},(erre,nb_removed)=>{
							if(erre){
								reject("Error Data Base")
							}
							else{
								console.log("User Deleted !! ")
								bool = true
							}
						})
					}
					resolve(bool)
				}
			})
		})
	}


	update_DB = function(userid,firstname,lastname,email,login,password,bio){
		return new Promise((resolve,reject)=>{
			db.users.update({id:userid},{$set:{firstname:firstname,lastname:lastname,email:email,login:login,password:password,biography:bio}},(err,nbreplaced)=>{
				if(err){
					reject("Error Database")
				}else{
					console.log(nbreplaced)
					resolve(nbreplaced)
				}
			})
		})
		
	}

	const insertUserFollow_DB = function(id_user,id_ami){
		return new Promise((resolve,reject)=>{

			// Followers Pour l'ami
			var bool_user ;
			db.users.find({id:id_ami},(err,doc)=>{
				if(err){
					reject("Error Database")
				}else{
					console.log("PUTTTAIN")
					console.log(doc[0].followers)
					var liste_followers = doc[0].followers
					var flag = 0
					for (var i=0;i<liste_followers.length;i++){
						if(liste_followers[i].id_follower == id_user){
							flag = 1
						}
					}
					if(flag == 0){
						liste_followers.push({id_follower:id_user})
					}
					else{
						liste_followers.pop({id_follower:id_user})
					}
					const nb_followers = liste_followers.length
					db.users.update({id:id_ami},{$set:{followers:liste_followers,nb_followers:nb_followers}},(err1,doc1)=>{
						if(err1){
							reject("Error Database")
						}
						else{
							
							if(doc1 !== 0){
								bool_user = true
							}
						}
					})
				}
			})

			// Following pour l'utilisateur
			var bool_ami ;
			db.users.find({id:id_user},(err,doc)=>{
				if(err){
					reject("Error Database")
				}else{
					var liste_followings = doc[0].followings
					var flag = 0
					for (var i=0;i<liste_followings.length;i++){
						if(liste_followings[i].id_following == id_ami){
							flag = 1
						}
					}
					if(flag == 0){
						liste_followings.push({id_following:id_ami})
					}
					else{
						liste_followings.pop({id_following:id_ami})
					}
					const nb_followings = liste_followings.length
					db.users.update({id:id_user},{$set:{followings:liste_followings,nb_followings:nb_followings}},(err2,doc2)=>{
						if(err2){
							reject("Error Database")
						}
						else{
							
							if(doc2 !== 0){
								
								bool_ami = true
							}
						}
					})
				}
			})

			// resolve true si la mise a jour de l'utilisateur ET de l'ami sont bien faites sinon false
			resolve(true)
		})
	}


	 


	const getFollowersMessages_DB = function(id_user){
		return new Promise((resolve,reject)=>{
			db.users.find({id:id_user},(err,doc)=>{
				if(err){
					reject("Error Database")
				}else{
					const liste_followers = doc.followers
					db.messages.find({id_author:{$in : liste_followers}},(err1,doc1)=>{
						if(err1){
							reject("Error Database")
						}else{
							console.log(doc1)
							resolve(doc1)
						}
					}) 
				}
			})
		})
	}


	const getFollowersFollowings_DB = function(id_user){
		return new Promise((resolve,reject)=>{
			db.users.find({id:id_user},(err,doc)=>{
				if(err){
					reject(err)
				}
				else{
					var lists = []
					console.log("HERE")
					lists.push(doc[0].followers)
					lists.push(doc[0].followings)
					console.log(lists)
					resolve(lists)
				}
			})
		})
	}


	const getSuggestions_DB = function(id_user){
		return new Promise((resolve,reject)=>{
			db.users.find({id:id_user},(err,doc)=>{
				if(err){
					reject("Error Database")
				}else{
					console.log("DAA")
					console.log(doc[0])
					console.log(doc[0].followers)
					const liste_followers = doc.followers
					db.users.find({id:{$nin : liste_followers}},(err1,doc1)=>{
						if(err1){
							reject(err1)
						}else{
							console.log(doc1)
							resolve(doc1)
						}
					})
				}
		})
		})
	}


	show_DB = function(){
		return new Promise((resolve,reject)=>{
			this.db.users.find({},(err,doc)=>{
				if(err){
					reject("Error Data Base")
				}else{
					console.log(doc)
					resolve(doc)
				}
			})
		})
	}



// TESTS SUR CONSOLE
// var Datastore = require('nedb');
// const Messages = require("./messages.js");

// db  ={}
// db.users = new Datastore({
// 	filename: __dirname + '../Users_DataBase.db', 
// 	autoload: true
// }
// )
// db.users.loadDatabase()
// db.messages = new Datastore({
// 	filename: __dirname + '../Messages_DataBase.db', 
// 	autoload: true
// }
// )
// db.messages.loadDatabase()
// const users = new Users(db);
// const messages = new Messages.default(db);
// messages.insertMessage(2,"Second message publié sur ")
// messages.insertMessage(2,"Second2 message publié sur ")
// messages.insertMessage(3,"Third message publié sur ")
// messages.insertMessage(4,"Fourth message publié sur ")

// messages.insertMessage(1,"Premier message publié sur ")


// // users.create("AdA","BBB","CCC","DDD")
// // users.create("AdA","BBB","CCC","DAD")
// users.insertUserFollow(1,3)
// users.insertUserFollow(1,2)
// // users.insertUserFollow(1,4)
// users.insertUserFollow(2,4)
// users.insertUserFollow(3,6)
// users.get(1)
// users.getFollowersMessages(1)
// users.update(1,"X","X","X","X","X","X")
// users.update(44,"X","X","X","X","X","X")
// users.show()
// // users.create("AdA","BBB","CCC","DDD")
// // users.create("AdA","BBB","CCC","DDD")
// // users.create("AdA","BBB","CCC","DDD")
// // users.create("AdA","BBB","CCC","DDD")
// // users.create("AdA","BBB","CCC","DDD")
// // users.create("AdA","BBB","CCC","DDD")
// // users.create("AdA","BBB","CCC","DDD")
// // users.create("AdA","BBB","CCC","DDD")
// // users.create("AdA","BBB","CCC","DDD")
// // users.create("AdA","BBB","CCC","DDD")
// // // getIdentif_DB().then()
// // users.create("KKK","KKK","KKK","KKK")

// users.show()


// users.create("ZZZ","ZZZ","ZZZ","ZZZ","ZZZ","2000-12-17")
// users.show()
// // users.create("ZZZ","ZZZ","ZZZ","ZZZ")
// users.get(3)
// users.show()

// // users.exists("AAA")
// // users.exists("AASJA")
// // users.checkpassword("AAA","BBB")
// // users.checkpassword("AAA","BLDLDB")
// // users.checkpassword("AAdsdsA","BLDLDB")
// // users.delete(44)
// // users.delete(22)
// // users.exists("AAA")
// // users.show()







exports.default = Users;

