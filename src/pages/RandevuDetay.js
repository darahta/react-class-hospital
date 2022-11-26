import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import api from "../api/api";
import urls from "../api/urls";
const RandevuDetay = () => {
   const { randevuId } = useParams();

   const [randevu, setRandevu] = useState("");
   const [hasta, setHasta] = useState("");
   const [islemler, setIslemler] = useState("");

   useEffect(() => {
      api.get(`${urls.randevular}/${randevuId}`)
         .then((randevuRes) => {
            console.log(randevuRes.data);
            setRandevu(randevuRes.data);
            api.get(`${urls.hastalar}/${randevuRes.data.hastaId}`)
               .then((hastaRes) => {
                  console.log(hastaRes.data);
                  setHasta(hastaRes.data);
                  api.get(urls.islemler)
                     .then((islemlerRes) => {
                        console.log(islemlerRes.data);
                        let myIslemler = [];
                        for (
                           let i = 0;
                           i < hastaRes.data.islemIds.length;
                           i++
                        ) {
                           for (let j = 0; j < islemlerRes.data.length; j++) {
                              if (
                                 hastaRes.data.islemIds[i] ===
                                 islemlerRes.data[j].id
                              ) {
                                 myIslemler.push(islemlerRes.data[j]);
                                 break;
                              }
                           }
                        }
                        setIslemler(myIslemler);
                     })
                     .catch((err) => console.log(err));
               })
               .catch((err) => console.log(err));
         })
         .catch((err) => console.log(err));
   }, []);

   if (randevu === "" || hasta === "" || islemler === "") return null;

   return (
      <div>
         <Header />
         <h1>Tarih: {new Date(randevu.date).toLocaleString()}</h1>

         <h3>Hasta Bilgileri</h3>
         <hr />

         <h4>Hasta Adı: {hasta.name}</h4>
         <h4>Hasta Soyadı: {hasta.surname}</h4>
         <h4>Hasta Telefon: {hasta.phone}</h4>

         <h3>Hastanın Geçmiş İşlemleri({islemler.length})</h3>
         <hr />
         {islemler.map((islem) => (
            <div key={islem.id}>
               <p>Şikayet: {islem.sikayet}</p>
               <p>
                  Uygulanan Tedavi:{" "}
                  {islem.uygulananTedavi === ""
                     ? "Tedavi Uygulanmamış"
                     : islem.uygulananTedavi}
               </p>
               <hr />
            </div>
         ))}
      </div>
   );
};

export default RandevuDetay;
