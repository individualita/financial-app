import PropTypes from 'prop-types';

import ActionButton from '../../../../common/buttons/actionButton/ActionButton';

import Heading from './../../../../common/heading/Heading';

import styles from './homeHeader.module.scss';

const HomeHeader = ({toggleAllBudgetsView, isAllBudgetsVisible}) => {
    return (
        <div className={styles.header}>
            
            <Heading level={3} className='font-medium'>{isAllBudgetsVisible? 'Monthly summary' : 'Budget and expenses'}</Heading>
            <ActionButton onClick={toggleAllBudgetsView} ariaExpanded={isAllBudgetsVisible} >
                {isAllBudgetsVisible? 'Back to transactions' : 'All budgets'}
            </ActionButton>
        </div>
    )
}

HomeHeader.propTypes = {
    toggleAllBudgetsView: PropTypes.func.isRequired, // toggleAllBudgetsView - обязательная функция
    isAllBudgetsVisible: PropTypes.bool.isRequired, // isAllBudgetsVisible - обязательное булевое значение
};

export default HomeHeader;