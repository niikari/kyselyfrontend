import logo from './logo.svg';
import './App.css';
import Inquiry from './components/Inquiry';
import PrimarySearchAppBar from './components/Appbar';
import Footer from './components/Footer';
import Results from './components/Results'

function App() {
  return (
    <div className="App">
    <PrimarySearchAppBar />
    
    <Footer />
    </div>
  );
}

export default App;
