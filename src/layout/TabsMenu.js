import React from "react";
import "antd/dist/antd.css";
import "./Header.css";
import { Tabs } from "antd";
import { DiMeteor } from "react-icons/di";
import { CgEricsson } from "react-icons/cg";
import { RiMapPinAddFill } from "react-icons/ri";
const { TabPane } = Tabs;
export function TabsMenu(props) {
  const Appear = (key) => {
    props.click(key);
  };
  return (
    <div>
      <Tabs
        centered={true}
        onTabClick={(e) => Appear(e)}
        defaultActiveKey="1"
        style={{
          marginTop: "-20px",
          fontSize: "20px",
          color: "black",
          inkBar: true,
          tabPane: false,
          marginRight: "20px",
          marginBottom: "50px",
        }}
      >
        <TabPane
          tab={
            <span style={{ fontSize: "25px", marginRight: "50px" }}>
              <CgEricsson />
              Tổng quan
            </span>
          }
          key="1"
        ></TabPane>
        <TabPane
          tab={
            <span style={{ fontSize: "25px", marginRight: "50px" }}>
              <DiMeteor />
              Hạng phòng
            </span>
          }
          key="2"
        ></TabPane>
        <TabPane
          tab={
            <span style={{ fontSize: "25px" }}>
              <RiMapPinAddFill />
              Liên hệ
            </span>
          }
          key="3"
        ></TabPane>
      </Tabs>
    </div>
  );
}
