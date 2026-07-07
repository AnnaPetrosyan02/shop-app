import Order from './Order'
import PromoCode from './PromoCode'
import './Cart.css'
import './Container.css'

export default function Cart() {
  return (
    <>
      <div className='container'>
        <div className="cart">
            <Order/>
            <PromoCode/>
        </div>
      </div>
    </>
  );
}