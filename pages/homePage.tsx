
import Button from '@mui/material/Button';
import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';

let showLib = false;



export default function HomePage() {
  const [showLib, setShowLib] = useState(false);


  function viewGear() {
    if(showLib){
      setShowLib(false)
    }else {
      setShowLib(true);
    }
  }

  const [rowData, setRowData] = useState([]);


  const [columnDefs] = useState([
    { headerName: "ID", field: 'id' },
    { headerName: "Gear Category", field: 'category' },
    { headerName: "Date Entered", field: 'date_entered' },
    { headerName: "Admin", field: 'admin' },
    { headerName: "Required Signoff", field: 'signoff_required' },
    { headerName: "Gear Status", field: 'status' },
    { headerName: "Parent Kid ID", field: 'parent_ID' },
    { headerName: "Location", field: 'location' },
  ])


  useEffect(() => {
    const gearFromAPI: any[] = [];
    fetchGear().then((gear) => {
      
      for(let i = 0; i < gear.message.length; i++){
        gearFromAPI[i] = gear.message[i];
      }
      setRowData(gearFromAPI);
    })
  }, [showLib])

  async function fetchGear(){
    let fetchLink = 'api/getGear';
    return fetch(fetchLink, {
      method: "GET"
    })
      .then((res) => res.json())
  }

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
          <div className="ag-theme-alpine" style={{height: 400, width: 1500}} >
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}>
            </AgGridReact>
            <h1>hello</h1>
          </div>

        )}

      </div>
    </div>
  );
}