import React from 'react';
import { CalendarOutlined, ExportOutlined, HomeOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';

const { SubMenu } = Menu;

const MenuComponent = (props) => {
  return (
    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
      <Menu.Item key="0" disabled={true}>
        {props.userEmail}
      </Menu.Item>

      <Menu.Divider />

      <Menu.Item key="1" icon={<CalendarOutlined />}>
        <NavLink to={`/calendar`}>Calendar</NavLink>
      </Menu.Item>

      <Menu.Item key="2" icon={<HomeOutlined />}>
        <NavLink to="/storages">Storages</NavLink>
      </Menu.Item>

      <Menu.Item key="3" icon={<SettingOutlined />}>
        <NavLink to="/settings">Settings</NavLink>
      </Menu.Item>

      <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
        <Menu.Item key="4">Team 1</Menu.Item>
        <Menu.Item key="5">Team 2</Menu.Item>
      </SubMenu>

      <Menu.Item key="6" icon={<ExportOutlined />} onClick={() => props.logoutTC()}>
        Log out
      </Menu.Item>
    </Menu>
  );
};

export default MenuComponent;
