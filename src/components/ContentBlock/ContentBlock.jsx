import { designTop } from "../../assets/images";

export default function ContentBlock({ currentPage, onPageClick }) {
	return (
		<div className="header-presentation">
			<div className="design">
				<img src={designTop} alt="design" />
			</div>
			<div className="header-content">
				<div className="content-text">
					<div className="header-title">
						{currentPage === "shop" ? "Shop" : "Cart"}
					</div>
					<div className="pages">
						<div className="line"></div>
						<div className="page">Home</div>
						<div
							className={`page ${currentPage === "shop" ? "active" : ""}`}
							onClick={() => onPageClick("shop")}
						>
							Shop
						</div>
						<div
							className={`page ${currentPage === "cart" ? "active" : ""}`}
							onClick={() => onPageClick("cart")}
						>
							Cart
						</div>
					</div>
				</div>
				<div className="design-line"></div>
			</div>
			<div className="header-image"></div>
		</div>
	);
}
