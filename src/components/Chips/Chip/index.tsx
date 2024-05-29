//Components
import Text from '../../Text';

//Styles
import styles from './Chip.module.css';


/**
 * Props
 * 
 */
interface Props {
    label: string;
    value: any;
    selected?: boolean;
    onClick?: (value: any) => void;
}


/**
 * Chip
 * 
 * @returns 
 */
function Chip({ label, value, selected, onClick }: Props) {
    /**
     * onClickHandler
     * 
     * @returns 
     */
    const onClickHandler = () => {
        if(!onClick) return;

        onClick(value);
    }


    return (
        <div
            className={styles.container}
            data-selected={selected}
            onClick={() => onClickHandler()}>
            <Text className={styles.text}>
                {label}
            </Text>
        </div>
    )
}

export default Chip;
