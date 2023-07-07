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
import HomeIcon from "@mui/icons-material/Home";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
// import { PlaylistsInterface } from "../interfaces/IPlaylist";
// import { ResolutionsInterface } from "../interfaces/IResolution";
// import { VideosInterface } from "../interfaces/IVideo";
// import { WatchVideoInterface } from "../interfaces/IWatchVideo";
import moment from 'moment';
import './IssueStyle.css';
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
import { apiUrl, convertType } from "../services/utility";

function timeout(delay: number) {
  return new Promise(res => setTimeout(res, delay));
}
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function IssueDetail() {
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
  const [time1, setTime1] = useState(false);
  const [time2, setTime2] = useState(false);
  const [time3, setTime3] = useState(false);
  const [time4, setTime4] = useState(false);
  const [time5, setTime5] = useState(false);
  const [time6, setTime6] = useState(false);
  const [i, setI] = useState("");



  // if(issue.StatusID == 2){
  //   setdatetest(true);
  // }

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

  const handleImageChangeQV = (event: any) => {
    const image = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      const base64Data = reader.result;
      setImageStringQV(base64Data)
    }
  }

  const handleImageChangePowerBI = (event: any) => {
    const image = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      const base64Data = reader.result;
      setImageStringPowerBI(base64Data)
    }
  }
  const handleChangeTextField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name as keyof typeof issue;
    setIssue({
      ...issue,
      [name]: event.target.value,
    });

  };

  // const handleChange = (event: SelectChangeEvent) => {
  //   const name = event.target.name as keyof typeof i;
  //   setI({
  //     ...i,
  //     [name]: event.target.value,
  //   });
  // };

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
    // convertType(did)
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    let i = 0
    let res = await fetch(
      `${apiUrl}/issue/${did}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.data.StatusID == 1) {
          setTime1(true);
          console.log('รอเจ้าหน้าที่ตอบรับ')

        } else if (res.data.StatusID == 2) {
          setTime2(true);
          console.log('กำลังดำเนินการ')

        } else if (res.data.StatusID == 3) {
          setTime3(true);
          console.log('สำเร็จ');

        }
        else {
          console.log(i)
          setTime4(true);
          // if (i = 2){
          //   setTime4(true);
          //   console.log('ยกเลิก')
          //   console.log(i)
          //   i=0
          //   console.log(i)
          // }
          // else if (i = 1){
          //   setTime5(true)
          //   console.log('ยกเลิก ตั้งแต่รับ issue')
          //   console.log(i)
          //   i=0
          //   console.log(i)
          // }

        }

        // if (res.data.StatusID == 1) {
        //   setTime1(true);
        //   i = 1
        //   console.log('รอเจ้าหน้าที่ตอบรับ')
        //   console.log(i)
        // }if (res.data.StatusID == 2) {
        //   setTime2(true);
        //   i = 2
        //   console.log('กำลังดำเนินการ')
        //   console.log(i)
        // }if (res.data.StatusID == 3) {
        //   setTime3(true);
        //   i = 3
        //   console.log('สำเร็จ');

        //   console.log(i)
        // }
        // if (res.data.StatusID == 4){
        //   console.log(i)

        //   if (i == 1){
        //     setTime5(true);

        //     console.log('ยกเลิก ตั้งแต่รับ issue')
        //     console.log(i)
        //     i=0
        //     console.log(i)
        //   }
        //   else if (i == 2){
        //     setTime4(true)
        //     console.log('ยกเลิก')
        //     console.log(i)
        //     i=0
        //     console.log(i)
        //   }

        // }

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
          <Alert onClose={handleClose} severity="success">
            บันทึกข้อมูลสำเร็จ
          </Alert>
        </Snackbar>
        <Snackbar
          open={error}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="error">
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
                sx={{ flexGrow: 1, ml: 0, fontFamily: 'Noto Sans Thai', fontWeight: 900 }}
              >
                รายละเอียดการแจ้งปัญหา
                {/* {`${issue.IssueTimeUpdate}`} */}
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Grid container spacing={0} sx={{ padding: 2 }}>
            {/* {time1 && (
            <>รอเจ้าหน้าที่ตอบรับ</>
          )} */}


            <Grid item xs={12}>
              <p className="font-size"><b>ชื่อโปรเจ็ค: </b>{`${issue.Project?.Title}`}</p>
            </Grid>

            <Grid item xs={12}>
              <p className="font-size"><b>รายละเอียดของปัญหา: </b>{`${issue.Detail}`}</p>
            </Grid>



            {time1 && (
              <Grid container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >

                <div className="text-align">
                  <TaskAltIcon sx={{ color: "green", fontSize: 160, mt: 4 }}></TaskAltIcon>
                  <div>
                    <p className="font-size"><b>รอเจ้าหน้าที่ตอบรับ</b><br></br>
                      {`${moment(issue.IssueTimeCreate).format("DD/MM/YYYY"
                      )}    ${moment(issue.IssueTimeCreate).format(
                        "HH:mm"
                      )} น.`}</p>
                  </div>

                </div>
                <div><Divider sx={{ width: 100, mt: -5 }} /></div>
                <div className="text-align w">
                  <RemoveCircleOutlineIcon sx={{ color: "gray", fontSize: 160, opacity: 0.4 }}></RemoveCircleOutlineIcon>
                  <div>
                    <p className="font-size-status"><b>กำลังดำเนินการ </b></p>
                  </div>

                </div>
                <div><Divider sx={{ width: 100, mt: -5 }} /></div>
                <div className="text-align w">
                  <RemoveCircleOutlineIcon sx={{ color: "gray", fontSize: 160, opacity: 0.4 }}></RemoveCircleOutlineIcon>
                  <p className="font-size-status"><b>สำเร็จ/ยกเลิก</b></p>
                </div>


              </Grid>
            )}

            {time2 && (
              <Grid container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={12}>
                  <p className="font-size"><b>เจ้าหน้าที่รับงาน: </b>{`${issue.Admin?.Name}`}</p>
                </Grid>
                <div className="text-align">
                  <TaskAltIcon sx={{ color: "green", fontSize: 160, mt: 4 }}></TaskAltIcon>
                  <div>
                    <p className="font-size font-size-status-now"><b>รอเจ้าหน้าที่ตอบรับ</b><br></br>
                      {`${moment(issue.IssueTimeCreate).format("DD/MM/YYYY"
                      )}    ${moment(issue.IssueTimeCreate).format(
                        "HH:mm"
                      )} น.`}</p>
                  </div>

                </div>
                <div><Divider sx={{ width: 100, mt: -5 }} /></div>
                <div className="text-align w">
                  <TaskAltIcon sx={{ color: "green", fontSize: 160, mt: 4 }}></TaskAltIcon>
                  <div>
                    <p className="font-size font-size-status-now"><b>กำลังดำเนินการ</b><br></br>
                      {`${moment(issue.IssueTimeUpdate).format("DD/MM/YYYY"
                      )}    ${moment(issue.IssueTimeUpdate).format(
                        "HH:mm"
                      )} น.`}</p>
                  </div>

                </div>
                <div><Divider sx={{ width: 100, mt: -5 }} /></div>
                <div className="text-align w">
                  <RemoveCircleOutlineIcon sx={{ color: "gray", fontSize: 160, opacity: 0.4 }}></RemoveCircleOutlineIcon>
                  <p className="font-size-status"><b>สำเร็จ/ยกเลิก</b></p>
                </div>


              </Grid>
            )}

            {time3 && (
              <Grid container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={12}>
                  <p className="font-size"><b>เจ้าหน้าที่รับงาน: </b>{`${issue.Admin?.Name}`}</p>
                </Grid>
                <Grid item xs={12}>
                  <p className="font-size"><b>วิธีแก้ปัญหาของเจ้าหน้าที่: </b>{`${issue.Solution}`}</p>
                </Grid>
                <div className="text-align">
                  <TaskAltIcon sx={{ color: "green", fontSize: 160, mt: 4 }}></TaskAltIcon>
                  <div>
                    <p className="font-size font-size-status-now"><b>รอเจ้าหน้าที่ตอบรับ</b><br></br>
                      {`${moment(issue.IssueTimeCreate).format("DD/MM/YYYY"
                      )}    ${moment(issue.IssueTimeCreate).format(
                        "HH:mm"
                      )} น.`}</p>
                  </div>

                </div>
                <div><Divider sx={{ width: 100, mt: -5 }} /></div>
                <div className="text-align w">
                  <TaskAltIcon sx={{ color: "green", fontSize: 160, mt: 4 }}></TaskAltIcon>
                  <div>
                    <p className="font-size font-size-status-now"><b>กำลังดำเนินการ</b><br></br>
                      {`${moment(issue.IssueTimeUpdate).format("DD/MM/YYYY"
                      )}    ${moment(issue.IssueTimeUpdate).format(
                        "HH:mm"
                      )} น.`}</p>
                  </div>

                </div>
                <div><Divider sx={{ width: 100, mt: -5 }} /></div>
                <div className="text-align w">
                  <TaskAltIcon sx={{ color: "green", fontSize: 160, mt: 4 }}></TaskAltIcon>
                  <div>
                    <p className="font-size font-size-status-now"><b>สำเร็จ</b><br></br>
                      {`${moment(issue.IssueTimeComplete).format("DD/MM/YYYY"
                      )}    ${moment(issue.IssueTimeComplete).format(
                        "HH:mm"
                      )} น.`}</p>
                  </div>

                </div>


              </Grid>
            )}

            {time4 && (

              <Grid container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={12}>
                  <p className="font-size"><b>เจ้าหน้าที่รับงาน: </b>{`${issue.Admin?.Name}`}</p>
                </Grid>
                <Grid item xs={12}>
                  <p className="font-size"><b>หมายเหตุ: </b>{`${issue.Note}`}</p>
                </Grid>
                <div className="text-align">
                  <TaskAltIcon sx={{ color: "green", fontSize: 160, mt: 4 }}></TaskAltIcon>
                  <div>
                    <p className="font-size font-size-status-now"><b>รอเจ้าหน้าที่ตอบรับ</b><br></br>
                      {`${moment(issue.IssueTimeCreate).format("DD/MM/YYYY"
                      )}    ${moment(issue.IssueTimeCreate).format(
                        "HH:mm"
                      )} น.`}</p>
                  </div>

                </div>
                <div><Divider sx={{ width: 100, mt: -5 }} /></div>
                <div className="text-align w">
                  <TaskAltIcon sx={{ color: "green", fontSize: 160, mt: 4 }}></TaskAltIcon>
                  <div>
                    <p className="font-size font-size-status-now"><b>กำลังดำเนินการ</b><br></br>
                      {`${moment(issue.IssueTimeUpdate).format("DD/MM/YYYY"
                      )}    ${moment(issue.IssueTimeUpdate).format(
                        "HH:mm"
                      )} น.`}</p>
                  </div>

                </div>
                <div><Divider sx={{ width: 100, mt: -5 }} /></div>
                <div className="text-align w">
                  <HighlightOffIcon sx={{ color: "red", fontSize: 160, mt: 4 }}></HighlightOffIcon>
                  <div>
                    <p className="font-size font-size-status-now"><b>ยกเลิก</b><br></br>
                      {`${moment(issue.IssueTimeComplete).format("DD/MM/YYYY"
                      )}    ${moment(issue.IssueTimeComplete).format(
                        "HH:mm"
                      )} น.`}</p>
                  </div>

                </div>


              </Grid>
            )}




            {/* <Grid item xs={6}>
            <h2> รูปภาพจาก QlikView</h2>
            <Grid>
              <img src={`${imageStringQV}`} width="400" height="300" /> 
            </Grid>
            
          </Grid>
          <Grid item xs={6}>
            <h2> รูปภาพจาก PowerBI</h2>
            <Grid>
              <img src={`${imageStringPowerBI}`} width="400" height="300" /> 
            </Grid>

          </Grid> */}
            <Grid item xs={12}>
              <Button
                component={RouterLink}
                to="/issues"
                variant="contained"
                color="inherit"
              >
                กลับ
              </Button>
              {/* <Button
              style={{ float: "right" }}
              onClick={submit}
              variant="contained"
              color="primary"
            >
              บันทึก
            </Button> */}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}

export default IssueDetail;



