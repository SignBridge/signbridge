import logo from './logo.svg';
import './App.css';
// npm install react-router-dom 설치
import { Link, Route, BrowserRouter as Router } from "react-router-dom";import { useRef, useEffect } from "react";
import TransPossible from './pages/TransPossiblePage/TransPossiblePage'
import signIn from './pages/TransPossiblePage/auth';

function App() {
  const [user, setUser] = useState(null);
  const authenticated = user != null;

  const login = ({ id, pass }) => setUser(signIn({ id, pass }));
  const logout = () => setUser(null);

  return (
    <div className="App">
      <Router>
        <Route path="/" component={LoginForm}></Route>
        <Route path="/trans" component={TransPossible}></Route>
      </Router>
    </div>
  );
}

export default App;
