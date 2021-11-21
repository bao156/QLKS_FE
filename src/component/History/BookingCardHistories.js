import { Button, Col, Modal, Pagination } from "antd";
import axios from "axios";
import { React, useEffect, useState } from "react";
import { VscHistory } from "react-icons/vsc";
import "./BookingCardHistory.css";

export function BookingCardHistories(props) {
  const [isChangingDateVisibled, setChangingDateVisibled] = useState(false);
  const [contents, setContents] = useState([]);
  const [pageable, setPageable] = useState([]);

  function setChangingDateModalInVisibled() {
    setChangingDateVisibled(false);
  }
  function setChangingDateModalVisibled() {
    setChangingDateVisibled(!isChangingDateVisibled);
  }

  useEffect(() => {
    const getAllBookingCardByCustomer = async () => {
      await axios
        .get("http://localhost:8084/api/booking-cards/all")
        .then((res) => {
          setContents(res.data.content);
          // setDeposit(res.data.deposit);
          // setItems(res.data.bookingDetails);
          // if (res.data.deposit != 0) {
          //   setDisableButton(true);
          // }
          // res.data.bookingDetails.forEach((amount) => {
          //   const temp =
          //     amount.quantity * amount.price * res.data.quantityOfDates + total;
          //   setTotal((total) => total + temp);
          // });
        })
        .catch(function (error) {
          console.log(error.message);
        });
    };
    getAllBookingCardByCustomer();
  }, []);

  const getOnChange = (page) => {
    alert(page);
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
        // onOk={UpdateBookingCard}
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
        <h1 style={{ marginLeft: "120px", fontSize: "30" }}>Your bookings</h1>
        <img
          src={require("../../image/Lookup.jpg").default}
          style={{
            width: "200px",
            height: "200px",
            position: "absolute",
            marginLeft: "-140px",
          }}
        ></img>
        <Col span={11} >
          <table class="styled-table1" style={{marginLeft:"50px"}}>
            <thead>
              <tr style={{ backgroundColor: "transparent", color: "black" }}>
                <th>Mã booking</th>
                <th>Ngày</th>
                <th>Tổng tiền</th>
                <th>Trạng thái đơn</th>
              </tr>
            </thead>
            <tbody>
              {contents.map((bookingCard, index) => (
                    <tr >
                      <td>
                      {bookingCard.bookingCardId}
                      </td>
                      <td>{bookingCard.status}</td>
                      <td>{bookingCard.bookingAtDate}</td>
                      <td>{bookingCard.status}</td>

                      {/* {bookingCardDetail.promotionValue == 0 ? (
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
                      </td> */}
                      {/* <td>
                        <FcDeleteDatabase
                          key={bookingCardDetail.roomClassId}
                          onClick={() =>
                            handleRemoveItem(bookingCardDetail.roomClassId)
                          }
                          size="32px"
                        ></FcDeleteDatabase>
                      </td> */}
                    </tr>
                  ))}
            </tbody>
          </table>
        </Col>
        <Pagination
          current="0"
          onChange={getOnChange}
          total={40}
          style={{ marginLeft: "400px" }}
        />
        <br /> <br />
        <hr></hr>
        {/* {value == options[0] ? (
          <GetDailyReport></GetDailyReport>
        ) : value == options[1] ? (
          <GetYearlyReport></GetYearlyReport>
        ) : (
          <GetRankedReport></GetRankedReport>
        )} */}
        <hr color="black"></hr>
      </Modal>
    </div>
  );
}
