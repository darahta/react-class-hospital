import React, { useState } from "react";
import Header from "../components/Header";

const ResimDeneme = () => {
   const [file, setFile] = useState(null);
   const [img, setImg] = useState("");

   const handleSubmit = (event) => {
      event.preventDefault();

      let base64 = "";
      let reader = new FileReader();
      if (file) {
         reader.readAsDataURL(file);
      }

      reader.onload = () => {
         console.log(reader.result);
         base64 = reader.result;
         setImg(reader.result);
      };
      reader.onerror = function (error) {
         console.log("Error: ", error);
      };
   };
   return (
      <div>
         <Header />
         <h1>Resim deneme page</h1>

         <form onSubmit={handleSubmit}>
            <input
               onChange={(event) => {
                  setFile(event.target.files[0]);
               }}
               type={"file"}
            />
            <button type="submit">Kaydet</button>
         </form>
         <img style={{ width: "200px", height: "200px" }} src={img} />
      </div>
   );
};

export default ResimDeneme;
