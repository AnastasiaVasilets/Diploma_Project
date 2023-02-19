import React from "react";
import debounce from 'lodash.debounce';
import {FiSearch} from 'react-icons/fi';
import {GrClose} from 'react-icons/gr';

import styles from './search.module.css';
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice";

const Search: React.FC = () => {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState<string>('');
    const [search, setSearch] = React.useState<boolean|string>('none');
    const inputRef = React.useRef<HTMLInputElement>(null);

    const onClickClear = () => {
        dispatch(setSearchValue(''))
        setValue('');
        inputRef.current ?.focus();
    }

    const updateSearchValue = React.useCallback(
        debounce((string: string) => {
            dispatch(setSearchValue(string))
        }, 500),
        []
    )

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        updateSearchValue(event.target.value);
    }

    return (
        <div className={styles.wrap}> 
            <input 
                ref={inputRef}
                value={value} 
                style={{display: search ? "none" : "inline-block"}} 
                onChange={onChangeInput} 
                className={styles.input} 
                placeholder="Search dishes..."/>
            {value && (
                <GrClose className={styles.clear_logo}
                    onClick={onClickClear} 
                    style={{display: search ? "none" : "inline-block"}}/>
                )}
            
            <span className={styles.icons} onClick={()=>{setSearch(!search)}}><FiSearch className={styles.search_logo}/></span>
        </div>
    )
}

export default Search