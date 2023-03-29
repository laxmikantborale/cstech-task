import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import EployeeList from './components/EployeeList';
import Dashboard from './components/Dashboard';
import CreateEmp from './components/CreateEmp';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/employeelist' element={<EployeeList />} />
          <Route path='/createemp' element={<CreateEmp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
