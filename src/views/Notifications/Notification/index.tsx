//React
import { useContext } from 'react';

//Context
import { AppContext } from '../../../context/App';

//Onsen UI
import {
    Icon,
    ListItem
} from "react-onsenui";

//Components
import Text from "../../../components/Text";

//Styles
import styles from "./Notification.module.css";


/**
 * Interfaces
 * 
 */
interface Props {
    index: number;
}


/**
 * Notification
 * 
 * @returns 
 */
function Notification({ index }: Props) {
    //Context
    const { appState } = useContext(AppContext);


    /**
     * isSystemMessage
     * 
     */
    const isSystemMessage = (appState.notifications[index].sender === "-1");


    return (
        <ListItem
            key={index}
            expanded={false}
            expandable={true}>
            {/* Ikon */}
            <div className="left">
                <Icon
                    className={styles.icon}
                    icon={{
                        default: isSystemMessage ? "fa-info" : "fa-user"
                    }}
                    fixedWidth />
            </div>

            {/* Értesítés cím és tárgy */}
            <div className="center">
                {/* Cím */}
                <Text
                    className={`${styles.title} list-item__title`}>
                    {isSystemMessage ? "Rendszerüzenet" : appState.notifications[index].sender}
                </Text>

                {/* Tárgy */}
                <Text className={`${styles.subtitle} list-item__subtitle`}>
                    {appState.notifications[index].subject}
                </Text>
            </div>

            {/* Üzenet */}
            <div className={`expandable-content`}>
                <Text className={styles.message}>
                    {appState.notifications[index].message}
                </Text>
            </div>
        </ListItem>
    )
}

export default Notification;
