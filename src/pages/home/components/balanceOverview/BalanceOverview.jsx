import PropTypes from 'prop-types';

import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//Utility for calculating the total amount from a dataset
import calculateTotalAmount from '../../../../utils/calculateTotalAmount';
//Utility for formatting numbers as currency
import { formatCurrency } from '../../../../utils/formatCurrency';


import styles from './balanceOverview.module.scss';

const BalanceOverview = () => {
    
    const transactions = useSelector(state => state.transactionsReducer.transactions);

    //Check if data is valid (non-empty array)
    if (!transactions || !Array.isArray(transactions) || transactions.length === 0) {
        return (
            <section className="home__balance">
                <p className="home__balance-text">Total balance not available</p>
            </section>
        )
    }

    // Memoize the calculation of the total balance to avoid recalculating on each render
    const totalBalance = useMemo(() => {
        return calculateTotalAmount(transactions);
    }, [transactions]);

    // Format the total balance as currency (Polish Zloty in this case)
    const formattedNumber = formatCurrency(totalBalance, 'pl-PL', 'PLN');

    return (
        <section className="home__balance" aria-live="polite">
            <div className={styles.amount}>{formattedNumber}</div>
            <p className={styles.text}>Total balance</p>
        </section>
    )
}

/*
BalanceOverview.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired, 
};
*/
export default BalanceOverview;

