import {
	logo,
	send,
	visa,
	mastercard,
	paypal,
	payoneer,
} from "../../assets/icons";
import { designLeft, designRight } from "../../assets/images";
import styles from "../../styles/footer.module.css";

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={styles.designs}>
				<div className={`${styles.design} ${styles.left}`}>
					<img src={designLeft} alt="design" />
				</div>
				<div className={`${styles.design} ${styles.right}`}>
					<img src={designRight} alt="design" />
				</div>
			</div>
			<div className={styles.container}>
				<div className={styles.footerInfo}>
					<div className={`${styles.column} ${styles.column1}`}>
						<div className={styles.logo}>
							<img src={logo} alt="logo" />
						</div>
						<div className={styles.aboutBrand}>
							Cillum eu id enim aliquip aute ullamco anim. Culpa
							deserunt nostrud excepteur voluptate.
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
					<div className={`${styles.column} ${styles.column2}`}>
						<div className={styles.title}>About</div>
						<div className={styles.customList}>
							<ul>
								<li className={styles.item}>
									<a href="">About us</a>
								</li>
								<li className={styles.item}>
									<a href="">Collections</a>
								</li>
								<li className={styles.item}>
									<a href="">Shop</a>
								</li>
								<li className={styles.item}>
									<a href="">Blog</a>
								</li>
								<li className={styles.item}>
									<a href="">Contact us</a>
								</li>
							</ul>
						</div>
					</div>
					<div className={`${styles.column} ${styles.column3}`}>
						<div className={styles.title}>Useful links</div>
						<div className={styles.customList}>
							<ul>
								<li className={styles.item}>
									<a href="">Privacy Policy</a>
								</li>
								<li className={styles.item}>
									<a href="">Terms of use</a>
								</li>
								<li className={styles.item}>
									<a href="">Support</a>
								</li>
								<li className={styles.item}>
									<a href="">Shipping details</a>
								</li>
								<li className={styles.item}>
									<a href="">FAQs</a>
								</li>
							</ul>
						</div>
					</div>
					<div className={`${styles.column} ${styles.column4}`}>
						<div className={styles.title}>Newsletter</div>
						<div className={styles.newsletterText}>
							Subscribe to be the first to hear about deals,
							offers and upcoming collections.
						</div>
						<div className={styles.newsletterForm}>
							<form action="">
								<label>
									<input
										type="email"
										placeholder="Enter your email"
										className="input"
									/>
									<img
										src={send}
										alt="send"
										className={styles.sendIcon}
									/>
								</label>
							</form>
						</div>
					</div>
				</div>
				<div className={styles.copyright}>
					<div>© All right reserved. Fashionee 2020</div>
					<div className={styles.paymentMethodsContainer}>
						<div>Payment methods:</div>
						<div className={styles.paymentMethods}>
							<div className={styles.paymentMethod}>
								<img src={visa} alt="visa" />
							</div>
							<div className={styles.paymentMethod}>
								<img src={mastercard} alt="mastercard" />
							</div>
							<div className={styles.paymentMethod}>
								<img src={paypal} alt="paypal" />
							</div>
							<div className={styles.paymentMethod}>
								<img src={payoneer} alt="payoneer" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
