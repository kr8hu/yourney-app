//React
import { useContext } from "react";

//Context
import { AppContext } from "../../../context/App";

//Onsen UI
import {
    ListItem,
} from "react-onsenui";

//Components
import Text from "../../../components/Text";
import SettingComponent from "./SettingComponent";

//Interfaces
import ISetting from "../../../interfaces/Setting";

//Styles
import styles from './Setting.module.css';


/**
 * Props
 * 
 */
interface Props {
    row: ISetting;
    index: number;
}


/**
 * Setting
 * 
 * @returns 
 */
function Setting({ row, index }: Props) {
    //Context
    const { appState } = useContext(AppContext);


    /**
     * onClick
     * 
     */
    const onClick = () => {
        if (row.component) {
            appState.navigator.pushPage({ component: row.component });
            return;
        }

        if (row.onClick) row.onClick();
    }


    /**
     * renderDefault
     * 
     * @param row 
     * @returns 
     */
    const renderDefault = (row: ISetting) => {
        return (
            <ListItem
                key={index}
                className={styles.listItem}
                onClick={onClick}
                expanded={false}
                expandable={false}
                tappable={false}>
                <div className="left">

                </div>
                <div className="center">
                    <Text
                        style={{ color: row.color }}
                        node={row.textNode} />
                </div>
                <div className="right">
                    <SettingComponent
                        type={row.type}
                        value={row.value}
                        onChange={row.onChange} />
                </div>
            </ListItem>
        )
    }


    /**
     * renderExpandable
     * 
     * @param row 
     * @returns 
     */
    const renderExpandable = (row: ISetting) => {
        return (
            <ListItem
                key={index}
                className={styles.listItem}
                onClick={onClick}
                expanded={false}
                expandable={true}
                tappable={false}>
                <Text
                    style={{ color: row.color }}
                    node={row.textNode} />
                <div className={`expandable-content`}>
                    <Text className={styles.hidden}>
                        {row.value}
                    </Text>
                </div>
            </ListItem>
        )
    }

    return row.type === "expandable" ? renderExpandable(row) : renderDefault(row)
}

export default Setting;