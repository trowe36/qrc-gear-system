import React from "react";
import ReactDOM from "react-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import internal from "stream";
import styles from "../styles/Home.module.css";
import QRCode from "qrcode";
import { useEffect, useState } from "react";

//https://react-hook-form.com/get-started#Registerfields

enum itemCatEnum {
  QD = "Quick Draws",
  rope = "Rope",
  seconder = "Seconder Kit",
  griGri = "GriGri",
}
enum statusEnum {
  available = "Available",
  pending = "Pending Pickup",
  onLoad = "On loan",
}
enum locationEnum {
  KP = "Kangaroo Point",
  coorparoo = "Coorparoo",
  other = "Other",
}

enum signoffEnum {
  topClimber = "Top Rope Climber",
  topSetter = "Top Rope Setter",
  topGuide = "Top Rope Guide",
  seconder = "Seconder",
  beginLead = "Beginner Leader",
  singlePitchLead = "Single Pitch Leader",
  multiPitchLead = "Multi Pitch Leader",
  sportLeader = "Sport Leader Guide",
  rs1 = "Rescue Skills 1",
  rs2 = "Rescue Skills 2",
  rs3 = "Rescue Skills 3",
  advancedSecond = "Advanced Seconder",
  beginTrad = "Beginner Trad Leader",
  tradLead = "Trad Leader",
  tradGuide = "Trad Leader Guide",
  aidClimber = "Aid Climber",
  cliffhangerGuide = "Cliffhanger Guide",
}

interface IFormInput {
  id: Number;
  dateEntered: String;
  user: String;
  itemCategory: itemCatEnum;

  remainingLife: Number; //years left
  currentQuality: Number; //1-5 1=new 5= retire
  requiredSignoff: signoffEnum;
  status: statusEnum;
  parentKitID: Number;
  location: locationEnum;
  comments: String;
  name: String;
  QRCodeString: String;
}

export default function App() {
  const { register, handleSubmit, setValue } = useForm<IFormInput>();
  const [QRImg, setQRImg] = useState("");
  const [genString, setGenString] = useState("");

  let QRGenerated = false;

  useEffect(() =>{
    fetch('api/maxID', {
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json',
      }
    }).then((res) =>res.json())
    .then((data) => {
      const maxID = parseInt(Object.values(data.message[0]))
      setValue("id", maxID);
    })
  }, [])

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    QRCode.toDataURL(genString).then(setQRImg);
    console.log("is name included" + Object.values(data));
    fetch('/api/hello', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({data, genString}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }

  async function makeGenString(length : number) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
   //setGenString(result);
}
  async function generateQR(){
    setGenString(await makeGenString(16))
    //setTimeout(50)
    QRGenerated = true;
  }

  return (
    <div className={styles.adminPageWrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Item ID (AA and AG)</label>
          <input {...register("id")} />
        </div>
        <div>
          <label>Item Name</label>
          <input {...register("name")} />
        </div>
        <div>
          <label>User</label>
          <input {...register("user")} />
        </div>
        <div>
          <label>Date Entered</label>
          <input {...register("dateEntered")} />
        </div>
        <div>
          <label>Item Cateory</label>
          <select {...register("itemCategory")}>
            <option value="QD">QD</option>
            <option value="rope">rope</option>
            <option value="seconder">seconder</option>
            <option value="griGri">GriGri</option>
          </select>
        </div>
        <div>
          <label>Life Remaining (years)</label>
          <input {...register("remainingLife")} />
        </div>
        <div>
          <label>Current Quality (1=best 5=retire)</label>
          <input {...register("currentQuality")} />
        </div>
        <div>
          <label>Required Borrowing Signoff</label>
          <select {...register("requiredSignoff")}>
            <option value="topClimber">Top Rope Climber</option>
            <option value="topSetter">Top Rope Setter</option>
            <option value="topGuide">Tope Rope Guide</option>
            <option value="seconder">Seconder</option>
            <option value="beginLead">Beginner Leader</option>
            <option value="singlePitchLead">Single Pitch Leader</option>
            <option value="multiPitchLead">Multi Pitch Leader</option>
            <option value="sportLeader">Sport Leader Guide</option>
            <option value="rs1">Rescue Skills 1</option>
            <option value="rs2">Rescue Skills 2</option>
            <option value="rs3">Rescue Skills 3</option>
            <option value="advancedSecond">Advanced Seconder</option>
            <option value="beginTrad">Beginner Trad Leader</option>
            <option value="tradLead">Trad Leader</option>
            <option value="tradGuide">Trad Leader Guide</option>
            <option value="aidClimber">Aid Climber</option>
            <option value="cliffhangerGuide">Cliffhanger Guide</option>
          </select>
        </div>
        <div>
          <label>Current Status</label>
          <select {...register("status")}>
            <option value="available">Available</option>
            <option value="pending">Pending Pickup</option>
            <option value="onLoan">On Loan </option>
          </select>
        </div>
        <div>
          <label>Parent Kit ID</label>
          <input {...register("parentKitID")} />
        </div>
        <div>
          <label>Current Location</label>
          <select {...register("location")}>
            <option value="KP">Kangaroo Point</option>
            <option value="coorparoo">Coorparoo</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Additional Comments</label>
          <input {...register("comments")} />
        </div>
        <button onClick={generateQR}> GenerateQR</button>
      <img src = {QRImg}/>
        <input type="submit" />
      </form>
      

      
    </div>
  );
}
