import { Link } from 'react-router-dom';

import styles from './moreMenu.module.scss';

const MoreMenu = () => {
    return (
        <nav>
            <ul className={styles.list}>
                <li className={styles.item}><Link to="about" className={styles.link}>About the Project</Link></li>
                <li className={styles.item}><Link to="contact" className={styles.link}>Contact</Link></li>
            </ul>
        </nav>
    )
}

export default MoreMenu;