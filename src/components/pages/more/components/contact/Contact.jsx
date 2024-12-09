import Heading from "../../../../common/heading/Heading";

import styles from './contact.module.scss';

const Contact = () => {
    return (
        <section className={styles.contact}>
            <Heading level={3}> Contact me</Heading>
            <p>If you have any questions, suggestions, or just want to chat, feel free to reach out to me:</p>
            
            <ul>
                <li>Email: <a className={styles.link} href="mailto:roman.warsaw@gmail.com">roman.warsaw@gmail.com</a></li>
                <li>GitHub: <a className={styles.link} href="https://github.com/individualita" target="_blank" rel="noopener noreferrer">My GitHub</a></li>
            </ul>
            
            <p>I appreciate any feedback or ideas you might have. Let's stay in touch!</p>
        </section>
    );
};

export default Contact;
