import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Row.css';
import { addToSelections, removeFromSelections } from '../../../../../store/actions';
import { getSelections } from '../../../../../store/getters';

function Row(props) {
    const dispatch = useDispatch();
    const cells = props.columns.map((column) => {
        const style = {
            width: column.width,
            textAlign: column.numeric ? 'right' : 'left',
        };
        return (
            <div
                className="custom-scroll-list-row-cell"
                style={style}
                key={column.id}
            >
                { props.data[column.id] || 'n/a' }
            </div>
        );
    });
    const style = {
        height: props.height + 'px',
        left: 0,
        top: props.index * props.height + 'px',
    };

    const selectionList = useSelector(state => getSelections(state));
    
    const isSelected = useMemo(() => {
        console.log(selectionList);
        return selectionList.includes(props.data.id);
    }, [props.data.id, selectionList]);
    // onRowClick
    const onClick = () => {

    };

    const onSelectionChange = (event) => {
        // console.log(event.target.checked);
        if (event.target.checked) {
            dispatch(addToSelections(props.data.id));
        } else {
            dispatch(removeFromSelections(props.data.id));
        }
        props.onSelectionChange(event.target, props.data, props.index);
    };
    return (
        <div
            className="custom-scroll-list-row-container"
            style={style}
            onClick={onClick}
        >
            <div className="custom-scroll-list-row">
                <div className="custom-scroll-list-row-checkbox">
                    <input type="checkbox" checked={isSelected} onChange={onSelectionChange}></input>
                </div>
                <div className="custom-scroll-list-row-cells">
                    { cells }
                </div>
            </div>
        </div>
    );
}

export default Row;