// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
} from "react-router-dom";
import './App.css'
import StudentForm from "./component/StudentForm";
import QrScanner from "./component/QrScanner";
import StudentDetail from "./component/StudentDetail";
import Navbar from "./component/navbar/Navbar";
import SignIn from "./component/home/Home";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route exact path="/student" element={<StudentForm />} />
        <Route path="/scan" element={<QrScanner />} />

        <Route path="/student/:certificateId" element={<StudentDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
