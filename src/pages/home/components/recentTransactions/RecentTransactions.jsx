import PropTypes from 'prop-types';

import { useState, useMemo } from "react";
import { useSelector, useDispatch } from 'react-redux';

//slice??
import { deleteTransaction } from '../../../../slices/transactionsSlice';

//Utility for sorting transactions by date
import sortTransactionsByDate from "../../../../utils/sortTransactionsByDate";
// Local component for displaying individual transactions
import TransactionItem from "../transactionItem/TransactionsItem";
// Global components
import Heading from '../../../../components/common/heading/Heading'
import ActionButton from "../../../../components/common/buttons/actionButton/ActionButton";

import styles from "./recentTransactions.module.scss";

const RecentTransactions = () => {
  
    const [showAll, setShowAll] = useState(false);

    const toggleShowAll = () => setShowAll(!showAll);

    const transactions = useSelector(state => state.transactionsReducer.transactions);
    const dispatch = useDispatch();

    //coppy array and sort transactions by date
    const sortedTransactions = useMemo(() => {
        return sortTransactionsByDate(transactions);
    }, [transactions]);

    // Determine which transactions to display (either all or just the first three)
    const displayedTransactions = showAll ? sortedTransactions : sortedTransactions.slice(0, 3);

    // If there are no transactions to display, show a fallback message
    if (sortedTransactions.length === 0) {
        return (
            <section className={styles.transactions}>
                <p>No transactions yet.</p>
            </section>
        );
    }

    const renderTransactions = displayedTransactions.map(({_id, ...props}) => {
        return (
            <TransactionItem 
                key={_id}
                deleteTransaction={() => dispatch(deleteTransaction(_id))}
                {...props}
            />
        )
    });


    return (
        <section className={styles.transactions} aria-labelledby="recent-transactions-title">
            <header className={styles.header}>
                <Heading level={3} className="font-medium" id="recent-transactions-title">Recent Transactions</Heading>
                <ActionButton onClick={toggleShowAll} ariaExpanded={showAll}>
                    {showAll ? "Show less" : "View all"}
                </ActionButton>
            </header>

            <ul className={styles.list}>
                {renderTransactions}
            </ul>
        </section>
    );

};
/*
RecentTransactions.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired, // data - обязательный массив объектов
    onDeleteTransaction: PropTypes.func.isRequired, // onDeleteTransaction - обязательная функция
};
*/
export default RecentTransactions;
