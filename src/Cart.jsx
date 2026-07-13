import Order from "./components/Order/Order";
import PromoCode from "./components/PromoCode/PromoCode";

export default function Cart() {
  return (
    <>
      <div className="container">
        <div className="cart">
          <Order />
          <PromoCode />
        </div>
      </div>
    </>
  );
}
