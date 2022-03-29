import React, {Fragment} from 'react';
import {Button, Col, DatePicker, Divider, Form, Input, message, Row, Select, Typography} from "antd";
import {BRANCHES, MOVE_SIZE, PHONE_TYPE, SALES_PERSON, SERVICE_TYPE, SOURCE} from "../../../utils/fields";
import MaskedInput from "antd-mask-input";
import {useDispatch, useSelector} from "react-redux";
import {createJob} from "../../../store/actions/jobs";
import moment from 'moment'
const {Item, List} = Form


const HeaderLead = ({closeModal}) => {
	const [form] = Form.useForm()
	const dispatch = useDispatch()
	const {data, status} = useSelector(({jobs}) => jobs)
	const onFinish = (values) => {
		console.log(values)
		const newJobNumber = data[0].attributes.jobNumber + 1
		dispatch(createJob({values, jobNumber: newJobNumber, jobStatus: 'Lead in progress'}))
			.then(res => {
				res.meta.requestStatus === "fulfilled" && message.success('New lead created')
				closeModal()
			})
	}
	const disabledDate = (current) => {
		return current < moment().subtract(1, 'days')
	}

	return (
		<Form
			name="new-lead"
			form={form}
			size="large"
			layout="vertical"
			className="formItemWithoutPadding"
			onFinish={onFinish}
			initialValues={{
				phones: [{}]
			}}
		>
			<Typography.Title level={3}>Create New Lead</Typography.Title>
			<Divider />
			<Row gutter={16}>
				<Col span={24}>
					<Item
						label="Customer Name"
						name="name"
					>
						<Input  placeholder="Customer Name"/>
					</Item>
				</Col>
				<Col span={8}>
					<Item
						label="Sales Person"
						name="manager"
					>
						<Select placeholder={"Sales Person"} options={SALES_PERSON}/>
					</Item>
				</Col>
				<Col span={8}>
					<Item
						label="Branch"
						name="branch"
					>
						<Select placeholder={"Branch"} options={BRANCHES} />
					</Item>
				</Col>
				<Col span={8}>
					<Item
						label="Referral Source"
						name="source"
					>
						<Select placeholder={"Referral Source"} options={SOURCE}/>
					</Item>
				</Col>
				<Col span={8}>
					<Item
						label="Email"
						name="email"
					>
						<Input  placeholder="Email"/>
					</Item>
				</Col>
				<List name="phones">
					{(fields) => (
						<>
							{fields.map(({ key, name, ...restField }) => (
								<Fragment key={key}>
									<Col span={8}>
										<Item
											{...restField}
											label="Phone"
											name={[name, 'phone']}
										>
											<MaskedInput placeholder="Phone" mask="(111) 111-1111"/>
										</Item>
									</Col>
									<Col span={8}>
										<Item
											{...restField}
											label="Phone Type"
											name={[name, 'phoneType']}
										>
											<Select placeholder={"Phone Type"} options={PHONE_TYPE}/>
										</Item>
									</Col>
								</Fragment>
							))}
						</>
					)}
				</List>
				<Col span={8}>
					<Item
						label="Move Date"
						name="moveDate"
					>
						<DatePicker disabledDate={disabledDate} style={{width: "100%"}} format={"MM/DD/YYYY"} placeholder="Move Date"/>
					</Item>
				</Col>
				<Col span={8}>
					<Item
						label="Move Size"
						name="moveSize"
					>
						<Select placeholder={"Move Size"} options={MOVE_SIZE} />
					</Item>
				</Col>
				<Col span={8}>
					<Item
						label="Service Type"
						name="serviceType"
					>
						<Select placeholder={"Service Type"} options={SERVICE_TYPE} />
					</Item>
				</Col>
				<Col span={12}>
					<Item
						label="Origin Address"
						name={['origin', 'address']}
					>
						<Input placeholder={"Enter address"} />
					</Item>
				</Col>
				<Col span={12}>
					<Item
						label="Destination Address"
						name={['destination', 'address']}
					>
						<Input placeholder={"Enter address"} />
					</Item>
				</Col>
				<Col span={24}>
					<Item label={"Notes"} name={"notes"}>
						<Input.TextArea rows={3} placeholder={"Notes"}/>
					</Item>
				</Col>
				<Col>
					<Button onClick={closeModal} style={{marginRight: 16}}>Cancel</Button>
					<Button loading={status === 'loading'} type={"primary"} htmlType={"submit"}>Save</Button>
				</Col>


			</Row>
		</Form>
	);
};

export default HeaderLead;
