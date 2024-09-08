import { Layout } from "antd";

const { Footer } = Layout;

export default function MyFooter() {
  return (
    <Footer style={{ textAlign: "center" }}>
      yliad ©{new Date().getFullYear()} Created by SOXAM
    </Footer>
  );
}
