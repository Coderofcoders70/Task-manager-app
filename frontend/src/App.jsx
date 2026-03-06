import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [view, setView] = useState('login'); 

  if (!token) {
    return view === 'login' ? (
      <Login setToken={setToken} toggleView={() => setView('register')} />
    ) : (
      <Register setToken={setToken} toggleView={() => setView('login')} />
    );
  }

  return <Dashboard setToken={setToken} />;
}

export default App;