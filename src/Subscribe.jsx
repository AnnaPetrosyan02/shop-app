import './Subscribe.css'

export default function Subscribe() {
  return (
    <div className="subscribe-wrapper">
        <div className="container">
            <div className="subscribe-content">
                <div className="design">
                    <img src="./icons/design-center.svg" alt="design"/>
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