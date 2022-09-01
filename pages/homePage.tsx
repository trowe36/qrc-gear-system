
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

  const [rowData, setRowData] = useState([
    {make: "Toyota", model: "Celica", price: 35000},
    {make: "Ford", model: "Mondeo", price: 32000},
    {make: "Porsche", model: "Boxster", price: 72000}
]);
  

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
          <AgGridReact rowData={rowData} />
        </div>
      )}
<AgGridReact rowData={rowData} />
      </div>
    </div>
  );
}