import PropTypes from 'prop-types';
import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//components
import HomeHeader from './components/homeHeader/HomeHeader';
import BalanceOverview from './components/balanceOverview/BalanceOverview';
import MonthlySummary from './components/monthlySummary/MonthlySummary';
import RecentTransactions from './components/recentTransactions/RecentTransactions';
import AllBudgets from './components/allBudgets/AllBudgets';

//Utility function for grouping transactions by month
import groupTransactionsByMonth from './../../utils/groupTransactionsByMonth';


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


 


    return (
        <section className="home">
            <HomeHeader toggleAllBudgetsView={toggleAllBudgetsView} isAllBudgetsVisible={isAllBudgetsVisible}/>

            {isAllBudgetsVisible ? (<AllBudgets data={sortedTransactionsByMonth} /> 
            ) : (
                <>
                    <BalanceOverview />
                
                    <MonthlySummary />
                
                    <RecentTransactions
                    />
                </>
            )}


        </section>
    )
}



export default Home;