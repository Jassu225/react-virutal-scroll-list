import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import './App.css';
import DataTable from './components/DataTable/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { getList } from './store/getters';
import { fetchList } from './store/actions';
import ogImage from './assets/images/og-image.png';

const appData = {
  title: 'react virtual scroll list',
  description: 'A virtual scroll list created using only functional components & hooks in React.js',
};

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
      <Helmet>
          <title>{appData.title}</title>
          <meta property="og:url" content={window.location.origin} />
          <meta property="og:title" content={appData.title} />
          <meta property="og:description" content={appData.description} />
          <meta name="description" content={appData.description} />
          <meta property="og:image" content={ogImage} />
      </Helmet>
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
