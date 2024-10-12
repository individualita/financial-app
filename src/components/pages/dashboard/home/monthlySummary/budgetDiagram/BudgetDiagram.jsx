import PropTypes from 'prop-types';

import CustomPieChart from '../../../../../common/pieChart/PieChart';

import styles from './budgetDiagram.module.scss';

const BudgetDiagram = ({data, totalIncome, totalExpense, month}) => {

    const categoryColors = {
        JunkFood: '#FF4500',     
        Restaurant: '#1E90FF',   
        Clothes: '#ff0ff3',      
        Pharmacy: '#32CD32',     
        Gifts: '#BA55D3',        
        Groceries: '#FF8C00',    
        Bills: '#FF6347',        
        Travel: '#20B2AA',       
        Rent: '#DAA520',         
        Internet: '#9370DB',     
        Other: '#A9A9A9',        
    };

    return (
        <div className={styles.diagram}>
            <header className="home__diagram-header">
                <div className={styles.title}>Budget for the month</div>
                <div className={styles.month}>{month}</div>
            </header>
            <CustomPieChart data={data} width={150} height={200} innerRadius={40} outerRadius={60} colors={categoryColors}  />

            <footer className={styles.summary}>
                <div className={styles.value}> income: <span className="income">{totalIncome}</span> </div>
                <div className={styles.value}>expenses: <span className="expense">{totalExpense}</span> </div>
            </footer>

        </div>
    )
}

BudgetDiagram.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired, 
    totalIncome: PropTypes.number.isRequired, 
    totalExpense: PropTypes.number.isRequired, 
    month: PropTypes.string.isRequired, 
};

export default BudgetDiagram;