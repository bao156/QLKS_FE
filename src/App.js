import "./App.css";
import React, { useState } from "react";
import "antd/dist/antd.css";
import "./component/index.css";
import "./layout/Header";
import { ContentDetail } from "./layout/Content";
import { HeaderDetail } from "./layout/Header";
import { TabsMenu } from "./layout/TabsMenu";
import { DatePickerBooking } from "./component/DatePickerBooking";
import RoomView from "./component/RoomView";
import RoomViewDetail from "./component/RoomViewDetail";
import BookingCardDetail from "./component/BookingCardDetail";
import CustomerInfor from "./component/CustomerInfor";
import Map from "./layout/Map";
import { Layout } from "antd";
import { FooterDetail } from "./layout/Footer";
import { SlideInHeader } from "./component/SlideShowInHeader";
const { Header, Content, Footer } = Layout;

function App() {
  const [roomClassId, setRoomClassId] = useState(0);
  const [menuKey, setKey] = useState(1);
  let overview = null;
  let getRoomClassId = (roomClassId) => {
    setKey(4);
    setRoomClassId(roomClassId);
  };
  let getKeyIndex = (key) => {
    setKey(key);
  };
  if (menuKey == 1) {
    overview = <ContentDetail click={getRoomClassId}></ContentDetail>;
  } else if (menuKey == 2) {
    overview = (
      <div>
        <RoomView click={getRoomClassId}></RoomView>
      </div>
    );
  } else if (menuKey == 3) {
    overview = <Map />;
  } else if (menuKey == 4) {
    overview = <RoomViewDetail myId={roomClassId} click={getKeyIndex} />;
  } else if (menuKey == 5) {
    overview = <BookingCardDetail click={getKeyIndex}></BookingCardDetail>;
  } else if (menuKey == 6) {
    overview = <DatePickerBooking click={getKeyIndex}></DatePickerBooking>;
  } else if (menuKey == 7) {
    overview = <CustomerInfor></CustomerInfor>;
  }

  return (
    <div className="App">
      <Layout>
        <Header
          style={{
            position: "absolute",
            zIndex: 1,
            width: "100%",
            height: "60%",
            backgroundColor: "gray",
          }}
        >
          <SlideInHeader></SlideInHeader>
          <HeaderDetail click={getKeyIndex} />
        </Header>
        <Content
          className="site-layout"
          style={{ padding: "0 50px", marginTop: "500px" }}
        >
          <TabsMenu click={getKeyIndex}></TabsMenu>
          {overview}
        </Content>
        <Footer style={{ textAlign: "center" }}></Footer>
        <FooterDetail></FooterDetail>
      </Layout>
    </div>
  );
}

export default App;
