import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

//functions
import { addNewCategory } from '../../../../slices/categoriesSlice';
import { addNewColor } from '../../../../slices/categoryColorsSlice';

//utils
import { getRandomColor } from '../../../../utils/getRandomColor';

//components
import FormErrorMessage from '../../../../components/common/formErrorMessage/FormErrorMessage';

import styles from './addCategoryPanel.module.scss';

const AddCategoryPanel = ({onClosePanel, onSuccessMessage}) => {

    const [categoryName, setCategoryName] = useState('');
    const [categoryIcon, setCategoryIcon] = useState('');
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();

    const validateInputs = () => {
        const currentErrors = {};
        const emojiRegex = /[\p{Emoji}]/u;

        if(!emojiRegex.test(categoryIcon)) currentErrors.icon = 'Only emojis are allowed. Please try again'
        if(!categoryName.trim()) currentErrors.category = 'Category cannot be empty'

        return currentErrors;
    }

    const handleAddCategory = () => {

        const currentErrors = validateInputs();

        if (Object.entries(currentErrors).length > 0) {
            setErrors({...currentErrors})
            return;
        }

        const randomColor = getRandomColor();
        const newCategory = {[categoryName]: categoryIcon};
        const newCategoryColor = {[categoryName] :randomColor};

        dispatch(addNewCategory(newCategory));
        dispatch(addNewColor(newCategoryColor));

        //clear inputs
        setCategoryName('');
        setCategoryIcon('');

        //close panel
        onClosePanel(false);
        onSuccessMessage(categoryName);
    }


    return (
        <div className={styles.wrapper}>

            <p className={styles.helperText}> Write a new category and emoji 🙂</p>

            <div className={styles.inputGroup}>

                <input
                    id='categoryName' 
                    type='text'
                    value={categoryName}
                    name='categoryName'
                    placeholder='Category name'
                    onChange={(e) => setCategoryName(e.target.value)}
                    className={`min-w-[85%] input ${errors.category ? 'input-error' : ''}`}
                    aria-label='Enter category name'
                    
                />

                <input 
                    id='categoryIcon'
                    type='text'
                    value={categoryIcon}
                    name='icon'
                    placeholder=':)'
                    onChange={(e) => setCategoryIcon(e.target.value)}
                    className={`${styles.iconInput} ${errors.icon ? 'input-error' : ''}`}
                    aria-label='Enter a category icon (emoji)'
                />

            </div>

            <FormErrorMessage message={errors.category}/>
            <FormErrorMessage message={errors.icon}/>

            <button 
                type='button'
                className={styles.addCategoryButton}
                onClick={handleAddCategory}
                >
                    Add category
            </button>

        </div>
    )

}


AddCategoryPanel.propTypes = {
    onClosePanel: PropTypes.func.isRequired,
    onSuccessMessage: PropTypes.func.isRequired,
};

export default AddCategoryPanel;