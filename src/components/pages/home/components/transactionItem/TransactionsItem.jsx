import PropTypes from 'prop-types';

//Utility function to format currency based on locale
import {formatCurrency} from '../../../../utils/formatCurrency';

import RemoveButton from '../../../../common/buttons/removeButton/RemoveButton';

import styles from './transactionsItem.module.scss';

const TransactionItem = ({icon, category, date, description, amount, amountType, onDeleteTransaction, _id}) => {

    //Format the date from YYYY-MM-DD to DD-MM-YYYY
    let [year, month, day] = date.split('-');
    let formattedDate = `${day}-${month}-${year}`;

    // Format the amount based on the locale and currency type
    const formattedAmount = formatCurrency(amount, 'pl-PL', 'PLN');


    return (
        <li className={styles.item}>
            <div className={styles.icon}>
                {icon}
            </div>

            <div className={styles.details}>
                <div className={styles.title}>{category}</div>
                <div className={styles.info}>
                    {formattedDate}  - {description}
                </div>
            </div>

            
            <div className={amountType === 'income' ? `${styles.amount} income` : `${styles.amount} expense`}>
                {amountType === 'income' ? `+${formattedAmount} ` : ` ${formattedAmount} `}
            </div>


            <RemoveButton
                onClick={() => onDeleteTransaction(_id)}
                className={styles.deleteBtn}
                aria-label={`Delete transaction ${description}`}
                >
                x
            </RemoveButton>
        </li>
    )
}

TransactionItem.propTypes = {
    icon: PropTypes.string.isRequired, 
    category: PropTypes.string.isRequired, 
    date: PropTypes.string.isRequired, 
    description: PropTypes.string, 
    amount: PropTypes.number.isRequired, 
    amountType: PropTypes.oneOf(['income', 'expense']).isRequired, 
    onDeleteTransaction: PropTypes.func.isRequired, 
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default TransactionItem;

