import React from "react";
import{ GetDailyReport } from "../component/GetDailyReport"

const Map = () => {
  return (
    <div >
      <GetDailyReport></GetDailyReport>
      <h1 style={{textAlign:"center"}}>Cảm ơn quý khách đã ghé thăm địa chỉ của chúng tôi!</h1>
      <h1 style={{textAlign:"center", marginLeft:"450px",marginTop:"150px", color:"GrayText"}}>Hotline: 0836877963!</h1>
      <img src={require("../image/ThongBao.png").default}></img>
    </div>
  );
};
export default Map;
