import { useState } from "react";
import Order from "./components/Order/Order";
import PromoCode from "./components/PromoCode/PromoCode";

export default function Cart() {
	const [ isPromoApplied, setIsPromoApplied ] = useState(false);
	return (
		<>
			<div className="container">
				<div className="cart">
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
