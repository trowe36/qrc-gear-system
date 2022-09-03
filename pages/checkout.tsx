import { Component } from "ag-grid-community";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import dayjs, { Dayjs } from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { Button } from "@mui/material";

function ItemComponent() {
  return <p>hello item here</p>;
}

function getCurrentDate(separator='/'){
  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
  }

  function getReturnDate(separator='/'){
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 2;
    let year = newDate.getFullYear();
    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
    }



export default function checkout() {
  const [itemsList, setItemsList] = useState([<ItemComponent />]);
  const [pickupLocation, setPickupLocation] = useState();
  const [pickupDate, setPickupDate] = useState<Dayjs | null>(
    dayjs('2014-08-18T21:11:54'),
  );
  const[todaysDate, setTodaysDate] = useState('')
  const[orderID, setOrderID] = useState('')
  const [showExtraInfo, setShowExtraInfo] = useState(false);
  const[returnDate, setReturnDate] = useState('')
  const[availDate, setAvailDate] = useState('')

  const router = useRouter();
  const data = router.query;

  function viewInfo() {
    if(showExtraInfo){
      setShowExtraInfo(false)
    }else {
      setShowExtraInfo(true);
    }
    setReturnDate(getReturnDate())
  }




  let xx: object[] = data;
  console.log("xx " + xx);
  console.log("data " + JSON.stringify(data));
  let chosenItems: string[] = Object.values(data);
  console.log("chos items" + chosenItems);

  const handlePickupChange = (event: SelectChangeEvent) => {
    setPickupLocation(event.target.value as string);
  };
  const handleDateChange = (newValue: Dayjs | null) => {
    setPickupDate(newValue);
  };

  //useffect -> use the id's in chosen items to get details to display on this page. eg gear type. available date etc.
  useEffect(() => {
    //TODO check availabiltity status of each item ID, get latest date and say items available then. 
    setTodaysDate(getCurrentDate())
    fetchOrderID();
    setAvailDate('Not implemented')
  }, []);

  function fetchOrderID(){
    fetch('api/maxOrderID', {
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json',
      }
    }).then((res) =>res.json())
    .then((data) => {
      const orderID = (parseInt(Object.values(data.message[0])) + 1).toString()
      setOrderID(orderID);
    })
  }

  // function submitToServer(){
  //   fetch('/api/hello', {
  //     method: 'POST', // or 'PUT'
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({data, genString}),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log('Success:', data);
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  //   }
  // }
function sendToDB() {
  //just take return date, userID, pickup location, pickup date
  
  //
  //in backend check status of each item, check current location == pickup location. then set status as ready/pending
  //
}



  ///----structure

  //You have selected the following items
  //item ID item type
  //all items should be available by: date

  //pls enter, pickup date, location, auto-gen return date.
  return (
    <div>
      <h1>You have chosen the following items to borrow:</h1>
      <ul>
        {chosenItems.map((items) => (
          <li>{items}</li>
        ))}
      </ul>
      <form>
        <label>
          x----------------Current Order ID: {orderID}----
        </label>
        <label>
          x----------------Todays Date: {todaysDate}------
        </label>
        <label>
          x----------------Item Availability Date {availDate}------
        </label>
      </form>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel>Pickup Location:</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={pickupLocation}
            label="Pickup"
            onChange={handlePickupChange}
          >
            <MenuItem value={1}>Kangaroo Point</MenuItem>
            <MenuItem value={2}>Weekend Trip</MenuItem>
            <MenuItem value={3}>Contact Me</MenuItem>
          </Select>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
              <MobileDatePicker
                label="Date mobile"
                inputFormat="MM/DD/YYYY"
                value={pickupDate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
          <Button onClick={viewInfo} component = "label"> Submit</Button>
        </FormControl>
      </Box>
      
      {showExtraInfo && (
        <div>
        <h1>Borrowing these items has the following terms etc...</h1>
        <h1>Your return date is {returnDate}</h1>
        <Button variant="contained" onClick={sendToDB}>Borrow Items</Button>
        </div>
      )}
      
      
    </div>
  );
}
