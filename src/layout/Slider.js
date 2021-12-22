import { Col, Row } from "antd";
import React from "react";

function SlideHotel() {
  return (
    <div>
      <Row>
        <Col span={11} style={{ marginRight: "270px" }}>
          <div
            className="slideshow"
            style={{
              width: "600px",
              marginLeft: "-100px",
              border: "2px solid white",
              boxShadow: "inherit",
              marginTop: "100px",
            }}
          >
            <div className="slideshowSlider">
              <div className="slide" style={{ height: "500px" }}>
                <img
                  key="1"
                  alt="hotel-img"
                  style={{
                    opacity: "0.9",
                    width: 600,
                    height: 500,
                  }}
                  src={require("../image/o1.jpg").default}
                />
              </div>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <h1
            style={{ color: "gray", marginTop: "200px", marginLeft: "-250px" }}
          >
            Chào mừng đến với  khách sạn D&B
          </h1>
          <p style={{ marginLeft: "-300px", fontSize: "25px",fontStyle:"italic" }}>
            {" "}
            Tọa lạc tại quận 9. Với diện tích 2000m2. Cung cấp rất nhiều các
            hạng phòng. D&B tự tin mang đến cho khách hàng những trải nghiệm tốt
            nhất khi lưu trú tại đây. Với rất nhiều các chương trình khuyến mãi
            cũng như các dịch vụ đáp ứng nhu cầu của khách hàng.
          </p>
        </Col>
      </Row>
    </div>
  );
}

export { SlideHotel };
