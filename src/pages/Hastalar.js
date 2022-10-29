import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Header from "../components/Header";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import EditHastaModal from "../components/EditHastaModal";

const Hastalar = (props) => {
   const navigate = useNavigate();
   const [hastalar, setHastalar] = useState(null);
   const [updateComponent, setUpdateComponent] = useState(false);
   const [randevular, setRandevular] = useState(null);
   const [openEditModal, setOpenEditModal] = useState(false);
   const [selectedHasta, setSelectedHasta] = useState(null);

   const handleClose = () => {
      setOpenEditModal(false);
   };

   useEffect(() => {
      axios
         .get("http://localhost:3004/hastalar")
         .then((res) => {
            setHastalar(res.data);
         })
         .catch((err) => console.log("Hastalar page getHastalarErr", err));
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
                  .catch((err) =>
                     console.log("hastalar sayfası deleteIslem err", err)
                  );
            });
            filteredRandevular.map((item) => {
               axios
                  .delete(`http://localhost:3004/randevular/${item.id}`)
                  .then((res) => {})
                  .catch((err) => console.log(err));
            });
            setUpdateComponent(!updateComponent);
         })
         .catch((err) => console.log("hasatalar sayfası hastaDelete err", err));
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
                  marginBottom: "20px",
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
               <TableHead sx={{ backgroundColor: "#999" }}>
                  <TableRow>
                     <TableCell>Adı</TableCell>
                     <TableCell>Soyadı</TableCell>
                     <TableCell>Telefon Numarası</TableCell>
                     <TableCell>İşlem</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {hastalar.length === 0 && (
                     <TableRow>
                        <TableCell align="center" colSpan={4}>
                           Kayıtlı Hasta Bulunmamaktadır
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
                        <TableCell>{hasta.name}</TableCell>
                        <TableCell>{hasta.surname}</TableCell>
                        <TableCell>{hasta.phone}</TableCell>
                        <TableCell>
                           <Stack spacing={2} direction="row">
                              <Button
                                 onClick={() => {
                                    setOpenEditModal(true);
                                    setSelectedHasta(hasta);
                                 }}
                                 variant="outlined"
                                 color="primary"
                              >
                                 Düzenle
                              </Button>
                              <Button
                                 onClick={() => handleDeleteHasta(hasta)}
                                 variant="outlined"
                                 color="error"
                              >
                                 Sil
                              </Button>
                              <Button
                                 variant="outlined"
                                 color="secondary"
                                 onClick={() =>
                                    navigate(`/hasta-detay/${hasta.id}`)
                                 }
                              >
                                 Detaylar
                              </Button>
                           </Stack>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
         <EditHastaModal
            updateComponent={updateComponent}
            setUpdateComponent={setUpdateComponent}
            hastalar={hastalar}
            hasta={selectedHasta}
            open={openEditModal}
            handleClose={handleClose}
         />
      </div>
   );
};

export default Hastalar;
