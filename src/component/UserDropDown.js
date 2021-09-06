import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, message } from "antd";
import "antd/dist/antd.css";
import React from "react";
import { BiUserCircle } from "react-icons/bi";

export function UserDropDown(props) {
  const onClick = ({ key }) => {
    props.click(key);
  };
  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="2">
        <p>Tài khoản của tôi</p>
      </Menu.Item>
      <Menu.Item key="1">
        <p>Đăng xuất</p>
      </Menu.Item>
    </Menu>
  );
  return (
    <div style={{ marginLeft: "-200px", position: "absolute" }}>
      <BiUserCircle
        className="icon-login"
        size={30}
        color="white"
      ></BiUserCircle>
      <Dropdown overlay={menu} style={{ inkBar: true, tabPane: false }}>
        <a
          style={{ color: "white",fontWeight:"bold" }}
          className="ant-dropdown-link"
          onClick={(e) => e.preventDefault()}
        >
          {props.email} <DownOutlined />
        </a>
      </Dropdown>
      ,
    </div>
  );
}
