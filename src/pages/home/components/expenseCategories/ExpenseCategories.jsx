import PropTypes from 'prop-types';

import CategoryList from "../categoryList/CategoryList";

import Heading from "../../../../components/common/heading/Heading";

import styles from './expenseCategories.module.scss';

const ExpenseCategories = ({data}) => {
    return (
        <div className={styles.category}>
            <Heading level={3} className="font-medium">Main expenses</Heading>
            <CategoryList data={data} />
        </div>
    )
}

ExpenseCategories.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ExpenseCategories;