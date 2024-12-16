import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // библиотека с АЙДИ!!!
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { getRandomColor } from '../../../../utils/getRandomColor';
import { BACKGROUND_COLORS } from '../../../../constants/backgroundColors';
import { addNewPlan } from '../../../../slices/plansSlice';

import styles from './plansAddForm.module.scss';

const PlansAddForm = () => {
    const [planTitle, setPlanTitle] = useState('');
    const [planContent, setPlanContent] = useState('');
    const [hasError, setHasError] = useState(false);

    const dispatch = useDispatch();

    // Handle input change for both title and content
    const handleInputChange = (e) => {

        const {name, value} = e.target;

        name === 'title' ? setPlanTitle(value) : setPlanContent(value);
    };

    // Validate form input before submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if(planTitle.trim().length === 0 || planContent.trim().length === 0) {
            setHasError(true);
            return;
        }

        const color = getRandomColor(BACKGROUND_COLORS);

        dispatch(addNewPlan({
            _id: uuidv4(),
            title: planTitle,
            content: planContent,
            color: color
        }))

        //Reset form fields after submission
        setPlanTitle('');
        setPlanContent('');
        setHasError(false);
    };

    // Automatically resize textarea as the user types
    const autoResize = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };


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
            <button type="submit" onClick={handleSubmit} className={styles.submitButton}>Add plan</button>
        </form>
    )
}

/*
PlansForm.propTypes = {
    handleInputChange: PropTypes.func.isRequired, 
    handleSubmit: PropTypes.func.isRequired, 
    autoResize: PropTypes.func.isRequired,
    planTitle: PropTypes.string.isRequired, 
    planContent: PropTypes.string.isRequired, 
    hasError: PropTypes.bool.isRequired
};
*/
export default PlansAddForm;