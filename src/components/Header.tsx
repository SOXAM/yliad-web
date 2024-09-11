import { Layout, Menu, MenuProps } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const { Header } = Layout;

export default function MyHeader() {
  const { t } = useTranslation();
  const items: MenuProps["items"] = [
    {
      key: 0,
      label: <Link to="/">ylia:D</Link>,
    },
    {
      key: 1,
      label: <Link to="/diary">{t("diary")}</Link>,
    },
  ];
  return (
    <Header style={{ display: "flex", alignItems: "center" }}>
      <div className="demo-logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["0"]}
        items={items}
        style={{ flex: 1, minWidth: 0 }}
      />
    </Header>
  );
}
