import PropTypes from 'prop-types';
import { useState } from 'react';

import CategoryItem from '../categoryItem/CategoryItem';

import styles from './categoryList.module.scss';

const CategoryList = ({data}) => {

    // Manage category visibility (show all or only a portion)
    const [isExpanded, setIsExpanded] = useState(false);

    // Show either the first 4 categories or all if expanded
    const visibleCategories = isExpanded? data : data.slice(0,4);

    // Total number of categories
    const totalCategories = data.length;

    // Number of categories left hidden
    const remainingCategories = totalCategories - visibleCategories.length;

    // Handler to toggle category visibility
    const handleToggleVisibility = () => setIsExpanded(prev => !prev);

    const renderCategories = visibleCategories.map(({_id, ...rest}) => {
        return (
            <CategoryItem key={_id} {...rest} />
        )
    });

    return (
        <ul className={styles.list}>
            {totalCategories > 0?  renderCategories : <p>No expenses available</p>}

            {remainingCategories > 0 && (
                <button className={styles.toggleButton} onClick={handleToggleVisibility}>
                    {isExpanded ? '' : `See ${remainingCategories} more`}
                </button>
            )}
        </ul>  
    )
}

CategoryList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default CategoryList;