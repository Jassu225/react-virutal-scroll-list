import React from 'react';
import './Header.css';

function Header(props) {
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

    const onSelectAllChange = (event) => {
        
    }

    return (
        <div className="data-table-header-container">
            <div className="data-table-header">
                <div className="data-table-header-checkbox">
                    <input type="checkbox"></input>
                </div>
                <div className="data-table-header-cells">
                    { columns }
                </div>
            </div>
        </div>
    );
}

export default Header;