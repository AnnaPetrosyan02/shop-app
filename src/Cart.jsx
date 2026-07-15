import { useState } from "react";
import Order from "./components/Order/Order";
import styles from "./styles/Cart.module.css";
import PromoCode from "./components/PromoCode/PromoCode";

export default function Cart() {
	const [ isPromoApplied, setIsPromoApplied ] = useState(false);
	return (
		<>
			<div className={styles.container}>
				<div className={styles.cart}>
					<Order 
						isPromoApplied={isPromoApplied}
					/>
					<PromoCode 
						isPromoApplied={isPromoApplied}
						setIsPromoApplied={setIsPromoApplied}
					/>
				</div>
			</div>
		</>
	);
}
