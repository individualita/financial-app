import BackButton from '../../../../components/common/buttons/backButton/BackButton';
import Heading from '../../../../components/common/heading/Heading';

import styles from './about.module.scss';

const About = () => {

    return (
        <section className={styles.about}>
            <BackButton />

            <Heading level={3}> About the Project</Heading>
            <p>
                Financial app is designed to help users easily manage their finances. With it, you can:
            </p>
            <ul>
                <li>Track your income and expenses.</li>
                <li>Plan future financial goals.</li>
            </ul>
            <p>
                We strive to make financial management as simple and accessible as possible. All information is presented in a user-friendly interface, and the data is automatically processed for better planning.
            </p>

            <h4 className={styles.title}>Key Features:</h4>
            <ul>
                <li>Add and track transactions.</li>
                <li>Create and manage budgets.</li>
                <li>Analyze expenses and income by category.</li>
                <li>Monthly reports and charts for a better understanding of your finances.</li>
            </ul>

            <h4 className={styles.title}>Project Mission:</h4>
            <p>
                Our goal is to make financial literacy accessible to everyone. We believe that everyone can take control of their finances, and our app will help you do that easily and effectively.
            </p>

            <h4 className={styles.title}>Contact:</h4>
            <p>
                If you have any suggestions or questions, I am always here to help! Contact me through the Contact section or email me at <a className={styles.link} href='mailto:roman.warsaw@gmail.com'>roman.warsaw@gmail.com</a>.
            </p>
        </section>

    )
}

export default About;