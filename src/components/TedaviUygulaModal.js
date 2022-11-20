import React, { useState, useEffect } from "react";
import { Button, TextField, Modal, Box } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
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

const TedaviUygulamaModal = (props) => {
   const dispatch = useDispatch();
   const { open, handleClose, islem } = props;

   const [uygulananTedavi, setUygulananTedavi] = useState("");
   const [ilaclar, setIlaclar] = useState("");
   const [hasuygulanan, setUygulanan] = useState(false);
   const [hasilac, setHasIlac] = useState(false);

   const handleSubmit = (event) => {
      event.preventDefault();

      if (uygulananTedavi === "") {
         setUygulanan(true);
         setTimeout(() => {
            setUygulanan(false);
         }, 3000);
         return;
      }
      if (ilaclar === "") {
         setHasIlac(true);
         setTimeout(() => {
            setHasIlac(false);
         }, 3000);
         return;
      }

      const seperatedIlaclar = ilaclar.split(",");

      const updatedIslem = {
         ...islem,
         uygulananTedavi: uygulananTedavi,
         yazilanIlaclar: seperatedIlaclar,
      };
      axios
         .put(`http://localhost:3004/islemler/${islem.id}`, updatedIslem)
         .then((res) => {
            setUygulananTedavi("");
            setIlaclar("");
            handleClose();

            dispatch({ type: actionTypes.EDIT_ISLEM, payload: updatedIslem });
         })
         .catch((err) => console.log(err));
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
               <h1 style={{ textAlign: "center" }}>Tedavi Ekle</h1>
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
                        label="Uygulanan Tedavi"
                        variant="outlined"
                        value={uygulananTedavi}
                        onChange={(event) =>
                           setUygulananTedavi(event.target.value)
                        }
                     />
                     {hasuygulanan && (
                        <p>
                           <small style={{ color: "red" }}>
                              *Lütfen boş bırakmayınız
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
                        label="Yazılan İlaç (ilaçlar arasında mutlaka virgül bırakınız)"
                        variant="outlined"
                        value={ilaclar}
                        onChange={(event) => setIlaclar(event.target.value)}
                     />
                     {hasilac && (
                        <p>
                           <small style={{ color: "red" }}>
                              *Lütfen boş bırakmayınız
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

export default TedaviUygulamaModal;
