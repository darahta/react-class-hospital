import React from "react";
import Header from "../components/Header";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
   const { randevularState, hastalarState } = useSelector((state) => state);
   const sortedRandevular = randevularState.randevular.sort(function (
      item2,
      item1
   ) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(item2.date) - new Date(item1.date);
   });
   const navigate = useNavigate();

   if (
      hastalarState.start === true ||
      hastalarState.fail === true ||
      randevularState.start === true ||
      randevularState.fail === true
   ) {
      return <h1>Loading...</h1>;
   }

   return (
      <div>
         <Header />
         <TableContainer style={{ marginTop: "50px" }} component={Paper}>
            <div
               style={{
                  marginBottom: "20px",
                  display: "flex",
                  justifyContent: "flex-end",
               }}
            >
               <Button
                  onClick={() => navigate("/randevu-ekle")}
                  variant="contained"
               >
                  Randevu Ekle
               </Button>
            </div>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
               <TableHead sx={{ backgroundColor: "#999" }}>
                  <TableRow>
                     <TableCell>Tarih</TableCell>
                     <TableCell>Adı</TableCell>
                     <TableCell>Soyadı</TableCell>
                     <TableCell>Telefon Numarası</TableCell>
                     <TableCell>İşlem</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {randevularState.randevular.length === 0 && (
                     <TableRow>
                        <TableCell align="center" colSpan={4}>
                           Kayıtlı Hasta Bulunmamaktadır
                        </TableCell>
                     </TableRow>
                  )}
                  {sortedRandevular.map((randevu) => {
                     const aradigimHasta = hastalarState.hastalar.find(
                        (hasta) => hasta.id === randevu.hastaId
                     );
                     return (
                        <TableRow
                           key={randevu.id}
                           sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                           }}
                        >
                           <TableCell component="th" scope="row">
                              {new Date(randevu.date).toLocaleString()}
                           </TableCell>
                           <TableCell>{aradigimHasta.name}</TableCell>
                           <TableCell>{aradigimHasta.surname}</TableCell>
                           <TableCell>{aradigimHasta.phone}</TableCell>
                           <TableCell>butonlar gelecek</TableCell>
                        </TableRow>
                     );
                  })}
               </TableBody>
            </Table>
         </TableContainer>
      </div>
   );
};

export default Home;
