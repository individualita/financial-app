import { useMemo } from "react";

//Import local components for displaying budget diagram and expense categories
import BudgetDiagram from "../budgetDiagram/BudgetDiagram";
import ExpenseCategories from "../expenseCategories/ExpenseCategories";

//Import utility functions for calculations
import sumAmountByType from "../../../../utils/sumAmountByType";
import groupExpensesByCategory from "../../../../utils/groupExpensesByCategory";
import calculatePercetageByCategory from "../../../../utils/calculatePercentageByCategory";

//styles
import './monthlySummary.scss';

const MonthlySummary = ({data, monthName, year}) => {

    //Проверка
    if (!data || !Array.isArray(data) || data.length === 0) {
        return (
            <section className="home__summary">
                <p>No transactions available for this month.</p>
            </section>
        )
    } 
    
    //Calculate and memoize total income and total expenses for the month
    const totalExpense = useMemo(() => sumAmountByType(data, 'expense'), [data]);
    const totalIncome = useMemo(() => sumAmountByType(data, 'income'), [data]);

    // Memoize grouping of expenses and calculation of percentages
    //Суммирование расходов по категориям и вычисление процентов
    const categoriesWithPercentage = useMemo(() => {
        const expenseByCategory = groupExpensesByCategory(data);
        return calculatePercetageByCategory(expenseByCategory, totalIncome);
    }, [data, totalIncome]);


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
                month={`${monthName} ${year}`}
            />

            <ExpenseCategories data={categoriesWithPercentage}/>
        </section>
    )
}


export default MonthlySummary;