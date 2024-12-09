import PropTypes from 'prop-types';

import { formatCurrency } from '../../../../utils/formatCurrency';

import styles from './categoryItem.module.scss';

const CategoryItem = ({category, amount, percentage}) => {

    const formattedAmount = formatCurrency(amount, 'pl-PL', 'PLN');

    return (
        <li className={styles.item} >
            <div className={styles.percentage}>
                {percentage}%
            </div>
            <div className="home__category-info">
                <div className={styles.title}>{category}</div>
                <div className={`${styles.amount} expense`}>{/*amount.toFixed(2)*/formattedAmount} </div>
            </div>
        </li>
    )
}

CategoryItem.propTypes = {
    category: PropTypes.string.isRequired, 
    amount: PropTypes.number.isRequired,
    percentage: PropTypes.number.isRequired
};

export default CategoryItem;