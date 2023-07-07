import React, { useEffect, useState } from "react";
import { Link, Link as RouterLink } from "react-router-dom";
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
import AddCircleIcon from '@mui/icons-material/AddCircle';
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
  GetAdminByID,
  GetUserByID,
  GetStatus,
} from "../services/HttpClientService";
import { string } from "zod";
import { Avatar, Stack, Tooltip } from "@mui/material";

function timeout(delay: number) {
  return new Promise(res => setTimeout(res, delay));
}
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function IssueCreate() {
  const [importances, setImportances] = useState<ImportanceInterface[]>([]);
  const [status, setStatus] = useState<StatusInterface[]>([]);
  const [projects, setProjects] = useState<ProjectInterface[]>([]);
  const [users, setUsers] = useState<UsersInterface>();
  const [admins, setAdmins] = useState<AdminsInterface>();
  const [imageStringQV, setImageStringQV] = React.useState<string | ArrayBuffer | null>(null);
  const [imageStringPowerBI, setImageStringPowerBI] = React.useState<string | ArrayBuffer | null>(null);
  const [issue, setIssue] = React.useState<Partial<IssueInterface>>({ IssueTimeCreate: new Date(), });
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const getUser = async () => {
    // const uid = Number(localStorage.getItem("uid"));
    let res = await GetUserByID();
    if (res) {
      setUsers(res);
    }
  };

  const getAdmin = async () => {
    // const uid = Number(localStorage.getItem("uid"));
    let res = await GetAdminByID();
    if (res) {
      setAdmins(res);
    }
  };

  useEffect(() => {
    getImportance();
    getStatus();
    getProject();
    getUser();
    getAdmin();
  }, []);

  const convertType = (data: string | number | undefined | null) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  async function submit() {
    setUploading(true)
    let data = {
      ImportanceID: convertType(issue.ImportanceID) ?? 1, //
      ProjectID: convertType(issue.ProjectID),
      StatusID: convertType(issue.StatusID) ?? 1,
      UserID: convertType(issue.UserID) ?? convertType(localStorage.getItem("uid")),
      // AdminID: ,
      IssueTimeCreate: new Date(),
      IssueTimeUpdate: issue.IssueTimeUpdate,
      IssueTimeComplete: issue.IssueTimeComplete ?? new Date(),
      Solution: issue.Solution,
      Detail: issue.Detail,
      Note: issue.Note,
      QVpic: imageStringQV,
      PowerBIpic: imageStringPowerBI,
      // CreateBy: issue.CreateBy,
      // ApproveBy: issue.ApproveBy
    };

    let res = await HttpClientServices.post("/issues", data);
    if (!res.error) {
      setSuccess(true);
      console.log(res);
      setAlertMessage("บันทึกข้อมูลสำเร็จ");
    } else {
      setError(true);
      setAlertMessage("บันทึกข้อมูลไม่สำเร็จ " + res.message);
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
      <Container maxWidth="md">

        <Snackbar
          open={success}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="success" sx={{ flexGrow: 1, ml: 0, fontFamily: 'Noto Sans Thai', fontWeight: 900 }}>
            บันทึกข้อมูลสำเร็จ
          </Alert>
        </Snackbar>
        <Snackbar
          open={error}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          className="font-custom-regular"
        >
          <Alert onClose={handleClose} severity="error" sx={{ flexGrow: 1, ml: 0, fontFamily: 'Noto Sans Thai', fontWeight: 900 }}>
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
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Grid container spacing={3} sx={{ padding: 2 }}>
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                {/* <div>
                  <p className="font-custom-regular" >Project &nbsp;

                    <Link to="/projects">
                      <Tooltip title="เพิ่มโปรเจ็ค" placement="top">
                        { <AddCircleIcon
                          sx={{ fontSize: 24, mt: -1, color: "#F0BB62" }}
                        ></AddCircleIcon> 
                        <Avatar><b>+</b></Avatar>
                      </Tooltip>
                    </Link>

                  </p></div> */}

                <Stack spacing={2} direction="row" alignItems="center" sx={{ fontSize: 24, mt: 1.9 }} >
                  {/* <Avatar><b>+</b></Avatar> */}
                  <Typography noWrap className="font-custom-regular" >Project &nbsp;</Typography>
                  <Link to="/projects">
                      <Tooltip title="เพิ่มโปรเจ็ค" placement="top">
                        <AddCircleIcon
                          sx={{ fontSize: 24, mt: 1, ml: -2 ,color: "#F0BB62" }}
                        ></AddCircleIcon>
                      </Tooltip>
                    </Link>
                </Stack>

                <Select
                  native
                  value={issue.ProjectID + ""}
                  onChange={handleChange}

                  inputProps={{
                    name: "ProjectID",
                  }}
                >
                  <option aria-label="None" value="" >
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
            {/* <Grid item xs={2}>
              <Link to="/projects">
                <p><b>add project</b></p>
              </Link>
            </Grid> */}
            <Grid item xs={3}>
              <FormControl fullWidth variant="outlined">
                <p className="font-custom-regular">ความสำคัญ</p>
                <Select
                  native
                  value={issue.ImportanceID + ""}
                  onChange={handleChange}
                  disabled
                  inputProps={{
                    name: "ImportanceID",
                  }}
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
                  disabled
                  inputProps={{
                    name: "StatusID",
                  }}
                >
                  {/* <option aria-label="None" value="">
                  
                </option> */}
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

              <Typography sx={{ flexGrow: 1, ml: 0, fontFamily: 'Noto Sans Thai', fontWeight: 900 }}> รายละเอียดปัญหา </Typography>
              <FormControl fullWidth variant="outlined">
                <TextField
                  className='StyledTextField'
                  id="Detail"
                  name="Detail"
                  type="string"
                  size="medium"
                  color="primary"
                  sx={{ flexGrow: 1, ml: 0, fontFamily: 'Noto Sans Thai', fontWeight: 900 }}
                  inputProps={{
                    name: "Detail",
                  }}
                  onChange={handleInputChange}
                  value={issue?.Detail ?? ""}
                />
              </FormControl>
            </Grid>
            {/* <Grid item xs={12}>
           
                <Typography className="font-custom-regular"> หมายเหตุ </Typography>
                <FormControl fullWidth variant="outlined">
                    <TextField
                        className='StyledTextField'
                        id="Note"
                        name="Note"
                        type="string"
                        size="medium"
                        color="primary"
                        inputProps={{
                        name: "Note",
                        }}
                        onChange={handleInputChange}
                        value={issue?.Note ?? ""}
                    />
                </FormControl>
          </Grid> */}

            {/* <Grid item xs={4}>
            <Typography>หมายเหตุ</Typography>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Annotation"
                name="Annotation"
                type="string"
                size="small"
                color="primary"
                inputProps={{
                  name: "Annotation",
                }}
                onChange={handleInputChange}
                value={recordtimeout?.Annotation ?? ""}
                required
              />
            </FormControl>
          </Grid> */}

            <Grid item xs={4}>
              <FormControl fullWidth variant="outlined">
                <p className="font-custom-regular">เบอร์โทร</p>
                <Select
                  native
                  value={issue.UserID + ""}
                  onChange={handleChange}
                  disabled
                  inputProps={{
                    name: "UserID",
                  }}
                >
                  <option aria-label="None" value="">
                    {users?.PhoneNumber}
                  </option>

                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth variant="outlined">
                <p className="font-custom-regular">วันที่และเวลา</p>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    disabled
                    value={issue.IssueTimeCreate}
                    onChange={(newValue) => {
                      // setIssue({
                      //   ...issue,
                      //   IssueTimeCreate: newValue,
                      // });
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth variant="outlined">
                <p className="font-custom-regular">ผู้แจ้ง</p>
                <Select
                  native
                  value={issue.UserID + ""}
                  onChange={handleChange}
                  disabled
                  inputProps={{
                    name: "UserID",
                  }}
                >

                  <option aria-label="None" value="">
                    {users?.Name}
                  </option>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <h2 className="font-custom-regular"> รูปภาพจาก QlikView</h2>
              <Grid>
                <img src={`${imageStringQV}`} width="400" height="300" /> {/** show base64 picture from string variable (that contain base64 picture data) */}
              </Grid>
              <input type="file" onChange={handleImageChangeQV} />
              {/* <FormHelperText>recommend size is 500*250 pixels</FormHelperText> */}
            </Grid>
            <Grid item xs={6}>
              <h2 className="font-custom-regular"> รูปภาพจาก PowerBI</h2>
              <Grid>
                <img src={`${imageStringPowerBI}`} width="400" height="300" /> {/** show base64 picture from string variable (that contain base64 picture data) */}
              </Grid>
              <input type="file" onChange={handleImageChangePowerBI} />

            </Grid>
            <Grid item xs={12}>
              <Button
                component={RouterLink}
                to="/issues"
                variant="contained"
                color="inherit"
                sx={{ flexGrow: 1, ml: 0, fontFamily: 'Noto Sans Thai', fontWeight: 900 }}
              >
                กลับ
              </Button>
              <Button
                style={{ float: "right", color: "#ffffff", backgroundColor: "#064635" }}
                onClick={submit}
                variant="contained"

                // color="primary"
                sx={{ flexGrow: 1, ml: 0, fontFamily: 'Noto Sans Thai', fontWeight: 900 }}
              >
                บันทึก
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}

export default IssueCreate;



