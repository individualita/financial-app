import PropTypes from 'prop-types';
import { createPortal } from 'react-dom'
import { useState } from 'react';

import styles from './transactionModal.module.scss';


const TransactionModal = ({handleCloseModal, addNewTransaction}) => {

    const [amount, setAmount] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [amountType, setAmountType] = useState('expense');
    const [date, setDate] = useState(null);
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({});



    // Icons for categories
    const getCategoryIcon = (category) => {
        const icons = {
            Salary: '💲', Rent: '🏠', Groceries: '🛒', JunkFood: '🍕', Internet: '💻',
            Clothes: '👕', Pharmacy: '💊', Restaurant: '🍴', Travel: '🌍', Gifts: '🎁',
            Bills: '📠', Other: '...'
        };

        return icons[category] || '...';
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

                                   
        // Close modal and pass data
        handleCloseModal();
        return addNewTransaction({
            _id: `${selectedCategory}_${Date.now()}`,
            icon: getCategoryIcon(selectedCategory),
            category: selectedCategory,
            date: date,
            description: description,
            amount: amountType === 'expense'? -Number(amount) : Number(amount),
            amountType: amountType,
        });


    }


    return createPortal(
        <div className={styles.modal} id="modal">
            <div className={styles.wrapper}>

                <div className={styles.content}>

                    <div className={styles.header}>
                        <h3 className={styles.title}>
                            New Transaction
                        </h3>

                    <button className={styles.closeModal}onClick={handleCloseModal} type="button"  aria-label="Close modal">x</button>
                    </div>
        
                    <div className="modal__body">

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
                                    <option value="Salary">💲 Salary</option>
                                    <option value="Rent">🏠 Rent</option>
                                    <option value="Groceries"> 🛒 Groceries</option>
                                    <option value="JunkFood"> 🍕 Junk food</option>
                                    <option value="Internet">💻 Internet </option>
                                    <option value="Clothes"> 👕 Clothes</option>
                                    <option value="Pharmacy"> 💊 Pharmacy</option>
                                    <option value="Restaurant"> 🍴 Restaurant</option>
                                    <option value="Travel"> 🌍 Travel</option>
                                    <option value="Gifts"> 🎁 Gifts</option>
                                    <option value="Bills"> 📠 Bills</option>
                                    <option value="Other">  Other</option>
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
                                <input 
                                    onChange={(e) => setDate(e.target.value)}
                                    className={`${styles.input} ${errors.date? styles.inputError : ''}`}
                                    type="date" 
                                    name="date" 
                                    id="date"  
                                />
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

                    </div>

                </div>

            </div>
        </div>, document.getElementById('modal-root')
    )
}

TransactionModal.propTypes = {
    handleCloseModal: PropTypes.func.isRequired,
    addNewTransaction: PropTypes.func.isRequired
}

export default TransactionModal;