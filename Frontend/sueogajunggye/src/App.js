// import './App.css';
import React, { useState } from "react";
import LoginPage from "./pages/LoginPage/LoginPage";
import FindIdPage from "./pages/IdPassPage/FindIdPage"
import FindPassPage from './pages/IdPassPage/FindPassPage'

function App() {

  const [currentForm, setCurrentForm] = useState('login');
  
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
  

  return (
    <div className="App">
      {
        currentForm === "login" ? <LoginPage onFormSwitch={toggleForm}/> : (currentForm === "id" ? <FindIdPage onFormSwitch={toggleForm} /> : <FindPassPage onFormSwitch={toggleForm} />)
      }
    </div>
  );
}

export default App;
