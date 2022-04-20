import React, { FC, MouseEvent, AllHTMLAttributes, useState, useEffect, useRef, ReactNode } from 'react';
import classnames from 'classnames';
import nanoid from 'nanoid';
import styles from './Select.module.scss';
import { MultiSelectItem } from './MultiSelectItem';
import MultiSelectPills from './MultiSelectPills';
import { Input } from '@mbkit/input';
import { InputProps } from '@mbkit/input/dist/cjs/Input';
import { IconClose,IconSearch } from '@mbkit/icon';
import { Text } from '@mbkit/typography';

interface IMultiSelectSearchProps {
    filteredInput: string;
    setFilteredInput: (value: string) => void;
    clearFilter: () => void;
    searchInputProps: Partial<InputProps>;
}

const MultiSelectSearch = (props: IMultiSelectSearchProps) => {

    const {
        filteredInput,
        setFilteredInput,
        clearFilter,
        searchInputProps
    } = props;

    return (
        <div className={styles.searchInputContainer}>
            <div className={styles.inputContainer}>
                
                <Input className={styles.searchIcon}
                placeholder="Search"
                    value={filteredInput}
                    onChange={(e) => setFilteredInput(e.target.value)}
                    {...searchInputProps}
                />
                
                <button
                    className={classnames({
                        [styles.clearButton]: true,
                        [styles.clearButtonVisible]: filteredInput.length > 0,
                    })}
                    onClick={clearFilter}
                    type="button"
                >
                    <IconClose size={1} width="28px" height="28px" />
                </button>
            </div>
        </div>
    )
}

export default MultiSelectSearch;