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
		identif_users = identif_users +  1
			this.db.users.insert({
				login : login,
				password : password,
				firstname: firstname,
				lastname:lastname,
				id:identif_users,
				email:email,
				gender:gender,
				date_Naissance : new Date(dateNaissance),
				biography : "insert you biography"		
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
				// console.log(doc[0])
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




const { count } = require('console');
const { resolve, join } = require('path');
// TESTS SUR CONSOLE
// var Datastore = require('nedb');
// db  ={}
// db.users = new Datastore({
// 	filename: __dirname + '../Users_DataBase.db', 
// 	autoload: true
// }
// )
// db.users.loadDatabase()
// const users = new Users(db);
// users.create("AdA","BBB","CCC","DDD")
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

