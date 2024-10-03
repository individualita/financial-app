import dogImg from './dog.png';
import styles from './notfoundpage.module.scss';

const Notfoundpage = () => {
    return (
        <section className={styles.error}>
            <div className={styles.type}>404</div>
            <p className={styles.message}>A Dog Ate this Page</p>
            <img className={styles.img}  src={dogImg} alt="" />
        </section>
    )
}

export default Notfoundpage;