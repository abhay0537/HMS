import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getpatient } from "../../slices/patientSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Box } from "@mui/system";
import { Button, Chip, Grid, Typography } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: { fontSize: 14 },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": { backgroundColor: theme.palette.action.hover },
  "&:last-child td, &:last-child th": { border: 0 },
}));

export default function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tokens = localStorage.getItem("jwt");

  const MakePayment = async (id) => {
    try {
      await axios.post(
        "https://hms-five-kappa.vercel.app/patient/payment",
        { status: "paid", _id: id },
        { headers: { authorization: tokens } }
      );
      toast.success("Payment marked as paid!");
      dispatch(getpatient());
    } catch (error) {
      toast.error(error.message);
    }
  };

  const appointment = useSelector((state) => state.patient);

  React.useEffect(() => {
    dispatch(getpatient());
  }, [dispatch]);

  return (
    <>
      <Grid container sx={{ display: "flex", flexDirection: "column" }}>
        <Grid item sx={{ marginTop: "20px", marginBottom: "20px" }}>
          <Typography variant="h4" align="center" gutterBottom>
            My Appointments
          </Typography>
        </Grid>
        <Grid item>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 600 }} aria-label="appointments table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Doctor's Name</StyledTableCell>
                  <StyledTableCell align="left">Disease</StyledTableCell>
                  <StyledTableCell align="left">Date</StyledTableCell>
                  <StyledTableCell align="left">Fee (₹)</StyledTableCell>
                  <StyledTableCell align="left">Payment</StyledTableCell>
                  <StyledTableCell align="left">Report</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointment?.list?.user_appointments?.map((item) => (
                  <StyledTableRow key={item._id}>
                    <StyledTableCell>{item?.doctor?.name}</StyledTableCell>
                    <StyledTableCell align="left">{item?.disease}</StyledTableCell>
                    <StyledTableCell align="left">
                      {moment.utc(item?.date).format("MM/DD/YYYY")}
                    </StyledTableCell>
                    <StyledTableCell align="left">₹{item?.doctor?.ammount}</StyledTableCell>
                    <StyledTableCell align="left">
                      {item?.payment === "paid" ? (
                        <Chip label="Paid" color="success" size="small" />
                      ) : (
                        <Button
                          variant="contained"
                          size="small"
                          color="primary"
                          onClick={() => MakePayment(item?._id)}
                        >
                          Mark as Paid
                        </Button>
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {item?.payment === "paid" ? (
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => navigate(`/report/${item._id}`)}
                        >
                          View Report
                        </Button>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          Pending...
                        </Typography>
                      )}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}
