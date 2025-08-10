import styles from "./editUserMsg.module.css";
import { TopDetail } from "@/components/TopDetail";
import { ActionSheet, Image, Input, Form, Loading } from "react-vant";
import { useState, useEffect } from "react";
import { useAccountStore } from "@/store/useAccountStore";
import { generateAvatar } from "@/llm/coze";

export default function EditUserMsg() {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const { account, updateAccount } = useAccountStore();
  const [form] = Form.useForm();
  const [avatar, setAvatar] = useState("");
  const [generateLoading, setGenerateLoading] = useState(false);

  const actions = [
    {
      name: "AI生成头像",
      color: "#ee0a24",
      type: 1,
    },
    {
      name: "上传头像",
      color: "#123123",
      type: 2,
    },
  ];

  const handleAction = async (e) => {
    if (e.type === 1) {
      // ai生成头像
      setShowActionSheet(false);
      // 调用生成头像的函数
      console.log("ai生成头像");
      setGenerateLoading(true);
      const res = await generateAvatar();
      if (res) {
        setAvatar(res);
        // 更新表单中的头像值
        form.setFieldValue("avatar", res);
      }
      setGenerateLoading(false);
    } else if (e.type === 2) {
      // 上传头像
      setShowActionSheet(false);
      // 创建一个隐藏的文件输入框
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = async (event) => {
        const file = event.target?.files[0];
        if (!file) return;
        await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            setAvatar(reader.result);
            // 更新表单中的头像值
            form.setFieldValue("avatar", reader.result);
            resolve(reader.result);
          };
        });
      };
      // 触发文件选择对话框
      input.click();
    }
  };

  const onSubmit = async (values) => {
    try {
      // 合并头像到表单数据
      const userInfo = {
        ...values,
        avatar: avatar || account.avatar,
      };
      console.log(userInfo);

      // 调用API更新用户信息
      const res = await updateAccount(userInfo);
    } catch (error) {}
  };

  useEffect(() => {
    if (account) {
      setAvatar(account.avatar);
      // 初始化表单
      form.setFieldsValue({
        username: account.username,
        gender: account.gender,
        birthday: account.birthday || "2025-08-01",
        occupation: account.occupation,
        homeAddress: account.homeAddress,
        signature: account.signature,
      });
    }
  }, [account, form]);

  return (
    <>
      {
        <ActionSheet
          visible={showActionSheet}
          actions={actions}
          onCancel={() => setShowActionSheet(false)}
          onSelect={(e) => handleAction(e)}
          cancelText="取消"
        ></ActionSheet>
      }
      <div className={styles.container}>
        <div className={styles.header}>
          <TopDetail type={3} handleAction={() => form.submit()}>
            <h2>编辑个人资料</h2>
          </TopDetail>
        </div>
        <main className={styles.content}>
          <div
            className={styles.avatar}
            onClick={() => setShowActionSheet(true)}
          >
            <Image
              round
              src={avatar || account.avatar}
              height="27vw"
              width="27vw"
            />
            {generateLoading ? (
              <Loading size="24px">AI生成中...</Loading>
            ) : (
              <div>上传头像</div>
            )}
          </div>
          <div className={styles.userInfo}>
            <Form form={form} onFinish={onSubmit} colon>
              <Form.Item
                name="username"
                label="用户名"
                borderBottom={true}
                rules={[{ required: true, message: "请输入用户名" }]}
              >
                <Input placeholder="请输入用户名" />
              </Form.Item>
              <Form.Item
                name="gender"
                label="性别"
                borderBottom={true}
                rules={[{ required: true, message: "请选择性别" }]}
              >
                <Input placeholder="请选择性别" />
              </Form.Item>
              <Form.Item
                name="birthday"
                label="生日"
                borderBottom={true}
                rules={[{ required: true, message: "请输入生日" }]}
              >
                <Input placeholder="请输入生日" />
              </Form.Item>
              <Form.Item
                name="occupation"
                label="职业"
                borderBottom={true}
                rules={[{ required: true, message: "请输入职业" }]}
              >
                <Input placeholder="请输入职业" />
              </Form.Item>
              <Form.Item
                name="homeAddress"
                label="家乡"
                borderBottom={true}
                rules={[{ required: true, message: "请输入家乡" }]}
              >
                <Input placeholder="请输入家乡" />
              </Form.Item>
              <Form.Item
                name="signature"
                label="个人介绍"
                rules={[{ max: 140, message: "最多140个字符" }]}
              >
                <Input.TextArea
                  rows={3}
                  autoSize
                  maxLength={140}
                  showWordLimit
                  placeholder="请输入个人介绍"
                />
              </Form.Item>
            </Form>
          </div>
        </main>
      </div>
    </>
  );
}
