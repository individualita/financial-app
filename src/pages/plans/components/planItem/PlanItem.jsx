import PropTypes from 'prop-types';

import RemoveButton from '../../../../components/common/buttons/removeButton/RemoveButton';

import styles from './planItem.module.scss';

const PlanItem = ({onDeleteNewPlan, _id, title, content, color}) => {

    return (
        <article className={styles.card} style={{backgroundColor: color}}>
            <div className={styles.title}>{title}</div>
            <p className={styles.content}>{content}</p>

            <RemoveButton
                onClick={() => onDeleteNewPlan(_id)}
                className={styles.deleteButton}
                aria-label={`Delete plan titled ${title}`}
                >
                x
            </RemoveButton>

        </article>
    )
}

PlanItem.propTypes = {
    onDeleteNewPlan: PropTypes.func.isRequired, 
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // _id может быть строкой или числом
    title: PropTypes.string.isRequired, 
    content: PropTypes.string.isRequired, 
    color: PropTypes.string.isRequired
};

export default PlanItem;