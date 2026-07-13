import Sidebar from "../Sidebar/Sidebar";
import Products from "../Products/Products";
import Subscribe from "../Subscribe/Subscribe";

export default function Showcase() {
	return (
		<>
			<div className="container">
				<div className="shop">
					<Sidebar />
					<Products />
				</div>
			</div>
			<Subscribe />
		</>
	);
}
