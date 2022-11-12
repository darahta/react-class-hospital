import React, { useState, useEffect } from "react";
import { Button, TextField, Modal, Box } from "@mui/material";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import actionTypes from "../redux/actions/actionTypes";
const style = {
   position: "absolute",
   top: "50%",
   left: "50%",
   transform: "translate(-50%, -50%)",
   width: "40vw",
   bgcolor: "background.paper",
   boxShadow: 24,
   p: 4,
};

const EditHastaModal = (props) => {
   const { open, handleClose, hasta } = props;
   const dispatch = useDispatch();
   const { hastalarState } = useSelector((state) => state);
   const [name, setName] = useState(hasta?.name);
   const [hasNameError, setHasNameError] = useState(false);
   const [surname, setSurname] = useState(hasta?.surname);
   const [hasSurnameError, setHasSurnameError] = useState(false);
   const [phone, setPhone] = useState(hasta?.phone);
   const [hasPhoneError, setHasPhoneError] = useState(false);
   const [phoneErrorMessage, setPhoneErrorMessage] = useState("");

   useEffect(() => {
      setName(hasta?.name);
      setSurname(hasta?.surname);
      setPhone(hasta?.phone);
   }, [hasta]);

   const handleSubmit = (event) => {
      event.preventDefault();
      if (name === "") {
         setHasNameError(true);
         setTimeout(() => {
            setHasNameError(false);
         }, 3000);
         return;
      }
      if (surname === "") {
         setHasSurnameError(true);
         setTimeout(() => {
            setHasSurnameError(false);
         }, 3000);
         return;
      }
      if (phone === "") {
         setHasPhoneError(true);
         setPhoneErrorMessage("*Telefon Alanı Zorunludur");
         setTimeout(() => {
            setHasPhoneError(false);
            setPhoneErrorMessage("");
         }, 3000);
         return;
      }
      if (phone.length !== 11) {
         setHasPhoneError(true);
         setPhoneErrorMessage("*Telefon Alano 11 haneli olmalıdır");
         setTimeout(() => {
            setHasPhoneError(false);
            setPhoneErrorMessage("");
         }, 3000);
         return;
      }
      const filteredHastalar = hastalarState.hastalar.filter(
         (item) => item.phone !== hasta.phone
      );
      const hasNumber = filteredHastalar.find((hasta) => hasta.phone === phone);
      if (hasNumber !== undefined) {
         alert("bu numara ile kayıtlı hasta vardır");
         return;
      }
      const updatedHasta = {
         ...hasta,
         name: name,
         surname: surname,
         phone: phone,
      };
      axios
         .put(`http://localhost:3004/hastalar/${hasta.id}`, updatedHasta)
         .then((response) => {
            handleClose();
            dispatch({ type: actionTypes.EDIT_HASTA, payload: updatedHasta });
         })
         .catch((err) => console.log("err", err));
   };

   return (
      <div>
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box sx={style}>
               <h1 style={{ textAlign: "center" }}>Hasta Düzenle</h1>
               <form onSubmit={handleSubmit}>
                  <div
                     style={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "20px 0",
                        flexDirection: "column",
                     }}
                  >
                     <TextField
                        style={{ width: "100%" }}
                        id="outlined-basic"
                        label="Hasta Adı"
                        variant="outlined"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                     />
                     {hasNameError && (
                        <p>
                           <small style={{ color: "red" }}>
                              *isim alanı zorunludur
                           </small>
                        </p>
                     )}
                  </div>
                  <div
                     style={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "20px 0",
                        flexDirection: "column",
                     }}
                  >
                     <TextField
                        style={{ width: "100%" }}
                        id="outlined-basic"
                        label="Hasta Soyadı"
                        variant="outlined"
                        value={surname}
                        onChange={(event) => setSurname(event.target.value)}
                     />
                     {hasSurnameError && (
                        <p>
                           <small style={{ color: "red" }}>
                              *soyisim alanı zorunludur
                           </small>
                        </p>
                     )}
                  </div>
                  <div
                     style={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "20px 0",
                        flexDirection: "column",
                     }}
                  >
                     <TextField
                        style={{ width: "100%" }}
                        id="outlined-basic"
                        label="Telefon Numarası"
                        variant="outlined"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                     />
                     {hasPhoneError && (
                        <p>
                           <small style={{ color: "red" }}>
                              {phoneErrorMessage}
                           </small>
                        </p>
                     )}
                  </div>
                  <div
                     style={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "20px 0",
                        gap: "20px",
                     }}
                  >
                     <Button type="submit" variant="contained">
                        Kaydet
                     </Button>
                     <Button
                        onClick={handleClose}
                        variant="outlined"
                        color="error"
                     >
                        Vaçgeç
                     </Button>
                  </div>
               </form>
            </Box>
         </Modal>
      </div>
   );
};

export default EditHastaModal;
