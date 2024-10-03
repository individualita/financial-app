//styles global in styles > _typography.scss

import PropTypes from 'prop-types';

const Heading = ({level = 3, className = '', children, ...props}) => {

    const Tag = `h${level}`;

    return (
        <Tag className={`title-${level} ${className}`} {...props}>{children}</Tag>
    )
};


Heading.propTypes = {
    level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
    className: PropTypes.string,
    children: PropTypes.node.isRequired
}

export default Heading;