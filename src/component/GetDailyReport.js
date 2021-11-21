import { Button, Modal } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { FcPrint } from "react-icons/fc";
import { Success, Warning } from "./Notification";

export function GetDailyReport(props) {
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

  const GetReport = async () => {
    try {
      if (dateBooking.startDate == "" || dateBooking.endDate == "") {
        Warning("Failed!", "Vui lòng không để trống ngày nhận và trả");
      } else {
            const res = await axios.put(
              "http://localhost:8082/api/bookingCards/rank"
             
            );
            window.open("E:\\file.pdf");

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
        <FcPrint></FcPrint>
        Print Daily
      </Button>
      <Modal
        title="Điều chỉnh thời gian nhận & trả phòng"
        visible={isChangingDateVisibled}
        onCancel={setChangingDateModalInVisibled}
        onOk={GetReport}
        okText="Xác nhận"
        cancelText="Hủy bỏ"
      >
        <h4 style={{ marginLeft: "50px" }}>From</h4>
        <input
          name="requested_order_ship_date"
          type="date"
          placeholder="From"
          style={{
            height: "70px",
            fontSize: "21px",
            width: "400px",
          }}
          onChange={(e) => getStartDate(e.target.value)}
          className="form-control"
        />
        <span style={{ marginRight: "100px" }}> &nbsp;&nbsp;&nbsp; </span>
        <h4 style={{ marginLeft: "50px" }}>To</h4>
        <input
          name="requested_order_ship_date"
          type="date"
          placeholder="To"
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
