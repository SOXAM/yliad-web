import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, Popconfirm, Upload } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { diaryData } from "../common/types";

const defaultData = {
  id: 1,
  title: "ISA",
  url: null,
  content: "I love isa...",
  createTime: new Date("2024-09-19T09:43:45.018513"),
  modifiedTime: new Date("2024-09-19T09:43:45.018525"),
};

const MyEditDiary = () => {
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
      url: `http://localhost:8080/daily/${diary.id}`,
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
    <Form
      form={form}
      scrollToFirstError
      style={{ paddingBlock: 32 }}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
    >
      <Form.Item
        name="title"
        label={t("title")}
        rules={[{ required: true }]}
        initialValue={diary.title}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="contents"
        label={t("contents")}
        initialValue={diary.content}
      >
        <Input.TextArea rows={16} />
      </Form.Item>

      <Form.Item
        name="attachments"
        label={t("attachment")}
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload listType="picture-card">
          <button style={{ border: 0, background: "none" }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>{t("upload")}</div>
          </button>
        </Upload>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6 }}>
        <Flex gap="small">
          <Button type="primary" htmlType="submit" onClick={uploadForm}>
            {t("save")}
          </Button>
          {/* TODO: 값이 채워진 경우에만 취소 팝업 + 어떤 버튼이든 눌렀을때 취소팝업 */}
          <Popconfirm
            title={t("create diary cancel")}
            description={t("create diary cancel ask")}
            okText={t("confirm")}
            cancelText={t("cancel")}
            onConfirm={() => {
              navigate(-1);
            }}
          >
            <Button danger>{t("cancel")}</Button>
          </Popconfirm>
        </Flex>
      </Form.Item>
    </Form>
  );
};

export default MyEditDiary;
