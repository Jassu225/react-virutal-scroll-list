import React, { useEffect } from 'react';
import './App.css';
import DataTable from './components/DataTable/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { getList } from './store/getters';
import { fetchList } from './store/actions';

function App(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log('dispatch -- effect');
    dispatch(fetchList());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const list = useSelector(state => getList(state));
  const columns= [
    {
      'id': 'id',
      'label': 'ID',
      'numeric': true, // Right Align
    }, {
      'id': 'title', // Uniq ID to identify column
      'label': 'Album Title',
      'numeric': false,
      'width': '50%', //('10px' | '10%' | '' | undefined),
    },
  ];

  const onRowClick = (rowData, rowIndex) => {

  };

  const onSelectionChange = (nodeChanged, rowData, rowIndex) => {

  };

  return (
    <div className="App">
      <DataTable
        columns={columns}
        rows={list}
        onRowClick={onRowClick}
        onSelectionChange={onSelectionChange}
      />
    </div>
  );
}

export default App;
