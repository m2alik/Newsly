
import './App.css';
import Header from './components/header';
import profilepic from './images/amine1.JPG';
import logo from './images/logoHeader.png';
import MainPage from './components/mainpage';


function App() {
  return (
    <div className="App">
      {/* <Header username="Amine YK" profilepic={profilepic} logo={logo} /> */}
      <MainPage username ="Amine YK" profilepic={profilepic} logo={logo} />
    </div>
  );
}

export default App;
