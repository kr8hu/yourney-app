//React
import { useState } from 'react';

//Components
import Tabbar from '../Tabbar';

//Interfaces
import ITab from '../../interfaces/Tab';
import TabButton from '../../interfaces/TabButton';

//Styles
import styles from './Tabs.module.css';


/**
 * Props 
 * 
 */
interface Props {
    left: any;
    center?: TabButton;
    right: any;
}


/**
 * Tabs 
 *
 * @returns
 */
function Tabs({ left, center, right }: Props) {
    //States
    const [active, setActive] = useState<number>(0);


    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {left.concat(right).map((tab: ITab, idx: number) => {
                    return (
                        <tab.component
                            key={idx}
                            className={`${styles.view} ${tab.id === active ? styles.active : ''}`} />
                    )
                })}
            </div>

            <Tabbar
                tabs={{ left, right }}
                center={center}
                onChange={(value: number) => setActive(value)} />
        </div>
    )
}

export default Tabs;
