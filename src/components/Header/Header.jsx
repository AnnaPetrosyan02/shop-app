import { useCart } from "../../context/CartContext";
import {
    logo,
    arrow,
    arrowPink,
    search,
    profile,
    favoritesIcon,
    cart,
} from "../../assets/icons";
import styles from "../../styles/header.module.css";

export default function Header({ onCartClick, onShopClick }) {
    const { favorites, getCartCount } = useCart();

    return (
        <header className={styles.header}>
            <div className={styles.leftSide}>
                <div className={styles.logoContainer}>
                    <div className={styles.burgerMenu}>
                        <input
                            type="checkbox"
                            id="burger-checkbox"
                            className={styles.burgerCheckbox}
                        />
                        <nav role="navigation">
                            <label
                                className={styles.burger}
                                htmlFor="burger-checkbox"
                            ></label>
                            <ul className={styles.mainMenu}>
                                <li>
                                    <a href="#">Home</a>
                                </li>
                                <li>
                                    <a href="#">Pages</a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onShopClick();
                                        }}
                                    >
                                        Shop
                                    </a>
                                </li>
                                <li>
                                    <a href="#">Blog</a>
                                </li>
                                <li>
                                    <a href="#">Contact</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div
                        className={styles.logo}
                        onClick={onShopClick}
                        style={{ cursor: "pointer" }}
                    >
                        <img src={logo} alt="logo" />
                    </div>
                </div>
                <div className={styles.menu}>
                    <div className={styles.menuItem}>
                        <span>Home</span>
                    </div>
                    <div className={styles.menuItem}>
                        <span>Pages</span>
                        <img src={arrow} alt="" className={styles.arrowDefault} />
                        <img src={arrowPink} alt="" className={styles.arrowHover} />
                    </div>
                    <div
                        className={styles.menuItem}
                        onClick={onShopClick}
                        style={{ cursor: "pointer" }}
                    >
                        <span>Shop</span>
                        <img src={arrow} alt="" className={styles.arrowDefault} />
                        <img src={arrowPink} alt="" className={styles.arrowHover} />
                    </div>
                    <div className={styles.menuItem}>
                        <span>Blog</span>
                    </div>
                    <div className={styles.menuItem}>
                        <span>Contact</span>
                    </div>
                </div>
            </div>
            <div className={styles.rightSide}>
                <div className={styles.headerIcon}>
                    <img src={search} alt="search" />
                </div>
                <div className={styles.headerIcon}>
                    <img src={profile} alt="profile" />
                </div>
                <div className={styles.headerIcon}>
                    <img src={favoritesIcon} alt="favorites" />
                    <div className={styles.counter}>{favorites.length}</div>
                </div>
                <div className={styles.headerIcon} onClick={onCartClick}>
                    <img src={cart} alt="cart" />
                    <div className={`${styles.counter} js-basket-counter`} data-testid="cart-count">
                        {getCartCount()}
                    </div>
                </div>
            </div>
        </header>
    );
}