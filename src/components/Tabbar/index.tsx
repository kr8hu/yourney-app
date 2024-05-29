//React
import { useEffect, useState } from 'react';

//Components
import TabButton from './TabButton';

//Interfaces
import ITabButton from '../../interfaces/TabButton';

//Styles
import styles from './Tabbar.module.css';


/**
 * Props 
 * 
 */
interface Props {
    tabs: any;
    center?: ITabButton;
    onChange: any;
}


/**
 * Tabbar
 *  
 * @returns
 */
function Tabbar({ tabs, center, onChange }: Props) {
    /**
     * width
     * 
     * Szélesség kiszámítása
     */
    const width = center ? "42.5%" : "50%";


    //State
    const [active, setActive] = useState<number>(0);


    useEffect(() => {
        onChange(active);
        //eslint-disable-next-line
    }, [active]);


    /**
     * changeActiveTab
     * 
     * @param id 
     */
    const changeActiveTab = (id: number) => {
        setActive(id);
    }


    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                {/* Bal oldali rész */}
                <div
                    className={styles.left}
                    style={{ width }}>
                    <div className={styles.innerrow}>
                        {tabs.left.map((tab: any) => {
                            return (
                                <TabButton
                                    key={tab.id}
                                    icon={tab.icon}
                                    active={tab.id === active}
                                    onClick={() => changeActiveTab(tab.id)} />
                            )
                        })}
                    </div>
                </div>

                {/* Középső rész */}
                {center && (
                    <div className={styles.center}>
                        <div className={styles.innerrow}>
                            <TabButton
                                highlighted
                                icon={center.icon}
                                onClick={() => center.onClick()} />
                        </div>
                    </div>
                )}

                {/* Jobb oldali rész */}
                <div
                    className={styles.right}
                    style={{ width }}>
                    <div className={styles.innerrow}>
                        {tabs.right.map((tab: any) => {
                            return (
                                <TabButton
                                    key={tab.id}
                                    icon={tab.icon}
                                    active={tab.id === active}
                                    onClick={() => changeActiveTab(tab.id)} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tabbar;
