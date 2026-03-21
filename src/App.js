import logo from './logo.svg';
import './App.css';
import { Routes,Route } from 'react-router-dom';


//import routes here //
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path='/admin/login' element = { <Login/>} />
        <Route path='/admin/createaccount' element= { <CreateAccount/> } />
        <Route path='/admin/dashboard' element={<Dashboard/>} />
      </Routes>
    
      
    </div>
  );
}

export default App;
