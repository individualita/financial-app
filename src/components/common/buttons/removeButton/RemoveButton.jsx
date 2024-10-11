import PropTypes from 'prop-types';

const RemoveButton = ({children, onClick, className, ...props}) => {
    return (
        <button onClick={onClick} className={className} {...props}>{children}</button>
    )
}

RemoveButton.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
    'aria-label': PropTypes.string 

}

export default RemoveButton;