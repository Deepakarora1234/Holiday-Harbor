import React from 'react'
import Layout from "./Layouts/Layout"
import Register from "./pages/register.jsx"
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom"
import SignIn from './pages/Signin.jsx'
function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {
        <Layout>
          <p>Home Page</p>
        </Layout>
        }></Route>
        <Route path = "/search" element = {<Layout>
          <p>Search Page</p>
        </Layout>}></Route>
        <Route path = "/register" element={<Layout>
          <Register />
        </Layout>} />
        <Route path = "/sign-in" element={<Layout>
          <SignIn />
        </Layout>} />
      </Routes>
    </Router>
    
  )
}

export default App
