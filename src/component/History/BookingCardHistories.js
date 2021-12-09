import { Button, Col, Modal, Pagination } from "antd";
import axios from "axios";
import moment from "moment";
import { React, useEffect, useState } from "react";
import { VscHistory } from "react-icons/vsc";
import NumberFormat from "react-number-format";
import { ModalBookingDetail } from "../History/component/ModalBookingDetail";
import "./BookingCardHistory.css";
export function BookingCardHistories(props) {
  const [isChangingDateVisibled, setChangingDateVisibled] = useState(false);
  const [contents, setContents] = useState([]);
  const [totalPage, setTotalPage] = useState("");
  const [reload, setReload] = useState(false);

  function setReloadPage() {
    setReload(true);
  }

  function setChangingDateModalInVisibled() {
    setChangingDateVisibled(false);
  }
  function setChangingDateModalVisibled() {
    setReload(!reload);
    setChangingDateVisibled(!isChangingDateVisibled);
  }

  useEffect(() => {
    const getAllBookingCardByCustomer = async () => {
      await axios
        .get("http://localhost:8084/api/booking-cards/all?pageNum=0&pageSize=5")
        .then((res) => {
          setContents(res.data.content);
          var a = res.data.totalPages * 10;
          setTotalPage(a);
        })
        .catch(function (error) {
          console.log(error.message);
        });
    };
    getAllBookingCardByCustomer();
  }, [reload]);

  const getOnChange = (page) => {
    axios
      .get(
        "http://localhost:8084/api/booking-cards/all?pageNum=" +
          (page - 1) +
          "&pageSize=5"
      )
      .then((res) => {
        setContents(res.data.content);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={setChangingDateModalVisibled}
        // onClick={() => getBookingCardDetailView(5)}
        style={{
          backgroundColor: "gray",
          border: "2px solid white",
          marginLeft: "220px",
          marginTop: "-50px",
          position: "absolute",
        }}
        icon={
          <VscHistory
            className="icon-login"
            size={25}
            color="black"
          ></VscHistory>
        }
      >
        Lịch sử đặt
      </Button>
      <Modal
        visible={isChangingDateVisibled}
        onCancel={setChangingDateModalInVisibled}
        onOk={setChangingDateModalInVisibled}
        okText="Xác nhận"
        cancelText="Hủy bỏ"
        width="1100px"
      >
        <img
          src={require("../../image/bird.jpg").default}
          style={{
            width: "100px",
            height: "100px",
            position: "absolute",
            marginLeft: "-20px",
          }}
        ></img>
        <h1 style={{ marginLeft: "120px", fontSize: "30" }}>YOUR BOOKINGS</h1>
        <img
          src={require("../../image/Lookup.jpg").default}
          style={{
            width: "200px",
            height: "200px",
            position: "absolute",
            marginLeft: "-140px",
          }}
        ></img>
        <Col span={11}>
          <table class="styled-table1" style={{ marginLeft: "50px" }}>
            <thead>
              <tr style={{ backgroundColor: "transparent", color: "black" }}>
                <th>Mã booking</th>
                <th>Ngày</th>
                <th>Tổng tiền</th>
                <th>Trạng thái đơn</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {contents.map((bookingCard, index) => (
                <tr>
                  <td style={{ color: "dodgerblue" }}>
                    {bookingCard.bookingCardId}
                  </td>
                  <td>
                    {moment(bookingCard.bookingAtDate).format("DD/MM/YYYY")}
                  </td>
                  <td>
                    <NumberFormat
                      value={bookingCard.total}
                      displayType={"text"}
                      thousandSeparator={true}
                      style={{ fontSize: "16px", fontStyle: "italic" }}
                    />{" "}
                  </td>
                  {bookingCard.status == "EXPIRED" ? (
                    <td style={{ color: "orangered" }}>{bookingCard.status}</td>
                  ) : bookingCard.status == "CANCELED" ? (
                    <td style={{ color: "red" }}>{bookingCard.status}</td>
                  ) : bookingCard.status == "CHECKIN" ? (
                    <td style={{ color: "blue" }}>{bookingCard.status}</td>
                  ) : bookingCard.status == "UNCONFIRMED" ? (
                    <td style={{ color: "gray" }}>{bookingCard.status}</td>
                  ) : (
                    <td style={{ color: "green" }}>{bookingCard.status}</td>
                  )}

                  <td>
                    <ModalBookingDetail
                      reload={setReloadPage}
                      id={bookingCard.bookingCardId}
                      total={bookingCard.total}
                      status={bookingCard.status}
                      receivingAtDate={bookingCard.receivingAtDate}
                      backingAtDate={bookingCard.backingAtDate}
                      quantityOfDates={bookingCard.quantityOfDates}
                    ></ModalBookingDetail>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
        <Pagination
          current="0"
          onChange={getOnChange}
          total={totalPage}
          style={{ marginLeft: "400px" }}
        />
        <br /> <br />
        <hr></hr>
        <hr color="black"></hr>
      </Modal>
    </div>
  );
}
