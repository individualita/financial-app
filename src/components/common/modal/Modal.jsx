import { createPortal } from 'react-dom';

import styles from './modal.module.scss';


const Modal = ({ onClose, title, children, id} ) => {

    return createPortal (
        <div className={styles.modal} id={id}>
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
            
                    <div className="modal__body">
                        {children}
                    </div>
                </div>
    
            </div>
        </div>, document.getElementById('modal-root')
    )
}

export default Modal;