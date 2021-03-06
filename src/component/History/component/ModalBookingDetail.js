import { Button, Col, Modal, Pagination } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FcCalendar, FcStackOfPhotos, FcViewDetails } from "react-icons/fc";
import NumberFormat from "react-number-format";
import { Success, Warning } from "../../Notification";

export function ModalBookingDetail(props) {
  const [paypalId, setPaypalId] = useState("");
  const [visibleConfirm, setVisibleConfirm] = useState(false);
  const [reload, setReload] = useState(false);
  const [contents, setContents] = useState([]);
  const [totalPage, setTotalPage] = useState("");
  const [status, setStatus] = useState("");
  const [isChangingDateVisibled, setChangingDateVisibled] = useState(false);
  function setChangingDateModalInVisibled() {
    setChangingDateVisibled(false);
  }
  function setChangingDateModalVisibled() {
    setChangingDateVisibled(!isChangingDateVisibled);
  }

  function setVisibleConfirmModal() {
    setVisibleConfirm(!visibleConfirm);
  }
  function setReloaded() {
    props.reload(!reload);
  }

  useEffect(() => {
    setPaypalId("");
    const getAllBookingCardByBookingId = async () => {
      await axios
        .get(
          "http://localhost:8084/api/booking-cards/pageable/" +
            props.id +
            "?pageNum=0&pageSize=4"
        )
        .then((res) => {
          var a = res.data.totalPages * 10;
          setTotalPage(a);
          if (props.status == "UNCONFIRMED") {
            setPaypalId(0);
          }
          setStatus(props.status);
          setContents(res.data.content);
        })
        .catch(function (error) {
          console.log(error.message);
        });
    };
    getAllBookingCardByBookingId();
  }, [props.id]);

  const getOnChange = (page) => {
    axios
      .get(
        "http://localhost:8084/api/booking-cards/pageable/" +
          props.id +
          "?pageNum=" +
          (page - 1) +
          "&pageSize=4"
      )
      .then((res) => {
        setContents(res.data.content);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  const cancelBooking = () => {
    axios
      .put(
        "http://localhost:8084/api/booking-cards/" + props.id + "/" + paypalId
      )
      .then((res) => {
        setVisibleConfirm(false);
        setChangingDateVisibled(false);
        setReloaded();
        Success("Successful", "???? h???y ????n ?????t! Vui l??ng ki???m tra mail");
      })
      .catch(function (error) {
        console.log(error.message);
        Warning("Failed", "Phi???u kh??ng th??? h???y");
      });
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => setChangingDateModalVisibled()}
        style={{
          border: "none",
          backgroundColor: "dodgerblue",
          color: "black",
        }}
      >
        <FcViewDetails size="20"></FcViewDetails>
        Xem chi ti???t
      </Button>

      <Modal
        title="VIEW"
        visible={isChangingDateVisibled}
        onCancel={setChangingDateModalVisibled}
        onOk={setChangingDateModalVisibled}
        okText="X??c nh???n"
        cancelText="H???y b???"
        width="1300px"
      >
        <img
          src={require("../../../image/List.png").default}
          style={{
            width: "200px",
            height: "200px",
            position: "absolute",
            marginLeft: "-140px",
          }}
        ></img>
        <p style={{ marginLeft: "80px" }}>
          <h4 style={{ marginRight: "250px" }}>
            <FcStackOfPhotos></FcStackOfPhotos>Ti???n c???c:&#160;
            <NumberFormat
              value={props.deposit}
              displayType={"text"}
              thousandSeparator={true}
              style={{ fontSize: "24px" }}
            />{" "}
          </h4>
          <h4 style={{ marginRight: "250px" }}>
            <FcCalendar></FcCalendar>Ng??y nh???n:&#160;
            {moment(props.receivingAtDate).format("DD-MM-YYYY")}
            &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;
            <FcCalendar></FcCalendar>Ng??y tr???:&#160;
            {moment(props.backingAtDate).format("DD-MM-YYYY")}
          </h4>
        </p>
        <Col span={11}>
          <table class="styled-table1" style={{ marginLeft: "50px" }}>
            <thead>
              <tr style={{ backgroundColor: "transparent", color: "black" }}>
                <th></th>
                <th>T??n h???ng</th>
                <th>S??? l?????ng</th>
                <th>????n gi??</th>
                <th>S??? ng??y ???</th>
                <th>Th??nh ti???n</th>
              </tr>
            </thead>
            <tbody>
              {contents.map((bookingCardDetail, index) => (
                <tr>
                  <td style={{ color: "dodgerblue" }}>
                    <img
                      src={bookingCardDetail.image}
                      alt="room-class"
                      width="100px"
                    ></img>
                  </td>
                  <td>{bookingCardDetail.roomClassName}</td>
                  <td>{bookingCardDetail.quantity}</td>
                  <td>
                    <NumberFormat
                      value={bookingCardDetail.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      style={{ fontSize: "16px", fontStyle: "italic" }}
                    />{" "}
                  </td>
                  <td>{props.quantityOfDates}</td>
                  <td>
                    <NumberFormat
                      value={
                        bookingCardDetail.quantity *
                        bookingCardDetail.price *
                        props.quantityOfDates
                      }
                      displayType={"text"}
                      thousandSeparator={true}
                      style={{ fontSize: "16px" }}
                    />{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
        <Pagination
          current="0"
          size="100"
          onChange={getOnChange}
          total={totalPage}
          style={{ marginLeft: "500px" }}
        />
        <h3 style={{ marginLeft: "800PX" }}>
          T???ng:&#160;
          <NumberFormat
            value={props.total}
            displayType={"text"}
            thousandSeparator={true}
            style={{ fontSize: "32px" }}
          />{" "}
        </h3>
        {/* <Button
          type="primary"
          onClick={setVisibleConfirmModal}
          style={{
            border: "none",
            backgroundColor: "red",
            color: "white",
            marginLeft: "1100px",
          }}
        >
          <FcViewDetails size="20"></FcViewDetails>
          H???y ????n
        </Button> */}
      </Modal>
    </div>
  );
}
