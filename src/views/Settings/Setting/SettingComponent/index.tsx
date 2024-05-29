//Onsen UI
import { 
    Icon, 
    Switch, 
    SwitchChangeEvent 
} from "react-onsenui";

//Styles
import styles from './SettingComponent.module.css';


/**
 * Props
 * 
 */
interface Props {
    type: string | undefined;
    value?: any;
    onChange?: (value: SwitchChangeEvent) => void
}


/**
 * SettingComponent
 * 
 * @param 
 */
function SettingComponent({ type, value, onChange }: Props) {
    switch (type) {
        case "switch":
            return (
                <Switch
                    checked={JSON.parse(value)}
                    onChange={onChange} />
            )
        case "link": {
            return (
                <Icon
                    className={styles.icon}
                    icon={{
                        default: "fa-chevron-right"
                    }} />
            )
        }
        default:
            return null
    }
}

export default SettingComponent;
