import logo from './logo.svg';
import './App.css';
import Register from './Componets/Register/Register';
import Login from './Componets/Login/Login';
import Nav from './Componets/Nav/Nav';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/HomePage/Home';
import EmployeeList from './Pages/EmployeeList/EmployeeList';
import SaveEmployee from './Pages/SaveEmployee/SaveEmployee';
import ProtectedRoutes from './Componets/ProtectedRoutes/ProtectedRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <Nav/>
      <Routes>

      <Route path='/home' element={<Home/>}/>
      <Route path='/protected' element={<ProtectedRoutes/>}>

      <Route path ='employeelist' element={<EmployeeList/>}/>

      </Route>
      <Route path ='/register' element={<Register/>}/>
      <Route path ='/' element={<Login/>}/>
      <Route path ='/login' element={<Login/>}/>
      <Route path='/saveemployee' element={<SaveEmployee/>}/>
      
      
      </Routes>
    </div>
  );
}

export default App;
