
import Button from '@mui/material/Button';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import Stack from '@mui/material/Stack';  
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';

let showLib = false;



export default function HomePage() {
  const[showLib, setShowLib] = useState(false);


  function viewGear() {
    setShowLib(true)
    console.log("button pressed")
  }

  const GridExample = () => {
    const gridRef = useRef();
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState([
      { make: 'Toyota', model: 'Celica', price: 35000 },
      { make: 'Ford', model: 'Mondeo', price: 32000 },
      { make: 'Porsche', model: 'Boxster', price: 72000 },
    ]);

    const [columnDefs, setColumnDefs] = useState([
      { headerName: 'Make', field: 'make' },
      { headerName: 'Model', field: 'model' },
      {
        headerName: 'Price',
        field: 'price',
        valueFormatter: (params) => {
          // params.value: number
          return '£' + params.value;
        },
      },
    ]);
    
    const getRowId = useMemo(() => {
      return (params) => {
        // params.data : ICar
        return params.data.make + params.data.model;
      };
    }, []);
  
    const onRowSelected = useCallback((event) => {
      // event.data: ICar | undefined
      if (event.data) {
        const price = event.data.price;
        console.log('Price with 10% discount:', price * 0.9);
      }
    }, []);
  
    const onShowSelection = useCallback(() => {
      // api.getSelectedRows() : ICar[]
      const cars = gridRef.current.api.getSelectedRows();
      console.log(
        'Selected cars are',
        cars.map((c) => `${c.make} ${c.model}`)
      );
    }, []);
  
    return (
      <div style={containerStyle}>
        <div className="test-container">
          <div className="test-header">
            <button onClick={onShowSelection}>Log Selected Cars</button>
          </div>
  
          <div style={gridStyle} className="ag-theme-alpine">
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              rowSelection={'multiple'}
              getRowId={getRowId}
              onRowSelected={onRowSelected}
            ></AgGridReact>
          </div>
        </div>
      </div>
    );
  };
  

  // useEffect(() => {
  //   //empty
  // }, [showLib])

  return (
    <div>
      <div>
        <Stack spacing={2} direction="column">
          <Button variant="outlined">View My Current Loans</Button>
          <Button variant="contained" onClick={viewGear}>
            View Gear Library
          </Button>
        </Stack>
      </div>
      <div>
      {showLib && (
        <div>
          <GridExample />
        </div>
      )}

      </div>
    </div>
  );
}