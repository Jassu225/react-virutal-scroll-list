import React, { useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Row.css';
import { addToSelections, removeFromSelections } from '../../../../../store/actions';
import { getSelections } from '../../../../../store/getters';
import { CSSTransition } from 'react-transition-group';
import ToggleButton from '../../ToggleButton/ToggleButton';

function Row(props) {
    const dispatch = useDispatch();
    const rowEl = useRef();
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
        // console.log(selectionList);
        return selectionList.includes(props.data.id);
    }, [props.data.id, selectionList]);
    // onRowClick
    const onClick = () => {

    };

    const onSelectionChange = (isActive) => {
        // console.log(event.target.checked);
        if (isActive) {
            dispatch(addToSelections(props.data.id));
        } else {
            dispatch(removeFromSelections(props.data.id));
        }
        props.onSelectionChange(rowEl, props.data, props.index);
    };
    return (
        <div
            className="custom-scroll-list-row-container"
            style={style}
            onClick={onClick}
        >
            <CSSTransition
                classNames="custom-scroll-list-row"
                timeout={500}
                in={true}
                appear={true}
                exit={false}
            >
                <div
                    className="custom-scroll-list-row"
                    key={props.data.id}
                    ref={rowEl}
                >
                    <div className="custom-scroll-list-row-cells">
                        { cells }
                    </div>
                    <div className="custom-scroll-list-row-checkbox">
                        {/* <input type="checkbox" checked={isSelected} onChange={onSelectionChange} /> */}
                        <ToggleButton
                            active={isSelected}
                            activeLabel="Remove"
                            label="Select"
                            onChange={onSelectionChange}
                        />
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
}

export default Row;