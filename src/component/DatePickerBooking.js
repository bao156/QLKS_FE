import { Button } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { Warning } from "./Notification";

export function DatePickerBooking(props) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  function getStartDate(date) {
    setStartDate(date);
  }
  function getEndDate(date) {
    setEndDate(date);
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
          props.click(2);
        })
        .catch(function (error) {
          let errorMessage = error.response.data.errorCode;
          console.log(errorMessage);
          if (errorMessage == "receive-at-date-must-before-back-at-date") {
            Warning("Failed", "Ngày trả không hợp lệ! Phải trễ hơn ngày nhận");
          } else if (errorMessage == "receive-at-date-must-after-at-now") {
            Warning("Failed", "Ngày nhận không hợp lệ! Vui lòng không sớm hơn ngày hôm nay!");
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: 40, marginLeft: "400px", fontStyle: "italic" }}>
        Bạn muốn đặt phòng trong bao lâu?
      </h1>
      <br /> <br />
      <br /> <br />
      <h4 style={{ marginLeft: "50px" }}>Receving Date</h4>
      <h4 style={{ marginLeft: "700px", marginTop: "-50px" }}>Backing Date</h4>
      <input
        name="requested_order_ship_date"
        type="date"
        placeholder="RECEIVING AT"
        style={{
          height: "70px",
          fontSize: "25px",
          width: "400px",
          marginLeft: "200px",
        }}
        onChange={(e) => getStartDate(e.target.value)}
        className="form-control"
      />
      <span style={{ marginRight: "100px" }}> &nbsp;&nbsp;&nbsp; </span>
      <input
        name="requested_order_ship_date"
        type="date"
        placeholder="RECEIVING AT"
        onChange={(e) => getEndDate(e.target.value)}
        style={{
          height: "70px",
          fontSize: "25px",
          width: "400px",
          marginLeft: "800px",
          marginTop: "-92px",
        }}
        className="form-control"
      />
      <br /> <br />
      <br /> <br />
      <Button
        key="continue"
        type="primary"
        shape="round"
        onClick={CreateBookingCard}
        style={{
          width: "300px",
          height: "50px",
          marginLeft: "550px",
        }}
      >
        Continue
      </Button>
      <br /> <br /> <br /> <br /> <br /> <br />
      <hr color="black"></hr>
    </div>
  );
}
