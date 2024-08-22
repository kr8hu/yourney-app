//React
import {
    useState,
    useEffect,
} from 'react';

//Components
import Chip from './Chip';

//Interfaces
import IChip from '../../interfaces/Chip';

//Shared
import { sortByProperty } from '../../shared/utils';

//Styles
import styles from './Chips.module.css';


/**
 * Interfaces 
 * 
 */
interface Props {
    data: Array<IChip>;
    onChange?: (value: any) => void;
}


/**
 * Chips 
 * 
 * @returns
 */
function Chips({ data, onChange }: Props) {
    /**
     * orderedData
     */
    const orderedData: Array<IChip> = data.sort(sortByProperty("label", false));


    //States
    const [selected, setSelected] = useState<any>(orderedData[0].value);


    //Effects
    useEffect(() => {
        if (!onChange) return;

        onChange(selected);
        //eslint-disable-next-line
    }, [selected]);



    /**
     * renderChips
     * 
     * @returns 
     */
    const renderChips = () => {
        return data.map((chip: IChip, idx: number) => {
            return (
                <Chip
                    key={idx}
                    label={chip.label}
                    value={chip.value}
                    selected={chip.value === selected}
                    onClick={() => setSelected(chip.value)} />
            )
        })
    }


    return (
        <div className={styles.container}>
            {renderChips()}
        </div>
    )
}

export default Chips;
