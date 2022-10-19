import React from "react";
import { Menu } from "antd";

export default function Mneu() {
  const items = [
    { label: '菜单项一', key: 'item-1' }, // 菜单项务必填写 key
    { label: '菜单项二', key: 'item-2' },
    {
      label: '子菜单',
      key: 'submenu',
      children: [{ label: '子菜单项', key: 'submenu-item-1' }],
    },
  ];
  return (
    <Menu style={{ width: '100%', height: '100%' }} mode="inline" items={items} />
  )
}