import PropTypes from 'prop-types';
import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//components
import HomeHeader from './components/homeHeader/HomeHeader';
import BalanceOverview from './components/balanceOverview/BalanceOverview';
import MonthlySummary from './components/monthlySummary/MonthlySummary';
import RecentTransactions from './components/recentTransactions/RecentTransactions';
import AllBudgets from './components/allBudgets/AllBudgets';

//Utilities
import groupTransactionsByMonth from './../../utils/groupTransactionsByMonth';
import { getDateDetails } from '../../utils/getDateDetails';


const Home = () => {
    const [isAllBudgetsVisible, setIsAllBudgetsVisible] = useState(false);

    const transactions = useSelector(state => state.transactionsReducer.transactions);


    const toggleAllBudgetsView = () => setIsAllBudgetsVisible(prev => !prev);

    // UseMemo the grouped transactions to avoid recalculating on each render. structure: 2024-08: [{...}]
    const transactionsGroupedByMonth = useMemo(() => {
        return groupTransactionsByMonth(transactions);
    }, [transactions]);
    
    // Sort the grouped transactions by month in descending order (latest months first)
    const sortedTransactionsByMonth = useMemo(() => {
        return Object.fromEntries(
            Object.entries(transactionsGroupedByMonth).sort((a, b) => a[0].localeCompare(b[0]))
        );
    }, [transactionsGroupedByMonth]);
       


    console.log('Grouped Transactions:', transactionsGroupedByMonth);
    console.log('Sorted Transactions:', sortedTransactionsByMonth);


    
    // Использование
    const currentDate = getDateDetails();
    const {formattedKey, dateLabel} = currentDate; //2024-12 , December 2024.


    console.log(sortedTransactionsByMonth[formattedKey])


    return (
        <section className="home">
            <HomeHeader toggleAllBudgetsView={toggleAllBudgetsView} isAllBudgetsVisible={isAllBudgetsVisible}/>

            {isAllBudgetsVisible ? (<AllBudgets data={sortedTransactionsByMonth} /> 
            ) : (
                <>
                    <BalanceOverview />
                
                    <MonthlySummary data={sortedTransactionsByMonth[formattedKey]}  dateLabel={dateLabel}/>
                
                    <RecentTransactions
                    />
                </>
            )}


        </section>
    )
}



export default Home;