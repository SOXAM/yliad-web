import { Layout, theme } from "antd";

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
        </div>
      </Content>
    </Layout>
  );
}
