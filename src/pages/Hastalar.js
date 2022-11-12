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
import { useSelector, useDispatch } from "react-redux";
import actionTypes from "../redux/actions/actionTypes";

const Hastalar = (props) => {
   const { hastalarState, randevularState } = useSelector((state) => state);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [updateComponent, setUpdateComponent] = useState(false);
   const [openEditModal, setOpenEditModal] = useState(false);
   const [selectedHasta, setSelectedHasta] = useState(null);

   const handleClose = () => {
      setOpenEditModal(false);
   };

   const handleDeleteHasta = (hasta) => {
      console.log(hasta);
      const filteredRandevular = randevularState.randevular.filter(
         (item) => item.hastaId === hasta.id
      );
      console.log("filtrelenmiş randevular", filteredRandevular);
      axios
         .delete(`http://localhost:3004/hastalar/${hasta.id}`)
         .then((deleteHastaRes) => {
            dispatch({ type: actionTypes.DELETE_HASTA, payload: hasta.id });
            hasta.islemIds.map((islemId) => {
               axios
                  .delete(`http://localhost:3004/islemler/${islemId}`)
                  .then((islemDeleteRes) => {
                     dispatch({
                        type: actionTypes.DELETE_ISLEM,
                        payload: islemId,
                     });
                  })
                  .catch((err) =>
                     console.log("hastalar sayfası deleteIslem err", err)
                  );
            });
            filteredRandevular.map((item) => {
               axios
                  .delete(`http://localhost:3004/randevular/${item.id}`)
                  .then((res) => {
                     dispatch({
                        type: actionTypes.DELETE_RANDEVU,
                        payload: item.id,
                     });
                  })
                  .catch((err) => console.log(err));
            });
            setUpdateComponent(!updateComponent);
         })
         .catch((err) => console.log("hasatalar sayfası hastaDelete err", err));
   };

   if (hastalarState.success === false || randevularState.success === false) {
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
                  {hastalarState.hastalar.length === 0 && (
                     <TableRow>
                        <TableCell align="center" colSpan={4}>
                           Kayıtlı Hasta Bulunmamaktadır
                        </TableCell>
                     </TableRow>
                  )}
                  {hastalarState.hastalar.map((hasta) => (
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
            hasta={selectedHasta}
            open={openEditModal}
            handleClose={handleClose}
         />
      </div>
   );
};

export default Hastalar;
