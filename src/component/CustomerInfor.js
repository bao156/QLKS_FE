import { Button } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { VscGithub } from "react-icons/vsc";
import { Success, Warning } from "./Notification";

function CustomerInfor() {
  const [customer, setCustomer] = useState({
    cmnd: "",
    name: "",
    phoneNumber: "",
    taxCode: "",
  });


  const UpdateCustomerInfor = async () => {
    const res = await axios
      .put("http://localhost:8084/api/customers", customer)
      .then((response) => {
        Success("Successful", "Điều chỉnh thành công");
      })
      .catch(function (error) {
        let errorMessage = error.response.data.errorCode;
        if (errorMessage == "cmnd-is-not-valid") {
          Warning("Failed", "CMND không hợp lệ");
        } else if (errorMessage == "name-cannot-be-empty") {
          Warning("Failed", "Tên không được để trống");
        } else if (errorMessage == "cmnd-already-in-use") {
          Warning("Failed", "CMND đã được dùng");
        } else if (errorMessage == "phoneNumber-cannot-be-empty") {
          Warning("Failed", "Số điện thoại không được để trống");
        }
      });
  };
  useEffect(() => {
    const getCustomerInfor = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8084/api/customers/infor"
        );
        setCustomer(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getCustomerInfor();
  }, []);
  return (
    <div
      style={{
        marginTop: "130px",
        width: "1200px",
        marginLeft: "120px",
        padding: "10px",
        boxShadow: "10px 10px 10px 10px  #888888",
      }}
    >
      <h1
        style={{
          fontSize: 72,
          marginLeft: "350px",
          fontStyle: "italic",
          marginTop: "-100px ",
        }}
      >
        Thông tin tài khoản
      </h1>
      <input
        key="cmnd"
        type="text"
        onChange={(e) => setCustomer({ ...customer, ["cmnd"]: e.target.value })}
        value={customer.cmnd}
        placeholder="Nhập CMND"
        style={{
          border: "1px solid #cfcbca",
          width: "300px",
          height: "60px",
          marginLeft: "200px",
        }}
      />
      <br></br>
      <br></br>
      <br></br>
      <input
        key="name"
        type="text"
        onChange={(e) => setCustomer({ ...customer, ["name"]: e.target.value })}
        value={customer.name}
        placeholder="Nhập họ và tên"
        style={{
          border: "1px solid #cfcbca",
          width: "300px",
          height: "60px",
          marginLeft: "200px",
        }}
      />
      <br></br>
      <br></br>
      <br></br>
      <input
        key="phoneNumber"
        type="text"
        onChange={(e) =>
          setCustomer({ ...customer, ["phoneNumber"]: e.target.value })
        }
        value={customer.phoneNumber}
        placeholder="Nhập số điện thoại"
        style={{
          border: "1px solid #cfcbca",
          width: "300px",
          height: "60px",
          marginLeft: "200px",
        }}
      />
      <br></br>
      <br></br>
      <br></br>
      <input
        key="taxCode"
        type="text"
        onChange={(e) =>
          setCustomer({ ...customer, ["taxCode"]: e.target.value })
        }
        value={customer.taxCode}
        placeholder="Nhập mã số thuế"
        style={{
          border: "1px solid #cfcbca",
          width: "300px",
          height: "60px",
          marginLeft: "200px",
        }}
      />
      <br></br>
      <br></br>
      <br></br>
      <Button
        //key={roomClass.id}
        type="primary"
        shape="round"
        onClick={UpdateCustomerInfor}
        style={{
          width: "300px",
          height: "80px",
          marginLeft: "400px",
        }}
      >
        Xác nhận
      </Button>
      <br></br>
      <br></br>
      <br></br>
      <VscGithub
        key="booking-card"
        className="icon-login"
        size={220}
        color="black"
        style={{ marginLeft: "750px", marginTop: "-800px" }}
      ></VscGithub>
    </div>
  );
}

export default CustomerInfor;
