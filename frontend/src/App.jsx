import React from 'react'
import Layout from "./Layouts/Layout"
import Register from "./pages/register.jsx"
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom"
import SignIn from './pages/SignIn.jsx'
import { useAppContext } from './contexts/AppContext.jsx'
import AddHotel from './pages/AddHotel.jsx'
function App() {
  const {isLoggedIn} = useAppContext();
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
        {isLoggedIn && (
          <>
            <Route path='/add-hotel' element = {
              <Layout>
                <AddHotel />
              </Layout>
            }/>
          </>
        )}
      </Routes>
    </Router>
    
  )
}

export default App
