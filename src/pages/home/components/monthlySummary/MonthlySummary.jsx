import { useMemo } from "react";
import { useSelector } from 'react-redux';


//Import local components for displaying budget diagram and expense categories
import BudgetDiagram from "../budgetDiagram/BudgetDiagram";
import ExpenseCategories from "../expenseCategories/ExpenseCategories";

//Import utility functions for calculations
import sumAmountByType from "../../../../utils/sumAmountByType";
import groupExpensesByCategory from "../../../../utils/groupExpensesByCategory";
import calculatePercetageByCategory from "../../../../utils/calculatePercentageByCategory";

//styles
import './monthlySummary.scss';

const MonthlySummary = () => {

    const transactions = useSelector(state => state.transactionsReducer.transactions);

    //Проверка
    if (!transactions || !Array.isArray(transactions) || transactions.length === 0) {
        return (
            <section className="home__summary">
                <p>No transactions available for this month.</p>
            </section>
        )
    } 
    
    //Calculate and memoize total income and total expenses for the month
    const totalExpense = useMemo(() => sumAmountByType(transactions, 'expense'), [transactions]);
    const totalIncome = useMemo(() => sumAmountByType(transactions, 'income'), [transactions]);

    // Memoize grouping of expenses and calculation of percentages
    //Суммирование расходов по категориям и вычисление процентов
    const categoriesWithPercentage = useMemo(() => {
        const expenseByCategory = groupExpensesByCategory(transactions);
        return calculatePercetageByCategory(expenseByCategory, totalIncome);
    }, [transactions, totalIncome]);


    // Prepare data for the chart, including category names, amounts, and percentages
    // Преобразуем данные в формат, подходящий для диаграммы, используя percentage
    const dataForChart = categoriesWithPercentage.map(item => ({
        name: item.category,
        value: item.amount,
        percentage: item.percentage
    }));


    return (
        <section className="home__summary">
            <BudgetDiagram 
                data={dataForChart} 
                totalExpense={totalExpense} 
                totalIncome={totalIncome} 
            />

            <ExpenseCategories data={categoriesWithPercentage}/>
        </section>
    )
}


export default MonthlySummary;