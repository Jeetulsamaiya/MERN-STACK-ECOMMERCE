import './App.css';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import{BrowserRouter as Router} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Header/>
      <Footer/>
    </Router> 
  );
}

export default App;
