import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TedaviUygulamaModal from "../components/TedaviUygulaModal";
import { useSelector } from "react-redux";

const HastaDetay = () => {
   const { hastaId } = useParams();
   const { islemlerState } = useSelector((state) => state);
   const [hasta, setHasta] = useState(null);
   const [hastaIslemleri, setHastaIslemleri] = useState([]);
   const [openTedaviModal, setOpenTedaviModal] = useState(false);
   const [secilenIslem, setSecilenIslem] = useState(null);
   useEffect(() => {
      axios
         .get(`http://localhost:3004/hastalar/${hastaId}`)
         .then((resHasta) => {
            console.log("resHasta", resHasta.data);
            setHasta(resHasta.data);
            axios
               .get("http://localhost:3004/islemler")
               .then((resIslem) => {
                  console.log("resIslem", resIslem);
                  const tempHastaIslemleri = [];
                  for (let i = 0; i < resHasta.data.islemIds.length; i++) {
                     const islem = resIslem.data.find(
                        (item) => item.id === resHasta.data.islemIds[i]
                     );
                     tempHastaIslemleri.push(islem);
                  }
                  console.log("temphasta", tempHastaIslemleri);
                  setHastaIslemleri(tempHastaIslemleri);
               })
               .catch((err) => console.log("err", err));
         })
         .catch((err) => console.log("err", err));
   }, [islemlerState.islemler]);

   return (
      <div>
         <Header />

         <TableContainer style={{ marginTop: "50px" }} component={Paper}>
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
                  <TableRow>
                     <TableCell align="center" colSpan={4}></TableCell>
                  </TableRow>
                  <TableRow>
                     <TableCell>{hasta?.name}</TableCell>
                     <TableCell>{hasta?.surname}</TableCell>
                     <TableCell>{hasta?.phone}</TableCell>
                     {hastaIslemleri.length === 0 ? (
                        <p>Hastaya ait işlem bulunamamaktadır.</p>
                     ) : (
                        <div>
                           {hastaIslemleri.map((islem) => (
                              <div key={islem}>
                                 <p>Hastanın Şikayeti: {islem.sikayet}</p>
                                 <p>
                                    {islem.uygulananTedavi === "" ? (
                                       <>
                                          <span>
                                             Hastaya bir tedavi uygulanmamış
                                          </span>
                                          &nbsp;&nbsp;&nbsp;&nbsp;
                                          <button
                                             onClick={() => {
                                                setOpenTedaviModal(true);
                                                setSecilenIslem(islem);
                                             }}
                                          >
                                             Tedavi uygula
                                          </button>
                                       </>
                                    ) : (
                                       <span>
                                          Uygulanan Tedavi:{" "}
                                          {islem.uygulananTedavi}
                                       </span>
                                    )}
                                 </p>
                                 <p>
                                    {islem.yazilanIlaclar.length === 0 ? (
                                       <span>hastaya ilaç yazılmamış</span>
                                    ) : (
                                       <p>
                                          Yazılan İlaçlar:
                                          {islem.yazilanIlaclar.map((ilac) => (
                                             <span> {ilac},</span>
                                          ))}
                                       </p>
                                    )}
                                 </p>
                                 <hr />
                              </div>
                           ))}
                        </div>
                     )}
                  </TableRow>
               </TableBody>
            </Table>
         </TableContainer>
         <TedaviUygulamaModal
            open={openTedaviModal}
            handleClose={() => setOpenTedaviModal(false)}
            islem={secilenIslem}
         />
      </div>
   );
};

export default HastaDetay;
