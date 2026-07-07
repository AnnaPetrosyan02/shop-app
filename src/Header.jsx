import './Header.css'
import { useApp } from './context/AppContext'

export default function Header({ onCartClick, onShopClick}) {
  const { favorites, getCartCount } = useApp()

  return (
    <header className="header">
      <div className="left-side">
        <div className="logo-container">
          <div className="burger-menu">
            <input type="checkbox" id="burger-checkbox" className="burger-checkbox"/>
            <nav role="navigation">
              <label className="burger" htmlFor="burger-checkbox"></label>
              <ul className="main-menu">
                <li><a href="#">Home</a></li>
                <li><a href="#">Pages</a></li>
                <li><a href="#" onClick={(e) => {e.preventDefault(); onShopClick();}}>Shop</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </nav>
          </div>
          <div className="logo" onClick={onShopClick} style={{cursor: 'pointer'}}>
            <img src="./icons/logo.svg" alt="logo"/>
          </div>
        </div>
        <div className="menu">
          <div className="menu-item">
            <span>Home</span>
          </div>
          <div className="menu-item">
            <span>Pages</span>
            <img src="./icons/arrow.svg" alt="" className="arrow-default"/>
            <img src="./icons/arrow-pink.svg" alt="" className="arrow-hover"/>
          </div>
          <div className="menu-item" onClick={onShopClick} style={{cursor: 'pointer'}}>
            <span>Shop</span>
            <img src="./icons/arrow.svg" alt="" className="arrow-default"/>
            <img src="./icons/arrow-pink.svg" alt="" className="arrow-hover"/>
          </div>
          <div className="menu-item">
            <span>Blog</span>
          </div>
          <div className="menu-item">
            <span>Contact</span>
          </div>
        </div>
      </div>
      <div className="right-side">
        <div className="header-icon">
          <img src="./icons/search.svg" alt="search"/>
        </div>
        <div className="header-icon">
          <img src="./icons/profile.svg" alt="profile"/>
        </div>
        <div className="header-icon">
          <img src="./icons/favorites.svg" alt="favorites"/>
          <div className="counter">{favorites.length}</div>
        </div>
        <div className="header-icon" onClick={onCartClick}>
          <img src="./icons/cart.svg" alt="cart"/>
          <div className="counter js-basket-counter">{getCartCount()}</div>
        </div>
      </div>
    </header>
  );
}