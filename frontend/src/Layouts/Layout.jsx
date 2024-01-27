import React from 'react'
import Header from "../components/Header.jsx"
import Hero from "../components/Hero.jsx"
import Footer from "../components/Footer.jsx"

// interface Props {
//     children: React.ReactNode;
// }
const Layout = (Props)=> {
    return(
    <div className = "flex flex-col min-h-screen">
    <Header />
    <Hero />
    <div className = "container mx-auto py-10 flex-1">
        {Props.children}
    </div>
    <Footer />
    </div>
    )
}
export default Layout;