import PropTypes from 'prop-types';

import styles from './actionButton.module.scss';

const ActionButton = ({onClick, ariaExpanded = false, children}) => {
    return (
        <button onClick={onClick} className={styles.actionButton} aria-expanded={ariaExpanded}>
            {children}
        </button>
    )
}

ActionButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    ariaExpanded: PropTypes.bool,
    children: PropTypes.node.isRequired
}
export default ActionButton;