import Footer from "./components/Footer"
import Header from "./components/Header"
import Hero from "./components/Hero"
import Products from "./components/Products"
import { CartProvider } from "./context/CartContext"

function App() {

  return (
    <>
      <CartProvider>
        <Header />
        <Hero />
        <Products />
        <Footer />
      </CartProvider>
    </>
  )
}

export default App
