import { Button, Modal } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { RiEdit2Line } from "react-icons/ri";
import { Warning, Success } from "./Notification";

export function ChangingDateBooking(props) {
  const [dateBooking, setDateBooking] = useState({
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
          .put("http://localhost:8084/api/booking-cards/update", article)
          .then((response) => {
            Success("Success!", "Cập nhật thành công");
            setChangingDateVisibled(false);
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
      <Button
        type="primary"
        onClick={() => setChangingDateModalVisibled()}
        style={{
          border: "none",
          marginLeft: "120px",
          width: "150px",
          height: "30px",
          backgroundColor: "gray",
          color: "white",
        }}
      >
        <RiEdit2Line></RiEdit2Line>
        Điều chỉnh
      </Button>
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
