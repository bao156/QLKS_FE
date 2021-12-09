import { Button, Modal } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import React, { useState } from "react";
import { BiClipboard, BiUserCircle } from "react-icons/bi";
import { ModalRegister } from "../component/ModalRegister";
import { Error, Success, Warning } from "../component/Notification";
import { UserDropDown } from "../component/UserDropDown";
import { BookingCardHistories } from "../component/History/BookingCardHistories";
import "./Header.css";

export function HeaderDetail(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("Đăng nhập");
  const [password, setPassword] = useState("");
  const [hasToken, setToken] = useState(false);
  const [bookingCard, setBookingCard] = useState("Đăng kí");
  const [isModalRegisterVisible, setIsModalRegisterVisible] = useState(false);

  const getMenuKey = (key) => {
    if (key == 1) {
      setToken(false);
      axios.defaults.headers.common["Authorization"] = "";
      setName("Đăng nhập");
      props.click(1);
    } else if (key == 2) {
      props.click(7);
    }
  };

  const showModal = () => {
    if (hasToken == false) setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getBookingCardDetailView = async (key) => {
    if (bookingCard == "Đăng kí") {
      setIsModalRegisterVisible(!isModalRegisterVisible);
    } else {
      let hasBookingCard = false;
      try {
        await axios.get("http://localhost:8084/api/booking-cards/current");
        hasBookingCard = true;
      } catch (error) {
        console.log(error.message);
      }
      if (hasToken == false) {
        setIsModalVisible(true);
      } else if (hasBookingCard == false) {
        Warning(
          "Phiếu đặt trống! Vui lòng đặt phòng trước khi thực hiện thao tác"
        );
      } else if (hasToken == true) {
        props.click(key);
      }
    }
  };

  function getUsername(value) {
    setUsername(value);
  }
  function getPassword(value) {
    setPassword(value);
  }

  const Login = async () => {
    try {
      const article = {
        email: username,
        password: password,
      };
      const res = await axios.post(
        "http://localhost:8084/api/auth/signin",
        article
      );
      axios.defaults.headers.common["Authorization"] = res.data.token;
      let email = res.data.email;
      setName(email);
      setBookingCard("Phiếu đặt");
      setUsername("");
      setPassword("");
      Success("SUCCESSFUL", "Đăng nhập thành công");
      setIsModalVisible(false);
      setToken(true);
      props.click(1);
    } catch (error) {
      Error("LOGIN FAILED", "Username và password không đúng!");
    }
  };

  return (
    <div
      className="logo"
      style={{ height: "350px", marginTop: "-380px", position: "absolute" }}
    >
      <span
        style={{
          paddingRight: "850px",
          paddingBottom: "10px",
          paddingTop: "10px",
          cursor: "none",
        }}
      >
        &nbsp;
      </span>
      <>
        <Modal
          title="ĐĂNG NHẬP"
          visible={isModalVisible}
          onOk={Login}
          onCancel={handleCancel}
        >
          <img
            src="assets/images/logos/mainlogo.png"
            alt="login-img"
            width="400px"
            cursor="none"
            height="300px"
          ></img>
          <p
            className="logo-name"
            style={{
              fontFamily: "Cursive",
              marginTop: "-200px",
              color: "gray",
            }}
          >
            D&B HOTEL
          </p>
          <span style={{ paddingRight: "70px" }}>&nbsp;</span>
          <input
            key="username"
            type="text"
            onChange={(e) => getUsername(e.target.value)}
            value={username}
            placeholder="Nhập tài khoản"
            style={{
              borderBottom: "2px solid black",
              borderRadius: "3px",
              width: "300px",
              height: "40px",
            }}
          ></input>
          <br></br>
          <br></br>
          <span style={{ paddingRight: "70px" }}>&nbsp;</span>
          <input
            key="password"
            type="password"
            value={password}
            placeholder="Nhập mặt khẩu"
            onChange={(e) => getPassword(e.target.value)}
            style={{
              borderBottom: "2px solid black",
              borderRadius: "3px",
              width: "300px",
              height: "40px",
            }}
          ></input>
        </Modal>
      </>
      {/* Đăng kí */}
      {hasToken == false ? (
        <div style={{ marginLeft: "800px", marginTop: "-64px" }}>
          <Button
            type="primary"
            onClick={showModal}
            style={{ backgroundColor: "gray", border: "2px solid white" }}
            icon={
              <BiUserCircle
                className="icon-login"
                size={30}
                color="black"
              ></BiUserCircle>
            }
          >
            {name}
          </Button>
          <ModalRegister
            style={{ marginTop: "-64px" }}
            visible={isModalRegisterVisible}
          ></ModalRegister>
        </div>
      ) : (
        <div style={{ marginLeft: "950px", marginTop: "-55px" }}>
          <UserDropDown email={name} click={getMenuKey}></UserDropDown>
          <Button
            type="primary"
            visible="false"
            onOk={Login}
            onCancel={handleCancel}
            onClick={() => getBookingCardDetailView(5)}
            style={{
              backgroundColor: "gray",
              border: "2px solid white",
              marginLeft: "80px",
              marginTop: "-200px",
            }}
            icon={
              <BiClipboard
                key="booking-card"
                className="icon-login"
                size={30}
                color="black"
              ></BiClipboard>
            }
          >
            {bookingCard}
          </Button>
          <BookingCardHistories ></BookingCardHistories>
        </div>
      )}

      <span style={{ paddingRight: "350px" }}>&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <img
        style={{ marginTop: "-90px" }}
        src="assets/images/logos/mainlogo.png"
        width="450px"
        alt="logo"
        height="450px"
      ></img>
      <p
        className="logo-name"
        style={{
          fontFamily: "Cursive",
          marginTop: "-300px",
          color: "white",
          marginLeft: "130px",
        }}
      >
        D&B HOTEL
      </p>
      <p
        className="slogan-name"
        style={{
          fontFamily: "Courier",
          fontSize: 30,
          fontStyle: "italic",
          marginTop: "-60px",
          marginLeft: "130px",
        }}
      >
        Enjoy your pleasure
      </p>
    </div>
  );
}
