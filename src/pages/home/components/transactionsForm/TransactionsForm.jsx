import { useState, useEffect, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid'; //id library
import PropTypes from 'prop-types';

//functions 
import { addTransaction } from '../../../../slices/transactionsSlice';

//components 
import AddCategoryPanel from '../addCategoryPanel/AddCategoryPanel';
import FormErrorMessage from '../../../../components/common/formErrorMessage/FormErrorMessage';

import styles from './transactionsForm.module.scss';

const TransactionsForm = ({handleCloseModal}) => {

    const [amount, setAmount] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [amountType, setAmountType] = useState('expense');
    const [date, setDate] = useState(null);
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({});

    //category panel
    const [isAddCategoryPanelOpen, setAddCategoryPanelOpen] = useState(false);
    const [categoryMessage, setCategoryMessage] = useState('');

    const categories = useSelector(state => state.categoriesReducer.categories);
    const dispatch = useDispatch();

    const inputRef = useRef(null);

    
    useEffect(() => {

        //focus on amount input 
        inputRef.current.focus();

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
              handleCloseModal();
            }
        };

        //Close the modal window by pressing the Escape key
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };

    }, [handleCloseModal]);

    // Hide categoryMessage after 2s
    useEffect(() => {

        if(!categoryMessage) return

        const timer = setTimeout(() => {
            setCategoryMessage('');
        }, 2000);

        return () => clearTimeout(timer);

    }, [categoryMessage]);



    // Icons for categories
    const getCategoryIcon = (category) => {
        return categories[category] || '...';
    };


     // Validate all fields
    const validateForm = () => {
        let errors = {};
        if (!amount || amount <= 0 || amount.startsWith(0)) errors.amount = 'Amount must be greater than zero.';
        if (!selectedCategory) errors.selectedCategory = 'Category must be selected.';
        if (!date) errors.date = 'Date is required.';
        if (!description.trim()) errors.description = 'Description cannot be empty.';

        return errors;
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Call the validateForm function to check the form data for any validation errors
        const errors = validateForm();

        // Check if the errors object contains any keys (errors)
        // If there are errors, update the errors data state
        if (Object.entries(errors).length > 0) {
            setErrors({...errors});
            return;
        } 


        dispatch(addTransaction(
            {
                _id: uuidv4(),
                icon: getCategoryIcon(selectedCategory),
                category: selectedCategory,
                date: date,
                description: description,
                amount: amountType === 'expense'? -Number(amount) : Number(amount),
                amountType: amountType,
            }
        ));

        // Close modal and pass data
        handleCloseModal();

    }

    const renderCategoryOptions = (iconsObj) => {

        return Object.entries(iconsObj).map(([category, icon]) => {

            return (
                <option key={category} value={category}>
                    {icon} {category}
                </option>
            )
        })
    };



    return (
        <form onSubmit={handleFormSubmit} className={styles.form}>
            {/* Amount input */}
            <div className={`${styles.formGroup} ${styles.amount}`}>
                <div className={styles.display}> {amount} <span>zł</span> </div>

                <FormErrorMessage message={errors.amount}/>
        
                <input
                    id='amount' 
                    onChange={(e) => setAmount(e.target.value)} 
                    value={amount}
                    className={`input ${styles.amount} ${errors.amount ? 'input-error' : ''}`}
                    type='number'
                    name='amount'
                    placeholder='Amount'
                    ref={inputRef}
                />
                
            </div>
            
            {/* Category selection */}
            <div className={`${styles.formGroup} flex-between`}> 
        
                <select
                    id='category' 
                    value={selectedCategory} 
                    onChange={e => setSelectedCategory(e.target.value)} 
                    className={`select ${!isAddCategoryPanelOpen && 'min-w-[85%]'} ${errors.selectedCategory ? 'input-error': ''}`}
                    name='category'
                    aria-placeholder='Category'
                >
                    <option value=''>Select Category </option>
                    {renderCategoryOptions(categories)}
                    <option value='Other'> ... Other </option>

                </select>

                {!isAddCategoryPanelOpen && (
                    <button 
                        type='button' 
                        onClick={() => setAddCategoryPanelOpen(true)} 
                        className={styles.addButton}
                    >
                        +
                    </button> 
                )}

            </div>
            <FormErrorMessage message={errors.selectedCategory}/>

            {categoryMessage && ( 
                <p className={styles.helperText}>
                    The new category <b>{categoryMessage}</b> has been added {' '} 
                    <span className='message-success'>successfully</span>
                </p>
            )}


            {/* open panel*/}
            {isAddCategoryPanelOpen && (
                <AddCategoryPanel onClosePanel={setAddCategoryPanelOpen} 
                onSuccessMessage={setCategoryMessage}
            />
            )}
            
            <div className={`${styles.formGroup} ${styles.type}`}> 
        
                <button
                    onClick={() =>setAmountType('expense')}
                    type='button' 
                    className={`${styles.button} ${amountType === 'expense' ? styles.buttonExpense : ''}`}
                    aria-label='Mark as expense' 
                > 
                    ↙ Expense 
                </button>
        
                <button 
                    onClick={() => setAmountType('income')}
                    type='button' 
                    className={`${styles.button} ${amountType === 'income' ? styles.buttonIncome : '' }`}
                    aria-label='Mark as income' 
                > 
                    ↗ Income 
                </button>

            </div>
        
            {/* Date input */}
            <div className={styles.formGroup}>
                <input 
                    id='date'
                    onChange={(e) => setDate(e.target.value)}
                    className={`input ${errors.date? 'input-error' : ''}`}
                    type='date' 
                    name='date' 
                    placeholder='dd.mm.year'  
                />
                <FormErrorMessage message={errors.date}/>
            </div>
        
        
            {/* Description input */}
            <div className={styles.formGroup}>
                <input
                    id='descr' 
                    value={description} 
                    onChange={e => setDescription(e.target.value)} 
                    className={`input ${errors.description ? 'input-error': ''}`}
                    type='text' 
                    name='descr' 
                    placeholder='Description'
                />
                <FormErrorMessage message={errors.description}/>

            </div>
        
            {/* Submit button */}
            <button className={styles.submitButton}
                type='submit'
            >
                Add Transaction
            </button>
    
        </form>

    )

}

TransactionsForm.propTypes = {
    handleCloseModal: PropTypes.func.isRequired
}

export default TransactionsForm;