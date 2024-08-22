//Styles
import styles from './Pagination.module.css';


/**
 * Interfaces
 */
interface Props {
    selected: number;
    length: number;
}


/**
 * Pagination
 * 
 * @returns 
 */
function Pagination({ selected, length }: Props) {
    /**
     * bullets
     * 
     */
    const bullets = Array.from(Array(length));

    return (
        <div className={styles.container}>
            <div className={styles.pagination}>
                {bullets.map((_: any, idx: number) => {
                    return (
                        <div
                            key={idx}
                            className={styles.bullet}
                            data-active={idx === selected} />
                    )
                })}
            </div>
        </div>
    )
}

export default Pagination;
