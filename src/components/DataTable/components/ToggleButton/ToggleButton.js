import React, { useMemo, useCallback } from 'react';
import './ToggleButton.css';

function ToggleButton(props) {
    const className = useMemo(() => {
        return `toggle-button` + (props.active ? ' active' : '');
    }, [ props.active ]);

    const clickHandler = useCallback(() => {
        const newState = !props.active;
        if (props.onChange && typeof props.onChange === 'function') {
            props.onChange(newState);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ props.active, props.onChange ]);
    return (
        <button
            className={className}
            type="button"
            onClick={clickHandler}
        >
            { props.active ? props.activeLabel : props.label }
        </button>
    );
}

export default ToggleButton;