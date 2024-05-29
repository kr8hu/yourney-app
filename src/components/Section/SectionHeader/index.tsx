//Onsen UI
import {
    Icon,
    Modifiers_string
} from 'react-onsenui';

//Components
import Text from '../../Text';

//Styles
import styles from './SectionHeader.module.css';


/**
 * Props
 * 
 */
interface Props {
    icon: string | Modifiers_string | undefined;
    title: string;
}


/**
 * SectionHeader
 * 
 * @returns 
 */
function SectionHeader({ icon, title }: Props) {
    /**
     * isTextNode
     * 
     * A title ha tartalmaz alulvonást akkor egy node-ként értelmezendő.
     */
    const isTextNode = title?.toString().includes("_");


    /**
     * iconColumnStyles
     * 
     */
    const iconColumnStyles = {
        maxWidth: '10%'
    };


    /**
     * titleColumnStyles
     * 
     */
    const titleColumnStyles = {
        maxWidth: '90%'
    };


    return (
        <div className={styles.container}>
            {/* Ikon */}
            {icon && (
                <div
                    className={styles.col}
                    style={iconColumnStyles}>
                    <Icon
                        className={styles.icon}
                        icon={icon}
                        fixedWidth />
                </div>
            )}
            
            {/* Cím */}
            <div
                className={styles.col}
                style={titleColumnStyles}>
                <Text
                    className={styles.title}
                    node={isTextNode && title}>
                    {!isTextNode && title}
                </Text>
            </div>
        </div>
    )
}

export default SectionHeader;
