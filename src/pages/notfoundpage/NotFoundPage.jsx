import { Link } from 'react-router-dom';

import dogImg from './dog.png';

import styles from './notFoundPage.module.scss';

const NotFoundPage = () => {
    return (
        <section className={styles.error}>
            <div className={styles.type}>404</div>
            <p className={styles.message}>A Dog Ate this Page</p>
            <img className={styles.img}  src={dogImg} alt='Brown dog with a piece of paper in its mouth.' />
            <Link to='/home' style={{padding: '8px', borderBottom: '1px solid gray'}}>Back to main page</Link>
        </section>
    )
}

export default NotFoundPage;