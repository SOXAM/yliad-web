import { Breadcrumb, Button, Form, Layout, Modal, Space, theme } from "antd";
import { Content } from "antd/es/layout/layout";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modal, contextHolder] = Modal.useModal();

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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    return countDown();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const countDown = () => {
    let secondsToGo = 5;

    const instance = modal.success({
      title: t("delete diary success"),
      content: t("will navigate to diary list after seconds", {
        seconds: secondsToGo,
      }),
      okText: t("move"),
      onOk: () => {
        navigate("/diary");
      },
    });

    const timer = setInterval(() => {
      secondsToGo -= 1;
      instance.update({
        content: t("will navigate to diary list after seconds", {
          seconds: secondsToGo,
        }),
      });
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      instance.destroy();
      navigate("/diary");
    }, secondsToGo * 1000);
  };

  return (
    <>
      <Layout>
        <Content style={{ padding: "0 48px" }}>
          <Layout style={{ padding: "0 24px 24px" }}>
            <div className="flex items-stretch" style={{ margin: "16px 0" }}>
              <Breadcrumb
                className="text-xl"
                items={[
                  { title: <Link to={"/diary"}>{t("diary")}</Link> },
                  { title: id },
                ]}
              ></Breadcrumb>
              <div className="flex-auto"></div>
              {/* TODO: 페이지 길이 일정 이상일 때에만 활성화 */}
              <Space>
                <Button
                  className="flex self-end"
                  style={{ width: "max-content" }}
                >
                  <Link to="./create">{t("edit")}</Link>
                </Button>
                <Button
                  style={{ width: "max-content" }}
                  danger
                  onClick={showModal}
                >
                  {t("delete")}
                </Button>
              </Space>
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
                <div>
                  <img
                    width={272}
                    alt="logo"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                  />
                </div>
                <div>{diary?.content}</div>
              </Space>
              <div className="flex-auto" style={{ height: 20 }} />
              <Space>
                <Button style={{ width: "max-content" }}>
                  <Link to={`/diary/edit/${diary.id}`}>{t("edit")}</Link>
                </Button>
                <Button
                  style={{ width: "max-content" }}
                  danger
                  onClick={showModal}
                >
                  {t("delete")}
                </Button>
              </Space>
            </Content>
          </Layout>
        </Content>
      </Layout>
      <Modal
        title={t("delete diary")}
        open={isModalOpen}
        onOk={handleOk}
        okText={t("confirm")}
        onCancel={handleCancel}
        cancelText={t("cancel")}
      >
        <p>{t("confirm delete diary")}</p>
      </Modal>
      {contextHolder}
    </>
  );
};

export default MyDiary;
