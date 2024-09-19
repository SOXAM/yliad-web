import { Layout, theme } from "antd";
import MyCalendar from "./Calendar";

const { Content } = Layout;

export default function MyHome() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Content style={{ padding: "0 48px" }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          Hello yliad!
          <MyCalendar />
        </div>
      </Content>
    </Layout>
  );
}
