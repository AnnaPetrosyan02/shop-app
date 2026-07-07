import { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import ContentBlock from './ContentBlock'
import Showcase from './Showcase'
import Cart from './Cart'
import { AppProvider } from './context/AppContext'

function App() {
  const [currentPage, setCurrentPage] = useState("shop")

  return (
    <AppProvider>
      <Header 
        onCartClick={() => setCurrentPage("cart")}
        onShopClick={() => setCurrentPage("shop")}
      />
      
      <ContentBlock
        currentPage={currentPage}
        onPageClick = { (page) => setCurrentPage(page) }
      />

      {currentPage === "shop" ? <Showcase/> : <Cart/>}

      <Footer/>
    </AppProvider>
  )
}

export default App