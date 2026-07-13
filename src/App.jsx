import { CartProvider } from "./context/CartContext";
import { ShopProvider } from "./context/ShopContext";
import { useState } from "react";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ContentBlock from "./components/ContentBlock/ContentBlock.jsx";
import Showcase from "./components/Showcase/Showcase.jsx";
import Cart from "./Cart";

import { PAGES } from "./constants/index.js";

function App() {
	const [currentPage, setCurrentPage] = useState(PAGES.SHOP);

	return (
		<CartProvider>
			<ShopProvider>
				<Header
					onCartClick={() => setCurrentPage(PAGES.CART)}
					onShopClick={() => setCurrentPage(PAGES.SHOP)}
				/>

				<ContentBlock
					currentPage={currentPage}
					onPageClick={(page) => setCurrentPage(page)}
				/>

				{currentPage === PAGES.SHOP ? <Showcase /> : <Cart />}

				<Footer />
			</ShopProvider>
		</CartProvider>
	);
}

export default App;
