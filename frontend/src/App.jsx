import React from 'react'
import Layout from "./Layouts/Layout"
import Register from "./pages/register.jsx"
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom"
import SignIn from './pages/SignIn.jsx'
import { useAppContext } from './contexts/AppContext.jsx'
import AddHotel from './pages/AddHotel.jsx'
import MyHotels from './pages/MyHotels.jsx'
import EditHotel from './pages/EditHotel.jsx'
import Search from './pages/Search.jsx'
import Detail from './pages/Details.jsx'
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
          <Search />
        </Layout>}></Route>
        <Route path = "/register" element={<Layout>
          <Register />
        </Layout>} />
        <Route path = "/sign-in" element={<Layout>
          <SignIn />
        </Layout>} />
        <Route path = "/search" element={<Layout>
          <Search/>
        </Layout>} />

        <Route path = "/detail/:hotelId" element={<Layout>
          <Detail />
        </Layout>} />

        {isLoggedIn && (
          <>
            <Route path='/add-hotel' element = {
              <Layout>
                <AddHotel />
              </Layout>
            }/>
             <Route path='/my-hotels' element = {
              <Layout>
                <MyHotels />
              </Layout>
            }/>
            <Route path='/edit-hotel/:hotelId' element = {
              <Layout>
                <EditHotel />
              </Layout>
            }/>
          </>
        )}
      </Routes>
    </Router>
    
  )
}

export default App
