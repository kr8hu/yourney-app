//React
import { useContext } from 'react';

//Context
import { ModalContext } from '../../context/Modal';

//Components
import Button from '../Button';
import Text from '../Text';
import Login from '../modals/Login';

//Styles
import styles from './Unauthorized.module.css';


/**
 * Placeholder
 * 
 * @returns 
 */
function Unauthorized() {
    //Context
    const { setModalState } = useContext(ModalContext);


    /**
     * modalHeight
     * 
     */
    const modalHeight = window.innerWidth < 960 ? 70 : 85;


    /**
     * createModal
     */
    const createModal = () => {
        const modalState = {
            status: true,
            height: modalHeight,
            component: Login
        };

        setModalState(modalState);
    }


    return (
        <div className={styles.container}>
            <Text
                className={styles.text}
                node="placeholder_login" />

            <Button
                className={styles.button}
                onClick={createModal}>
                <Text node="button_signin" />
            </Button>
        </div>
    )
}

export default Unauthorized;
