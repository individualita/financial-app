import PropTypes from 'prop-types';

import { createPortal } from 'react-dom';

import styles from './modal.module.scss';


const Modal = ({ onClose, title, children, id} ) => {

    return createPortal (
        <div className={styles.modal} id={id} role="dialog" aria-labelledby="modal-title" aria-modal="true">
            <div className={styles.wrapper}>
    
                <div className={styles.content}>
    
                    <div className={styles.header}>
                        <h3 className={styles.title}>
                            {title}
                        </h3>
                            
    
                        <button 
                            className={styles.closeModal}
                            onClick={onClose} 
                            type="button"  
                            aria-label="Close modal"
                        >   
                            x
                        </button>
                    </div>
            
                    <div className={styles.modalBody}>
                        {children}
                    </div>
                </div>
    
            </div>
        </div>, document.getElementById('modal-root')
    )
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    children: PropTypes.node,
    id: PropTypes.string,
}

export default Modal;