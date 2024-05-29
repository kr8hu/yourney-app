//React
import {
    CSSProperties,
    useContext
} from 'react';

//Context
import { AppContext } from '../../context/App';

//Onsen UI
import { Icon } from 'react-onsenui';

//Views
import Settings from '../../views/Settings';
import Notifications from '../../views/Notifications';

//Components
import Text from '../Text';

//Interfaces
import ToolbarButton from '../../interfaces/ToolbarButton';

//Styles
import styles from './Toolbar.module.css';


/**
 * Props 
 * 
 */
interface Props {
    text: string;
    fixed?: boolean;
    buttons?: any;
}


/**
 * Toolbar 
 * 
 * @returns
 */
function Toolbar(props: Props) {
    //Context
    const { appState } = useContext(AppContext);


    /**
     * Buttons
     * 
     */
    const toolbarButtons: Array<ToolbarButton> = [
        {
            icon: "fa-bell",
            onClick: () => appState.navigator.pushPage({ component: Notifications })
        },
        {
            icon: "fa-gear",
            onClick: () => appState.navigator.pushPage({ component: Settings })
        }
    ];


    /**
     * titleStyles
     */
    const titleStyles: CSSProperties = {
        fontSize: props.text.length >= 15 ? "1.8rem" : "2rem"
    }


    /**
     * renderButtons
     * 
     * @returns 
     */
    const renderButtons = () => {
        const src = props.buttons ?? toolbarButtons;

        return src.map((button: ToolbarButton) => {
            return (
                <div
                    className={styles.col}
                    onClick={button.onClick}>
                    <Icon
                        className={styles.icon}
                        icon={{
                            default: button.icon
                        }}
                        fixedWidth />
                </div>
            )
        });
    }


    return (
        <>
            <div
                className={styles.container}
                data-fixed={props.fixed}>
                <div className={styles.row}>
                    <div className={styles.col}>
                        <Text
                            className={styles.text}
                            node={props.text.includes("_") && props.text}
                            style={titleStyles}>
                            {!props.text.includes("_") && props.text}
                        </Text>
                    </div>
                    <div className={styles.col}>
                        <div className={styles.buttons}>
                            {renderButtons()}
                        </div>
                    </div>
                </div>
                {props.fixed && (
                    <div className={styles.gradient} />
                )}
            </div>

            {props.fixed && (
                <div className={styles.separator} />
            )}
        </>
    )
}

export default Toolbar;
