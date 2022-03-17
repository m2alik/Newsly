
import './App.css';
import MainPage from './components/MainPage/mainpage';
import { Component } from "react";



class App extends Component {


  constructor(props){
    super(props)
    this.state= {
      page : null
    }
    this.setPage = this.setPage.bind(this)
  }
  componentDidMount(){
    this.setPage(<MainPage setPage = {this.setPage}/>)
  }

  setPage = (nouvellePage) =>{
    this.setState({page:nouvellePage})
  }

  render (){
  return (
    <div className="App">
        {this.state.page}
    </div>
  );
}
}

export default App;
