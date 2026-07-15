import Sidebar from "../Sidebar/Sidebar";
import Products from "../Products/Products";
import Subscribe from "../Subscribe/Subscribe";
import styles from "../../styles/showcase.module.css";


export default function Showcase() {
	return (
		<>
			<div className={styles.container}>
				<div className={styles.shop}>
					<Sidebar />
					<Products />
				</div>
			</div>
			<Subscribe />
		</>
	);
}
