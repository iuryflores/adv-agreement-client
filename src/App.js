
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import User from './pages/User';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/users' element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
