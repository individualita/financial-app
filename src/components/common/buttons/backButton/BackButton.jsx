import { useNavigate } from 'react-router-dom';

import styles from './backButton.module.scss';

const BackButton = () => {

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // Возвращает на предыдущую страницу
    };

    return (
        <button className={styles.button} onClick={goBack}>{'<'}</button>
    )
}


export default BackButton;