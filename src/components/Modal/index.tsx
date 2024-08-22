//React
import {
    useContext,
    CSSProperties,
} from 'react';

//Onsen UI
import {
    GestureDetector
} from 'react-onsenui';

//Context
import { ModalContext } from '../../context/Modal';

//Components
import CloseButton from './CloseButton';

//Shared
import { actionTypes } from '../../shared/const';

//Styles
import styles from './Modal.module.css';


/**
 * Modal
 * 
 * @returns 
 */
function Modal() {
    //Context
    const { modalState, setModalState } = useContext(ModalContext);


    /**
     * modalTop
     * 
     */
    const modalTop = !modalState.status ? `calc(100vh + 5rem)` : `calc(100vh - ${modalState.height}vh)`;


    /**
     * modalHeight
     * 
     */
    const modalHeight = `calc(100% - (100vh - ${modalState.height}vh))`;


    /**
     * modalStyle
     * 
     */
    const modalStyle: CSSProperties = {
        height: modalHeight,
        top: modalTop
    }


    /**
     * closeModal
     * 
     */
    const closeModal = () => {
        setModalState(actionTypes.modal.SET_MODAL_STATUS, false);
    }


    /**
     * renderChildren
     */
    const renderChildren = () => (modalState.component ? <modalState.component /> : null);


    return (
        <div
            className={styles.container}
            style={modalStyle}>
            <GestureDetector
                className={styles.gestureDetector}
                onSwipeDown={closeModal}>
                <div className={styles.modal}>
                    {/* Bezáró gomb */}
                    <CloseButton onClick={closeModal} />

                    {/* Modal tartalma */}
                    {renderChildren()}
                </div>
            </GestureDetector>
        </div>
    )
}

export default Modal;
