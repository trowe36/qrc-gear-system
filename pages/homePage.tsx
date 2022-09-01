
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';

let showLib = false;


const table = {
  
  columns: [
    { headerName: "Id", field: "id", sortable: true, filter: "agNumberColumnFilter" },
    { headerName: "Name", field: "name", sortable: true, filter: true },
    { headerName: "Country", field: "country", sortable: true, filter: true },
    { headerName: "Region", field: "region", sortable: true, filter: true },
    { headerName: "Subregion", field: "subregion", sortable: true, filter: true }
  ],
}

export default function HomePage() {
  const[showLib, setShowLib] = useState(false);


  function viewGear() {
    setShowLib(true)
    console.log("button pressed")
  }

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
          <h2>Some content here</h2>
          <AgGridReact
        columnDefs={table.columns}
        //rowData={rowData}
        pagination={true}
        paginationPageSize={15}
       // onRowClicked={}
        rowSelection='single'
      />
        </div>
      )}

      </div>
    </div>
  );
}