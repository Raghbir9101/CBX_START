import { Box, IconButton, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import HTTP from "../../HTTP";
import { Context } from "../Context/Context";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

function AdminDashboardTabs() {
  const { loginUser } = useContext(Context);
  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    HTTP.get(`getReports`).then((res) => {
      setDashboardData(res.data);
    });
  }, []);
  return (
    <Box>
      {loginUser?.isAdmin && (
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          mt={"22px"}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            flexWrap={"wrap"}
            gap="10px"
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: "10px 20px 20px 20px",
                "&:hover": {
                  boxShadow: 2,
                },
              }}
              className="card"
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  fontSize={"15px"}
                  color={"#4D8733"}
                  fontWeight={500}
                >
                  New Users Created Today
                </Typography>
                <IconButton
                  size="small"
                  sx={{
                    background: "#f2ffed",
                    borderRadius: "5px",
                    "&:hover": {
                      background: "#f2ffed",
                    },
                  }}
                >
                  <GroupOutlinedIcon
                    style={{ width: "18px", height: "18px" }}
                  />
                </IconButton>
              </Box>
              <Box display={"flex"} gap={"10px"} alignItems={"center"}>
                <Typography
                  fontSize={"22px"}
                  color={"#4D8733"}
                  fontWeight={"bold"}
                >
                  {dashboardData?.usersCreatedToday || 0}
                </Typography>
                <Box
                  height={"70%"}
                  bgcolor={getColor(dashboardData?.usersCreatedChange)}
                  p={"8px"}
                  borderRadius={"8px"}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "11px",
                    fontWeight: 500,
                  }}
                >
                  {(dashboardData?.usersCreatedChange || 0).toFixed(2)}%
                </Box>
              </Box>
              <Typography fontSize={"12px"} color={"#4D8733"}>
                vs. previous day
              </Typography>
              <Progress val={dashboardData?.usersCreatedChange} />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: "10px 20px 20px 20px",
                "&:hover": {
                  boxShadow: 2,
                },
              }}
              className="card"
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  fontSize={"15px"}
                  color={"#4D8733"}
                  fontWeight={500}
                >
                  New Pages Created Today
                </Typography>
                <IconButton
                  size="small"
                  sx={{
                    background: "#f2ffed",
                    borderRadius: "5px",
                    "&:hover": {
                      background: "#f2ffed",
                    },
                  }}
                >
                  <DescriptionOutlinedIcon
                    style={{ width: "18px", height: "18px" }}
                  />
                </IconButton>
              </Box>

              <Box display={"flex"} gap={"10px"} alignItems={"center"}>
                <Typography
                  fontSize={"22px"}
                  color={"#4D8733"}
                  fontWeight={"bold"}
                >
                  {dashboardData?.pagesCreatedToday || 0}
                </Typography>
                <Box
                  height={"70%"}
                  bgcolor={getColor(dashboardData?.pagesCreatedChange)}
                  p={"8px"}
                  borderRadius={"8px"}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "11px",
                    fontWeight: 500,
                  }}
                >
                  {(dashboardData?.pagesCreatedChange || 0).toFixed(2)}%
                </Box>
              </Box>
              <Typography fontSize={"12px"} color={"#4D8733"}>
                vs. previous day
              </Typography>
              <Progress val={dashboardData?.pagesCreatedChange} />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: "10px 20px 20px 20px",
                "&:hover": {
                  boxShadow: 2,
                },
              }}
              className="card"
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  fontSize={"15px"}
                  color={"#4D8733"}
                  fontWeight={500}
                >
                  Users
                </Typography>
                <IconButton
                  size="small"
                  sx={{
                    background: "#f2ffed",
                    borderRadius: "5px",
                    "&:hover": {
                      background: "#f2ffed",
                    },
                  }}
                >
                  <GroupOutlinedIcon
                    style={{ width: "18px", height: "18px" }}
                  />
                </IconButton>
              </Box>

              <Box display={"flex"} gap={"10px"} alignItems={"center"}>
                <Typography
                  fontSize={"22px"}
                  color={"#4D8733"}
                  fontWeight={"bold"}
                >
                  {dashboardData?.totalUsersCreated || 0}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: "10px 20px 20px 20px",
                "&:hover": {
                  boxShadow: 2,
                },
              }}
              className="card"
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  fontSize={"15px"}
                  color={"#4D8733"}
                  fontWeight={500}
                >
                  Pages
                </Typography>
                <IconButton
                  size="small"
                  sx={{
                    background: "#f2ffed",
                    borderRadius: "5px",
                    "&:hover": {
                      background: "#f2ffed",
                    },
                  }}
                >
                  <DescriptionOutlinedIcon
                    style={{ width: "18px", height: "18px" }}
                  />
                </IconButton>
              </Box>

              <Box display={"flex"} gap={"10px"} alignItems={"center"}>
                <Typography
                  fontSize={"22px"}
                  color={"#4D8733"}
                  fontWeight={"bold"}
                >
                  {dashboardData?.totalPagesCreated || 0}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default AdminDashboardTabs;

function getColor(val) {
  if (val > 0) {
    // return "#b4ffb1";
    return "#f2ffed";
  } else if (val < 0) {
    // return "#ff9ca1";
    return "#ffe4e4";
  } else return "#f0f0f0";
}

function Progress({ val }) {
  let temp = Math.abs(val);
  if (temp > 100) temp = 100;

  return (
    <Box pt={"16px"}>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography color={"#4D8733"} fontSize={"12px"}>
          0%
        </Typography>
        <Typography color={"#4D8733"} fontSize={"12px"}>
          100%
        </Typography>
      </Box>
      <Box
        bgcolor={val < 0 ? "#aa3939" : "#0026e1"}
        height={"3px"}
        borderRadius={"2px"}
        width={`${temp}%`}
      ></Box>
    </Box>
  );
}
