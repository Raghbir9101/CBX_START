import { Box, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import HTTP from '../../HTTP'
import { Context } from '../Context/Context'

function AdminDashboardTabs() {
    const { loginUser } = useContext(Context)
    const [dashboardData, setDashboardData] = useState({})

    useEffect(() => {
        HTTP.get(`getReports`).then(res => {
            console.log(res.data)
            setDashboardData(res.data)
        })
    }, [])
    return (
        <Box>
            {loginUser?.isAdmin && <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} >
                <Box display={"flex"} justifyContent={"space-evenly"} flexWrap={"wrap"} gap="10px">

                    <Box sx={{ display: "flex", flexDirection: "column", padding: "20px" }} className="card">
                        <Typography fontFamily={"Protest Riot"} fontSize={"18px"} color={"#6b33e9"}>New Users Created Today</Typography>
                        <Box display={"flex"} gap={"10px"} alignItems={"center"}>
                            <Typography fontSize={"45px"} fontFamily={"Poppins"} color={"#6b33e9"} fontWeight={"bold"}>
                                {
                                    dashboardData?.usersCreatedToday || 0
                                }
                            </Typography>
                            <Box height={"70%"} bgcolor={getColor(dashboardData?.usersCreatedChange)} p={"10px"} borderRadius={"10px"}>
                                {
                                    dashboardData?.usersCreatedChange || 0
                                }%
                            </Box>
                        </Box>
                        <Typography fontFamily={"Protest Riot"} fontSize={"14px"} color={"#6b33e9"}>vs. previous day</Typography>
                        <Progress val={dashboardData?.usersCreatedChange} />
                    </Box>


                    <Box sx={{ display: "flex", flexDirection: "column", padding: "20px" }} className="card">
                        <Typography fontFamily={"Protest Riot"} fontSize={"18px"} color={"#6b33e9"}>New Pages Created Today</Typography>
                        <Box display={"flex"} gap={"10px"} alignItems={"center"}>
                            <Typography fontSize={"45px"} fontFamily={"Poppins"} color={"#6b33e9"} fontWeight={"bold"}>
                                {
                                    dashboardData?.pagesCreatedToday || 0
                                }
                            </Typography>
                            <Box height={"70%"} bgcolor={getColor(dashboardData?.pagesCreatedChange)} p={"10px"} borderRadius={"10px"}>
                                {
                                    dashboardData?.pagesCreatedChange || 0
                                }%
                            </Box>
                        </Box>
                        <Typography fontFamily={"Protest Riot"} fontSize={"14px"} color={"#6b33e9"}>vs. previous day</Typography>
                        <Progress val={dashboardData?.pagesCreatedChange} />
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "column", padding: "20px" }} className="card">
                        <Typography fontFamily={"Protest Riot"} fontSize={"18px"} color={"#6b33e9"}>Users</Typography>
                        <Box display={"flex"} gap={"10px"} alignItems={"center"}>
                            <Typography fontSize={"45px"} fontFamily={"Poppins"} color={"#6b33e9"} fontWeight={"bold"}>
                                {
                                    dashboardData?.totalUsersCreated || 0
                                }
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "column", padding: "20px" }} className="card">
                        <Typography fontFamily={"Protest Riot"} fontSize={"18px"} color={"#6b33e9"}>Pages</Typography>
                        <Box display={"flex"} gap={"10px"} alignItems={"center"}>
                            <Typography fontSize={"45px"} fontFamily={"Poppins"} color={"#6b33e9"} fontWeight={"bold"}>
                                {
                                    dashboardData?.totalAdminsJoined || 0
                                }
                            </Typography>
                        </Box>
                    </Box>

                </Box>
            </Box>}
        </Box>
    )
}

export default AdminDashboardTabs;

function getColor(val) {
    if (val > 0) {
      return "#b4ffb1"
    }
    else if (val < 0) {
      return "#ff9ca1"
    }
    else return "#f0f0f0"
  }

  
function Progress({ val }) {
    let temp = Math.abs(val);
    if (temp > 100) temp = 100;
  
    return <Box pt={"20px"}>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography color={"#6b33e9"}>
          0%
        </Typography>
        <Typography color={"#6b33e9"}>
          100%
        </Typography>
      </Box>
      <Box bgcolor={val < 0 ? "red" : "#0026e1"} height={"3px"} borderRadius={"2px"} width={`${temp}%`}>
  
      </Box>
    </Box>
  }