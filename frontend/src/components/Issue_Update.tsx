import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { UsersInterface } from "../interfaces/Idim_User";
import { AdminsInterface } from "../interfaces/Idim_Admin";
// import { PlaylistsInterface } from "../interfaces/IPlaylist";
// import { ResolutionsInterface } from "../interfaces/IResolution";
// import { VideosInterface } from "../interfaces/IVideo";
// import { WatchVideoInterface } from "../interfaces/IWatchVideo";
import { ImportanceInterface } from "../interfaces/Idim_Importance";
import { DateTimePicker } from "@mui/x-date-pickers";
import { StatusInterface } from "../interfaces/Idim_Status";
import { IssueInterface } from "../interfaces/Ifact_Issue";
import { ProjectInterface } from "../interfaces/Idim_Project";
import { HttpClientServices } from "../services/HttpClientService";
import {
  GetImportance,
  Issues, //fact
  GetProject,
  GetUsers,
  GetUserByID,
  GetAdminByID,
  GetStatus,
  GetIssueByID,
} from "../services/HttpClientService";
import { string } from "zod";
import { apiUrl } from "../services/utility";

function timeout(delay: number) {
  return new Promise(res => setTimeout(res, delay));
}
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function IssueUpdate() {
  const apiUrl = "http://localhost:8080";
  const [importances, setImportances] = useState<ImportanceInterface[]>([]);
  const [status, setStatus] = useState<StatusInterface[]>([]);
  const [projects, setProjects] = useState<ProjectInterface[]>([]);
  const [users, setUsers] = useState<UsersInterface>();
  const [admins, setAdmins] = useState<AdminsInterface>();
  const [imageStringQV, setImageStringQV] = React.useState<string | ArrayBuffer | null>(null);
  const [imageStringPowerBI, setImageStringPowerBI] = React.useState<string | ArrayBuffer | null>(null);
  const [issue, setIssue] = React.useState<Partial<IssueInterface>>({ Detail: "", IssueTimeCreate: new Date(), });
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setAlertMessage] = useState("");

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  // const handleImageChangeQV = (event: any) => {
  //   const image = event.target.files[0];

  //   const reader = new FileReader();
  //   reader.readAsDataURL(image);
  //   reader.onload = () => {
  //     const base64Data = reader.result;
  //     setImageStringQV(base64Data)
  //   }
  // }

  // const handleImageChangePowerBI = (event: any) => {
  //   const image = event.target.files[0];

  //   const reader = new FileReader();
  //   reader.readAsDataURL(image);
  //   reader.onload = () => {
  //     const base64Data = reader.result;
  //     setImageStringPowerBI(base64Data)
  //   }
  // }
  const handleChangeTextField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name as keyof typeof issue;
    setIssue({
      ...issue,
      [name]: event.target.value,
    });

  };

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof issue;
    setIssue({
      ...issue,
      [name]: event.target.value,
    });
  };

  const getImportance = async () => {
    let res = await GetImportance();
    if (res) {
      setImportances(res);
    }
  };

  const getStatus = async () => {
    let res = await GetStatus();
    if (res) {
      setStatus(res);
    }
  };

  const getProject = async () => {
    let res = await GetProject();
    if (res) {
      setProjects(res);
    }
  };

  // const getUser = async () => {
  //   // const uid = Number(localStorage.getItem("uid"));
  //   let res = await GetUserByID();
  //   if (res) {
  //     setUsers(res);
  //   }
  // };

  const getAdmin = async () => {
    // const uid = Number(localStorage.getItem("uid"));
    let res = await GetAdminByID();
    if (res) {
      setAdmins(res);
    }
  };

  //   const getIssues = async () => {
  //     // const uid = Number(localStorage.getItem("uid"));
  //     let res = await GetIssueByID();
  //     if (res) {
  //       setIssue(res);
  //     }
  //   };

  async function GetIssueByID() {

    let did = localStorage.getItem("did");
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    let res = await fetch(
      `${apiUrl}/issue/${did}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setImageStringQV(res.data.QVpic);
          setImageStringPowerBI(res.data.PowerBIpic);
          return res.data;
        } else {
          return false;
        }
      });

    return res;
  }

  const getIssuee = async () => {
    let res = await GetIssueByID();
    if (res) {
      setIssue(res);
    }
  }

  useEffect(() => {
    // const param = params ? params : null;
    // if (param?.id) {
    //   setcheckParam(true);
    //   getIssuee(param?.id);
    // }
    getImportance();
    getStatus();
    getProject();
    // getUser();
    // getIssues();
    getIssuee();
    getAdmin();
  }, []);

  const convertType = (data: string | number | undefined | null) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  // if(issue.StatusID == 1 ){
  //   issue.IssueTime = new Date()
  //   console.log(issue.IssueTime)
  // }else{
  //   console.log('error')
  // }

  async function submit() {

    let data = {
      ID: convertType(issue.ID),
      ImportanceID: convertType(issue.ImportanceID) ?? 1, //
      ProjectID: convertType(issue.ProjectID),
      StatusID: convertType(issue.StatusID) ?? 1,
      // UserID: convertType(issue.UserID),
      AdminID: convertType(issue.AdminID) ?? convertType(localStorage.getItem("uid")),
      IssueTimeCreate: issue.IssueTimeCreate,
      IssueTimeUpdate: issue.IssueTimeUpdate ?? new Date(),
      IssueTimeComplete: new Date(),
      
      Solution: issue?.Solution,
      Detail: issue.Detail,
      Note: issue.Note, 
      QVpic: imageStringQV,
      PowerBIpic: imageStringPowerBI,
    };
      if(data.StatusID == 2 ){
        data.IssueTimeUpdate = new Date()
        console.log(data.IssueTimeUpdate)
      }
      let res = await HttpClientServices.patch("/issues", data);
      

      if(issue.StatusID == 3  || issue.StatusID == 4){
        issue.IssueTimeComplete = new Date()
        console.log(issue.IssueTimeComplete)
      }
      // if (issue.IssueTimeUpdate) {
      //   issue.IssueTimeUpdate = new Date()
      // }
      if (!res.error) {
        setSuccess(true);
        console.log(res);
        setAlertMessage("อัพเดตข้อมูลสำเร็จ");
      } else {
        setError(true);
        setAlertMessage("อัพเดตข้อมูลไม่สำเร็จ " + res.message);
        // console.log(res.message);
      }

    // let res = await HttpClientServices.post("/driver/recordtimein", data);
    //         if (!res.error) {
    //           setSuccess(true);
    //           console.log(res);
    //           setAlertMessage("บันทึกข้อมูลสำเร็จ");
    //         } else {
    //           setError(true);
    //           setAlertMessage("บันทึกข้อมูลไม่สำเร็จ " + res.message);
    //           // console.log(res.message);
    //         }
  }

  return (
    <div>
      <header>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300&display=swap');
        </style>
      </header>
    <Container maxWidth="lg">

      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ flexGrow: 1, ml: 0, fontFamily:'Noto Sans Thai', fontWeight: 900}}>
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ flexGrow: 1, ml: 0, fontFamily:'Noto Sans Thai', fontWeight: 900}}>
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>
      <Paper>
        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        >
          <Box sx={{ paddingX: 2, paddingY: 1 }}>
            <Typography
              component="h2"
              variant="h6"
              color="#F0BB62"
              gutterBottom
              sx={{ flexGrow: 1, ml: 0, fontFamily:'Noto Sans Thai', fontWeight: 900}}
            >
              รายละเอียดการแจ้งปัญหา 
              {/* {`${issue.Admin?.Name}`} */}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p className="font-custom-regular">Project</p>
              <Select
                native
                value={issue.ProjectID + ""}
                onChange={handleChange}
                disabled
                inputProps={{
                  name: "ProjectID",
                }}
                sx={{ flexGrow: 1, ml: 0, fontFamily:'Noto Sans Thai', fontWeight: 900}}
              >
                <option aria-label="None" value="">
                  กรุณาเลือก Project
                </option>
                {projects.map((item: ProjectInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Title}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth variant="outlined">
              <p className="font-custom-regular">ความสำคัญ</p>
              <Select
                native
                value={issue.ImportanceID + ""}
                onChange={handleChange}
                //disabled
                inputProps={{
                  name: "ImportanceID",
                }}
                sx={{ flexGrow: 1, ml: 0, fontFamily:'Noto Sans Thai', fontWeight: 900}}
              >
                {/* <option aria-label="None" value="">
                  กรุณาเลือกความสำคัญ
                </option> */}
                {importances.map((item: ImportanceInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Value}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth variant="outlined">
              <p className="font-custom-regular">สถานะ</p>
              <Select
                native
                value={issue.StatusID + ""}
                onChange={handleChange}
                //disabled
                inputProps={{
                  name: "StatusID",
                }}
                sx={{ flexGrow: 1, ml: 0, fontFamily:'Noto Sans Thai', fontWeight: 900}}
              >
                <option aria-label="None" value="">

                </option>
                {status.map((item: StatusInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Value}
                  </option>
                ))}
                {/* {status.map((item: StatusInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Value} 
                  </option>
                ))} */}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>

            <Typography sx={{ flexGrow: 1, ml: 0, fontFamily:'Noto Sans Thai', fontWeight: 900}}> รายละเอียดปัญหา </Typography>
            <FormControl fullWidth variant="outlined" className="font-custom-regular">
              <TextField
                className="font-custom-regular"
                id="Detail"
                name="Detail"
                type="string"
                size="medium"
                disabled
                color="primary"
                inputProps={{
                  name: "Detail",
                }}
                sx={{ flexGrow: 1, ml: 0, fontFamily:'Noto Sans Thai', fontWeight: 900}}
                onChange={handleChangeTextField}
                value={String(issue?.Detail ?? "")}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>

            <Typography sx={{ flexGrow: 1, ml: 0, fontFamily:'Noto Sans Thai', fontWeight: 900}}> วิธีแก้ปัญหา </Typography>
            <FormControl fullWidth variant="outlined">
              <TextField
                className="font-custom-regular"
                id="Solution"
                name="Solution"
                type="string"
                size="medium"
                sx={{ flexGrow: 1, ml: 0, fontFamily:'Noto Sans Thai', fontWeight: 900}}
                color="primary"
                inputProps={{
                  name: "Solution",
                }}
                onChange={handleChangeTextField}
                value={issue?.Solution}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>

            <Typography sx={{ flexGrow: 1, ml: 0, fontFamily:'Noto Sans Thai', fontWeight: 900}}> หมายเหตุ </Typography>
            <FormControl fullWidth variant="outlined">
              <TextField
                className="font-custom-regular"
                id="Note"
                name="Note"
                type="string"
                size="medium"
                sx={{ flexGrow: 1, ml: 0, fontFamily:'Noto Sans Thai', fontWeight: 900}}
                color="primary"
                inputProps={{
                  name: "Note",
                }}
                onChange={handleChangeTextField}
                value={issue?.Note}
              />
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth variant="outlined">
              <p className="font-custom-regular">เบอร์โทร</p>
              <TextField
                disabled
                value={String(issue?.User?.PhoneNumber ?? "")}
              />
            </FormControl>
          </Grid>
          
          <Grid item xs={3}>
            <FormControl fullWidth variant="outlined">
              <p className="font-custom-regular">วันที่และเวลา</p>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                {/* <DatePicker
                  disabled
                  value={issue.IssueTimeUpdate}
                  onChange={(newValue) => {
                    setIssue({
                      ...issue,
                      IssueTimeUpdate: newValue,
                      
                    });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                /> */}
                <TextField
                disabled
                value={String("07/07/2023")}
              />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            {/* <br></br> */}

            <FormControl fullWidth variant="outlined">
              <p className="font-custom-regular">ผู้แจ้ง</p>
              <TextField
                disabled
                value={String(issue?.User?.Name ?? "")}
              />
            </FormControl>
            {/* <FormControl fullWidth variant="outlined">
              <p>ผู้บันทึก</p>
              <TextField
                disabled
                value={String(issue?.Admin?.Name ?? "")}
              />
            </FormControl> */}
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth variant="outlined">
              <p className="font-custom-regular">ผู้บันทึก</p>
              <Select
                native
                value={issue.AdminID + ""}
                onChange={handleChange}
                disabled
                inputProps={{
                  name: "AdminID",
                }}
                sx={{ flexGrow: 1, ml: 0, fontFamily:'Noto Sans Thai', fontWeight: 900}}
              >

                <option aria-label="None" value="" >
                  {admins?.Name}
                </option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <h2 className="font-custom-regular"> รูปภาพจาก QlikView</h2>
            <Grid>
              <img src={`${imageStringQV}`} width="400" height="300" /> {/** show base64 picture from string variable (that contain base64 picture data) */}
            </Grid>
            {/* <input type="file" onChange={handleImageChangeQV} /> */}
            {/* <FormHelperText>recommend size is 500*250 pixels</FormHelperText> */}
          </Grid>
          <Grid item xs={6}>
            <h2 className="font-custom-regular"> รูปภาพจาก PowerBI</h2>
            <Grid>
              <img src={`${imageStringPowerBI}`} width="400" height="300" /> {/** show base64 picture from string variable (that contain base64 picture data) */}
            </Grid>
            {/* <input type="file" onChange={handleImageChangePowerBI} /> */}

          </Grid>
          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/issues/admin"
              variant="contained"
              color="inherit"
              sx={{ flexGrow: 1, ml: 0, fontFamily:'Noto Sans Thai', fontWeight: 900}}
            >
              กลับ
            </Button>
            <Button
              style={{ float: "right" , color:"#ffffff",backgroundColor: "#064635"}}
              onClick={submit}
              variant="contained"
              color="primary"
              sx={{ flexGrow: 1, ml: 0, fontFamily:'Noto Sans Thai', fontWeight: 900}}
            >
              อัปเดต
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
    </div>
  );
}

export default IssueUpdate;



