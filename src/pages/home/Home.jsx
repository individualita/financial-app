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


const Home = ({data, onDeleteTransaction}) => {
    const [isAllBudgetsVisible, setIsAllBudgetsVisible] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentMonthName, setCurrentMonthName] = useState(new Date().toLocaleString('en-US', {month: 'long'}));


    const toggleAllBudgetsView = () => setIsAllBudgetsVisible(prev => !prev);

    // UseMemo the grouped transactions to avoid recalculating on each render. structure: 2024-08: [{...}]
    const transactionsGroupedByMonth = useMemo(() => {
        return groupTransactionsByMonth(data);
    }, [data]);
    
    
    // Sort the grouped transactions by month in descending order (latest months first)
    const sortedTransactionsByMonth = useMemo(() => {
        return Object.fromEntries(
            Object.entries(transactionsGroupedByMonth).sort((a, b) => b[0].localeCompare(a[0]))
        );
    })

    //key format = 2024-09
    const transactionsKey = `${currentYear}-${String(currentMonth).padStart(2, '0')}`;


    return (
        <section className="home">
            <HomeHeader toggleAllBudgetsView={toggleAllBudgetsView} isAllBudgetsVisible={isAllBudgetsVisible}/>

            {isAllBudgetsVisible ? (<AllBudgets data={sortedTransactionsByMonth} /> 
            ) : (

                <>
                <BalanceOverview data={data} />
            
                <MonthlySummary 
                    data={sortedTransactionsByMonth[transactionsKey]} 
                    monthName={currentMonthName} 
                    year={currentYear}
                />
            
                <RecentTransactions
                    data={data} 
                    onDeleteTransaction={onDeleteTransaction}
                />
                </>
            )}

        </section>
    )
}

Home.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, 
            category: PropTypes.string.isRequired, 
            date: PropTypes.string.isRequired, 
            description: PropTypes.string, 
            amount: PropTypes.number.isRequired,
            amountType: PropTypes.oneOf(['income', 'expense']).isRequired, 
        })
    ).isRequired,
    onDeleteTransaction: PropTypes.func.isRequired, 
};

export default Home;