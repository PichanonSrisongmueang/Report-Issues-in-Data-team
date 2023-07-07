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
import { ProjectInterface } from "../interfaces/Idim_Project";
import { CreateProject } from "../services/HttpClientService";
import { useForm, SubmitHandler } from "react-hook-form";
import { literal, object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { HttpClientServices } from "../services/HttpClientService";
import {
  GetImportance,
  Issues, //fact
  GetProject,
  GetUsers,
  GetAdminByID,
  GetUserByID,

} from "../services/HttpClientService";
// import { string } from "zod";
import { Avatar, Stack, Tooltip } from "@mui/material";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const role = [{ Name: "employee" }, { Name: "user" }];

function ProjectCreate() {
    const [project, setProject] = React.useState<Partial<ProjectInterface>>({});
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [message, setAlertMessage] = React.useState("");
    const [users, setUsers] = React.useState<UsersInterface>();

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
        const id = event.target.id as keyof typeof ProjectCreate;
        const { value } = event.target;
        setProject({ ...project, [id]: value });
    };

    const handleChange = (event: SelectChangeEvent) => {
        const name = event.target.name as keyof typeof ProjectCreate;
        setProject({
            ...project,
            [name]: event.target.value,
        });
    };

    const convertType = (data: string | number | undefined | null) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };
    const getUser = async () => {
        // const uid = Number(localStorage.getItem("uid"));
        let res = await GetUserByID();
        if (res) {
            setUsers(res);
        }
    };
    useEffect(() => {
        getUser();

      }, []);
    async function submit() {
        // setUploading(true)
        let data = {

            OwnerID: users?.Name,
            Title: project.Title,
            Description: project.Description ?? "",

        };
        let res = await CreateProject(data);
        if (res.status) {
            setAlertMessage("บันทึกข้อมูลสำเร็จ");
            setSuccess(true);
        } else {
            setAlertMessage(res.message);
            setError(true);
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
                            sx={{ flexGrow: 1, ml: 0, fontFamily: 'Noto Sans Thai', fontWeight: 900 }}
                            gutterBottom
                        >
                            เพิ่มโปรเจ็ค
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <Grid container spacing={3} sx={{ padding: 2 }}>
                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined" sx={{ flexGrow: 1, ml: 0, fontFamily: 'Noto Sans Thai', fontWeight: 900 }}>
                        <p>ชื่อโปรเจ็ค</p>
                            <TextField
                                id="Title"
                                variant="outlined"
                                type="string"
                                size="medium"
                                placeholder="กรุณากรอกชื่อโปเจ็ค"
                                sx={{ flexGrow: 1, ml: 0, fontFamily: 'Noto Sans Thai', fontWeight: 900 }}
                                value={project.Title || ""}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined" sx={{ flexGrow: 1, ml: 0, fontFamily: 'Noto Sans Thai', fontWeight: 900 }}>
                            <p>รายละเอียด</p>
                            <TextField
                                id="Description"
                                variant="outlined"
                                type="string"
                                size="medium"
                                placeholder="คำอธิบายโปรเจ็ค"
                                sx={{ flexGrow: 1, ml: 0, fontFamily: 'Noto Sans Thai', fontWeight: 900 }}
                                value={project.Description || ""}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                    {/* <Grid item xs={3}>
                        <FormControl fullWidth variant="outlined">
                            <p className="font-custom-regular">ผู้แจ้ง</p>
                            <Select
                                native
                                value={project.OwnerID + ""}
                                onChange={handleChange}
                                disabled
                                inputProps={{
                                    name: "OwnerID",
                                }}
                            >

                                <option aria-label="None" value="">
                                    {users?.Name}
                                </option>
                            </Select>
                        </FormControl>
                    </Grid> */}
                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined" sx={{ flexGrow: 1, ml: 0, fontFamily: 'Noto Sans Thai', fontWeight: 900 }}>
                            <p >ผู้รับผิดชอบโปรเจ็คนี้</p>
                            <TextField
                                disabled
                                id="OwnerID"
                                variant="outlined"
                                type="string"
                                size="medium"
                                sx={{ flexGrow: 1, ml: 0, fontFamily: 'Noto Sans Thai', fontWeight: 900 }}
                                placeholder=""
                                value={users?.Name}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            sx={{ flexGrow: 1, ml: 0, fontFamily: 'Noto Sans Thai', fontWeight: 900 }}
                            component={RouterLink}
                            to="/issue/create"
                            variant="contained"
                            color="inherit"
                        >
                            กลับ
                        </Button>
                        <Button
                            style={{ float: "right", color: "#ffffff", backgroundColor: "#064635",flexGrow: 1, fontFamily: 'Noto Sans Thai', fontWeight: 900 }}
                            //   style={{ float: "right" }}
                            onClick={submit}
                            variant="contained"
                            color="primary"
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

export default ProjectCreate;

// function useEffect(arg0: () => void, arg1: never[]) {
//     throw new Error("Function not implemented.");
// }
// function useState<T>(): [any, any] {
//     throw new Error("Function not implemented.");
// }

// function useEffect(arg0: () => void, arg1: never[]) {
//     throw new Error("Function not implemented.");
// }


