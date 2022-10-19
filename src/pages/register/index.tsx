import React from "react";
import { Button } from "antd/es";
import FormRender, { useForm, Schema } from 'form-render'
import { useNavigate } from "react-router-dom";
import api from "../../api";

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
    passwordAffirm: {
      title: "确认密码",
      type: 'string',
      required: true,
      placeholder: '确认密码',
      displayType: 'row'
    },
  },
};

export default function RegisterPage() {
  const natigate = useNavigate();
  const form = useForm();
  const onFinish = async (formData: any, errors: any) => {
    console.log('formData:', formData, 'errors', errors);
    await api.user.register(formData)
    natigate('/login')
  };
  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: 400 }}>
        <FormRender form={form} schema={schema} onFinish={onFinish} />
        <div style={{ textAlign: 'right' }}>
          <Button type="primary" onClick={form.submit}>
            注册
          </Button>
        </div>
      </div>
    </div>
  );
}