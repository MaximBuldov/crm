import React, {useState} from 'react';
import {Col, Input, Row, Select, Space, Table, Tag} from "antd";
import Heading from "../../components/layouts/Heading";
import moment from "moment";
import {Link} from "react-router-dom";
import {getRandomInt} from "../../utils/consts";
import {SearchOutlined} from "@ant-design/icons";
const {Option} = Select

const MyLeadsDashboard = () => {
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	let dataSource = [];
	const status = ['Lead In Progress', 'Opportunity', 'Scheduled', 'Closed']
	const name = ['John', 'Edward', 'Nik', 'Taylor', 'Mike', 'Jane', 'Max']
	const type = ['Moving', 'Load', 'Packing', 'Labor only']
	const color = ['success', 'processing', 'error', 'warning']
	const sources = ['Yelp', 'Facebook', 'Google', 'Instagram', 'Thumbtack', 'HomeAdvisor']
	for (let i = 0; i < 50; i++) {
		dataSource.push({
			key: i,
			id: getRandomInt(1000),
			status: status[getRandomInt(3)],
			name: name[getRandomInt(6)],
			type: type[getRandomInt(3)],
			moveSize: `${getRandomInt(4, 1)} Bedroom Apartment`,
			serviceDate: moment().date(getRandomInt(30)).format('M/DD/YYYY'),
			estRevenue: getRandomInt(500, 500),
			address: `San Diego 92${getRandomInt(140, 100)} - San Diego 92${getRandomInt(140, 100)}`,
			createDate: moment().date(getRandomInt(30)).format('M/DD/YYYY'),
			lastContact: `${getRandomInt(10, 2)} days`,
			source: sources[getRandomInt(5)],
			branch: 'San Diego',
			manager: 'Jane Z.'
		})
	}
	const columns = [
		{
			title: '#',
			dataIndex: 'id',
			key: 'id',
			render: text => <Link to="#">{text}</Link>
		},
		{
			title: 'OPP Status',
			dataIndex: 'status',
			key: 'status',
			render: text => <Tag color={color[getRandomInt(3)]}>{text}</Tag>,
			sorter: (a, b) => a.age - b.age,
		},
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Type',
			dataIndex: 'type',
			key: 'type',
		},
		{
			title: 'Move size',
			dataIndex: 'moveSize',
			key: 'moveSize',
		},
		{
			title: 'Service date',
			dataIndex: 'serviceDate',
			key: 'serviceDate',
			sorter: (a, b) => a.age - b.age,
		},
		{
			title: 'Est. Revenue',
			dataIndex: 'estRevenue',
			key: 'estRevenue',
			render: text => `$${text}`,
			sorter: (a, b) => a.age - b.age,
		},
		{
			title: 'Address',
			dataIndex: 'address',
			key: 'address',
		},
		{
			title: 'Messages',
			dataIndex: 'messages',
			key: 'messages',
		},
		{
			title: 'Create date',
			dataIndex: 'createDate',
			key: 'createDate',
		},
		{
			title: 'Last contact',
			dataIndex: 'lastContact',
			key: 'lastContact',
		},
		{
			title: 'Source',
			dataIndex: 'source',
			key: 'source',
		},
		{
			title: 'Branch',
			dataIndex: 'branch',
			key: 'branch',
			sorter: (a, b) => a.age - b.age,
		},
		{
			title: 'Assigned to',
			dataIndex: 'manager',
			key: 'manager',
			sorter: (a, b) => a.age - b.age,
		},
	];
	const rowSelection = {
		selectedRowKeys,
		onChange: setSelectedRowKeys,
	};
	return (
		<Space direction="vertical" style={{width: '100%'}}>
			<Heading parent="/sales"/>
			<Row justify="space-between" align="middle">
				<Col>
					<Select defaultValue="John">
						<Option value="John">John</Option>
						<Option value="Jane">Jane</Option>
						<Option value="Bill">Bill</Option>
					</Select>
					<Select defaultValue="Any Opp Status">
						<Option value="Any Opp Status">Any Opp Status</Option>
						<Option value="New Lead">New Lead</Option>
						<Option value="Opportunity">Opportunity</Option>
					</Select>
					<Select defaultValue="Any Source">
						<Option value="Any Source">Any Source</Option>
						<Option value="Google">Google</Option>
						<Option value="Yelp">Yelp</Option>
					</Select>
				</Col>
				<Col>
					<Input placeholder="Search leads" suffix={<SearchOutlined />} />
				</Col>
			</Row>
			<Table size="medium" rowSelection={rowSelection} dataSource={dataSource} columns={columns} scroll={{ x: 1500 }} />
		</Space>
	);
};

export default MyLeadsDashboard;
