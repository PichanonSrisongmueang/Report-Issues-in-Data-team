import React, { useEffect, useState } from 'react'
import './IssueStyle.css';
import Button from "@mui/material/Button";
import { Link, Link as RouterLink } from "react-router-dom";
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import { IssueInterface } from "../interfaces/Ifact_Issue";
import { GetIssues } from "../services/HttpClientService";
import { TableRow, TableCell, IconButton, Grid, Card, CardActionArea, CardMedia, CardContent, Typography, Stack } from '@mui/material';
import { UsersInterface } from '../interfaces/Idim_User';
import { GetUserByID } from '../services/HttpClientService';
function Home() {
  const [issues, setIssues] = useState<IssueInterface[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [SortDemo, setSortDemo] = React.useState("รอเจ้าหน้าที่ตอบรับ");
  const [users, setUsers] = useState<UsersInterface>();
  function handelSortSortDemo() {
    if (SortDemo == "รอเจ้าหน้าที่ตอบรับ") { setSortDemo("") }
    else { setSortDemo("รอเจ้าหน้าที่ตอบรับ") }
  }
  const getUser = async () => {
    // const uid = Number(localStorage.getItem("uid"));
    let res = await GetUserByID();
    if (res) {
      setUsers(res);
    }
  };
  const getIssues = async () => {
    let res = await GetIssues();
    if (res) {
      setIssues(res);
    }
  };
  useEffect(() => {
    getIssues();
    setSearchQuery("รอเจ้าหน้าที่ตอบรับ");
    getUser();
  }, []);
  return (
    <>
      <header>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300&display=swap');
        </style>
      </header>

      <p className="font-size-home-header"><b>ยินดีต้อนรับคุณ {`${users?.Name}`} [{`${users?.Department}`}]</b></p>
      <p className="font-size-home">Web application นี้จัดทำขึ้นเพื่อให้ทีม Data แจ้งปัญหาและแก้ไขเรื่องข้อมูลที่ไม่ตรงกัน ระหว่าง Qlikview และ Power BI</p>
      {/* <p className="font-size-home"><b>{`${users?.Name}`} [{`${users?.Department}`}]</b></p> */}
      {/* <p className="font-size-home">หากท่านต้องการแจ้งปัญหา สามารถกดที่ปุ่มแจ้งปัญหาด้านล่างนี้ได้เลย</p> */}
      {/* <div className="center">
        <LiveHelpIcon
          sx={{ fontSize: 150, mt: 4, position: "center", color: "#F0BB62" }}
        ></LiveHelpIcon>
      </div> */}

      <div className='center2'>
        <Grid container spacing={3} sx={{ padding: 2, maxWidth: 800 }}>
          <Grid item xs={12}>
            <Card sx={{ maxWidth: '100%' , height: 90,border: 3,borderColor:"#519259" }}>
              
                <CardContent >
                  <Stack spacing={2} direction="row" alignItems="center" sx={{ fontSize: 24, mt: 0 }} >
                    <Typography variant="h5" component="div" sx={{ width: 500, flexGrow: 1, ml: 0, fontFamily: 'Noto Sans Thai', fontWeight: 900 }} >
                      จำนวน Issue ทั้งหมด
                    </Typography>
                    <Typography variant="body2" color="text" fontSize={40} sx={{ fontFamily: 'Noto Sans Thai', fontWeight: 900 }}>
                    {issues.filter(item => item.Status?.Value.toLowerCase().includes("")).length}
                    </Typography>
                  </Stack>
                </CardContent>
              
            </Card>
          </Grid>



          <Grid item xs={6}>
            <Card sx={{ maxWidth: '100%' , height: 90,border: 1,borderColor:"#144f3f"  }}>
              
                <CardContent>
                <Stack spacing={2} direction="row" alignItems="center" sx={{ fontSize: 24, mt: 0 }} >
                    <Typography variant="h5" component="div" sx={{ width: 500, flexGrow: 1, ml: 0, fontFamily: 'Noto Sans Thai', fontWeight: 900 }} >
                      รอเจ้าหน้าที่ตอบรับ
                    </Typography>
                    <Typography variant="body2" color="text" fontSize={40} sx={{ fontFamily: 'Noto Sans Thai', fontWeight: 900 }}>
                    {issues.filter(item => item.Status?.Value.toLowerCase().includes("รอเจ้าหน้าที่ตอบรับ")).length}
                    </Typography>
                  </Stack>
                </CardContent>
              
            </Card></Grid>
          <Grid item xs={6}>
            <Card sx={{ maxWidth: '100%' , height: 90,border: 1,borderColor:"#144f3f" }}>
              
                <CardContent>
                <Stack spacing={2} direction="row" alignItems="center" sx={{ fontSize: 24, mt: 0 }} >
                    <Typography variant="h5" component="div" sx={{ width: 500, flexGrow: 1, ml: 0, fontFamily: 'Noto Sans Thai', fontWeight: 900 }} >
                      กำลังดำเนินการ
                    </Typography>
                    <Typography variant="body2" color="text" fontSize={40} sx={{ fontFamily: 'Noto Sans Thai', fontWeight: 900 }}>
                    {issues.filter(item => item.Status?.Value.toLowerCase().includes("กำลังดำเนินการ")).length}
                    </Typography>
                  </Stack>
                </CardContent>
              
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Card sx={{ maxWidth: '100%' , height: 90,border: 1,borderColor:"#144f3f"}}>
              
                <CardContent>
                <Stack spacing={2} direction="row" alignItems="center" sx={{ fontSize: 24, mt: 0 }} >
                    <Typography variant="h5" component="div" sx={{ width: 500, flexGrow: 1, ml: 0, fontFamily: 'Noto Sans Thai', fontWeight: 900 }} >
                      สำเร็จ
                    </Typography>
                    <Typography variant="body2" color="text" fontSize={40} sx={{ fontFamily: 'Noto Sans Thai', fontWeight: 900 }}>
                    {issues.filter(item => item.Status?.Value.toLowerCase().includes("สำเร็จ")).length}
                    </Typography>
                  </Stack>
                </CardContent>
              
            </Card></Grid>
          <Grid item xs={6}>
            <Card sx={{ maxWidth: '100%' , height: 90,border: 1,borderColor:"#144f3f" }}>
              
                <CardContent>
                <Stack spacing={2} direction="row" alignItems="center" sx={{ fontSize: 24, mt: 0 }} >
                    <Typography variant="h5" component="div" sx={{ width: 500, flexGrow: 1, ml: 0, fontFamily: 'Noto Sans Thai', fontWeight: 900 }} >
                      ยกเลิก
                    </Typography>
                    <Typography variant="body2" color="text" fontSize={40} sx={{ fontFamily: 'Noto Sans Thai', fontWeight: 900 }}>
                    {issues.filter(item => item.Status?.Value.toLowerCase().includes("ยกเลิก")).length}
                    </Typography>
                  </Stack>
                </CardContent>
              
            </Card>
          </Grid>
        </Grid>
      </div>




      <div className="center">
        <Link to="/issues">
          <button button-Position="center" className="button-76-home" role="button" ><b>แจ้งปัญหา</b></button>
        </Link>
      </div>
      {/* <div className="center">
        <Link to="/user/create">
          <button button-Position="center" className="button-76-home" role="button" ><b>UserCreate</b></button>
        </Link>
      </div> */}
      {/* <div className="center">
        {issues.filter(item => item.Status?.Value.toLowerCase().includes("")).length}
        {issues.filter(item => item.Status?.Value.toLowerCase().includes("รอเจ้าหน้าที่ตอบรับ")).length}
        {issues.filter(item => item.Status?.Value.toLowerCase().includes("กำลังดำเนินการ")).length}
        {issues.filter(item => item.Status?.Value.toLowerCase().includes("สำเร็จ")).length}
        {issues.filter(item => item.Status?.Value.toLowerCase().includes("ยกเลิก")).length}
      </div> */}

    </>
  );


}

export default Home

