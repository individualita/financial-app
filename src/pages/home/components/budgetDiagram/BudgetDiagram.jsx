import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import CustomPieChart from '../../../../components/common/pieChart/PieChart';

import styles from './budgetDiagram.module.scss';

const BudgetDiagram = ({data, totalIncome, totalExpense, dateLabel}) => {

    const {categoryColors} = useSelector(state => state.categoryColorsReducer);

    return (
        <div className={styles.diagram}>
            <header className={styles.header}>
                <div className={styles.title}>Budget for the month</div>
                <div className={styles.dateLabel}>{dateLabel}</div>
            </header>

            <CustomPieChart data={data}  innerRadius={40} outerRadius={60} colors={categoryColors}  />

            <footer className={styles.summary}>
                <div className={styles.value}> income: <span className='income'>{totalIncome.toFixed(2)}</span> </div>
                <div className={styles.value}>expenses: <span className='expense'>{totalExpense.toFixed(2)}</span> </div>
            </footer>

        </div>
    )
}

BudgetDiagram.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired, 
    totalIncome: PropTypes.number.isRequired, 
    totalExpense: PropTypes.number.isRequired, 
    dateLabel: PropTypes.string.isRequired, 
};

export default BudgetDiagram;