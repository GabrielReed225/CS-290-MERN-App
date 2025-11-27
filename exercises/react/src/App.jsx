import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateExercisePage from './pages/CreateExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import { useState } from 'react';
import AppHeader from './components/Header';
import AppFooter from './components/Footer';
import Navigation from "./components/Navigation";


function App() {

  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="app">
        <AppHeader/>
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage setExerciseToEdit = {setExerciseToEdit}/>}></Route>
            <Route path="/create-exercise" element={ <CreateExercisePage />}></Route>
            <Route path="/edit-exercise" element={ <EditExercisePage exerciseToEdit ={exerciseToEdit} />}></Route>
          </Routes>
        </Router>
        <AppFooter/>
    </div>
  );
}

export default App;