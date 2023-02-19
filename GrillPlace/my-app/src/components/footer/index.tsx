import styles from './footer.module.css';
import { SlSocialInstagram, SlSocialTwitter, SlSocialFacebook, SlSocialPintarest, SlSocialLinkedin } from 'react-icons/sl';

const Footer: React.FC = () => {
    return (
        <div className={styles.wrap}>
            <div className={styles.socials}>Find us on:
                <ul>
                    <li><a href='https://www.instagram.com/'><SlSocialInstagram /></a></li>
                    <li><a href='https://www.twitter.com/'><SlSocialTwitter /></a></li>
                    <li><a href='https://www.facebook.com/'><SlSocialFacebook /></a></li>
                    <li><a href='https://www.pinterest.com/'><SlSocialPintarest /></a></li>
                    <li><a href='https://www.linkedin.com/'><SlSocialLinkedin /></a></li>
                </ul>
            </div>
            <div className={styles.rights}>
                <span>©2023 GrillPlace</span>
                <span>All rights reserved</span>
            </div>
        </div>
    )
}

export default Footer