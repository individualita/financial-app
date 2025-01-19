import PropTypes from 'prop-types';

const FormErrorMessage = ({message}) => {
    if (!message) return null;

    return (
        <div className='message-error'>{message}</div>
    )
}

FormErrorMessage.propTypes = {
    message: PropTypes.string,
};

export default FormErrorMessage;