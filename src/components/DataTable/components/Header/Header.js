import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Header.css';
import { selectAll, deselectAll } from '../../../../store/actions';
import { areAllSelected } from '../../../../store/getters';

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

    const onSelectAllChange = useCallback((event) => {
        if (event.target.checked) {
            dispatch(selectAll());
        } else {
            dispatch(deselectAll());
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="data-table-header-container">
            <div className="data-table-header">
                <div className="data-table-header-checkbox">
                    <input type="checkbox" checked={isSelectAllActive} onChange={onSelectAllChange}></input>
                </div>
                <div className="data-table-header-cells">
                    { columns }
                </div>
            </div>
        </div>
    );
}

export default Header;