//React
import {
    useState,
    useEffect
} from 'react';

//Styles
import styles from './Text.module.css';


/**
 * Interfaces 
 * 
 */
interface Props {
    className?: any;
    children?: any;
    node?: any;
    style?: any;
    onClick?: () => void;
}


/**
 * Text 
 * 
 * @returns
 */
function Text(props: Props) {
    /**
     * classNames
     * 
     */
    const classNames = `${styles.container} ${props.className}`;


    //State
    const [text, setText] = useState<string>("");


    useEffect(() => {
        if (props.node === undefined || props.node === null) return;

        let x, xmldoc;

        const parser = new DOMParser();
        const src = `${localStorage.getItem('Yourney_strings')}`;

        xmldoc = parser.parseFromString(src, "text/xml");
        x = xmldoc.getElementsByTagName('string');

        for (let i = 0; i < x.length; i++) {
            if (props.node === x[i].getAttribute('name')) {
                setText(`${x[i].textContent}`);
                break;
            }
        }
    }, [props.node]);


    return (
        <span
            className={classNames}
            onClick={() => props.onClick ? props.onClick() : null}
            style={props.style}>
            {props.children || text}
        </span>
    )
}

export default Text;