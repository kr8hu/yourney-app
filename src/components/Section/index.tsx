//React
import React from 'react';

//Onsen UI
import { Modifiers_string } from 'react-onsenui';

//Components
import SectionHeader from './SectionHeader';

//Styles
import styles from './Section.module.css';


/**
 * Props 
 * 
 */
interface Props {
    className?: any;
    title?: string | React.ReactNode;
    icon?: string | Modifiers_string | undefined;
    children?: React.ReactNode;
    render?: any;
}


/**
 * Section 
 * 
 * @returns
 */
function Section(props: Props) {
    /**
     * classNames
     * 
     */
    const classNames = `${styles.body} ${props.className}`;


    /**
     * externalContent
     * 
     * Olyan tartalom, amit nem a children prop keresztül kap a komponens.
     */
    const externalContent = props.render && props.render();


    return (
        <div className={styles.container}>
            {props.title && (
                <SectionHeader
                    icon={props.icon}
                    title={props.title.toString()} />
            )}
            <div className={classNames}>
                {externalContent}
                {props.children}
            </div>
        </div>
    )
}

export default Section;
