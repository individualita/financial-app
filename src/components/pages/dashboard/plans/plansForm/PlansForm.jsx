import PropTypes from 'prop-types';

import PlansSubmitButton from "../../../../common/buttons/plansSubmitButton/PlansSubmitButton";

import styles from './plansForm.module.scss';

const PlansForm = ({handleInputChange, handleSubmit, autoResize, planTitle, planContent, hasError}) => {
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input 
                onChange={handleInputChange} 
                value={planTitle} 
                className={styles.input} 
                type="text" 
                name="title" 
                id="title" 
                placeholder="Title"
                required
                aria-required="true"
            />

            <textarea 
                onChange={(e) => {
                    handleInputChange(e);
                    autoResize(e);
                }}
                value={planContent} 
                className={styles.textarea} 
                name="content" 
                id="content" 
                placeholder="Note down your plan..." 
                rows={4}
                aria-required="true"
                >
            </textarea>

            {hasError && (
                <div className={styles.errorMessage} aria-live="polite">
                    Please fill in both title and content.
                </div>
            )}
            <PlansSubmitButton
                type="submit"
                onClick={handleSubmit}
                className={styles.submitButton}
            >
                Add plan
            </PlansSubmitButton>
        </form>
    )
}

PlansForm.propTypes = {
    handleInputChange: PropTypes.func.isRequired, 
    handleSubmit: PropTypes.func.isRequired, 
    autoResize: PropTypes.func.isRequired,
    planTitle: PropTypes.string.isRequired, 
    planContent: PropTypes.string.isRequired, 
    hasError: PropTypes.bool.isRequired
};

export default PlansForm;