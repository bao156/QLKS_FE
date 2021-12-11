import { Button, InputNumber, Modal } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { ChangingDateBookingInRoomClass } from "./ChangeDateInRoomClass";
import { Success, Warning } from "./Notification";

let image = "assets/images/posts/3.jpg";

function RoomViewDetail(props) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [roomClass, setRoomClass] = useState("");
  const [quantityOfRoomClass, setQuantityOfRoomClass] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [bookingCard, setBookingCard] = useState();
  const [endDate, setEndDate] = useState("");
  let hasBookingCard = false;
  function getStartDate(date) {
    setStartDate(date);
  }
  function getEndDate(date) {
    setEndDate(date);
  }

  function SetModalVisibled() {
    setModalVisible(true);
  }
  function SetModalInVisibled() {
    setModalVisible(false);
  }

  function onChange(value) {
    setQuantityOfRoomClass(value);
  }
  const CreateBookingCard = async () => {
    try {
      if (startDate == "" || endDate == "") {
        Warning("Failed!", "Vui lòng không để trống ngày nhận và trả");
      }
      const article = {
        receivingAtDate: startDate,
        backingAtDate: endDate,
        deposit: 0,
      };
      await axios
        .post("http://localhost:8084/api/booking-cards", article)
        .then((response) => {
          setBookingCard(response.data);
          hasBookingCard = true;
          SetModalInVisibled();
        })
        .catch(function (error) {
          let errorMessage = error.response.data.errorCode;
          console.log(errorMessage);
          if (errorMessage == "receive-at-date-must-before-back-at-date") {
            Warning("Failed", "Ngày trả không hợp lệ! Phải trễ hơn ngày nhận");
          } else if (errorMessage == "receive-at-date-must-after-at-now") {
            Warning(
              "Failed",
              "Ngày nhận không hợp lệ! Vui lòng không sớm hơn ngày hôm nay!"
            );
          }
        });
      const res = await axios.get(
        "http://localhost:8084/api/booking-cards/current"
      );
      setBookingCard(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const Booking = async () => {
    try {
      const article = {
        roomClassId: roomClass.id,
        quantity: quantityOfRoomClass,
      };
      await axios
        .post(
          "http://localhost:8084/api/booking-cards/bookingCardDetail",
          article
        )
        .then((response) => {
          Success("Successful", "Booking thành công");
        })
        .catch(function (error) {
          let errorMessage = error.response.data.errorCode;
          Warning("Failed", errorMessage);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const BookingRoomClass = async () => {
    await axios
      .get("http://localhost:8084/api/booking-cards/current")
      .then((response) => {
        hasBookingCard = true;
      })
      .catch(function (error) {
        hasBookingCard = false;
        console.log(error.response.data.errorCode);
        console.log(error.response.status);
        console.log(error.response.headers);
      })
      .finally(() => {
        if (axios.defaults.headers.common["Authorization"] == null) {
          Warning("Warning", "Vui lòng đăng nhập để tiếp tục");
        } else {
          if (hasBookingCard == false) {
            SetModalVisibled();
          } else {
            Booking();
          }
        }
      });
  };
  useEffect(() => {
    const getRoomClass = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8084/api/room-class/" + props.myId
        );
        setRoomClass(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getRoomClass();
  }, []);

  useEffect(() => {
    const getRoomClass = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8084/api/booking-cards/current"
        );
        setBookingCard(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getRoomClass();
  }, []);

  return (
    <div>
      <>
        <Modal
          title="Vui lòng chọn thời gian nhận & trả phòng"
          visible={isModalVisible}
          onCancel={SetModalInVisibled}
          onOk={CreateBookingCard}
          okText="Xác nhận"
          cancelText="Hủy bỏ"
        >
          <h4 style={{ marginLeft: "50px" }}>Receving Date</h4>
          <input
            name="requested_order_ship_date"
            type="date"
            placeholder="RECEIVING AT"
            style={{
              height: "70px",
              fontSize: "21px",
              width: "400px",
            }}
            onChange={(e) => getStartDate(e.target.value)}
            min={moment(new Date()).format("YYYY-MM-DD")}
            className="form-control"
          />
          <span style={{ marginRight: "100px" }}> &nbsp;&nbsp;&nbsp; </span>
          <h4 style={{ marginLeft: "50px" }}>Backing Date</h4>
          <input
            name="requested_order_ship_date"
            type="date"
            placeholder="BACKING AT"
            onChange={(e) => getEndDate(e.target.value)}
            style={{
              height: "70px",
              fontSize: "21px",
              width: "400px",
            }}
            min={moment(new Date()).format("YYYY-MM-DD")}
            className="form-control"
          />
          <br /> <br />
          <hr color="black"></hr>
        </Modal>
      </>
      {/* Hết modal */}
      <div style={{ position: "absolute" }}>
        {bookingCard != null ? (
          <ChangingDateBookingInRoomClass
            receivingAtDate={bookingCard.receivingAtDate}
            backingAtDate={bookingCard.backingAtDate}
          ></ChangingDateBookingInRoomClass>
        ) : null}
      </div>
      <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
      <h1 style={{ fontSize: 72, marginLeft: "400px", fontStyle: "italic" }}>
        {roomClass.roomClassName} Room
      </h1>
      <div>
        <article
          class="card card-post"
          style={{ width: "700px", height: "500px", marginBottom: "50px" }}
        >
          <img
            src={roomClass.image}
            alt="Room Class"
            className="card-img-top"
            style={{ height: "490px" }}
          />
          <div
            class="card-body"
            style={{ position: "absolute", top: "50px", width: "2000px" }}
          >
            <p
              style={{
                marginLeft: "800px",
                marginBottom: "40px",
                fontSize: "30px",
              }}
            >
              Loại phòng: {roomClass.roomCategoryName}
            </p>
            <p
              style={{
                marginLeft: "800px",
                marginBottom: "40px",
                fontSize: "30px",
              }}
            >
              Kiểu phòng: {roomClass.roomTypeName}
            </p>
            {roomClass.promotionValue == 0 ? (
              <h2
                style={{
                  marginLeft: "800px",
                  marginBottom: "60px",
                  fontStyle: "italic",
                }}
              >
                <NumberFormat
                  value={roomClass.price}
                  displayType={"text"}
                  thousandSeparator={true}
                />{" "}
                /Ngày
              </h2>
            ) : (
              <h2
                style={{
                  marginLeft: "800px",
                  marginBottom: "60px",
                  fontStyle: "italic",
                }}
              >
                <i style={{ textDecorationLine: "line-through" }}>
                  <NumberFormat
                    value={roomClass.price}
                    displayType={"text"}
                    thousandSeparator={true}
                    style={{ fontSize: "25px", fontStyle: "italic" }}
                  />{" "}
                </i>
                <span marginLeft="50px"> &nbsp;&nbsp;&nbsp;</span>
                <NumberFormat
                  value={
                    roomClass.price - roomClass.price * roomClass.promotionValue
                  }
                  displayType={"text"}
                  thousandSeparator={true}
                />{" "}
                /Ngày
              </h2>
            )}
            <p
              style={{
                marginLeft: "800px",
                marginBottom: "40px",
                fontSize: "30px",
              }}
            >
              Số lượng đặt:{" "}
              <InputNumber
                min={1}
                max={100}
                size="100px"
                defaultValue={1}
                onChange={onChange}
              />
            </p>

            <Button
              key={roomClass.id}
              type="primary"
              shape="round"
              onClick={BookingRoomClass}
              style={{
                width: "300px",
                height: "80px",
                marginLeft: "870px",
              }}
            >
              Booking
            </Button>
          </div>
        </article>
      </div>
      <p
        style={{ marginLeft: "100px", marginBottom: "40px", fontSize: "30px" }}
      >
        <div dangerouslySetInnerHTML={{ __html: roomClass.description }}></div>
      </p>
    </div>
  );
}
export default RoomViewDetail;
