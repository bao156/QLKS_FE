import { Button, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFunnelFill } from "react-icons/bs";
import NumberFormat from "react-number-format";
import "./RoomView.css";
const provinceData = [
  "0-2.000.000",
  "2.000.000 - 5.000.000",
  "Lớn hơn 5.000.000",
  "Tất cả",
];
const { Option } = Select;

function RoomView(props) {
  const [roomClasses, setRoomClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("Tất cả");
  const [filteredCountries, setFilteredRoomClasses] = useState([]);
  const comparision = Number(5000000);
  const GetIdRoomClass = (key) => {
    props.click(key);
  };
  useEffect(() => {
    setLoading(true);
    const getRoomClasses = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8084/api/room-class/promotion/all"
        );
        setRoomClasses(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    getRoomClasses();
  }, []);

  const handleProvinceChange = (value) => {
    setSearch(value);
  };

  useEffect(() => {
    if (search == "Tất cả") {
      setFilteredRoomClasses(
        roomClasses.filter((roomClass) => roomClass.price != 0)
      );
    } else if (search == "0-2.000.000") {
      setFilteredRoomClasses(
        roomClasses.filter((roomClass) => roomClass.price <= 2000000)
      );
    } else if (search == "Lớn hơn 5.000.000") {
      setFilteredRoomClasses(
        roomClasses.filter((roomClass) => roomClass.price > 5000000)
      );
    } else if (search == "2.000.000 - 5.000.000") {
      setFilteredRoomClasses(
        roomClasses.filter((roomClass) => roomClass.price >= 2000000 && roomClass.price < 5000000)
      );
    }
  }, [search, roomClasses]);

  return (
    <div>
      <h1 style={{ fontSize: 72, marginLeft: "500px", fontStyle: "italic" }}>
        Room Classes
      </h1>
      <span></span>

      <Select
        defaultValue={provinceData[3]}
        style={{
          width: 120,
          marginLeft: "1150px",
          width: "200px",
          height: "70px",
        }}
        onChange={handleProvinceChange}
      >
        {provinceData.map((province) => (
          <Option key={province}>{province}</Option>
        ))}
      </Select>
      <BsFunnelFill size="32px" style={{}}></BsFunnelFill>
      <br></br>
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
                      /Ngày
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
                      /Ngày
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
