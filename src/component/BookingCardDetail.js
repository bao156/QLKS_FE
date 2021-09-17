import { Button, Col, Modal, Row } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FcDeleteDatabase } from "react-icons/fc";
import NumberFormat from "react-number-format";
import PayPal from "../component/PayPal";
import "./BookingCardDetail.css";
import { ChangingDateBooking } from "./ChangeDateBooking";
import { Success, Warning } from "./Notification";

function BookingCardDetails(props) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const [isDisableButton, setDisableButton] = useState(false);
  const [savedDeposit, setSavedDeposit] = useState(0);
  const [checkout, setCheckOut] = useState(false);
  const [bookingCard, setBookingCard] = useState({});

  const handleRemoveItem = (e) => {
    deleteBookingDelete(e);
    {
      items.map((item) => {
        if (item.roomClassId == e) {
          const temp = item.quantity * item.price * bookingCard.quantityOfDates;
          setTotal((total) => total - temp);
        }
      });
    }

    setItems(items.filter((item) => item.roomClassId !== e));
  };

  const [isConfirmVisibled, setConfirmVisibled] = useState(false);

  function setKeyToOverview(key) {
    props.click(key);
  }

  function setConfirmModalVisibled() {
    if (deposit != 0) {
      setConfirmVisibled(true);
    } else {
      Warning("Failed", "Vui lòng đặt cọc trước để xác nhận");
    }
  }

  function setConfirmModalInvisibled() {
    setConfirmVisibled(false);
  }
  function GetDateBooking(date) {
    setBookingCard({
      ...bookingCard,
      ["backingAtDate"]: date.endDate,
      ["receivingAtDate"]: date.startDate,
    });
  }

  function showPaypal(getDeposit) {
    setSavedDeposit(total * 0.1);
    setCheckOut(true);
  }

  function GetDeposit(getDeposit) {
    setDeposit(getDeposit);
    setDisableButton(true);
    setCheckOut(false);
    Success("Congratulation", "Booking thành công! Vui lòng kiểm tra mail");
    setKeyToOverview(1);
  }

  const ConfirmBookingCard = async () => {
    await axios
      .put("http://localhost:8084/api/booking-cards")
      .then((response) => {
        Success("Congratulation", "Booking thành công! Vui lòng kiểm tra mail");
        setKeyToOverview(1);
      })
      .catch(function (error) {
        console.log(error.response.data.errorCode);
        Warning("Failed", error.response.data.errorCode);
        setConfirmModalInvisibled();
      });
  };

  const deleteBookingDelete = async (key) => {
    try {
      await axios.delete("http://localhost:8084/api/booking-cards/" + key);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getBookingCardDetailByEmail = async () => {
      await axios
        .get("http://localhost:8084/api/booking-cards/current")
        .then((res) => {
          setBookingCard(res.data);
          setDeposit(res.data.deposit);
          setItems(res.data.bookingDetails);
          if (res.data.deposit != 0) {
            setDisableButton(true);
          }
          res.data.bookingDetails.forEach((amount) => {
            const temp =
              amount.quantity * amount.price * res.data.quantityOfDates + total;
            setTotal((total) => total + temp);
          });
        })
        .catch(function (error) {
          console.log(error.message);
        });
    };
    getBookingCardDetailByEmail();
  }, []);
  return (
    <div>
      <h1 style={{ fontSize: 72, marginLeft: "500px", fontStyle: "italic" }}>
        Mã Booking: {bookingCard.bookingCardId}
      </h1>
      {items.length != 0 ? (
        <div>
          <br></br>
          <br></br>
          <Row>
            <Col span={11} style={{ marginRight: "270px" }}>
              <table class="styled-table">
                <thead>
                  <tr
                    style={{ backgroundColor: "transparent", color: "black" }}
                  >
                    <th></th>
                    <th>Tên Hạng</th>
                    <th>Số lượng</th>
                    <th>Đơn giá</th>
                    <th>Số ngày ở</th>
                    <th>Thành tiền</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((bookingCardDetail, index) => (
                    <tr>
                      <td>
                        <img
                          src={bookingCardDetail.image}
                          alt="room-class"
                          width="100px"
                        ></img>
                      </td>
                      <td>{bookingCardDetail.roomClassName}</td>
                      <td>{bookingCardDetail.quantity}</td>

                      {bookingCardDetail.promotionValue == 0 ? (
                        <td>
                          <NumberFormat
                            value={bookingCardDetail.price}
                            displayType={"text"}
                            thousandSeparator={true}
                          />{" "}
                          /Ngày
                        </td>
                      ) : (
                        <td>
                          <i style={{ textDecorationLine: "line-through" }}>
                            <NumberFormat
                              value={bookingCardDetail.price}
                              displayType={"text"}
                              thousandSeparator={true}
                              style={{ fontSize: "16px", fontStyle: "italic" }}
                            />{" "}
                          </i>
                          <span marginLeft="50px"> &nbsp;&nbsp;&nbsp;</span>
                          <NumberFormat
                            value={
                              bookingCardDetail.price -
                              bookingCardDetail.price *
                                bookingCardDetail.promotionValue
                            }
                            displayType={"text"}
                            thousandSeparator={true}
                            subfix={"$"}
                          />{" "}
                          /Ngày
                        </td>
                      )}

                      <td>{bookingCard.quantityOfDates}</td>
                      <td>
                        <NumberFormat
                          value={
                            bookingCardDetail.quantity *
                            bookingCardDetail.price *
                            bookingCard.quantityOfDates
                          }
                          displayType={"text"}
                          thousandSeparator={true}
                        />{" "}
                      </td>
                      <td>
                        <FcDeleteDatabase
                          key={bookingCardDetail.roomClassId}
                          onClick={() =>
                            handleRemoveItem(bookingCardDetail.roomClassId)
                          }
                          size="32px"
                        ></FcDeleteDatabase>
                      </td>
                      <td></td>
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Col>
            <Col span={8}>
              <table
                class="styled-table"
                style={{ width: "250px", marginLeft: "200px " }}
              >
                <thead>
                  <tr>
                    <th style={{ textAlign: "center", fontSize: "21px" }}>
                      Thông tin khách hàng
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ height: "40px" }}>
                      <strong>Họ tên:</strong> {bookingCard.name}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ height: "40px" }}>
                      <strong>Email:</strong> {bookingCard.email}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ height: "40px" }}>
                      <strong>Số điện thoại:</strong> {bookingCard.phoneNumber}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ height: "40px" }}>
                      <strong>Tiền cọc:</strong>
                      <NumberFormat
                        value={deposit}
                        displayType={"text"}
                        thousandSeparator={true}
                      />{" "}
                      {checkout ? (
                        <PayPal payAmount={savedDeposit} deposit={GetDeposit} />
                      ) : (
                        <Button
                          type="primary"
                          style={{ marginLeft: "190px" }}
                          onClick={() => showPaypal()}
                          disabled={isDisableButton}
                        >
                          Đặt cọc
                        </Button>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ height: "60px" }}>
                      <h4>
                        Tổng thanh toán:
                        <NumberFormat
                          value={total}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                      </h4>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table
                class="styled-table"
                style={{ width: "250px", marginLeft: "200px " }}
              >
                <thead>
                  <tr>
                    <th style={{ textAlign: "center", fontSize: "21px" }}>
                      Thời gian check in
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ height: "40px" }}>
                      <strong>Ngày nhận phòng:</strong>{" "}
                      {moment(bookingCard.receivingAtDate).format("YYYY-MM-DD")}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ height: "40px" }}>
                      <strong>Ngày trả phòng:</strong>{" "}
                      {moment(bookingCard.backingAtDate).format("YYYY-MM-DD")}
                    </td>
                  </tr>

                  <tr>
                    <>
                      <ChangingDateBooking
                        dateBooking={GetDateBooking}
                      ></ChangingDateBooking>
                    </>
                  </tr>
                </tbody>
              </table>
            </Col>
          </Row>
        </div>
      ) : (
        <p
          style={{
            fontStyle: "italic",
            textAlign: "center",
            fontSize: "30px",
            color: "red",
          }}
        >
          Phiếu đặt trống! Qúy khác chưa đặt bất kí hạng nào cả
        </p>
      )}
    </div>
  );
}
export default BookingCardDetails;
