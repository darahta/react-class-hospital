import Header from "../components/Header";
import React, { useEffect, useState } from "react";
import axios from "axios";
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

const Hastalar = (props) => {
   const navigate = useNavigate();

   const [hastalar, setHastalar] = useState(null);
   const [updateComponent, setUpdateComponent] = useState(false);
   const [randevular, setRandevular] = useState(null);

   useEffect(() => {
      axios
         .get("http://localhost:3004/hastalar")
         .then((res) => {
            setHastalar(res.data);
         })
         .catch((err) => console.log("Hastalar page gethastalar", err));
      axios
         .get("http://localhost:3004/randevular")
         .then((res) => {
            setRandevular(res.data);
         })
         .catch((err) => console.log(err));
   }, [updateComponent]);

   const handleDeleteHasta = (hasta) => {
      console.log(hasta);
      const filteredRandevular = randevular.filter(
         (item) => item.hastaId === hasta.id
      );
      console.log("filtrelenmiş randevular", filteredRandevular);
      axios
         .delete(`http://localhost:3004/hastalar/${hasta.id}`)
         .then((deleteHastaRes) => {
            hasta.islemIds.map((islemId) => {
               axios
                  .delete(`http://localhost:3004/islemler/${islemId}`)
                  .then((islemDeleteRes) => {})
                  .catch((err) => console.log("hastalar sayfası del err", err));
            });
            filteredRandevular.map((item) => {
               axios
                  .delete(`http://localhost:3004/randevular/${item.id}`)
                  .then((res) => {})
                  .catch((err) => console.log(err));
            });
            setUpdateComponent(!updateComponent);
         })
         .catch((err) => console.log("Hastalar sayfası hasta delete", err));
   };

   if (hastalar === null || randevular === null) {
      return <h1>Loading...</h1>;
   }

   return (
      <div>
         <Header />

         <TableContainer style={{ marginTop: "50px" }} component={Paper}>
            <div
               style={{
                  marginBottom: "25px",
                  display: "flex",
                  justifyContent: "flex-end",
               }}
            >
               <Button
                  onClick={() => navigate("/hasta-ekle")}
                  variant="contained"
               >
                  Hasta Ekle
               </Button>
            </div>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
               <TableHead sx={{ backgroundColor: "#aaa" }}>
                  <TableRow>
                     <TableCell align="center">Adı</TableCell>
                     <TableCell align="center">Soyadı</TableCell>
                     <TableCell align="center">Telefon Numarası</TableCell>
                     <TableCell align="center">İşlem</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {hastalar.length === 0 && (
                     <TableRow>
                        <TableCell align="center" colSpan={4}>
                           Kayıtlı hasta bulunmamaktadır.
                        </TableCell>
                     </TableRow>
                  )}
                  {hastalar.map((hasta) => (
                     <TableRow
                        key={hasta.id}
                        sx={{
                           "&:last-child td, &:last-child th": { border: 0 },
                        }}
                     >
                        <TableCell align="center">{hasta.name}</TableCell>
                        <TableCell align="center">{hasta.surname}</TableCell>
                        <TableCell align="center">{hasta.phone}</TableCell>
                        <TableCell
                           style={{ display: "flex", justifyContent: "center" }}
                        >
                           <Stack spacing={2} direction="row">
                              <Button variant="outlined" color="primary">
                                 Düzenle
                              </Button>
                              <Button
                                 onClick={() => handleDeleteHasta(hasta)}
                                 variant="outlined"
                                 color="error"
                              >
                                 Sil
                              </Button>
                              <Button variant="outlined" color="secondary">
                                 Detaylar
                              </Button>
                           </Stack>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </div>
   );
};

export default Hastalar;
