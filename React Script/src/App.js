
import './App.css';
import Header from './components/header';
import profilepic from './images/profilepic1.png';
import logo from './images/logoHeader.png';
import MainPage from './components/mainpage';


function App() {
  return (
    <div className="App">
      
      <MainPage username ="Malik DF" profilepic={profilepic} logo={logo} />
    </div>
  );
}

export default App;
