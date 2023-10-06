import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/Login';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Signup from './components/Signup';
import AddWorkout from './components/AddWorkout';
import { useAuthContext } from './hooks/useAuthContext';

function App() {

  const { user } = useAuthContext();

  return (
    <Router>
    <div className="App">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path='/' element={user ? <Home />: <Navigate to='/login' />}/>
          <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />}/>
          <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />}/>
          <Route path='/addworkout' element={<AddWorkout />} />
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
