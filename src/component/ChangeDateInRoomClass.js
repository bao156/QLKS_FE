import { Button, Col, Modal, Row } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { VscCalendar } from "react-icons/vsc";
import { Success, Warning } from "./Notification";
import { RiEdit2Line } from "react-icons/ri";

export function ChangingDateBookingInRoomClass(props) {
  const [dateBooking, setDateBooking] = useState({
    startDate: "",
    endDate: "",
  });
  const [officialDateBooking, setOfficialDateBooking] = useState({
    startDate: "",
    endDate: "",
  });
  const [isChangingDateVisibled, setChangingDateVisibled] = useState("");
  function getStartDate(date) {
    setDateBooking({ ...dateBooking, ["startDate"]: date });
  }
  function getEndDate(date) {
    setDateBooking({ ...dateBooking, ["endDate"]: date });
  }

  function setChangingDateModalInVisibled() {
    setChangingDateVisibled(false);
  }
  function setChangingDateModalVisibled() {
    setChangingDateVisibled(!isChangingDateVisibled);
  }

  useEffect(() => {
    setOfficialDateBooking({
      ...officialDateBooking,
      ["startDate"]: props.receivingAtDate,
      ["endDate"]: props.backingAtDate,
    });
  }, [props]);

  const UpdateBookingCard = async () => {
    try {
      if (dateBooking.startDate == "" || dateBooking.endDate == "") {
        Warning("Failed!", "Vui lòng không để trống ngày nhận và trả");
      } else {
        const article = {
          receivingAtDate: dateBooking.startDate,
          backingAtDate: dateBooking.endDate,
        };
        const res = await axios
          .put("http://localhost:8084/api/bookingCards/update", article)
          .then((response) => {
            Success("Success!", "Cập nhật thành công");
            setChangingDateVisibled(false);
            setOfficialDateBooking({
              ...officialDateBooking,
              ["startDate"]: dateBooking.startDate,
              ["endDate"]: dateBooking.endDate,
            });
            props.dateBooking(dateBooking);
          })
          .catch(function (error) {
            let errorMessage = error.response.data.errorCode;
            console.log(errorMessage);
            if (errorMessage == "receive-at-date-must-before-back-at-date") {
              Warning(
                "Failed",
                "Ngày trả không hợp lệ! Phải trễ hơn ngày nhận"
              );
            } else if (errorMessage == "receive-at-date-must-after-at-now") {
              Warning(
                "Failed",
                "Ngày nhận không hợp lệ! Vui lòng không sớm hơn ngày hôm nay!"
              );
            } else if (errorMessage != "") {
              Warning("Failed", errorMessage);
            }
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <input
        name="requested_order_ship_date"
        type="text"
        disabled="true"
        value={officialDateBooking.startDate}
        style={{
          height: "50px",
          fontSize: "18px",
          width: "250px",
          top: "200px",
          marginLeft: "1020px",
        }}
      />
      <VscCalendar size="30"></VscCalendar>
      <Button
        type="primary"
        onClick={() => setChangingDateModalVisibled()}
        style={{
          border: "none",
          marginLeft: "1300px",
          width: "100px",
          height: "30px",
          marginTop: "20px",
          backgroundColor: "gray",
          color: "white",
        }}
      >
        Change
        <RiEdit2Line></RiEdit2Line>
      </Button>
      <br></br>
      <br></br>
      <input
        name="requested_order_ship_date"
        type="text"
        value={officialDateBooking.endDate}
        disabled="true"
        style={{
          height: "50px",
          fontSize: "18px",
          width: "250px",
          marginLeft: "1020px",
        }}
      />

      <VscCalendar size="30" marginLeft="200px"></VscCalendar>

      <Modal
        title="Điều chỉnh thời gian nhận & trả phòng"
        visible={isChangingDateVisibled}
        onCancel={setChangingDateModalInVisibled}
        onOk={UpdateBookingCard}
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
          className="form-control"
        />
        <span style={{ marginRight: "100px" }}> &nbsp;&nbsp;&nbsp; </span>
        <h4 style={{ marginLeft: "50px" }}>Backing Date</h4>
        <input
          name="requested_order_ship_date"
          type="date"
          placeholder="RECEIVING AT"
          onChange={(e) => getEndDate(e.target.value)}
          style={{
            height: "70px",
            fontSize: "21px",
            width: "400px",
          }}
          className="form-control"
        />
        <br /> <br />
        <hr color="black"></hr>
      </Modal>
    </div>
  );
}
