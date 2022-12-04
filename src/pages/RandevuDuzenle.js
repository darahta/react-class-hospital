import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Header from "../components/Header";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import actionTypes from "../redux/actions/actionTypes";
import api from "../api/api";
import urls from "../api/urls";
const RandevuDuzenle = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { randevuId } = useParams();
   const [randevular, setdRandevular] = useState(null);
   const [randevu, setRandevu] = useState(null);
   const [hastalar, setHastalar] = useState(null);
   const [hasta, setHasta] = useState(null);

   const [date, setDate] = useState("");
   const [phone, setPhone] = useState("");
   const [name, setName] = useState("");
   const [surname, setSurname] = useState("");
   const [hasHasta, setHasHasta] = useState(false);

   useEffect(() => {
      api.get(urls.randevular)
         .then((res) => {
            console.log("randevu-düzenle", res.data);
            setdRandevular(res.data);
            const tempRandevu = res.data.find((item) => item.id === randevuId);
            setRandevu(tempRandevu);
            api.get(urls.hastalar)
               .then((resHastalar) => {
                  setHastalar(resHastalar.data);
                  const hastaTemp = resHastalar.data.find(
                     (item) => item.id === tempRandevu.hastaId
                  );
                  setHasta(hastaTemp);
                  setDate(tempRandevu.date);
                  setName(hastaTemp.name);
                  setSurname(hastaTemp.surname);
                  setPhone(hastaTemp.phone);
               })
               .catch((err) => console.log(err));
         })
         .catch((err) => console.log(err));
   }, []);
   const handleSubmit = (e) => {
      e.preventDefault();
      if (date === "") {
         alert("Bütün alanları doldurmak zorunludur");
         return;
      }
      const filteredRandevular = randevular.filter(
         (item) => item.id !== randevu.id
      );
      const isAvailableDate = filteredRandevular.find(
         (item) => item.id === date
      );
      if (isAvailableDate !== undefined) {
         alert("Bu randevu saati ve günü doludur");
         return;
      }
      const updatedRandevu = {
         ...randevu,
         date,
      };
      api.put(`${urls.randevular}/${randevu.id}`, updatedRandevu)
         .then((res) => {
            dispatch({
               type: actionTypes.EDIT_RANDEVU,
               payload: updatedRandevu,
            });
            navigate("/");
         })
         .catch((err) => console.log(err));
   };

   if (randevular === null || !randevu || !hasta || !hastalar) return null;
   return (
      <div>
         <Header />
         <form onSubmit={handleSubmit}>
            <div
               style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "20px 0px",
               }}
            >
               <input
                  value={date}
                  defaultValue={new Date("dd/mm/yyyy hh:mm")}
                  onChange={(event) => setDate(event.target.value)}
                  type={"datetime-local"}
               />
            </div>
            <div
               style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "20px 0px",
               }}
            >
               <TextField
                  type={"number"}
                  style={{ width: "50%" }}
                  id="outlined-basic"
                  label="Telefon Numarası"
                  variant="outlined"
                  value={phone}
                  disabled
               />
            </div>
            <div
               style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "20px 0px",
               }}
            >
               <TextField
                  type={"text"}
                  style={{ width: "50%" }}
                  id="outlined-basic"
                  label="Hasta Adı"
                  variant="outlined"
                  value={name}
                  disabled
               />
            </div>
            <div
               style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "20px 0px",
               }}
            >
               <TextField
                  type={"text"}
                  style={{ width: "50%" }}
                  id="outlined-basic"
                  label="Hasta Soyadı"
                  variant="outlined"
                  value={surname}
                  disabled
               />
            </div>

            <div
               style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "20px 0px",
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

export default RandevuDuzenle;
