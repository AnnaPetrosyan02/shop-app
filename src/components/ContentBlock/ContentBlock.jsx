import { designTop } from "../../assets/images";
import styles from "../../styles/contentBlock.module.css";


export default function ContentBlock({ currentPage, onPageClick }) {
	return (
		<div className={styles.headerPresentation}>
			<div className={styles.design}>
				<img src={designTop} alt="design" />
			</div>
			<div className={styles.headerContent}>
				<div className={styles.contentText}>
					<div className={styles.headerTitle}>
						{currentPage === "shop" ? "Shop" : "Cart"}
					</div>
					<div className={styles.pages}>
						<div className={styles.line}></div>
						<div className={styles.page}>Home</div>
						<div
                            className={`${styles.page} ${currentPage === "shop" ? styles.active : ""}`}
                            onClick={() => onPageClick("shop")}
                        >
                            Shop
                        </div>
                        <div
                            className={`${styles.page} ${currentPage === "cart" ? styles.active : ""}`}
                            onClick={() => onPageClick("cart")}
                        >
                            Cart
                        </div>
					</div>
				</div>
				<div className={styles.designLine}></div>
			</div>
			<div className={styles.headerImage}></div>
		</div>
	);
}
