import PropTypes from 'prop-types';

import styles from './menuButton.module.scss';

const MenuButton = ({children, onClick}) => {
    return (
        <button className={styles.menuButton} onClick={onClick}>
            {children}
        </button>
    )
}

MenuButton.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func.isRequired
}

export default MenuButton;