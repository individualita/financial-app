import PropTypes from 'prop-types';
import styles from './container.module.scss';

const Container = ({children}) => {
    return (
        <div className={styles.container}>{children}</div>
    )
}

Container.propTypes = {
    children: PropTypes.node.isRequired
}

export default Container;