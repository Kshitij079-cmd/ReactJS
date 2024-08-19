import logo from './logo.svg';
import './App.css';
import Navbar from './Component/Navbar';
import Shop from './Component/Shop';
// import { ChartComponent } from '@syncfusion/ej2-react-charts';



function App() {
  return (
    <div className="App">
      <Navbar/>
      Hello headers
      <Shop/>

      <span>
      npm axios required for fetching API from external website <br />
      then axios.get() to fetch api from any extrenal website
      </span>
    </div>
  );
}

export default App;
