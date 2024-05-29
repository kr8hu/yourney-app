//React
import {
    useContext,
    CSSProperties,
} from 'react';

//Context
import { AppContext } from '../../../context/App';

//Styles
import styles from './PatternLayout.module.css';


/**
 * Props
 * 
 */
interface Props {
    backgroundImage: any;
    fullscreen?: boolean;
    opaque?: boolean;
    children: React.ReactNode;
}


/**
 * PatternLayout
 * 
 * @returns 
 */
function PatternLayout({ backgroundImage, fullscreen, opaque, children }: Props) {
    //Context
    const { appState } = useContext(AppContext);


    /**
     * layerStyles
     * 
     */
    const layerStyles: CSSProperties = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: fullscreen ? 'auto 100%' : '100% auto',
        backgroundPosition: fullscreen ? 'center' : 'bottom',
        opacity: !opaque ? 1 : (fullscreen ? (appState.device?.platform === "web" ? 0.02 : 0.035) : (appState.device?.platform === "web" ? 0.02 : 0.06)),
        filter: !opaque ? 'brightness(0.8)' : 'brightness(1)'
    }


    return (
        <>
            <div
                className={styles.layer}
                style={layerStyles} />
            {children}
        </>
    )
}

export default PatternLayout;
