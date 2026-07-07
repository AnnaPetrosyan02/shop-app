import Sidebar from './Sidebar'
import Products from './Products'
import Subscribe from './Subscribe'
import './Showcase.css'

export default function Showcase () {
  return (
    <>
      <div className='container'>
        <div className="shop">
            <Sidebar/>
            <Products/>
        </div>
      </div>
      <Subscribe/>
    </>
  );
}