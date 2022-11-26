import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../api/api";
import urls from "../api/urls";
import { useDispatch } from "react-redux";
import actionTypes from "../redux/actions/actionTypes";

const Home = () => {
   const dispatch = useDispatch();
   const { randevularState, hastalarState } = useSelector((state) => state);
   const [checkDate, setCheckDate] = useState(new Date());

   useEffect(() => {
      const interval = setInterval(() => {
         setCheckDate(new Date());
      }, 5000);
      return () => {
         clearInterval(interval);
      };
   }, []);

   var sortedRandevular = randevularState.randevular.sort(function (
      item2,
      item1
   ) {
      return new Date(item2.date) - new Date(item1.date);
   });

   const today = new Date();

   sortedRandevular = sortedRandevular.filter((item) => {
      const date = new Date(item.date);

      if (date.getFullYear() < today.getFullYear()) {
         return false;
      }
      if (
         date.getFullYear() === today.getFullYear() &&
         date.getMonth() < today.getMonth()
      ) {
         return false;
      }
      if (
         date.getMonth() === today.getMonth() &&
         date.getDate() < today.getDate()
      ) {
         return false;
      }
      return true;
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

   const deleteRandevu = (id) => {
      api.delete(`${urls.randevular}/${id}`)
         .then((randevuRes) => {
            dispatch({ type: actionTypes.DELETE_RANDEVU, payload: id });
         })
         .catch((err) => console.log(err));
   };
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
                     const date = new Date(randevu.date);
                     var isNear = false;
                     if (date.getTime() - checkDate.getTime() <= 300000) {
                        isNear = true;
                     }
                     if (checkDate.getTime() - date.getTime() > 60000)
                        isNear = false;
                     return (
                        <TableRow
                           style={{
                              backgroundColor: isNear ? "yellow" : "white",
                           }}
                           key={randevu.id}
                           sx={{
                              "&:last-child td, &:last-child th": {
                                 border: 0,
                              },
                           }}
                        >
                           <TableCell component="th" scope="row">
                              {new Date(randevu.date).toLocaleString()}
                           </TableCell>
                           <TableCell>{aradigimHasta.name}</TableCell>
                           <TableCell>{aradigimHasta.surname}</TableCell>
                           <TableCell>{aradigimHasta.phone}</TableCell>
                           <TableCell>
                              <Stack spacing={2} direction="row">
                                 <Button variant="outlined" color="primary">
                                    Düzenle
                                 </Button>
                                 <Button
                                    onClick={() => deleteRandevu(randevu.id)}
                                    variant="outlined"
                                    color="error"
                                 >
                                    Sil
                                 </Button>
                                 <Button
                                    onClick={() =>
                                       navigate(`randevu-detay/${randevu.id}`)
                                    }
                                    variant="outlined"
                                    color="secondary"
                                 >
                                    Detaylar
                                 </Button>
                              </Stack>
                           </TableCell>
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
