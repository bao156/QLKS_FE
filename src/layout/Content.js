import "antd/dist/antd.css";
import React from "react";
import "./Content.css";
import TopPromotion from "../component/TopPromotion";
import { SlideHotel } from "./Slider";

export function ContentDetail(props) {
  let getRoomClassId = (roomClassId) => {
    props.click(roomClassId);
  };
  return (
    <div
      className="site-layout-background"
      style={{ padding: 24, minHeight: 380 }}
    >
      <h1 style={{ fontSize: 72, textAlign: "center", fontStyle: "italic" }}>
        Overview
      </h1>
      <p className="content-text" style={{ fontSize: 30 }}>
        “Chúng tôi luôn coi khách hàng là khách mời tham dự một bữa tiệc mà
        chúng tôi là chủ nhà.<br></br> Mỗi ngày chúng tôi làm việc, để mọi khía
        cạnh quan trọng trong trải nghiệm khách hàng được tốt hơn”
      </p>
      <SlideHotel></SlideHotel>
      <TopPromotion click={getRoomClassId}></TopPromotion>
    </div>
  );
}
