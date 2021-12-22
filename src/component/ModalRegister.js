import { Button, Modal } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import React, { useState } from "react";
import { BiClipboard } from "react-icons/bi";
import { Success, Warning } from "./Notification";

export function ModalRegister(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [customer, setCustomer] = useState({
    cmnd: "",
    email: "",
    name: "",
    phoneNumber: "",
    taxCode: "",
    roleName: "ROLE_USER",
    password: "",
    clientId: "",
  });

  const modalIsVisible = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const SignUp = async () => {
    const res = await axios
      .post("http://localhost:8084/api/auth/customers/signup", customer)
      .then((response) => {
        setIsModalVisible(false);
        Success("Successful", "Đăng kí thành công");
      })
      .catch(function (error) {
        let errorMessage = error.response.data.errorCode;
        if (errorMessage == "cmnd-is-not-valid") {
          Warning("Failed", "CMND không hợp lệ");
        } else if (errorMessage == "name-cannot-be-empty") {
          Warning("Failed", "Tên không được để trống");
        } else if (errorMessage == "phoneNumber-cannot-be-empty") {
          Warning("Failed", "Số điện thoại không được để trống");
        } else if (errorMessage == "password-cannot-be-empty") {
          Warning("Failed", "Password không được để trống");
        } else if (errorMessage == "email-not-valid") {
          Warning("Failed", "Email không hợp lệ");
        } else if (errorMessage == "email-already-in-use") {
          Warning("Failed", "Email đã được dùng");
        } else if (errorMessage == "cmnd-already-in-use") {
          Warning("Failed", "CMND đã được dùng");
        }
      });
  };

  return (
    <div style={{ marginTop: "-64px" }}>
      <>
        <Button
          type="primary"
          visible="false"
          //onOk={Login}
          onCancel={handleCancel}
          onClick={modalIsVisible}
          style={{
            backgroundColor: "gray",
            border: "2px solid white",
            marginLeft: "150px",
          }}
          icon={
            <BiClipboard
              key="booking-card"
              className="icon-login"
              size={27}
              color="black"
            ></BiClipboard>
          }
        >
          Đăng kí
        </Button>
        <Modal
          title="ĐĂNG KÍ"
          visible={isModalVisible}
          onOk={SignUp}
          onCancel={handleCancel}
        >
          <span style={{ paddingRight: "70px" }}>&nbsp;</span>
          <input
            key="cmnd"
            type="text"
            onChange={(e) =>
              setCustomer({ ...customer, ["cmnd"]: e.target.value })
            }
            value={customer.cmnd}
            placeholder="Nhập CMND"
            style={{
              borderBottom: "2px solid black",
              borderRadius: "3px",
              width: "300px",
              height: "40px",
            }}
          />
          <br></br>
          <br></br>
          <span style={{ paddingRight: "53px" }}>&nbsp;</span>
          <label
            style={{ color: "red", marginRight: "10px", fontSize: "20px" }}
          >
            *
          </label>
          <input
            key="name"
            type="text"
            onChange={(e) =>
              setCustomer({ ...customer, ["name"]: e.target.value })
            }
            value={customer.name}
            placeholder="Nhập họ và tên"
            style={{
              borderBottom: "2px solid black",
              borderRadius: "3px",
              width: "300px",
              height: "40px",
            }}
          />
          <br></br>
          <br></br>
          <span style={{ paddingRight: "53px" }}>&nbsp;</span>
          <label
            style={{ color: "red", marginRight: "10px", fontSize: "20px" }}
          >
            *
          </label>
          <input
            key="phoneNumber"
            type="text"
            onChange={(e) =>
              setCustomer({ ...customer, ["phoneNumber"]: e.target.value })
            }
            value={customer.phoneNumber}
            placeholder="Nhập số điện thoại"
            style={{
              borderBottom: "2px solid black",
              borderRadius: "3px",
              width: "300px",
              height: "40px",
            }}
          />
          <br></br>
          <br></br>
          <span style={{ paddingRight: "71px" }}>&nbsp;</span>
          <input
            key="taxCode"
            type="text"
            onChange={(e) =>
              setCustomer({ ...customer, ["taxCode"]: e.target.value })
            }
            value={customer.taxCode}
            placeholder="Nhập mã số thuế"
            style={{
              borderBottom: "2px solid black",
              borderRadius: "3px",
              width: "300px",
              height: "40px",
            }}
          />
          <br></br>
          <br></br>
          <span style={{ paddingRight: "71px" }}>&nbsp;</span>
          <input
            key="clientId"
            type="text"
            onChange={(e) =>
              setCustomer({ ...customer, ["clientId"]: e.target.value })
            }
            value={customer.clientId}
            placeholder="Mã tài khoản paypal"
            style={{
              borderBottom: "2px solid black",
              borderRadius: "3px",
              width: "300px",
              height: "40px",
            }}
          />
          <br></br>
          <br></br>
          <span style={{ paddingRight: "53px" }}>&nbsp;</span>
          <label
            style={{ color: "red", marginRight: "10px", fontSize: "20px" }}
          >
            *
          </label>
          <input
            key="email"
            type="text"
            onChange={(e) =>
              setCustomer({ ...customer, ["email"]: e.target.value })
            }
            value={customer.email}
            placeholder="Nhập email"
            style={{
              borderBottom: "2px solid black",
              borderRadius: "3px",
              width: "300px",
              height: "40px",
            }}
          />

          <br></br>
          <br></br>

          <span style={{ paddingRight: "53px" }}>&nbsp;</span>
          <label
            style={{ color: "red", marginRight: "10px", fontSize: "20px" }}
          >
            *
          </label>
          <input
            key="password"
            type="password"
            value={customer.password}
            placeholder="Nhập mặt khẩu"
            onChange={(e) =>
              setCustomer({ ...customer, ["password"]: e.target.value })
            }
            style={{
              borderBottom: "2px solid black",
              borderRadius: "3px",
              width: "300px",
              height: "40px",
            }}
          />
        </Modal>
        {/* Hết đăng kí  */}
      </>
    </div>
  );
}
