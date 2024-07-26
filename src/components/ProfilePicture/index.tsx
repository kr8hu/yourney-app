//React
import { useState } from "react";

//Assets
import avatar from "../../assets/images/main/profile.jpg";

//Styles
import styles from "./ProfilePicture.module.css";


/**
 * Props
 * 
 */
interface Props {
    className?: any;
    src: string | undefined;
}


/**
 * ProfilePicture
 * 
 * 
 * @param props 
 * @returns 
 */
function ProfilePicture({ className, src }: Props) {
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

export default ProfilePicture;
