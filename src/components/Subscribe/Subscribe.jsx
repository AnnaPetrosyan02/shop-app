import { designCenter } from "../../assets/images";
import styles from "../../styles/subscribe.module.css";


export default function Subscribe() {
    return (
        <div className={styles.subscribeWrapper}>
            <div className={styles.container}>
                <div className={styles.subscribeContent}>
                    <div className={styles.design}>
                        <img src={designCenter} alt="design" />
                    </div>
                    <div className={styles.subscribeTitle}>Newsletter</div>
                    <div className={styles.subscribeText}>
                        Be the first to hear about deals, offers and upcoming
                        collections.
                    </div>
                    <div className={styles.subscribeInput}>
                        <input
                            type="text"
                            name="subscribe"
                            className="input"
                            placeholder="Enter your email"
                        />
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