import React, {useState} from 'react';
import {Input, Space, Table, Tabs, Tag} from "antd";
const columns = [
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
		render: text => <a>{text}</a>,
	},
	{
		title: 'Age',
		dataIndex: 'age',
		key: 'age',
	},
	{
		title: 'Address',
		dataIndex: 'address',
		key: 'address',
	},
	{
		title: 'Tags',
		key: 'tags',
		dataIndex: 'tags',
		render: tags => (
			<>
				{tags.map(tag => {
					let color = tag.length > 5 ? 'geekblue' : 'green';
					if (tag === 'loser') {
						color = 'volcano';
					}
					return (
						<Tag color={color} key={tag}>
							{tag.toUpperCase()}
						</Tag>
					);
				})}
			</>
		),
	},
	{
		title: 'Action',
		key: 'action',
		render: (text, record) => (
			<Space size="middle">
				<a>Invite {record.name}</a>
				<a>Delete</a>
			</Space>
		),
	},
];
const data = [
	{
		key: '1',
		name: 'John Brown',
		age: 32,
		address: 'New York No. 1 Lake Park',
		tags: ['nice', 'developer'],
	},
	{
		key: '2',
		name: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
		tags: ['loser'],
	},
	{
		key: '3',
		name: 'Joe Black',
		age: 32,
		address: 'Sidney No. 1 Lake Park',
		tags: ['cool', 'teacher'],
	},
];

const HeaderSearch = () => {
	const [isTableVisible, setTableVisible] = useState(false);
	const onMovingSearch = (e) => {
		if (e.target.value.length > 3) {
			setTableVisible(true)
		} else {
			setTableVisible(false)
		}
	}
	return (
		<>
			<Tabs defaultActiveKey="1">
				<Tabs.TabPane tab="Moving" key="1">
					<Input onChange={onMovingSearch} placeholder="Enter a job number, phone number, email or partial name" />
				</Tabs.TabPane>
				<Tabs.TabPane tab="Storage" key="2">
					<Input placeholder="Enter an account number, phone number, email or partial name" />
				</Tabs.TabPane>
			</Tabs>
			{isTableVisible &&(
				<Table pagination={false} columns={columns} dataSource={data}/>
			)}
		</>
	);
};

export default HeaderSearch;
