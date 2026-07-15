import { useState } from "react";
import { buttonArrow } from "../../assets/icons";
import styles from "../../styles/promoCode.module.css";

export default function PromoCode({ isPromoApplied, setIsPromoApplied }) {
	const [promoInput, setPromoInput] = useState("");

	const handleApplyPromo = () => {
		if (promoInput.trim().toLowerCase() === "ilovereact") {
			setIsPromoApplied(true);
			alert("Promo code applied successfully! 10% discount added. 🎉");
		} else {
			alert("Invalid promo code! Please try again.");
			setIsPromoApplied(false);
		}
	};

	return (
		<div className={styles.cart}>
			<div className={styles.promoCodeWrapper}>
				<div className={styles.info}>
					<div className={styles.title}>You Have A Promo Code?</div>
					<div className={styles.description}>
						To receive up-to-date promotional codes, subscribe to us
						on social networks.
					</div>
				</div>
				<div className={styles.promoCode}>
					<input
						type="text"
						name="promo-code"
						className="input"
						placeholder={isPromoApplied ? "Promo code applied!" : "Enter promo code"}
						value={promoInput}
						onChange={(e) => setPromoInput(e.target.value)}
						disabled={isPromoApplied}
					/>
					<div className="button-wrapper">
						<button className="button" onClick={handleApplyPromo} disabled={isPromoApplied}>
							<img src={buttonArrow} alt="Arrow icon" />
						</button>
						<div className="vertical-line"></div>
					</div>
				</div>
				<div className={styles.findUs}>
					<div className={styles.findUsText}>Find us here:</div>
					<div className={styles.findUsLinks}>
						<div className={styles.findUsLink}>
							<a href="">FB</a>
						</div>
						<div className={styles.line}></div>
						<div className={styles.findUsLink}>
							<a href="">TW</a>
						</div>
						<div className={styles.line}></div>
						<div className={styles.findUsLink}>
							<a href="">INS</a>
						</div>
						<div className={styles.line}></div>
						<div className={styles.findUsLink}>
							<a href="">PT</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
