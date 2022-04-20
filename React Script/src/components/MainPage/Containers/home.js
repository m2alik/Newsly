import React, { Component, useState, useEffect } from "react";
import pic from "../../../images/amine1.JPG";
import Message from "./message";
import "../../../styles/home.css";
import nature from "../../../images/nature.jpg";
import EmojiPicker from "emoji-picker-react";
import nature1 from "../../../images/nature1.jpg";
import axios from "axios";
import ReactDOM from "react-dom";
import ListMessages from "./listMessages";
import { ImagePicker } from "react-file-picker";


const listComments = [
  {
    profilepic: pic,
    username: "Amine YK",
    datepubli: "13/08/2022",
    value: "Belle tof hbb !",
  },
  {
    profilepic: pic,
    username: "Amine YK",
    datepubli: "13/08/2022",
    value: "Belle tof kho !",
  },
  {
    profilepic: pic,
    username: "Amine YK",
    datepubli: "13/08/2022",
    value: "Belle tof khey !",
  },
];

const user = { firstname: "nvj", lastname: "malik", username: "Amine YK" };
const listM = [
  {
    author: "Vladimir Putin",
    profilepic: pic,
    value: "C'est la guerre en ukraine",
    datePubli: "25/02/2022",
    timePublic: "5:02am",
    nblikes: "199",
    nbcomments: "12",
    id: "1",
  },
  {
    author: "Maes",
    profilepic: pic,
    value:
      "Cette famille parisienne va parcourir 2000 kilomètres pour livrer des dons aux réfugiés ukrainiens, dans une ville polonaise frontalière du pays en guerre.Ils apporteront avec eux l’équivalent de 250 colis recueillis auprès de 400 donateurs",
    datePubli: "17/09/2021",
    timePublic: "3:18pm",
    nblikes: "199",
    nbcomments: "12",
    image: nature,
    id: "2",
  },
  {
    author: "Soolking ",
    profilepic: pic,
    value: "Je t'aime mon Algeria",
    datePubli: "25/02/2022",
    timePublic: "5:52pm",
    nblikes: "199",
    nbcomments: "12",
    image: nature1,
    id: "3",
  },
  {
    author: "Maes",
    profilepic: pic,
    value:
      "Cette famille parisienne va parcourir 2000 kilomètres pour livrer des dons aux réfugiés ukrainiens, dans une ville polonaise frontalière du pays en guerre.Ils apporteront avec eux l’équivalent de 250 colis recueillis auprès de 400 donateurs",
    datePubli: "17/09/2021",
    timePublic: "3:18pm",
    nblikes: "199",
    nbcomments: "12",
    id: "4",
  },
  {
    author: "Maes",
    profilepic: pic,
    value:
      "Cette famille parisienne va parcourir 2000 kilomètres pour livrer des dons aux réfugiés ukrainiens, dans une ville polonaise frontalière du pays en guerre.Ils apporteront avec eux l’équivalent de 250 colis recueillis auprès de 400 donateurs",
    datePubli: "17/09/2021",
    timePublic: "3:18pm",
    nblikes: "199",
    nbcomments: "12",
    id: "5",
  },
  {
    author: "Maes",
    profilepic: pic,
    value:
      "Cette famille parisienne va parcourir 2000 kilomètres pour livrer des dons aux réfugiés ukrainiens, dans une ville polonaise frontalière du pays en guerre.Ils apporteront avec eux l’équivalent de 250 colis recueillis auprès de 400 donateurs",
    datePubli: "17/09/2021",
    timePublic: "3:18pm",
    nblikes: "199",
    nbcomments: "12",
    id: "6",
  },
];
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnState: "",
      currentToken: "",
      showemojis: false,
      user_infos: [],
      value_message: "",
      message_return: "",
      all_messages: [],
      authors: [],
      cpt: 1,
    };

    this.insertMessage = this.insertMessage.bind(this);
  }

  api = axios.create({
    baseURL: "http://localhost:4000",
    timeout: 1000,
  });

  // renvoie toutes les infos de l'utilisateur connecté
  getUserConnected = () => {
    var url = "/api/user/" +sessionStorage.getItem("id_user");
    this.api.get(url).then((response) => {
      this.setState({
        user_infos: response.data,
        currentToken: sessionStorage.getItem("token")
      })
    })
	.catch((err)=>{
	  this.setState({currentToken:""})
  })};

  // insert un message dans la base de données via une requete PUT
  insertMessage = (message) => {
    var url = "/api/messages";
    return new Promise((resolve, reject) => {
      this.api
        .put(url, {
          id_author: message.id_author,
          value_message: message.value_message,
        })
        .then((response) => {
          this.getAllMessages();
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  // renvoie tous les messages de la base de données
  getAllMessages = () => {
    var url = "/api/messages";
    this.api
      .get(url)
      .then((response) => {
        this.setState({ all_messages: response.data.list_Messages });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount = () => {
	if(sessionStorage.getItem("id_user") !== null){
		this.getUserConnected()   
	}
	if(this.state.cpt === 1){
		this.getAllMessages();
	}
	// this.setState({cpt:this.state.cpt++})
  };

  render() {
    return (
      <>
        {this.state.currentToken && (
          <Statut insertMessage={this.insertMessage} user_infos={this.state.user_infos}/>
        )}

        <ListMessages listM={this.state.all_messages} id_user={sessionStorage.getItem("id_user")} setContainer={this.props.setContainer} getAllMessages={this.getAllMessages}/>
      </>
    );
  }
}
export default Home;




// Le Composant STATUS d'une maniere fonctionnel
class Statut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showemojis: false,
      value_message: "",
      message_return: "",
      user_infos: this.props.user_infos,
      btnState: "",
    };
  }

  handleBtnState(event) {
    this.setState({ btnState: event.target.value });
  }

  maj_returnMessage = () => {
    this.setState({ message_return: "" });
  };



  render() {
	
    return (
      <div>
        <div className="home-status">
          {this.state.message_return ? (
            <p className="message_return">{this.state.message_return}</p>
          ) : (
            ""
          )}
          <div className="home-my-infos">
            <img src={pic} />
            <p>{this.state.user_infos.login}</p>
          </div>
          <textarea
            className="home-textarea"
            rows="4"
            placeholder=" what's the news"
            value={this.state.value_message}
            onKeyDown={(event) => this.handleBtnState(event)}
            onChange={(e) => this.setState({ value_message: e.target.value })}
          ></textarea>
          <div className="home-status-button-emojis">
            <i
              className="fa fa-smile-o fa-2x"
              aria-hidden="true"
              onClick={() => this.setState({ showemojis: true })}
            ></i>
            {this.state.showemojis && (
              <EmojiPicker onEmojiClick={() => console.log("kljdsq")} />
            )}
            <button
              disabled={this.state.btnState === ""}
              className="home-btn-publish"
              onClick={() =>
                this.props
                  .insertMessage({
                    id_author: this.state.user_infos.id,
                    value_message: this.state.value_message,
                  })
                  .then(() => {
                    this.setState({
                      value_message: "",
                      message_return: "Done",
                    });
                    // met a jour le "message_return" a "" au bout de 3s
                    setTimeout(() => {
                      this.maj_returnMessage();
                    }, 3000);
                  })
                  .catch((err) => {
                    this.setState({ message_return: "Error" });
                    // met a jour le "message_return" a "" au bout de 3s
                    setTimeout(() => {
                      this.maj_returnMessage();
                    }, 3000);
                  })
              }
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    );
  }
}
