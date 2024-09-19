import { Layout } from "antd";
import MyHeader from "./components/Header";
import MyFooter from "./components/Footer";
import MyHome from "./components/Home";
import { Route, Routes } from "react-router-dom";
import i18n from "./locales/i18n";
import { I18nextProvider } from "react-i18next";
import MyDiaryList from "./components/DiaryList";
import MyDiary from "./components/Diary";
import MyCreateDiary from "./components/CreateDiary";
import "moment/locale/ko";
import moment from "moment";
import MyEditDiary from "./components/EditDiary";

moment.locale("ko");

export default function App() {
  return (
    <>
      <I18nextProvider i18n={i18n}>
        <Layout>
          <MyHeader />
          <Routes>
            <Route path="/" element={<MyHome />} />
            <Route path="/diary" element={<MyDiaryList />} />
            <Route path="/diary/:id" element={<MyDiary />} />
            <Route path="/diary/create" element={<MyCreateDiary />} />
            <Route path="/diary/edit/:id" element={<MyEditDiary />} />
          </Routes>
          <MyFooter />
        </Layout>
      </I18nextProvider>
    </>
  );
}
