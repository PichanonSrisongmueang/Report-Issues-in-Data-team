import React, { useState, useEffect } from "react";
import { Link, Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button, { ButtonTypeMap } from "@mui/material/Button";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
//import { DataGrid, GridColDef } from "@mui/x-data-grid";
//import { WatchVideoInterface } from "../interfaces/IWatchVideo";
//import { GetWatchVideos } from "../services/HttpClientService";
import { GetIssues } from "../services/HttpClientService";
import { IssueInterface } from "../interfaces/Ifact_Issue";
import { DataGrid, GridColDef, GridRenderCellParams, GridRowParams } from '@mui/x-data-grid';
import moment from 'moment';
import { ExtendButtonBase, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { purple } from "@mui/material/colors";
function Issues_Admin() {
  const [issues, setIssues] = useState<IssueInterface[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  useEffect(() => {
    getIssues();
  }, []);

  const getIssues = async () => {
    let res = await GetIssues();
    if (res) {
      setIssues(res);
    }
  };

  const columns: GridColDef[] = [//750
    {
      field: "ID",
      headerName: "ลำดับ",
      width: 60,
      align: "center",
      headerAlign: "center",
      cellClassName: "font-custom-regular",
      headerClassName: "font-custom-header-table",
    },
    {
      field: "Project.Title",
      headerName: "Project",
      width: 165,
      align: "center",
      headerAlign: "center",
      cellClassName: "font-custom-regular",
      headerClassName: "font-custom-header-table",
      renderCell: (params: GridRenderCellParams<any>) => {
        return <>{params.row.Project.Title}</>;
      },
    },
    {
      field: "Status.Value",
      headerName: "สถานะ",
      width: 150,
      align: "center",
      headerAlign: "center",
      cellClassName: "font-custom-regular",
      headerClassName: "font-custom-header-table",
      renderCell: (params: GridRenderCellParams<any>) => {

        return <>{params.row.Status.Value}</>;
      },
    },
    {
      field: "Detail",
      headerName: "รายละเอียด",
      width: 400,
      align: "center",
      headerAlign: "center",
      cellClassName: "font-custom-regular",
      headerClassName: "font-custom-header-table",
      renderCell: (params: GridRenderCellParams<any>) => {
        return <>{params.row.Detail}</>;
      },
    },
    {
      field: "IssueTimeCreate",
      headerName: "วันที่แจ้งปัญหา",
      width: 130,
      align: "center",
      headerAlign: "center",
      cellClassName: "font-custom-regular",
      headerClassName: "font-custom-header-table",
      renderCell: (params: GridRenderCellParams<any>) => {
        return (
          <>
            {`${moment(params.row.IssueTimeCreate).format(
              "DD/MM/YYYY"
            )}    ${moment(params.row.IssueTimeCreate).format(
              "HH:mm"
            )} น.`}
          </>
        );
      },
    },
    {
      field: "User.Name",
      headerName: "ผู้แจ้ง",
      width: 160,
      align: "center",
      headerAlign: "center",
      cellClassName: "font-custom-regular",
      headerClassName: "font-custom-header-table",
      renderCell: (params: GridRenderCellParams<any>) => {
        return <>{params.row.User.Name}</>;
      },
    },
    {
      field: "แก้ไข",
      align: "center",
      headerAlign: "center",
      width: 85,
      cellClassName: "font-custom-regular",
      headerClassName: "font-custom-header-table",
      renderCell: ({ row }: Partial<GridRowParams>) =>
        <IconButton component={RouterLink}
          to="/issue/update"
          size="small"
          color="secondary"
          onClick={() => {
            console.log("ID", row.ID)
            localStorage.setItem("did", row.ID);
          }}
        >
          <EditIcon />
        </IconButton >,
    },

  ];
  const convertDateFormat = (date: Date) => {
    const newDate = new Date(date)
    return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes() < 10 ? '0' : ''}${newDate.getMinutes()} น.`
  }

  return (

    <div>
      <header>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300&display=swap');
        </style>
      </header>
      <Container sx={{ width: 1800 }}>
        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        >
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h5"
              color="#F0BB62"
              gutterBottom
              sx={{ flexGrow: 1, ml: 0, fontFamily: 'Noto Sans Thai', fontWeight: 900 }}
            >
              รายละเอียดการแจ้งปัญหา
            </Typography>
            <Grid container marginTop={-1} >
              <Grid item xs={3} >
                <TextField sx={{ height: 0, width: 260}}
                  id="search-bar"
                  fullWidth
                  onChange={(event) => (
                    setSearchQuery(event.target.value)
                  )}
                  label="ค้นหาชื่อโปรเจ็ค หรือ เจ้าหน้าที่"
                  variant="outlined"
                  //placeholder="Search..."
                  size="small"
                  
                />
              </Grid>
            </Grid>
            {/* <Grid container marginTop={-1}>
              <Grid item xs={3} >
                <TextField
                  id="search-bar"
                  fullWidth
                  onChange={(event) => (
                    setSearchQuery(event.target.value)
                  )}
                  label="ค้นหาผู้แจ้ง"
                  variant="outlined"
                  //placeholder="Search..."
                  size="small"
                  sx={{ height: 0 }}
                />
              </Grid>
            </Grid> */}
          </Box>
          <Box>
            <Button
              onClick={() => (
                setSearchQuery("รอเจ้าหน้าที่ตอบรับ")
              )}
              variant="contained"
              color="warning"
              sx={{ flexGrow: 1, ml: 0, fontFamily: 'Noto Sans Thai', fontWeight: 900,backgroundColor: "#f19f11", Color: "#000000" }}
              
            >

              ปัญหาที่ยังรอเจ้าหน้าที่ตอบรับ
            </Button>
            <IconButton
              onClick={() => (
                setSearchQuery("")
              )}
            >

                <AutorenewIcon/>
            </IconButton>
            {/* <ColorButton variant="contained">Custom CSS</ColorButton> */}
          </Box>
          
          {/* <Box>
            <Button
              component={RouterLink}
              to="/issue/create"
              variant="contained"
              color="primary"
            >
              สร้างข้อมูล
            </Button>
          </Box> */}
        </Box>
        <div style={{ height: 600, width: "100%", marginTop: "20px" }}>
          {/* <DataGrid
            rows={issues}
            getRowId={(row) => row.ID}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          /> */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ flexGrow: 1, ml: 0, fontFamily: 'Noto Sans Thai', fontWeight: 900 ,  backgroundColor: "#519259",color:"#ffffff",}}>ลำดับ</TableCell>
                  <TableCell align="center" sx={{ flexGrow: 1, ml: 0, fontFamily: 'Noto Sans Thai', fontWeight: 900 ,  backgroundColor: "#519259",color:"#ffffff",}}><b>ชื่อโปรเจ็ค</b></TableCell>
                  <TableCell align="center" sx={{ flexGrow: 1, ml: 0, fontFamily: 'Noto Sans Thai', fontWeight: 900 ,  backgroundColor: "#519259",color:"#ffffff",}}>สถานะ</TableCell>
                  <TableCell align="center" sx={{ flexGrow: 1, ml: 0, fontFamily: 'Noto Sans Thai', fontWeight: 900 ,  backgroundColor: "#519259",color:"#ffffff",}}>รายละเอียด</TableCell>
                  <TableCell align="center" sx={{ flexGrow: 1, ml: 0, fontFamily: 'Noto Sans Thai', fontWeight: 900 ,  backgroundColor: "#519259",color:"#ffffff",}}>วันที่แจ้งปัญหา</TableCell>
                  <TableCell align="center" sx={{ flexGrow: 1, ml: 0, fontFamily: 'Noto Sans Thai', fontWeight: 900 ,  backgroundColor: "#519259",color:"#ffffff",}}>ผู้แจ้ง</TableCell>
                  <TableCell align="center" sx={{ flexGrow: 1, ml: 0, fontFamily: 'Noto Sans Thai', fontWeight: 900 ,  backgroundColor: "#519259",color:"#ffffff",}}>เจ้าหน้าที่</TableCell>
                  <TableCell align="center" sx={{ flexGrow: 1, ml: 0, fontFamily: 'Noto Sans Thai', fontWeight: 900 ,  backgroundColor: "#519259",color:"#ffffff",}}>อัปเดต</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {issues.filter(item => item.Status?.Value.toLowerCase().includes(searchQuery.toLowerCase()) 
                || item.Project?.Title?.toLowerCase().includes(searchQuery.toLowerCase())
                || item.Admin?.Name?.toLowerCase().includes(searchQuery.toLowerCase())).map((item) => (
                  <TableRow
                    key={item.ID}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row" sx={{ flexGrow: 1, ml: 0, fontFamily: 'Noto Sans Thai', fontWeight: 900}}>
                      {item.ID}
                    </TableCell>
                    <TableCell align="center" sx={{ flexGrow: 1, ml: 0, fontFamily: 'Noto Sans Thai', fontWeight: 900 }}>{item.Project?.Title}</TableCell>
                    <TableCell align="center" sx={{ flexGrow: 1, ml: 0, fontFamily: 'Noto Sans Thai', fontWeight: 900 }}>{item.Status?.Value}</TableCell>
                    <TableCell align="center" sx={{ flexGrow: 1, ml: 0, fontFamily: 'Noto Sans Thai', fontWeight: 900 }}>{item.Detail}</TableCell>
                    <TableCell align="center" sx={{ flexGrow: 1, ml: 0, fontFamily: 'Noto Sans Thai', fontWeight: 900 }}>{convertDateFormat(item.IssueTimeCreate)}</TableCell>
                    <TableCell align="center" sx={{ flexGrow: 1, ml: 0, fontFamily: 'Noto Sans Thai', fontWeight: 900 }}>{item.User?.Name}</TableCell>
                    <TableCell align="center" sx={{ flexGrow: 1, ml: 0, fontFamily: 'Noto Sans Thai', fontWeight: 900 }}>{item.Admin?.Name}</TableCell>
                    <TableCell align="center" sx={{ flexGrow: 1, ml: 0, fontFamily: 'Noto Sans Thai', fontWeight: 900 }}>{
                      <IconButton

                        color="warning"
                        onClick={() => {
                          // SentID(convertTypeString(item.ID))
                          localStorage.setItem("did", String(item.ID));
                        }}
                        component={RouterLink}
                        to={"/issue/update"}

                      >
                        <EditIcon />
                      </IconButton>

                    }</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Container>
    </div>
  );
}

export default Issues_Admin;
function styled(Button: ExtendButtonBase<ButtonTypeMap<{}, "button">>) {
  throw new Error("Function not implemented.");
}

