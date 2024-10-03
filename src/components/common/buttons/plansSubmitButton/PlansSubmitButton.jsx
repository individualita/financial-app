import PropTypes from 'prop-types';

import classes from './plansSubmitButton.module.scss';

const PlansSubmitButton = ({children, className='', ...props}) => {

    return <button className={`${classes.button} ${className}`} {...props}>{children}</button>
}

PlansSubmitButton.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
}

export default PlansSubmitButton;