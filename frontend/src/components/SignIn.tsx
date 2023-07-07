import React, { useState } from "react";
import { Link, Link as RouterLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SigninInterface } from "../interfaces/ISignin";
import { Login, Login_admin } from "../services/HttpClientService";
import { CreateUser } from "../services/HttpClientService";
import qv from "./signin2.jpg";
import UserCreate from "./UserCreate";
import { Dialog, DialogTitle, DialogContent, FormControl, FormLabel, RadioGroup, Radio, FormHelperText, DialogActions, Select , SelectChangeEvent } from "@mui/material";
import { UsersInterface } from "../interfaces/Idim_User";
import { RoleInterface } from "../interfaces/IRole";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const theme = createTheme();
const role = [{ Name: "employee" }];
const department = [{ Name: "Data Engineer" }];
function SignIn() {
  const [dialogRegisterOpen, setDialogRegisterOpen] = React.useState(false);
  const [user, setUser] = React.useState<Partial<UsersInterface>>({});
  const [signin, setSignin] = useState<Partial<SigninInterface>>({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [successreg, setSuccessreg] = React.useState(false);
  const [errorreg, setErrorreg] = React.useState(false);
  const [messagereg, setAlertMessagereg] = React.useState("");

  const handleDialogRegisterClickOpen = () => {
    setDialogRegisterOpen(true);
  };

  const handleDialogRegisterClose = () => {
    setDialogRegisterOpen(false);
  };
  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof signin;
    const { value } = event.target;
    setSignin({ ...signin, [id]: value });
  };

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

  const handleClose_reg = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessreg(false);
    setErrorreg(false);
  };

  const handleInputChange_user = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof user;
    const { value } = event.target;
    setUser({ ...user, [id]: value });
  };

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof user;
    setUser({
      ...user,
      [name]: event.target.value,
    });
  };

  async function submit_create() {
    let data = {

      Name: user.Name,
      Password: user.Password,
      Email: user.Email,
      Role: user.Role ?? "employee",
      Department: user.Department ?? "Data Analytics",
      PhoneNumber: user.PhoneNumber,

  };
  let res = await CreateUser(data);
    if (res.status) {
      setAlertMessagereg("บันทึกข้อมูลสำเร็จ");
      setDialogRegisterOpen(false);
      setSuccessreg(true);
    } else {
      setAlertMessagereg(res.message);
      setErrorreg(true);
    }
  }

  const submit = async () => {
    let res = await Login(signin);
    let res2 = await Login_admin(signin);
    if (res) {
      setSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else if (res2) {
      setSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    else {
      setError(true);
    }

  };



  return (
    <div>
      <header>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300&display=swap');
        </style>
      </header>
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Snackbar
          open={success}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="success">
            เข้าสู่ระบบสำเร็จ
          </Alert>
        </Snackbar>
        <Snackbar
          open={error}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="error">
            อีเมลหรือรหัสผ่านไม่ถูกต้อง
          </Alert>
        </Snackbar>

        <Snackbar
          open={successreg}
          autoHideDuration={3000}
          onClose={handleClose_reg}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose_reg} severity="success">
            สมัครสมาชิกสำเร็จ
          </Alert>
        </Snackbar>
        <Snackbar
          open={errorreg}
          autoHideDuration={3000}
          onClose={handleClose_reg}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose_reg} severity="error">
            สมัครสมาชิกไม่สำเร็จ
          </Alert>
        </Snackbar>

        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            // backgroundImage: "C:\Users\Lenovo\Desktop\Final Project\frontend\src\logo.svg",
            backgroundImage: `url(${qv})`,
            // backgroundImage: "url('qv.png')",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#F0BB62" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" >
              Sign in
            </Typography>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="Email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={signin.Email || ""}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="Password"
                autoComplete="current-password"
                value={signin.Password || ""}
                onChange={handleInputChange}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={submit}
                style={{ float: "right", color: "#ffffff", backgroundColor: "#144f3f" }}
              >
                Sign In
              </Button>

              {/* <Button
                fullWidth
                // component={RouterLink}
                // to="/user/create"
                variant="contained"
                color="inherit"
                sx={{ mt: 3, mb: 2 }}

                style={{ float: "right", color:"#ffffff",backgroundColor: "#144f3f"}}
              >
                Sign Up
              </Button> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
                style={{ float: "right", color: "#ffffff", backgroundColor: "#F0BB62" }}
                onClick={handleDialogRegisterClickOpen}
              >
                Register
              </Button>
              {/* <Button
                component={RouterLink}
                to="/issues"
                variant="contained"
                color="inherit"
                sx={{ flexGrow: 1, ml: 0, fontFamily: 'Noto Sans Thai', fontWeight: 900 }}
              >
                กลับ
              </Button> */}
              {/* <Button
                component={RouterLink}
                to="/issues"
                variant="contained"
                color="inherit"
                sx={{ flexGrow: 1, ml: 0, fontFamily: 'Noto Sans Thai', fontWeight: 900 }}
              >
                กลับ
              </Button> */}

            </Box>
          </Box>
        </Grid>
        {/* <Box>
            <Button
              component={RouterLink}
              to="/issue/create"
              variant="contained"
              color="primary"
            >
              Admin
            </Button>
        </Box> */}
      </Grid>
      <Dialog
        open={dialogRegisterOpen}
        onClose={handleDialogRegisterClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"REGISTER"}
        </DialogTitle>

        <DialogContent>
          <Box>
            <Paper elevation={2} sx={{ padding: 2, margin: 2 }}>
              <Grid container>
                <Grid container> {/** email & password */}
                  
                  <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                      <p className="font-custom-regular">Email</p>
                      <TextField
                        id="Email"
                        variant="outlined"
                        type="string"
                        size="medium"
                        placeholder="กรุณากรอกข้อมูลอีเมล"
                        value={user.Email || ""}
                        onChange={handleInputChange_user}
                      />
                    </FormControl>
                  </Grid>
                  {/* <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                      <p>ตำแหน่ง</p>
                      <Select
                        native
                        name="Role"
                        disabled
                        value={user.Role + ""}
                        onChange={handleChange}
                        // inputProps={{
                        //   name: "Role",
                        // }}
                      >
                        
                        {role.map((item: RoleInterface) => (
                          <option value={item.Name} key={item.Name}>
                            {item.Name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid> */}
                  <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                      <p className="font-custom-regular">รหัสผ่าน</p>
                      <TextField
                        id="Password"
                        variant="outlined"
                        type="password"
                        size="medium"
                        placeholder="กรุณากรอกรหัสผ่าน"
                        value={user.Password || ""}
                        onChange={handleInputChange_user}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                    <p className="font-custom-regular">ชื่อ - สกุล</p>
                    <FormControl fullWidth variant="outlined">
                      <TextField
                        id="Name"
                        variant="outlined"
                        type="string"
                        size="medium"
                        placeholder="กรุณากรอกข้อมูลชื่อ"
                        value={user.Name || ""}
                        onChange={handleInputChange_user}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <p className="font-custom-regular">เบอร์โทรศัพท์</p>
                    <FormControl fullWidth variant="outlined">
                      <TextField
                        id="PhoneNumber"
                        variant="outlined"
                        type="string"
                        size="medium"
                        placeholder="กรุณากรอกเบอร์โทรศัพท์"
                        value={user.PhoneNumber || ""}
                        onChange={handleInputChange_user}
                      />
                    </FormControl>
                  </Grid>
                 
              </Grid>
            </Paper>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
          style={{ float: "right", color: "#ffffff", backgroundColor: "#F25234" }}
          onClick={handleDialogRegisterClose}>Cancel</Button>
          <Button 
          style={{ float: "right", color: "#ffffff", backgroundColor: "#F0BB62" }}
          onClick={submit_create} color="error" autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
    </div>
  );
}

export default SignIn;
