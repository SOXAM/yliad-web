import { Layout, Button, List, PaginationProps, theme, Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { diaryData } from "../common/types";

const { Content } = Layout;

const defaultData = [
  {
    id: 1,
    title: "ISA",
    url: null,
    content: "I love isa...",
    createTime: new Date("2024-09-19T09:43:45.018513"),
    modifiedTime: new Date("2024-09-19T09:43:45.018525"),
  },
  {
    id: 2,
    title: "ISA2",
    url: null,
    content: "I love isa...",
    createTime: new Date("2024-09-19T09:43:45.049505"),
    modifiedTime: new Date("2024-09-19T09:43:45.049509"),
  },
  {
    id: 3,
    title: "ISA3",
    url: null,
    content: "I love isa...",
    createTime: new Date("2024-09-19T09:43:45.056129"),
    modifiedTime: new Date("2024-09-19T09:43:45.056133"),
  },
  {
    id: 4,
    title: "ISA4",
    url: null,
    content: "I love isa...",
    createTime: new Date("2024-09-19T09:43:45.058598"),
    modifiedTime: new Date("2024-09-19T09:43:45.058602"),
  },
  {
    id: 5,
    title: "ISA5",
    url: null,
    content: "I love isa...",
    createTime: new Date("2024-09-19T09:43:45.061365"),
    modifiedTime: new Date("2024-09-19T09:43:45.061369"),
  },
];

export default function MyDiaryList() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { t } = useTranslation();

  const [current, setCurrent] = useState(3);
  const [diarys, setDiarys] = useState<diaryData[]>(defaultData);

  const onChange: PaginationProps["onChange"] = (page) => {
    console.log(page);
    setCurrent(page);
  };

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8080/daily",
    })
      .then((res) => {
        setDiarys(res.data);
        console.log(diarys);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <Layout>
      <Content style={{ padding: "0 48px" }}>
        <Layout style={{ padding: "0 24px 24px" }}>
          <div className="flex items-stretch" style={{ margin: "16px 0" }}>
            <Breadcrumb className="text-xl">
              <Breadcrumb.Item>{t("diary")}</Breadcrumb.Item>
            </Breadcrumb>
            <div className="flex-auto" />
            <Button type="primary">
              <Link to="./create">{t("new diary")}</Link>
            </Button>
          </div>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 4,
                align: "center",
              }}
              dataSource={diarys}
              renderItem={(item) => (
                <List.Item
                  key={item?.id}
                  extra={
                    <Link to={`./${item.id}`}>
                      <img
                        width={272}
                        alt="logo"
                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                      />
                    </Link>
                  }
                >
                  <Link to={`./${item.id}`}>
                    <div>{item.title}</div>
                    <div>{item.content}</div>
                    <div>{moment(item.modifiedTime).calendar()}</div>
                  </Link>
                </List.Item>
              )}
            />
            <Button type="primary">
              <Link to="./create">{t("new diary")}</Link>
            </Button>
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
}
