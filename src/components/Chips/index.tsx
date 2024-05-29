//React
import {
    useState,
    useEffect,
} from 'react';

//Components
import Chip from './Chip';

//Interfaces
import IChip from '../../interfaces/Chip';

//Styles
import styles from './Chips.module.css';
import { sortByProperty } from '../../shared/utils';


/**
 * Props 
 * 
 */
interface Props {
    data: Array<IChip>;
    onChange?: (value: any) => void;
}


/**
 * Chips 
 * 
 * Kis méretű, kompakt elemeket megjelenítő komponens
 * 
 * @returns
 */
function Chips({ data, onChange }: Props) {
    //States
    const [selected, setSelected] = useState<any>(data.sort(sortByProperty("label", false))[0].value);


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
            //Kijelölt elem állapota
            const isSelected = chip.value === selected;

            return (
                <Chip
                    key={idx}
                    label={chip.label}
                    value={chip.value}
                    selected={isSelected}
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
