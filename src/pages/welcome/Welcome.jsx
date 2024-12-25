import { Link } from 'react-router-dom';

import welcomeImg from '../../assets/images/welcome/girlwithphone.png'
import Heading from '../../components/common/heading/Heading';

import { ROUTE_PATHS } from '../../routes/routePaths';

import styles from './welcome.module.scss';


const Welcome = () => {
    
    return (
        
        <section className={styles.welcome} aria-labelledby="welcome-title">
            <img className={styles.img} src={welcomeImg} role="img" alt="A girl sits on a coin and looks at her phone." />
            <Heading level={1} id="welcome-title">Take Control of Your Finances </Heading>

            <Link className={styles.startLink}  to={ROUTE_PATHS.HOME} aria-label="Go to home">Click to start </Link>
            
            
            <footer className={styles.footer} role="contentinfo">
                <span>Created and Designed by </span>
                <a 
                    className={styles.link} 
                    href="https://individualita.github.io/" 
                    rel="noopener noreferrer" 
                    aria-label="link to my personal github page" 
                    target="_blank"
                    > 
                    Roman K.
                </a>
            </footer>
        </section>
    )
}

export default Welcome;