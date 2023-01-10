import React, { useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import { DeleteForever, Check } from "@mui/icons-material";
import ConfirmationModal from "./ConfirmationModal";
import { format } from 'date-fns';
export default function EnhancedTable(props) {
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const [date, setDate] = useState("");
  const [bookmaker, setBookmaker] = useState("");
  const [details, setDetails] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("profit");

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <b></b>
                </TableCell>
                <TableCell align="center">
                  <b>Date</b>
                </TableCell>
                <TableCell align="center">
                  <b>Bookmaker</b>
                </TableCell>
                <TableCell align="center">
                  <b>Details</b>
                </TableCell>
                <TableCell align="center">
                  <b>Profit / Loss&nbsp;$</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.profits.map((row, index) => {
                console.log(row._id);
                return (
                  <TableRow key={index}>
                    <TableCell align="center">
                      <DeleteForever
                        style={{ cursor: "pointer", color: "red" }}
                        onClick={() => {
                          setOpen(true);
                          setDeleteId(row._id);
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">{format(new Date(row.date), 'yyyy/MM/dd')}</TableCell>
                    <TableCell align="center">{row.bookmaker}</TableCell>
                    <TableCell align="center">{row.details}</TableCell>
                    <TableCell align="center">{row.amount}</TableCell>
                  </TableRow>
                );
              })}
              {props.addRow && (
                <TableRow>
                  <TableCell align="center">
                    <DeleteForever
                      style={{ cursor: "pointer", color: "red" }}
                      onClick={() => {
                        props.setAddRow(false);
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <input
                      type="date"
                      style={{ padding: "5px 10px", borderRadius: 5 }}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <input
                      type="text"
                      placeholder="Enter bookmaker..."
                      style={{ padding: "5px 10px", borderRadius: 5 }}
                      value={bookmaker}
                      onChange={(e) => setBookmaker(e.target.value)}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <input
                      type="text"
                      placeholder="Enter details..."
                      style={{ padding: "5px 10px", borderRadius: 5 }}
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <input
                      type="number"
                      placeholder="Enter amount..."
                      style={{ padding: "5px 10px", borderRadius: 5 }}
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <select
                      style={{ padding: "5px 10px", borderRadius: 5 }}
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option value="profit">Profit</option>
                      <option value="loss">Loss</option>
                    </select>
                  </TableCell>
                  <TableCell align="center">
                    <Check
                      style={{ color: "cornflowerblue", cursor: "pointer" }}
                      onClick={() =>
                        props.addProfit({
                          date,
                          bookmaker,
                          details,
                          amount,
                          type,
                        })
                      }
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <ConfirmationModal
        open={open}
        deleteProfit={props.deleteProfit}
        id={deleteId}
        setOpen={setOpen}
      />
    </Box>
  );
}
