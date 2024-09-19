import { Breadcrumb, Button, Form, Layout, Space, theme } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import { diaryData } from "../common/types";

const defaultData = {
  id: 1,
  title: "ISA",
  url: null,
  content: "I love isa...",
  createTime: new Date("2024-09-19T09:43:45.018513"),
  modifiedTime: new Date("2024-09-19T09:43:45.018525"),
};

const MyDiary = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { id } = useParams();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [diary, setDiary] = useState<diaryData>(defaultData);

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const uploadForm = async () => {
    await axios({
      method: "post",
      url: "http://localhost:8080/daily",
      data: form,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:8080/daily/${id}`,
    })
      .then((res) => {
        setDiary(res.data);
        console.log(diary);
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
              <Breadcrumb.Item>
                <Link to={"/diary"}>{t("diary")}</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{id}</Breadcrumb.Item>
            </Breadcrumb>
            <div className="flex-auto"></div>
            <Button
              className="flex self-end"
              style={{ width: "max-content" }}
              type="primary"
            >
              <Link to="./create">{t("edit")}</Link>
            </Button>
          </div>
          <Content
            className="flex flex-col"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Space
              direction="vertical"
              size="middle"
              style={{ display: "flex" }}
            >
              <div>{diary.title}</div>
              <div>{diary?.content}</div>
            </Space>
            <div className="flex-auto" />
            <Button style={{ width: "max-content" }} type="primary">
              <Link to={`/diary/edit/${diary.id}`}>{t("edit")}</Link>
            </Button>
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};

export default MyDiary;
