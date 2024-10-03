import { Link } from 'react-router-dom';

import Button from '../../common/buttons/Button';
import welcomeImg from '../../../assets/images/welcome/girlwithphone.png'
import Heading from '../../common/headings/Heading';

import styles from './welcome.module.scss';


const Welcome = () => {
    
    return (
        
        <section className={styles.welcome} aria-labelledby="welcome-title">
            <img className={styles.img} src={welcomeImg} role="img" alt="A girl sits on a coin and looks at her phone." />
            <Heading level={1} id="welcome-title">Take Control of Your Finances </Heading>
            <Button
                className="button button-primary button-large"
                aria-label="Click to start navigating to the Dashboard"
                >
                    <Link to="/home" aria-label="Go to home">Click to start </Link>
            </Button>
            
            
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