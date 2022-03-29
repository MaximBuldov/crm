import React, {useEffect, useState} from 'react';
import {Button, Col, DatePicker, Divider, Form, Input, Row, Select, Steps, Typography} from "antd";
import classNames from "classnames";
import MaskedInput from "antd-mask-input";
import {CarOutlined, DeleteOutlined, PieChartOutlined, PlusCircleTwoTone, TeamOutlined} from "@ant-design/icons";
import moment from "moment";
import {
	ELEVATOR,
	MOVE_SIZE,
	PARKING_TYPE, PHONE_TYPE,
	PROPERTY_TYPE,
	SERVICE_TYPE,
	SOURCE,
	STAIRS_COUNT,
	WALK_DISTANCE
} from "../../../utils/fields";

const { Step } = Steps;
const { Option } = Select;
const { Item, List } = Form;

const steps = [
	{
		title: 'Step 1',
		subtitle: 'Personal Info',
	},
	{
		title: 'Step 2',
		subtitle: 'Origin',
	},
	{
		title: 'Step 3',
		subtitle: 'Destination',
	},
];

const addressForm = (type) => (
	<Row gutter={16}>
		<Col span={24}>
			<Item name={[type, 'address']} label="Address">
				<Input placeholder="Enter address..." />
			</Item>
		</Col>
		<Col span={12}>
			<Item name={[type, 'propertyName']} label="Property Name">
				<Input placeholder="Property Name" />
			</Item>
		</Col>
		<Col span={12}>
			<Item name={[type, 'unitNumber']} label="Property Number">
				<Input placeholder="Property Number" />
			</Item>
		</Col>
		<Col span={12}>
			<Item name={[type, 'propertyType']} label="Property Type">
				<Select placeholder="Property Type" options={PROPERTY_TYPE} />
			</Item>
		</Col>
		<Col span={12}>
			<Item name={[type, 'parkingType']} label="Parking Type">
				<Select placeholder="Parking Type" options={PARKING_TYPE} />
			</Item>
		</Col>
		<Col span={24}>
			<Item name={[type, 'stairs']} label="Stairs">
				<Select placeholder="Stairs" options={STAIRS_COUNT}/>
			</Item>
		</Col>
		<Col span={12}>
			<Item name={[type, 'walkDistance']} label="Walk Distance">
				<Select placeholder="Walk Distance" options={WALK_DISTANCE}/>
			</Item>
		</Col>
		<Col span={12}>
			<Item name={[type, 'elevator']} label="Elevator(s)">
				<Select placeholder="Elevator(s)" options={ELEVATOR} />
			</Item>
		</Col>
	</Row>
)
//TODO:
// - поиск по имени кастомера
// - загруженность на выбранную дату
// - возможно нужны разные POST and PUT для заполненой и пустой формы

const HeaderOpportunity = ({job = false, closeModal}) => {
	const [currentStep, setCurrentStep] = useState(0);
	const [availability, setAvailability] = useState(false);
	const [form] = Form.useForm()
	const stepIsVisible = (step) => classNames({'step-form-visible': currentStep === step})
	useEffect(() => {
		if (job) {
			const {attributes: {customer, moveDate}} = job
			form.setFieldsValue({
				...job.attributes,
				phones: customer.data.attributes.phones,
				name: customer.data.attributes.name,
				email: customer.data.attributes.email,
				moveDate: moment(moveDate, 'YYYY-MM-DD'),
				source: customer.data.attributes.source
			})
		}
	}, [])
	return (
		<Row>
			<Col style={{borderRight: `1px solid rgba(0, 0, 0, 0.06)`, paddingRight: 24 }} span={8}>
				<div>Create</div>
				<Typography.Title level={3}>Opportunity</Typography.Title>
				<Divider />
				<Steps current={currentStep} direction="vertical">
					{steps.map(item => (
						<Step subTitle={item.subtitle} key={item.title} title={item.title} />
					))}
				</Steps>
			</Col>
			<Col style={{paddingLeft: 24 }} span={16}>
				<Form
					form={form}
					className="formItemWithoutPadding"
					layout="vertical"
					size="large"
					initialValues={{
						phones: [{}]
					}}
				>
					<div className={`step-form ${stepIsVisible(0)}`} >
						<Item name="name" label="Name">
							<Input placeholder="Name" />
						</Item>
						<List name="phones">
							{(fields, {add, remove}) => (
								<>
									{fields.map(({ key, name, ...restField }) => (
										<Row gutter={16} key={key} align="bottom" justify="space-between">
											<Col span={12}>
												<Item
													{...restField}
													name={[name, 'phone']}
													label="Phone Number"
												>
													<MaskedInput mask="(111) 111-1111" />
												</Item>
											</Col>
											<Col span={8}>
												<Item
													label={"Phone Type"}
													name={[name, 'phoneType']}
													{...restField}
												>
													<Select placeholder="Phone Type" options={PHONE_TYPE} />
												</Item>
											</Col>
											<Col>
												<Item>
													{key === 0 ? (
														<Button onClick={() => add()} icon={<PlusCircleTwoTone />} type="link" />
													) : (
														<Button onClick={() => remove(name)} icon={<DeleteOutlined />} danger type="link" />
													)}
												</Item>
											</Col>
										</Row>
									))}
								</>
							)}
						</List>
						<Item name="email" label="Email">
							<Input placeholder="email@gmail.com" />
						</Item>
						<Item>
							<Row align="middle" gutter={16}>
								<Col>
									<Item name="moveDate" label="Move date">
										<DatePicker onChange={() => setAvailability(!availability)} placeholder="Move Date" />
									</Item>
								</Col>
								<Col>{
									availability ? (
										<Row gutter={8}>
											<Col><PieChartOutlined /> 0%</Col>
											<Col><CarOutlined /> 7 / 7</Col>
											<Col><TeamOutlined /> 1 / 1</Col>
											<Col><TeamOutlined /> 43 /43</Col>
										</Row>
									) : 'Choose a move date to see availability'
								}</Col>
							</Row>
						</Item>
						<Row gutter={16}>
							<Col span={12}>
								<Item name="serviceType" label="Type of service">
									<Select placeholder={"Type of service"} options={SERVICE_TYPE}/>
								</Item>
							</Col>
							<Col span={12}>
								<Item name="moveSize" label="Move size">
									<Select placeholder={"Move size"} options={MOVE_SIZE} />
								</Item>
							</Col>
						</Row>
						<Item name="source" label="Referral Source">
							<Select placeholder={"Referral Source"} options={SOURCE}/>
						</Item>
					</div>
					<div className={`step-form ${stepIsVisible(1)}`} >
						{addressForm('origin')}
					</div>
					<div className={`step-form ${stepIsVisible(2)}`} >
						{addressForm('destination')}
					</div>
				</Form>
				<Divider />
				<Row justify="space-between">
					<Col>
						<Button type="link" size="large" onClick={closeModal}>Cancel</Button>
						{currentStep > 0 && (
							<Button type="primary" onClick={() => setCurrentStep(currentStep - 1)} size="large">Back</Button>
						)}
					</Col>
					<Col>
						<Button type={currentStep !== steps.length - 1 ? "link": "primary"} size="large">Save & Close</Button>
						{currentStep !== steps.length - 1 && (
							<Button type="primary" onClick={() => setCurrentStep(currentStep + 1)} size="large">Next</Button>
						)}
					</Col>
				</Row>
			</Col>
		</Row>
	);
};

export default HeaderOpportunity;
