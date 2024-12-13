import PropTypes from 'prop-types';
import { useState, useMemo } from 'react';

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
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentMonthName, setCurrentMonthName] = useState(new Date().toLocaleString('en-US', {month: 'long'}));


    const toggleAllBudgetsView = () => setIsAllBudgetsVisible(prev => !prev);

 


    return (
        <section className="home">
            <h1>home page</h1>

        </section>
    )
}



export default Home;