import { Layout } from "antd";
import MyHeader from "./components/Header";
import MyFooter from "./components/Footer";
import MyHome from "./components/Home";
import MyDiary from "./components/Diary";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <>
      <Layout>
        <MyHeader />
        <Routes>
          <Route path="/" element={<MyHome />} />
          <Route path="/diary" element={<MyDiary />} />
        </Routes>
        <MyFooter />
      </Layout>
    </>
  );
}
