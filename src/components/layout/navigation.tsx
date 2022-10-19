import React from "react";
import { Menu } from "antd";

export default function Navigation() {
  const items = [
    { label: '菜单项一', key: 'item-1' }, // 菜单项务必填写 key
    { label: '菜单项二', key: 'item-2' },
    {label: '子菜单',key: 'submenu',}
  ];
  return (
    <div style={{flex: 1}}>
      <Menu mode="horizontal" items={items} />
    </div>
  )
}