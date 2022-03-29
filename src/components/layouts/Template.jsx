import React from 'react';
import Header from "./Header";
import Sider from "./Sider";
import { Outlet } from "react-router-dom";

const Template = () => {
	return (
		<Layout>
			<Header />
			<Sider />
			<Layout.Content className="content">
				<Outlet />
			</Layout.Content>
		</Layout>
	);
};

export default Template;
