import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { UsersInterface } from "../interfaces/Idim_User";
import { RoleInterface } from "../interfaces/IRole";

import { HttpClientServices, UpdateUser } from "../services/HttpClientService";
import { useForm, SubmitHandler } from "react-hook-form";
import { literal, object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiUrl } from "../services/utility";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const role = [{ Name: "employee" }, { Name: "user" }];

function UserUpdate() {
  const [user, setUser] = React.useState<Partial<UsersInterface>>({});
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [message, setAlertMessage] = React.useState("");

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

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof UserUpdate;
    const { value } = event.target;
    setUser({ ...user, [id]: value });
  };

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof UserUpdate;
    setUser({
      ...user,
      [name]: event.target.value,
    });
  };

  async function GetUserByID() {

    let uid = localStorage.getItem("uid");
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    let res = await fetch(
      `${apiUrl}/user/${uid}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      });

    return res;
  }

  const getUserr = async () => {
    let res = await GetUserByID();
    if (res) {
      setUser(res);
    }
  }

  useEffect(() => {
    getUserr();
  }, []);
  
  async function submit() {
    let res = await HttpClientServices.patch("/users", user);
    if (!res.error) {
        setSuccess(true);
        console.log(res);
        setAlertMessage("อัพเดตข้อมูลสำเร็จ");
      } else {
        setError(true);
        setAlertMessage("อัพเดตข้อมูลไม่สำเร็จ " + res.message);
        // console.log(res.message);
      }
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
        id="success"
        open={success}
        autoHideDuration={8000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          {message}
        </Alert>
      </Snackbar>
      <Snackbar
        id="error"
        open={error}
        autoHideDuration={8000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          {message}
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
              sx={{ flexGrow: 1, ml: 0, fontFamily:'Noto Sans Thai', fontWeight: 900}}
              gutterBottom
            >
              อัปเดตข้อมูลสมาชิก
            </Typography>
          </Box>
        </Box>
        <Divider />
        {/* {`${user.Name}`} */}
        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={6} sx={{ flexGrow: 1, ml: 0, fontFamily:'Noto Sans Thai', fontWeight: 900}}>
            <p>ชื่อ - สกุล</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                
                id="Name"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกข้อมูลชื่อ"
                value={user.Name || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sx={{ flexGrow: 1, ml: 0, fontFamily:'Noto Sans Thai', fontWeight: 900}}>
            <FormControl fullWidth variant="outlined">
              <p>อีเมล</p>
              <TextField
                id="Email"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกข้อมูลอีเมล"
                value={user.Email || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sx={{ flexGrow: 1, ml: 0, fontFamily:'Noto Sans Thai', fontWeight: 900}}>
            <p>ตำแหน่ง</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Department"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกชื่อตำแหน่ง"
                value={user.Department || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sx={{ flexGrow: 1, ml: 0, fontFamily:'Noto Sans Thai', fontWeight: 900}}>
            <p>เบอร์โทรศัพท์</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="PhoneNumber"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกเบอร์โทรศัพท์"
                value={user.PhoneNumber || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          {/* <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>รหัสผ่าน (เพื่อยืนยัน)</p>
              <TextField
                id="Password"
                variant="outlined"
                type="password"
                size="medium"
                placeholder="กรุณากรอกรหัสผ่าน"
                value={user.Password || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid> */}
          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/"
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
              บันทึก
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
    </div>
  );
}

export default UserUpdate;
