import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './pages/dashboard';
import SignUpPage from './pages/signup';
import SignInPage from './pages/signin';
import { AuthGuard } from './components/AuthGuard';

function App() {
  return (
    <Router>
      <Routes>
        <Route  path='/' element={<AuthGuard><Dashboard /></AuthGuard>} />
        <Route path='/register' element={<SignUpPage />} />
        <Route path='/login' element={<SignInPage />} />
      </Routes>
    </Router>
  );
}

export default App;
