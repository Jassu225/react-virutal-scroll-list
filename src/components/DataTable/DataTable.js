import React from 'react';
import './DataTable.css';
import Header from './components/Header/Header';
import ScrollList from './components/ScrollList/ScrollList';

function DataTable(props) {
    // console.log(props);
    const numericColumnsCount = props.columns.reduce((count, column) => column.numeric ? count + 1 : count, 0);
    const nonNumericColumnsCount = props.columns.length - numericColumnsCount;
    const numericColWidth = 70; //px
    const columns = props.columns.map((column) => {
        let newCol = {...column};
        if (!newCol.width) {
            newCol.width = column.numeric ? `${numericColWidth}px` :
                `calc( (100% - ${numericColWidth * numericColumnsCount}) / ${nonNumericColumnsCount})`;
        }
        return newCol;
    });
    return (
        <div className="data-table">
            <Header columns={columns} />
            <ScrollList
                columns={columns}
                list={props.rows}
                itemHeight={50}
                onRowClick={props.onRowClick}
                onSelectionChange={props.onSelectionChange}
            />
        </div>
    );
}

export default DataTable;
