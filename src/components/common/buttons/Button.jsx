import PropTypes from 'prop-types';
import './button.scss';

const Button = ({children, onClick, className, ...props}) => {

    return (
        <button className={className} onClick={onClick} {...props}>{children}</button>
    )
}


Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string
}

/*
Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    color: PropTypes.oneOf(['primary', 'secondary', 'danger']),
    className: PropTypes.string,
};

*/

export default Button;