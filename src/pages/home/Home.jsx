import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';

//components
import HomeHeader from './components/homeHeader/HomeHeader';
import BalanceOverview from './components/balanceOverview/BalanceOverview';
import MonthlySummary from './components/monthlySummary/MonthlySummary';
import RecentTransactions from './components/recentTransactions/RecentTransactions';
import AllBudgets from './components/allBudgets/AllBudgets';

//Utilities
import groupTransactionsByMonth from './../../utils/groupTransactionsByMonth';
import { getDateDetails } from '../../utils/getDateDetails';

import './home.scss';


const Home = () => {
    const [isAllBudgetsVisible, setIsAllBudgetsVisible] = useState(false);

    const transactions = useSelector(state => state.transactionsReducer.transactions);

    const toggleAllBudgetsView = () => setIsAllBudgetsVisible(prev => !prev);

    
    // Sort the grouped transactions by month in descending order (latest months first)
    const sortedTransactionsByMonth = useMemo(() => {
        //group transactions. structure: 2024-08: [{...}];
        const groupedTransactions = groupTransactionsByMonth(transactions);

        return Object.fromEntries(
            Object.entries(groupedTransactions).sort((a, b) => b[0].localeCompare(a[0]))
        );

    }, [transactions]);

    
    // current date 
    const currentDate = getDateDetails();
    const {formattedKey, dateLabel} = currentDate; //formattedKey - 2024-12 , dateLabel - December 2024.

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