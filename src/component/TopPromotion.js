import { Button } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import "./RoomView.css";

function TopPromotion(props) {
  const GetIdRoomClass = (key) => {
    props.click(key);
  };

  const [roomClasses, setRoomClasses] = useState([]);
  useEffect(() => {
    const getRoomClasses = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8084/api/room-class/top-promotion"
        );
        setRoomClasses(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getRoomClasses();
  }, []);
  return (
    <div>
      <br></br>
      {roomClasses.length != 0 ? (
        <h1 style={{ marginTop: "50px", color: "gray" }}>Top ưu đãi</h1>
      ) : null}

      <div class="row">
        {roomClasses.map((roomClass) => (
          <div class="col-md-3 col-sm-6" style={{ marginRight: "0px" }}>
            <article
              class="card card-post"
              style={{ width: "330px", height: "auto", marginBottom: "50px" }}
            >
              <img
                src={roomClass.image}
                className="card-img-top"
                alt="Room class"
              />
              <div class="card-body">
                <h6 class="title">{roomClass.roomClassName}</h6>
                <p
                  class="small text-uppercase text-muted"
                  style={{ fontSize: "20px" }}
                >
                  <NumberFormat
                    value={
                      roomClass.price -
                      roomClass.price * roomClass.promotionValue
                    }
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                  {""}/Ngày
                  <br></br>
                  <NumberFormat
                    value={roomClass.price}
                    displayType={"text"}
                    thousandSeparator={true}
                    style={{
                      textDecorationLine: "line-through",
                      fontStyle: "italic",
                      fontSize: "17px",
                    }}
                  />{" "}
                </p>
                <Button
                  key={roomClass.id}
                  type="primary"
                  shape="round"
                  onClick={() => GetIdRoomClass(roomClass.id)}
                  style={{ width: "180px", height: "40px" }}
                >
                  Xem chi tiết
                </Button>
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}
export default TopPromotion;
