import React from "react";
import { Button } from "antd/es";
import FormRender, { useForm, Schema } from 'form-render'
import { useNavigate } from "react-router-dom";
import api from "../../api";
import axios from "axios";

const schema: Schema = {
  type: 'object',
  properties: {
    username: {
      title: "账号",
      type: 'string',
      required: true,
      placeholder: '用户名',
      displayType: 'row'
    },
    password: {
      title: "密码",
      type: 'string',
      required: true,
      placeholder: '密码',
      displayType: 'row'
    },
  },
};

export default function LoginPage() {
  const navigate = useNavigate();
  const form = useForm();
  const onFinish = async (formData: any, errors: any) => {
    console.log('formData:', formData, 'errors', errors);
    const res = await api.user.login(formData)
    console.log(res)
  };

  const onRegisterClick = () => {
    navigate('/register')
  }
  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: 400 }}>
        <FormRender form={form} schema={schema} onFinish={onFinish} />
        <div style={{ textAlign: 'right' }}>
          <Button type="link" onClick={onRegisterClick}>
            注册
          </Button>
          <Button type="primary" onClick={form.submit}>
            登录
          </Button>
        </div>
      </div>
    </div>
  );
}