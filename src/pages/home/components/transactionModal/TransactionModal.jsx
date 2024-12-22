import PropTypes from 'prop-types';

import Modal from '../../../../components/common/modal/Modal';
import TransactionsForm from '../transactionsForm/TransactionsForm';


const TransactionModal = ({handleCloseModal}) => {

    return (
        <Modal title="New transaction" id="modal" onClose={handleCloseModal}>
            <TransactionsForm handleCloseModal={handleCloseModal} />
        </Modal> 
    )
}


TransactionModal.propTypes = {
    handleCloseModal: PropTypes.func.isRequired,
}

export default TransactionModal;