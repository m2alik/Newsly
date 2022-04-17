const express = require("express")
const Messages = require("./entities/messages.js")

// --=-=-=-=-=-==-=-=-=-=-==-=-=-=-=-==-=-=-=-==-=-=-=-==-=-=-=-=-=-=-=
// creer et charger la base de données
var Datastore = require("nedb")
db = {}
db.messages = new Datastore({
	filename : __dirname+"/Messages_Users.db",
	autoload : true
})
db.messages.loadDatabase()
// --=-=-=-=-=-==-=-=-=-=-==-=-=-=-=-==-=-=-=-==-=-=-=-==-=-=-=-=-=-=-=

function init(db){
	const router = express.Router()
	router.use(express.json())
	const messages = new Messages.default(db);

	router.use((req,res,next)=>{
		console.log('API: method %s, path %s', req.method, req.path);
        console.log('Body', req.body);	
		console.log("-=-=-=-=-=-=-=-=-=- DATABASE --=-=-=-=-=-=-=-=-=-==-")
		messages.getAllMessages().then()
        next();
	})
	
	// --=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-==-=-=-==-=-=-=-=-==-=-=-=-=-
	// --=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=  MESSAGES ==-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-==-=-=-=-=
	// --=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-==-=-=-==-=-=-=-=-==-=-=-=-=-
	

	router.put("/apimessages/user/messages" , (req,res)=>{
		const {id_author,value_message} = req.body
		if(!id_author || !value_message){
			res.status(400).send("Missing Fields")
		}else{
			messages.insertMessage(id_author,value_message)
			.then((id_message)=>res.status(200).send({id_message:id_message}))
				.catch((err)=>res.status(500).send(err))
			}
	})
    return router;
}
exports.default = init;