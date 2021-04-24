import logo from './logo.svg';
import './App.css';
import Test from './Test';
import Chapter6_1 from './chapter6/6-1';
import bg from './monitor_bg.png';
function App() {
  return (
    <div className="App" style={{
        backgroundImage:`url(${bg})`,
        backgroundSize:'cover',
        width:'100%',
        height:'100%'
    }}>
        <Chapter6_1 />
    </div>
  );
}

export default App;
