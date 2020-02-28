import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Header.css';
import { selectAll, deselectAll } from '../../../../store/actions';
import { areAllSelected } from '../../../../store/getters';
import ToggleButton from '../ToggleButton/ToggleButton';

function Header(props) {
    const dispatch = useDispatch();
    const columns = props.columns.map((column) => {
        const style = {
            width: column.width,
        };
        return (
            <div
                className="data-table-header-cell"
                style={style}
                key={column.id}
            >
                { column.label }
            </div>
        );
    });

    const isSelectAllActive = useSelector(state => areAllSelected(state));

    const onSelectAllChange = useCallback((isActive) => {
        if (isActive) {
            dispatch(selectAll());
        } else {
            dispatch(deselectAll());
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    return (
        <div className="data-table-header-container">
            <div className="data-table-header">
                <div className="data-table-header-cells">
                    { columns }
                </div>
                <div className="data-table-header-selectAll">
                    {/* <input type="checkbox" checked={isSelectAllActive} onChange={onSelectAllChange}></input> */}
                    <ToggleButton
                        active={isSelectAllActive}
                        activeLabel="Remove All"
                        label="Select All"
                        onChange={onSelectAllChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default Header;