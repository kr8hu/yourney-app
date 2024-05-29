//Components
import Pad from './Pad';

//Interfaces
import LaunchpadOption from '../../interfaces/LaunchpadOption';

//Styles
import styles from './Launchpad.module.css';


/**
 * Props
 * 
 */
interface Props {
    className?: any;
    options: Array<LaunchpadOption>;
}


/**
 * Launchpad
 * 
 * Választási lehetőségeket megjelenítő komponens
 * 
 * @returns 
 */
function Launchpad({ className, options }: Props) {
    /**
     * classNames
     * 
     */
    const classNames = `${styles.container} ${className}`;


    /**
     * renderPads
     * 
     * @returns 
     */
    const renderPads = () => {
        return options.map((option: LaunchpadOption, idx: number) => {
            return (
                <div
                    key={idx}
                    className={styles.col}>
                    <Pad
                        icon={option.icon}
                        text={option.text}
                        onClick={option.onClick} />
                </div>
            )
        })
    }


    return (
        <div className={classNames}>
            <div className={styles.row}>
                {renderPads()}
            </div>
        </div>
    )
}

export default Launchpad;
