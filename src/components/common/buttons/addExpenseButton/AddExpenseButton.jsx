import PropTypes from 'prop-types';

import styles from './addExpenseButton.module.scss';

const AddExpenseButton = ({ onClick, currentSection }) => {

    const buttonClass = currentSection === 'home' ? `${styles.addExpenseButton} ${styles.active}` : styles.addExpenseButton;
    const isButtonDisabled = currentSection === 'home' ? false : true;

    return (
        <button  className={buttonClass} onClick={onClick} disabled={isButtonDisabled}>
        </button>
    );
};

AddExpenseButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    currentSection: PropTypes.string
}

export default AddExpenseButton;