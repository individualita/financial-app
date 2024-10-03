
//Import local components for displaying budget diagram and expense categories
import BudgetDiagram from "./budgetDiagram/BudgetDiagram";
import ExpenseCategories from "./expenseCategories/ExpenseCategories";

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
    
    //Calculate total income and total expenses for the month
    const totalExpense = sumAmountByType(data, 'expense');
    const totalIncome = sumAmountByType(data, 'income');

    //Group expenses by category and calculate percentages relative to total income
    //Суммирование расходов по категориям и вычисление процентов
    const expenseByCategory = groupExpensesByCategory(data);
    const categoriesWithPercentage = calculatePercetageByCategory(expenseByCategory, totalIncome);

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