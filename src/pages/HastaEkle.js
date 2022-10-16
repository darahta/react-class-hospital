import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Header from "../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HastaEkle = (props) => {
   const navigate = useNavigate();
   const [name, setName] = useState("");
   const [surname, setSurname] = useState("");
   const [phone, setPhone] = useState("");
   const [sikayet, setSikayet] = useState("");
   const [hastalar, setHastalar] = useState(null);

   useEffect(() => {
      axios
         .get("http://localhost:3004/hastalar")
         .then((res) => {
            setHastalar(res.data);
         })
         .catch((err) => console.log("HastaEkle Sayfası get err", err));
   }, []);

   const handleSubmit = (event) => {
      event.preventDefault();
      if (name === "" || surname === "" || phone === "" || sikayet === "") {
         alert("Bütün alanları doldurmak zorunludur");
         return;
      }
      if (phone.length !== 11) {
         alert("telefon numarası 11 haneli olması olmalıdır");
         return;
      }
      const hasNumber = hastalar.find((hasta) => hasta.phone === phone);
      if (hasNumber !== undefined) {
         alert("Bu numara ile zaten kayıtlı hasta vardır.");
         return;
      }

      const newIslem = {
         id: String(new Date().getTime()),
         sikayet: sikayet,
         uygulananTedavi: "",
         yazilanIlaclar: [],
      };
      axios
         .post("http://localhost:3004/islemler", newIslem)
         .then((Islemres) => {
            const newHasta = {
               id: String(new Date().getTime()),
               name: name,
               surname: surname,
               phone: phone,
               islemIds: [newIslem.id],
            };
            axios
               .post("http://localhost:3004/hastalar", newHasta)
               .then((res) => {
                  navigate("/hastalar");
               })
               .catch((err) =>
                  console.log("hastla sayfası newHasta ekle", err)
               );
         })
         .catch((err) => console.log("hasta ekle sayfası newIslem ekle", err));
      // axios
      //    .post("http://localhost:3004/hastalar", newHasta)
      //    .then((res) => {
      //       navigate("/hastalar");
      //    })
      //    .catch((err) => console.log("hasta ekle sayfası", newHasta));
   };

   if (hastalar === null) {
      return <h1>Loading...</h1>;
   }

   return (
      <div>
         <Header />
         <form style={{ margin: "50px" }} onSubmit={handleSubmit}>
            <div
               style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "20px 0",
               }}
            >
               <TextField
                  style={{ width: "50%" }}
                  id="outlined-basic"
                  label="Hasta Adı"
                  variant="outlined"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
               />
            </div>
            <div
               style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "20px 0",
               }}
            >
               <TextField
                  style={{ width: "50%" }}
                  id="outlined-basic"
                  label="Hasta Soyadı"
                  variant="outlined"
                  value={surname}
                  onChange={(event) => setSurname(event.target.value)}
               />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
               <TextField
                  type={"Number"}
                  style={{ width: "50%" }}
                  id="outlined-basic"
                  label="Telefon numarası"
                  variant="outlined"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
               />
            </div>
            <div
               style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "20px 0",
               }}
            >
               <TextField
                  style={{ width: "50%" }}
                  id="outlined-basic"
                  label="Hastanın şikayeti"
                  variant="outlined"
                  value={sikayet}
                  onChange={(event) => setSikayet(event.target.value)}
               />
            </div>
            <div
               style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "20px 0",
               }}
            >
               <Button type="submit" variant="contained">
                  Kaydet
               </Button>
            </div>
         </form>
      </div>
   );
};

export default HastaEkle;
