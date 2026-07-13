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

export default function Header({ onCartClick, onShopClick }) {
	const { favorites, getCartCount } = useCart();

	return (
		<header className="header">
			<div className="left-side">
				<div className="logo-container">
					<div className="burger-menu">
						<input
							type="checkbox"
							id="burger-checkbox"
							className="burger-checkbox"
						/>
						<nav role="navigation">
							<label
								className="burger"
								htmlFor="burger-checkbox"
							></label>
							<ul className="main-menu">
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
						className="logo"
						onClick={onShopClick}
						style={{ cursor: "pointer" }}
					>
						<img src={logo} alt="logo" />
					</div>
				</div>
				<div className="menu">
					<div className="menu-item">
						<span>Home</span>
					</div>
					<div className="menu-item">
						<span>Pages</span>
						<img src={arrow} alt="" className="arrow-default" />
						<img src={arrowPink} alt="" className="arrow-hover" />
					</div>
					<div
						className="menu-item"
						onClick={onShopClick}
						style={{ cursor: "pointer" }}
					>
						<span>Shop</span>
						<img src={arrow} alt="" className="arrow-default" />
						<img src={arrowPink} alt="" className="arrow-hover" />
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
					<img src={search} alt="search" />
				</div>
				<div className="header-icon">
					<img src={profile} alt="profile" />
				</div>
				<div className="header-icon">
					<img src={favoritesIcon} alt="favorites" />
					<div className="counter">{favorites.length}</div>
				</div>
				<div className="header-icon" onClick={onCartClick}>
					<img src={cart} alt="cart" />
					<div className="counter js-basket-counter">
						{getCartCount()}
					</div>
				</div>
			</div>
		</header>
	);
}
