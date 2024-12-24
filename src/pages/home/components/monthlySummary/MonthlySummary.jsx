import { useMemo } from "react";
import PropTypes from 'prop-types';

//Import local components for displaying budget diagram and expense categories
import Heading from "../../../../components/common/heading/Heading";
import BudgetDiagram from "../budgetDiagram/BudgetDiagram";
import CategoryList from "../categoryList/CategoryList";

//Import utility functions for calculations
import { sumAmountByType } from "../../../../utils/sumAmountByType";
import { groupExpensesByCategory } from "../../../../utils/groupExpensesByCategory";
import { calculatePercetageByCategory } from "../../../../utils/calculatePercentageByCategory";

import styles from './monthlySummary.module.scss';


const MonthlySummary = ({data, dateLabel}) => {

    //Проверка
    if (!data || !Array.isArray(data) || data.length === 0) {
        return (
            <section className={styles.summary}>
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
        <section className={styles.summary}>
            <BudgetDiagram 
                data={dataForChart} 
                totalExpense={totalExpense} 
                totalIncome={totalIncome}
                dateLabel={dateLabel} 
            />
            
            <div className={styles.category}>
                <Heading level={3} className="font-medium">Main expenses</Heading>
                <CategoryList data={categoriesWithPercentage} />
            </div>            
        </section>
    )
}


MonthlySummary.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired, 
    dateLabel: PropTypes.string.isRequired
}

export default MonthlySummary;