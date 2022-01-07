import './App.css';
import EnterMobile from './components/EnterMobile/EnterMobile';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import UserDetails from './components/Form/UserDetails';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/home" element={<EnterMobile />} />
        </Routes>
        <Routes>
          <Route exact path="/user-info" element={<UserDetails />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
