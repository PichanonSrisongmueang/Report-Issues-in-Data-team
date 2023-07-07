import React, { useEffect, useState } from 'react'
import './IssueStyle.css';
import Button from "@mui/material/Button";
import { Link, Link as RouterLink } from "react-router-dom";
import EngineeringIcon from '@mui/icons-material/Engineering';
import { Grid, Card, CardContent, Stack, Typography } from '@mui/material';
import { GetIssues } from '../services/HttpClientService';
import { IssueInterface } from '../interfaces/Ifact_Issue';
import { GetAdminByID } from '../services/HttpClientService';
import { AdminsInterface } from '../interfaces/Idim_Admin';
function HomeAdmin() {
  const [issues, setIssues] = useState<IssueInterface[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [admins, setAdmins] = useState<AdminsInterface>();
  const getIssues = async () => {
    let res = await GetIssues();
    if (res) {
      setIssues(res);
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
    getIssues();
    setSearchQuery("รอเจ้าหน้าที่ตอบรับ");
    getAdmin();
  }, []);
  return (
    <><header>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300&display=swap');
        </style>
      </header>
      <p className="font-size-home-header"><b>ยินดีต้อนรับคุณ {`${admins?.Name}`} [{`${admins?.Department}`}]</b></p>
      <p className="font-size-home">Web application นี้จัดทำขึ้นเพื่อให้ทีม Data แจ้งปัญหาและแก้ไขเรื่องข้อมูลที่ไม่ตรงกัน ระหว่าง Qlikview และ Power BI</p>
      <p className="font-size-home">กดดูปัญหาที่แจ้งเข้ามา แล้วเริ่มต้นแก้ไขได้เลย</p>
      {/* <p className="font-size-home"><b>{`${admins?.Name}`} [{`${admins?.Department}`}]</b></p> */}
      {/* <div className="center">
      <EngineeringIcon
        sx={{ fontSize: 150, mt: 4 , position:"center"}}
      ></EngineeringIcon>
      </div> */}

      <div className='center2'>
        <Grid container spacing={3} sx={{ padding: 2, maxWidth: 800 }}>
          <Grid item xs={12}>
            <Card sx={{ maxWidth: '100%' , height: 90,border: 3,borderColor:"#519259" }}>
              
                <CardContent>
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
            <Card sx={{ maxWidth: '100%' , height: 90,border: 1,borderColor:"#144f3f" }}>
              
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
      <Link to="/issues/admin">
        <button  className="button-76-home" role="button">ดูปัญหาที่แจ้งเข้ามา</button>
      </Link>
      </div>
      
    </>
  )


}

export default HomeAdmin
