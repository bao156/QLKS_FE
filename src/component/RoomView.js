import { Button, Input } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import "./RoomView.css";

function RoomView(props) {
  const [roomClasses, setRoomClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredCountries, setFilteredRoomClasses] = useState([]);

  const GetIdRoomClass = (key) => {
    props.click(key);
  };
  useEffect(() => {
    setLoading(true);
    const getRoomClasses = async () => {
      try {
        const res = await axios.get("http://localhost:8084/api/room-class/all");
        setRoomClasses(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    getRoomClasses();
  }, []);

  useEffect(() => {
    setFilteredRoomClasses(
      roomClasses.filter((roomClass) =>
        roomClass.roomClassName.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, roomClasses]);

  return (
    <div>
      <h1 style={{ fontSize: 72, marginLeft: "500px", fontStyle: "italic" }}>
        Room Classes
      </h1>
      <br></br>
      <Input.Search
        type="text"
        placeholder="Search room class name"
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "300px", marginLeft: "1100px", height: "60px" }}
        enterButton
      />
      <br></br>
      <div class="row">
        {filteredCountries.map((roomClass, idx) => (
          <div class="col-md-3 col-sm-6">
            <article
              class="card card-post"
              style={{ width: "350px", height: "auto", marginBottom: "50px" }}
            >
              <img
                src={roomClass.image}
                className="card-img-top"
                alt="Room class"
              />
              <div class="card-body">
                <h6 class="title">{roomClass.roomClassName}</h6>
                <p class="small text-uppercase text-muted">
                  {roomClass.promotionValue == 0 ? (
                    <i>
                      <NumberFormat
                        value={roomClass.price}
                        displayType={"text"}
                        thousandSeparator={true}
                        style={{ fontSize: "20px", fontStyle: "italic" }}
                      />{" "}
                      VND/Ngày
                    </i>
                  ) : (
                    <div>
                      <i style={{ textDecorationLine: "line-through" }}>
                        <NumberFormat
                          value={roomClass.price}
                          displayType={"text"}
                          thousandSeparator={true}
                          style={{ fontSize: "16px", fontStyle: "italic" }}
                        />{" "}
                      </i>
                      <span marginLeft="50px"> &nbsp;&nbsp;&nbsp;</span>
                      <NumberFormat
                        value={
                          roomClass.price -
                          roomClass.price * roomClass.promotionValue
                        }
                        displayType={"text"}
                        style={{ fontSize: "20px" }}
                        thousandSeparator={true}
                        subfix={"$"}
                      />{" "}
                      VND/Ngày
                    </div>
                  )}
                </p>
                <Button
                  key={roomClass.id}
                  type="primary"
                  shape="round"
                  onClick={() => GetIdRoomClass(roomClass.id)}
                  style={{ width: "180px", height: "40px" }}
                >
                  View Detail
                </Button>
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}
export default RoomView;
