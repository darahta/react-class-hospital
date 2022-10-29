import React, { useState, useEffect } from "react";
import { Button, TextField, Modal, Box } from "@mui/material";
import axios from "axios";

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
   const { open, handleClose } = props;

   const handleSubmit = (event) => {
      event.preventDefault();
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
                     />
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
                     />
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
