import React, { useState, useEffect } from 'react';
import styles from './Select.module.scss';
import { IconClose } from '@mbkit/icon';
import { Text } from '@mbkit/typography';
import { MultiSelectOption } from './MultiSelect';

interface IMultiSelectPillsProps {
    isOpen: boolean;
    options: MultiSelectOption[];
    onClose: (option: MultiSelectOption) => void;
}

const MultiSelectPills = (props: IMultiSelectPillsProps) => {

    const { isOpen, options, onClose } = props;

    const [pills, setPills] = useState<MultiSelectOption[]>([]);

    useEffect(() => {
        let clonedPills: MultiSelectOption[] = [...pills];
        pills.forEach((p, index) => {
            options.forEach(o => {
                if (o.id === p.id && o.checked !== p.checked) {
                    if ((o.checked !== 'mixed' && p.checked === 'mixed')
                        || (o.checked === 'mixed' && p.checked !== 'mixed')
                        || (o.checked === false && p.checked === true)) {
                        clonedPills.forEach(c => {
                            if (c.id === p.id) {
                                c.checked = o.checked;
                            }
                        })
                    } else if (o.checked === true && p.checked === false) {
                        clonedPills = clonedPills.filter(c => c.id !== p.id);
                        clonedPills.push(o);
                    }
                }
            })
        })

        if (pills.length === 0) {
            clonedPills = options;
        }
        setPills(clonedPills);
    }, [options])

    return (
        <div
            className={styles.multiSelectPillsWrapper}
            style={{
                marginBottom: isOpen ? 10 : 0
            }}
        >
            {
                pills.map((option, index) => {
                    if (option.checked === true && option.id.split('-')[0] !== '0') {
                        return (
                            <div key={option.id} className={styles.multiSelectPill}>
                                <Text className={styles.multiSelectPillLabel}>
                                    {option.label}
                                </Text>
                                <IconClose
                                    width={20}
                                    height={32}
                                    className={styles.multiSelectPillClose}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.nativeEvent.stopImmediatePropagation();
                                        onClose({ ...option, checked: false });
                                    }}
                                />
                            </div>
                        )
                    } else {
                        return <React.Fragment key={option.id} />
                    }
                })
            }
        </div>
    );
}

export default MultiSelectPills;