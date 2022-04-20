const express = require("express");
const Users = require("./entities/users.js");
const Messages = require("./entities/messages.js");

// creer la base de données
var Datastore = require("nedb")
db  ={}
db.users = new Datastore({
	filename: __dirname + '/Users_DataBase.db', 
	autoload: true
})
db.users.loadDatabase()

db.messages = new Datastore({
	filename : __dirname+"/Messages_DataBase.db",
	autoload : true
})
db.messages.loadDatabase()



function init(db) {
    const router = express.Router();
    // On utilise JSON
    router.use(express.json());
    const users = new Users.default(db);
    const messages = new Messages.default(db);
    // simple logger for this router's requests
    // all requests to this router will first hit this middleware
    router.use((req, res, next) => {
        // console.log('API: method %s, path %s', req.method, reqo.path);
        // console.log('Body', req.body);	
		// console.log("-=-=-=-=-=-=-=-=-=- DATABASE --=-=-=-=-=-=-=-=-=-==-")
		// users.show().then()
		// messages.getAllMessages().then()
        next();
    });

	
	
	
	// --=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-==-=-=-==-=-=-=-=-==-=-=-=-=-
	// --=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= USERS ==-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-==-=-=-=-=
	// --=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-==-=-=-==-=-=-=-=-==-=-=-=-=-

	// une requete apres tentative de login de l utilisateur 
    router.post("/user/login", async (req, res) => {
        try {
            const { login, password } = req.body;
            // Erreur sur la requête HTTP
            if (!login || !password) {
				res.status(400).send("Requête invalide : login et password nécessaires")
                return;
            }
            if(!await users.exists(login)) {
				res.status(401).send("Requête invalide : Utilisateur Inconnu")
                return;
            }
            let user = await users.checkpassword(login, password);
            if (user != "0/") {
                // Avec middleware express-session
                req.session.regenerate(function (err) {
                    if (err) {
						res.status(500).send("Requête invalide : login ou password incorrectes")
						return;
                    }
                    else {
                        // C'est bon, nouvelle session créée
                        req.session.user = user;
						res.status(200).send({id:user.id,token:user._id})
						return;
                    }
                });
                return;
            }
            // Faux login : destruction de la session et erreur
            req.session.destroy((err) => {});
			res.status(403).send("Requête invalide : login et password nécessaires")
            return;
        }
        catch (e) {
            // Toute autre erreur
			res.status(500).send("Requête invalide : login et password nécessaires")
			return;
        }
     });

    router
		.route("/user/:user_id(\\d+)")
		// requete pour avoir l'utilisateur avec le numero de l'id saisie sur l'url
        .get(async (req, res) => {
        try {
            const user = await users.get(parseInt(req.params.user_id));
            if (!user)
                res.send("User not found");
            else
                res.status(200).send(user);
        }
        catch (e) {
            res.status(500).send(e);
        }
    })
		// requete pour supprimer une utilisateur 
        .delete((req, res, next) => res.send(`delete user ${req.params.user_id}`));

		// // requete pour modifier les informations de l'utilisateur
		router.post("/user/:user_id(\\d+)",(req,res)=>{
			try{
				const { firstname,lastname,email,username, password,bio} = req.body;
				if(!firstname || !lastname || !email || !username || !password){
					res.status(400).send("Missing Fields")
				}else{
					users.update(parseInt(req.params.user_id),firstname,lastname,email,username,password,bio)
					.then((nbreplaced)=>{
						if(nbreplaced !== 0){
							res.status(200).send({ifUpdated : nbreplaced})	
						}else{
							res.status(401).send("User not found")
						}
					})
				}
			}
			catch{

			}
		})


	// requete pour insertion d'un utilisateur ( register )
    router.put("/user", (req, res) => {
        const { login, password, lastname, firstname,email ,gender,dateNaissance} = req.body;
        if (!login || !password || !lastname || !firstname || !email || !gender) {
            res.status(400).send("Missing fields");
        } else {
            users.create(login, password, lastname, firstname,email,gender,dateNaissance)
                .then((user_id) => res.status(201).send({id: user_id}))
                .catch((err) => res.status(500).send(err));
        }
    });





	// --=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-==-=-=-==-=-=-=-=-==-=-=-=-=-
	// --=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=  MESSAGES ==-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-==-=-=-=-=
	// --=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-==-=-=-==-=-=-=-=-==-=-=-=-=-
	

	router.put("/messages" , (req,res)=>{
		const {id_author,value_message} = req.body
		if(!id_author || !value_message){
			res.status(400).send("Missing Fields")
		}else{
			messages.insertMessage(id_author,value_message)
			.then((id_message)=>res.status(200).send({id_message:id_message}))
				.catch((err)=>res.status(500).send(err))
			}
	})

	router.get("/messages" , (req,res)=>{
		try{
			// const listMessage = await messages.getAllMessages()
			messages.getAllMessages().then((listMessages)=>{
				if(!listMessages){
					res.status(400).send("No Message on Database")
				}else
				{
				res.status(200).send({list_Messages:listMessages})
				}
			})
		}
		catch(err){

		}
	})

	// Pour recuerer un message donnée 
	router.get("/messages/:id_message(\\d+)",(req,res)=>{
		messages.getMessage(parseInt(req.params.id_message)).then((message)=>{
			res.status(200).send({message:message})
		})
	})

	// Pour recuperer tous les messages d'un certain utilisateur 
	router.get("/user/messages/:id_user(\\d+)",(req,res)=>{
		messages.getAllMessagesForUser(parseInt(req.params.id_user)).then((messages)=>{
			res.status(200).send(messages)
		})
	})


	router.post("/messages/likes",(req,res)=>{
		const {id_message,id_liker} = req.body
		if(!id_message ||  !id_liker){
			res.status(400).send("Missing Fields")
		}else{
			messages.insertLikeMessage(id_message,id_liker)
			.then((nb_likes)=>res.status(200).send({nb_likes:nb_likes}))
			.catch((err)=>res.status(500).send(err))
			}
	})


	router.delete("/user/messages/:id_message(\\d+)",(req,res)=>{
		messages.deleteMessage(parseInt(req.params.id_message)).then((ifDeleted)=>{
			if(ifDeleted == 0){
				res.status(400).send("Problem when you try de delete the message")	
			}
			else{
				res.status(200).send("Message deleted")
			}
		})
		.catch((err)=>{
			res.status(500).send(err)
		})
	})

	router.post("/messages/:id_message(\\d+)/comments",(req,res)=>{
		const {id_commenter,value_comment} = req.body
		messages.insertCommentMessage(parseInt(req.params.id_message),id_commenter,value_comment).then((nbComments)=>{
			res.status(200).send({nb_comments:nbComments})
		})
		.catch((err)=>{
			res.status(400).send("Error")
		})
	})

	router.get("/messages/:id_message(\\d+)/comments",(req,res)=>{
		messages.getAllComments(parseInt(req.params.id_message)).then((listComments)=>{
			res.status(200).send({listComments:listComments})
		})
	})


	router.put("/messages/:id_message(\\d+)/retweets",(req,res)=>{
		const {id_user} = req.body
		messages.retweetMessage(parseInt(req.params.id_message),id_user).then((bool)=>{
				if(bool === 0){
					res.status(401).send({message:bool})
				}else{
					if(bool == 1){
						res.status(400).send({message:bool})
					}else{
						res.status(200).send({message:bool})
					}
				}
			
		})
		.catch((err)=>{
			res.status(500).send("Error")
		})
	})


	router.get("/messages/search/:keyword",(req,res)=>{
		messages.searchMessage(req.params.keyword).then((messages)=>{
			res.status(200).send({messages:messages})
		})
		.catch(()=>{
			res.status(500).send("Error")
		})
	})


	router.put("/user/:id_user(\\d+)/followings_followers/:id_ami(\\d+)",(req,res)=>{
		users.insertUserFollow(parseInt(req.params.id_user),parseInt(req.params.id_ami)).then((bool)=>{
			res.status(200).send({isDone:bool})
		})
		.catch(()=>{
			res.status(500).send("Error")
		})
	})

	router.get("/user/:id_user(\\d+)/followers/messages",(req,res)=>{
		users.getFollowersMessages(parseInt(req.params.id_user)).then((messages)=>{
			res.status.send({messages:messages})
		})
		.catch((err)=>{
			res.status(500).send("Error")
		})
	})

	router.get("/user/:id_user(\\d+)/followings_followers",(req,res)=>{
		users.getFollowersFollowings(parseInt(req.params.id_user)).then((lists)=>{
			res.status(200).send({listFollowers:lists[0],listFollowings:lists[1]})
		})
		.catch((err)=>{
			res.status(500).send("Error")
		})
	})

	router.get("/user/:id_user(\\d)/suggestions",(req,res)=>{
		users.getSuggestions(parseInt(req.params.id_user)).then((listSuggestions)=>{
			res.status(200).send({listSuggestions:listSuggestions})
		})
		.catch(()=>{
			res.status(500).send("Error")
		})
	})


    return router;
}
exports.default = init;

