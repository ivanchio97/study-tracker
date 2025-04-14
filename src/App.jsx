import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {AuthProvider} from './context/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Registrer from './pages/Registrer'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import PublicRoute from './components/PublicRoute'
import NavBar from './components/NavBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Signature from './pages/Signature'

function App() {


  return (
    <AuthProvider>
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element = {<Home />} />
        <Route path='/registrer' element = {
          <PublicRoute>
            <Registrer />
          </PublicRoute>
        } />
        <Route path='/login' element = {
          <PublicRoute>
          <Login />
        </PublicRoute>
        } />
        <Route path='/dashboard' element = {
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path='/dashboard/:id' element ={
          <ProtectedRoute>
            <Signature />
          </ProtectedRoute>
        }
        
        />

      </Routes>
    </Router>
    </AuthProvider>
  )
}

export default App
