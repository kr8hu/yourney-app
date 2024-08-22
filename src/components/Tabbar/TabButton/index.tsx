//Onsen UI
import { Icon } from 'react-onsenui';

//Styles
import styles from './TabButton.module.css';


/**
 * Interfaces
 * 
 */
interface Props {
    active?: boolean;
    highlighted?: boolean;
    icon: string;
    onClick: () => void;
}


/**
 * TabButton
 * 
 * @returns 
 */
function TabButton({ active, highlighted, icon, onClick }: Props) {
    return (
        <div
            className={styles.container}
            data-active={active}
            data-highlighted={highlighted}
            onClick={onClick}>
            {/* Kiemelés */}
            {highlighted && (
                <div className={styles.layer}>
                    <div className={styles.shape} />
                </div>
            )}

            <Icon
                className={styles.icon}
                icon={icon}
                fixedWidth />
        </div>
    )
}

export default TabButton;
