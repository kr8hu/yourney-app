//Assets
import { useState } from "react";
import avatar from "../../assets/images/main/profile.jpg";

//Styles
import styles from "./Avatar.module.css";


/**
 * Props
 * 
 */
interface Props {
    className?: any;
    src: string | undefined;
}


/**
 * Avatar
 * 
 * 
 * @param props 
 * @returns 
 */
function Avatar({ className, src }: Props) {
    //States
    const [loaded, setLoaded] = useState<boolean>(false);
    const [source, setSource] = useState<any>(src);


    /**
     * onLoadHandler
     */
    const onLoadHandler = () => {
        if (!loaded) {
            setLoaded(true);
            setSource(src);
        }
    }


    /**
     * onErorrHandler
     */
    const onErorrHandler = () => {
        setSource(avatar);
    }


    return (
        <div className={`${styles.container} ${className}`}>
            <img
                className={styles.image}
                src={source}
                onLoad={onLoadHandler}
                onError={onErorrHandler}
                alt="Profilkép" />
        </div>
    )
}

export default Avatar;
