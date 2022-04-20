import React, { FC, MouseEvent, AllHTMLAttributes, useState, useEffect, useRef, ReactNode } from 'react';
import classnames from 'classnames';
import nanoid from 'nanoid';
import styles from './Select.module.scss';
import { MultiSelectItem } from './MultiSelectItem';
import MultiSelectPills from './MultiSelectPills';
import MultiSelectSearch from './MultiSelectSearch';
import { InputProps } from '@mbkit/input/dist/cjs/Input';

export type MultiSelectOption = {
    label: string;
    checked: boolean | 'mixed';
    id: string;
};
export type MultiSelectProps = Omit<AllHTMLAttributes<HTMLDivElement>, "onChange"> & {
    /** Label to be displayed above the select field */
    label: string;
    /** object with the properties of "label", "checked", "id" */
    options: MultiSelectOption[];
    /** Will be fired when user selects an option */
    onChange: (options: MultiSelectOption[]) => void;
    /** Placeholder of multi select input */
    placeholder?: string;
    /** If true it will display search input when the user focuses on select field */
    useSearchInput?: boolean;
    /** search input props */
    searchInputProps?: Partial<InputProps>;
    /** Tooltip for multi-select */
    tooltip?: ReactNode;
    /** Shows the selected items as pills/tags */
    showPills?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const noop = (args: any) => {};

export const MultiSelect: FC<MultiSelectProps> = (props: MultiSelectProps) => {
    const {
        options,
        label,
        showPills = true,
        tooltip,
        onChange,
        className = '',
        placeholder = 'Select option(s)',
        onClick = noop,
        useSearchInput = false,
        searchInputProps = {},
        ...rest
    } = props;

    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);
    const selectButtonRef = useRef<HTMLDivElement>(null);
    const selectItemsRef = useRef<HTMLDivElement>(null);

    function handleSelectClick(e: MouseEvent<HTMLDivElement>) {
        onClick(e);
        const clickedItemInside = selectItemsRef.current && !selectItemsRef.current.contains(e.target as HTMLElement);
        if (isOpen && useSearchInput) {
            return;
        }
        if (clickedItemInside) {
            setIsOpen(!isOpen);
        }
    }

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('click', handleWatchClick);
            document.addEventListener('keydown', handleWatchKeyDown);
        } else {
            document.removeEventListener('click', handleWatchClick);
            document.removeEventListener('keydown', handleWatchKeyDown);
        }
        return () => {
            document.removeEventListener('click', handleWatchClick);
            document.removeEventListener('keydown', handleWatchKeyDown);
        };
    }, [isOpen]);

    function handleWatchClick(event: Event) {
        const select = selectRef.current;
        if (select) {
            if (!select.contains(event.target as HTMLElement)) {
                setIsOpen(false);
            }
        }
    }
    function handleWatchKeyDown(event: KeyboardEvent | React.KeyboardEvent<HTMLDivElement>) {
        switch (event.key) {
            case 'ArrowDown':
            case 'ArrowUp':
                event.stopPropagation();
                event.preventDefault();
                if (!isOpen) {
                    setIsOpen(true);
                }
                handleChangeFocusOfItems(event.key);
                break;
            case 'Escape':
                setIsOpen(false);
                if (selectButtonRef.current) {
                    selectButtonRef.current.focus();
                }
                break;
            case 'Tab':
                // setting timeout so the dom has time to change activeElement after tab was pressed
                // otherwise activeElement is still same element that triggered the change
                setTimeout(() => {
                    const select = selectRef.current;
                    if (select && !select.contains(document.activeElement)) {
                        setIsOpen(false);
                    }
                }, 1);
                break;
            case 'Home':
            case 'End':
                event.preventDefault();
                handleChangeFocusOfItems(event.key);
                break;
            default:
                break;
        }
    }
    // Manages whether it should open/close when user is focused on select element
    function handleSelectWatchKeyDown(event: KeyboardEvent | React.KeyboardEvent<HTMLDivElement>) {
        switch (event.key) {
            case 'ArrowDown':
            case 'ArrowUp':
                if (!isOpen) {
                    event.preventDefault();
                    setIsOpen(true);
                }
                break;
            case 'Enter':
            case ' ':
                setTimeout(() => {
                    const isSelectButton = document.activeElement === selectButtonRef.current;
                    if (isSelectButton) {
                        setIsOpen(!isOpen);
                    }
                }, 1);
                break;
            default:
                break;
        }
    }
    function handleChangeFocusOfItems(direction: 'ArrowUp' | 'ArrowDown' | 'Home' | 'End') {
        // setting timeout so the dom has time to change activeElement after tab was pressed
        // otherwise activeElement is still same element that triggered the change
        setTimeout(() => {
            const currentEl = document.activeElement as Element;
            const children =
                (selectButtonRef.current &&
                    Array.from(selectButtonRef.current.querySelectorAll('input[data-multiselect-item]'))) ||
                [];

            const getChildAsElement = (index: number) => children[index] as HTMLElement;

            if (children.length >= 1 && currentEl) {
                const currentIndex = children.indexOf(currentEl);
                switch (direction) {
                    case 'ArrowDown':
                        if (currentIndex + 1 >= children.length || currentIndex === -1) {
                            getChildAsElement(0).focus();
                        } else {
                            getChildAsElement(currentIndex + 1).focus();
                        }
                        break;
                    case 'ArrowUp':
                        if (currentIndex - 1 < 0) {
                            getChildAsElement(children.length - 1).focus();
                        } else {
                            getChildAsElement(currentIndex - 1).focus();
                        }
                        break;
                    case 'Home':
                        getChildAsElement(0).focus();
                        break;
                    case 'End':
                        getChildAsElement(children.length - 1).focus();
                        break;
                }
            }
        }, 1);
    }

    const selectId = `select-${nanoid()}`;
    const labelId = `label-${nanoid()}`;

    const selectClassNames = classnames({
        [styles.select]: true,
        [className]: className,
        [styles.isOpen]: isOpen,
    });
    const selectMenuClassNames = classnames({
        [styles.multiSelectMenu]: true,
        [styles.isOpen]: isOpen,
    });
    const checkedOptions = options.filter((opt) => {
        if (opt.checked === true) {
            return opt;
        }
        return null;
    });
    const activeDescendants = checkedOptions.map((option) => option.id).join(' ');
    const activeLabels = checkedOptions
        .map((option, index) => {
            const useComma = index + 1 >= checkedOptions.length ? '' : ',';
            return `${option.label}${useComma}`;
        })
        .join(' ');
    const placeholderClassNames = classnames({
        [styles.selectPlaceholderLabel]: true,
        [styles.placeholder]: activeLabels.trim().length === 0,
        [styles.multiSelectPillsScroll]: showPills,
    });

    const [filteredInput, setFilteredInput] = useState('');
    useEffect(() => {
        if (!isOpen) {
            setFilteredInput('');
        }
    }, [isOpen]);

    const filteredOptions = options.filter((o) => (o.label || '').toLowerCase().includes(filteredInput.toLowerCase()));
    const clearFilter = () => setFilteredInput('');

    const handleChange = (option: MultiSelectOption) => {
        const newOptions = [...options.map(o => ({...o}))];
        newOptions.forEach(no => {
            if (option.id === no.id) {
                no.checked = option.checked
            }
        })
        onChange(newOptions);
    }

    return (
        <div ref={selectRef} className={styles.multiSelectContainer}>
            <div id={labelId} className={styles.label}>
                {label}
                {tooltip}
            </div>
            <div
                ref={selectButtonRef}
                id={selectId}
                className={selectClassNames}
                onClick={handleSelectClick}
                onKeyDown={handleSelectWatchKeyDown}
                tabIndex={0}
                role="listbox"
                aria-roledescription="multi select"
                aria-expanded={isOpen}
                aria-labelledby={labelId}
                aria-activedescendant={activeDescendants}
                aria-multiselectable="true"
                {...rest}
            >
                {showPills &&
                    <>
                        <div className={placeholderClassNames}>
                        {options && options.filter(p => p.checked && p.id.split('-')[0] !== '0').length ?
                            <MultiSelectPills
                                isOpen={isOpen}
                                options={options}
                                onClose={handleChange}
                            /> :
                            <>
                                {!isOpen && <>{placeholder}</>}
                            </>
                        }
                        </div>
                        {isOpen && useSearchInput && (
                            <MultiSelectSearch
                                filteredInput={filteredInput}
                                setFilteredInput={setFilteredInput}
                                clearFilter={clearFilter}
                                searchInputProps={searchInputProps}
                            />
                        )}
                    </>
                }
                {!showPills &&
                    <div className={placeholderClassNames}>
                        {isOpen && useSearchInput ? (
                        <MultiSelectSearch
                            filteredInput={filteredInput}
                            setFilteredInput={setFilteredInput}
                            clearFilter={clearFilter}
                            searchInputProps={searchInputProps}
                        />
                    ) : (
                        activeLabels.trim() || placeholder
                    )}
                </div>
                }

                <div className={selectMenuClassNames} ref={selectItemsRef}>
                    {filteredInput.length > 0 && filteredOptions.length > 0 && (
                        <div className={`${styles.label} ${styles.filteredOptionsCount}`}>
                            Showing {filteredOptions.length}/{options.length}
                        </div>
                    )}
                    {filteredOptions.map((option, index) => (
                        <MultiSelectItem
                            {...option}
                            aria-posinset={index + 1}
                            aria-setsize={options.length}
                            key={option.id}
                            onChange={() => handleChange({ ...option, checked: !option.checked })}
                            aria-controls={selectId}
                        />
                    ))}
                    {filteredOptions.length === 0 && (
                        <div className={`${styles.label} ${styles.noResults}`}>No results found</div>
                    )}
                </div>
            </div>
        </div>
    );
};
MultiSelect.displayName = 'MultiSelect';
