import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid'; //id library
import PropTypes from 'prop-types';


import { ICONS } from '../../../../constants/icons';

import { addTransaction } from '../../../../slices/transactionsSlice';


import styles from './transactionsForm.module.scss';

const TransactionsForm = ({handleCloseModal}) => {

    
    const [amount, setAmount] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [amountType, setAmountType] = useState('expense');
    const [date, setDate] = useState(null);
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({});

    const inputRef = useRef(null);

    const dispatch = useDispatch();

    
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


    // Icons for categories
    const getCategoryIcon = (category) => {
        return ICONS[category] || '...';
    };


     // Validate all fields
    const validateForm = () => {
        let errors = {};
        if (!amount || amount <= 0 || amount.startsWith(0)) errors.amount = "Amount must be greater than zero.";
        if (!selectedCategory) errors.selectedCategory = "Category must be selected.";
        if (!date) errors.date = "Date is required.";
        if (!description.trim()) errors.description = "Description cannot be empty.";

        return errors;
    }

    const handleSubmit = (e) => {
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
        <form onSubmit={handleSubmit} className={styles.form}>
            {/* Amount input */}
            <div className={`${styles.formGroup} ${styles.amount}`}>
                <div className={styles.display}> {amount} <span>zł</span> </div>
                {errors.amount? <div className={styles.error}>{errors.amount}</div> : null}
        
                <input 
                    onChange={(e) => setAmount(e.target.value)} 
                    value={amount}
                    className={`${styles.input} ${styles.amount} ${errors.amount ? styles.inputError : ''}`}
                    type="number" 
                    name="amount" 
                    placeholder="Amount"
                    ref={inputRef}
                />
                
            </div>
            
            {/* Category selection */}
            <div className={styles.formGroup}> 
        
                <select 
                    value={selectedCategory} 
                    onChange={e => setSelectedCategory(e.target.value)} 
                    className={`${styles.select} ${errors.selectedCategory? styles.inputError : ''}`}
                    name="category" 
                    id="category" 
                    aria-placeholder="Category"
                >
                    <option value="">Select Category</option>
                    {renderCategoryOptions(ICONS)}
                </select>
                {errors.selectedCategory? <div className={styles.error}>{errors.selectedCategory}</div> : null}
        
            </div>
        
        
            
            <div className={`${styles.formGroup} ${styles.type}`}> 
        
                <button
                    onClick={() =>setAmountType('expense')}
                    type="button" 
                    className={`${styles.button} ${amountType === 'expense' ? styles.buttonExpense : ''}`}
                    aria-label="Mark as expense" > 
                    ↙ Expense 
                
                </button>
        
                <button 
                    onClick={() => setAmountType('income')}
                    type="button" 
                    className={`${styles.button} ${amountType === 'income' ? styles.buttonIncome : ''}`}
                    aria-label="Mark as income" > 
                    ↗ Income 
                </button>
            </div>
        
            {/* Date input */}
            <div className={styles.formGroup}>
                {<input 
                    onChange={(e) => setDate(e.target.value)}
                    className={`${styles.input} ${errors.date? styles.inputError : ''}`}
                    type="date" 
                    name="date" 
                    id="date"
                    placeholder="dd.mm.year"  
                />}
                {errors.date? <div className={styles.error}>{errors.date}</div> : null}
        
            </div>
        
        
            {/* Description input */}
            <div className={styles.formGroup}>
                <input 
                    value={description} 
                    onChange={e => setDescription(e.target.value)} 
                    className={`${styles.input} ${errors.description? styles.inputError : ''}`}
                    type="text" 
                    name="descr" 
                    id="descr" 
                    placeholder='Description'
                />
                {errors.description? <div className={styles.error}>{errors.description}</div> : null}
            </div>
        
            {/* Submit button */}
            <button className={styles.submitButton}
                type="submit">
                Add Transaction
            </button>
    
        </form>

    )

}

TransactionsForm.propTypes = {
    handleCloseModal: PropTypes.func.isRequired
}

export default TransactionsForm;