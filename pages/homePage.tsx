
import Button from '@mui/material/Button';
import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import { encryptData, decryptData } from "../util/util";
import Link from 'next/link';
let showLib = false;

let borrowSelection: Array<{ id: Number}> = []

export default function homePage() {
  const [showLib, setShowLib] = useState(false);
  const [currUser, setCurrUser] = useState('')
  const [rowData, setRowData] = useState([]);
  const [info, setInfo] = useState("");
  const [signOff, setSignoff] = useState("")
  const [userPayStatus, setUserPayStatus] = useState("");

  function viewGear() {
    if(showLib){
      setShowLib(false)
    }else {
      setShowLib(true);
    }
  }


  const [columnDefs] = useState([
    { headerName: "ID", field: 'id' },
    { headerName: "Name", field: 'name' },
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

    //TODO decrypt email, check db for email. load infomration into state variables. signoffs, current borrows etc
    const mkLocalData = localStorage.getItem('mk')
    const salt = process.env.SALT || '6d090796-ecdf-11ea-adc1-0242ac112345';
    const originalData = decryptData(mkLocalData, salt);
    setCurrUser(Object.values(originalData).toString())

  //TODO set signoff state variable
    fetchSignoff().then((userSignoff) => {
      for(let i = 0; i < userSignoff.signoffs.length; i++){
        //console.log(Object.values(userSignoff.signoffs[i]))
      }
    })

  //set paid status variable
    fetchPayStatus().then((userPayStat) => {
      console.log(userPayStat.message.toString())
      console.log(Object.values(userPayStat))
      setUserPayStatus(userPayStat.message)
    })
  }, [showLib])

  async function fetchPayStatus(){
    let user = await checkLocalStorage()
    return fetch('api/isPaidMember', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user}),
    })
    .then((res) => res.json())
  }
  
function checkLocalStorage(){
  let mkLocalData = localStorage.getItem('mk');
  if(!mkLocalData){
       // Handle, if there is no data in localStorage, or if someone deleted the localStorage.
    }
const salt = process.env.SALT || '6d090796-ecdf-11ea-adc1-0242ac112345';
const originalData = decryptData(mkLocalData, salt);
if(!originalData){
  // will executes if someone altered the code in localstorage.
}
  return originalData.email
}

  async function fetchSignoff(){
    let user = await checkLocalStorage()
    return fetch('api/signoffDetails', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user}),
    })
    .then((res) => res.json())
  }

  async function fetchGear(){
    let fetchLink = 'api/getGear';
    return fetch(fetchLink, {
      method: "GET"
    })
      .then((res) => res.json())
  }
  function viewMyLoans(){
    //fetch loans with email variable. 
    console.log("fetching loans for " + currUser)
  }

  return (
    <div>
      <label>Current user: {currUser}</label>
      <label>Signoff: {signOff}</label>
      <label>Paid status: {userPayStatus}</label>
      <div>
        <Stack spacing={2} direction="column">
          <Button variant="outlined" onClick={viewMyLoans}>View My Current Loans</Button>
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
              columnDefs={columnDefs}
              onRowClicked={(row: any) => {
                borrowSelection.push(row.data.id)
                setInfo(`${info}  ${row.data.id}`);
              }}
              rowSelection='multiple'>
            </AgGridReact>
            <span>{info}</span>
            <Link href={{
              pathname: '/checkout',
              query: borrowSelection
            }}>
              Borrow Items
            </Link>
          </div>

        )}

      </div>
    </div>
  );
}