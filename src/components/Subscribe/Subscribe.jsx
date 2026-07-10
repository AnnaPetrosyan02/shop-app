import { designCenter } from '../../assets/images';

export default function Subscribe() {
  return (
    <div className="subscribe-wrapper">
        <div className="container">
            <div className="subscribe-content">
                <div className="design">
                    <img src={designCenter} alt="design"/>
                </div>
                <div className="subscribe-title">Newsletter</div>
                <div className="subscribe-text">Be the first to hear about deals, offers and upcoming collections.</div>
                <div className="subscribe-input">
                    <input type="text" name="subscribe" className="input" placeholder="Enter your email"/>
                    <div className="button-wrapper">
                        <button className="button">Subscribe</button>
                        <div className="vertical-line"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}