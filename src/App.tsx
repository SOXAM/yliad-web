import { Layout } from "antd";
import MyHeader from "./components/Header";
import MyFooter from "./components/Footer";
import MyHome from "./components/Home";
import MyDiary from "./components/Diary";
import { Route, Routes } from "react-router-dom";
import CreateDiary from "./components/CreateDiary";
import i18n from "./locales/i18n";
import { I18nextProvider } from "react-i18next";

export default function App() {
  return (
    <>
      <I18nextProvider i18n={i18n}>
        <Layout>
          <MyHeader />
          <Routes>
            <Route path="/" element={<MyHome />} />
            <Route path="/diary" element={<MyDiary />} />
            <Route path="/diary/create" element={<CreateDiary />} />
          </Routes>
          <MyFooter />
        </Layout>
      </I18nextProvider>
    </>
  );
}
