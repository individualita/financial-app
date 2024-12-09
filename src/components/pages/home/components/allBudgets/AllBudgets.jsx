import PropTypes from 'prop-types';

//Import jsPDF library
import jsPDF from "jspdf";
import 'jspdf-autotable';

//Import global components or resources
import Download from "../../../../common/icons/Download";

//Import utility functions
import sumAmountByType from "../../../../utils/sumAmountByType";

//Import local components
import MonthlySummary from "../monthlySummary/MonthlySummary";

import styles from './allBudgets.module.scss';

const AllBudgets = ({data}) => {

    //If no data is available, show a message to the user
    if (!data || data.length === 0) {
        return (
            <p>No transactions available. Add new transaction :)</p>
        )
    };
    
    //Prepare data for the PDF report
    const pdfData = Object.entries(data).map((item) => {

        const [monthKey, data] = item;

        
        const year = monthKey.split('-')[0]; //разбиваем на два элемента в массиве 2024, 08. и забираем первый то есть 2024
        const month = monthKey.split('-')[1]; 

        const monthName = new Date(year, month -1).toLocaleString('en-US', { month: 'long' });

        const period = `${monthName} ${year}`;

        // Calculate total income and expenses for the month
        const totalIncome = sumAmountByType(data, 'income' );
        const totalExpense = sumAmountByType(data, 'expense');
    

        return {period, totalExpense: Math.abs(totalExpense), totalIncome, remainder: totalIncome - Math.abs(totalExpense)};
    });

    // Function to generate PDF report with jsPDF
    const generatePDF = () => {
        const doc = new jsPDF();
    
        const columns = ['Period', 'Income', 'Expenses summary', 'Remainder'];
    
            
        doc.autoTable({
            head: [columns],
            body: pdfData.map(item => [item.period, item.totalIncome, item.totalExpense, item.remainder] )
        });

        // Save the PDF
        doc.save('Monthly_summary');
    
    };

    const renderMonthlySummaries = Object.entries(data).map((item) => {
        const [monthKey, data] = item;

        // monthKey - это строка формата '2024-09'
        const year = monthKey.split('-')[0]; //разбиваем на два элемента в массиве 2024, 08. и забираем первый то есть 2024
        const month = monthKey.split('-')[1]; 

        const monthName = new Date(year, month -1).toLocaleString('en-US', { month: 'long' });

        return (
            
            <MonthlySummary key={`${year}-${month}`} data={data} monthName={monthName} year={year} />
            
            
        )
    });
    

    return (
        <div className="home__summary-list">
            <button
                className={styles.downloadBtn}
                onClick={generatePDF}
                aria-label="Download PDF report"
                >
                    PDF Report
                    <Download fill={'#35323b'}/>
            </button>
            
            {renderMonthlySummaries}
        </div>
    )
}

AllBudgets.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AllBudgets;