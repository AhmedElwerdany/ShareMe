import React from "react";
import axios from "axios";
import {
  Input,
  Select,
  Icon,
  Form,
  Row,
  Col,
  Typography,
  Button,
  Divider
} from "antd";

const { Option } = Select;
const countries = [
  { value: "Egypt", label: "Egypt" },
  { value: "USA", label: "USA" }
];
const cites = {
  Egypt: [
    { value: "Damitta", label: "Damitta" },
    { value: "Cairo", label: "Cairo" }
  ],
  USA: [
    { value: "Los Angeles", label: "Los Angeles" },
    { value: "New York", label: "New York" }
  ]
};

const links = {
  whatsapp: {
    l: "https://wa.me/",
    p:
      "Phone number in international format. Omit any zeroes, brackets or dashes"
  },
  twitter: { l: "https://twitter.com/", p: "Your Twitter Username" },
  snapchat: { l: "https://snapchat.com/add/", p: "Your SnapChat Username" }
};

class AddUser extends React.Component {
  state = {
    hover: true,
    setLoading : false
  };  

  handleSubmit = e => {
    this.setState({setLoading:true})
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
         axios.post('http://localhost:4000/users/', Object.assign(values, {link : `${links[values.socialMedia].l}${values.link}`})).then(()=> {
          this.props.history.push('/')
         })
      }
    })
    this.setState({setLoading:false})
    

  };

  handleAge = (rule, value, callback) => {
    if (Number(value) < 16 || Number(value) > 70) {
      callback("Age Must be between 16 and 70");
    }
    callback();
  };

  render() {
    const { getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        sm: { span: 24 },
        md: { span: 5 },
        lg: { span: 3 }
      },
      wrapperCol: {
        sm: { span: 24 },
        md: { span: 19 },
        lg: { span: 21 }
      }
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <>
        <Row style={{ width: "90%", margin: "auto" }}>
          <Col span={24}>
            <Typography.Title level={3}>Add Your Account !</Typography.Title>
          </Col>
          <Col span={24} className='message'>
            <Typography.Text type='secondary' strong={true}>
              Welcome to ShareMe, Now You Can Make An Account And Revice More
              Followers.
            </Typography.Text>
          </Col>
        </Row>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item
            {...formItemLayout}
            labelAlign='left'
            colon={false}
            label={
              <>
                <Icon type='setting' />
                {"Social Media"}
              </>
            }
          >
            {getFieldDecorator("socialMedia", {
              rules: [
                {
                  required: true,
                  message: "please choose your social Media Account!"
                }
              ]
            })(
              <Select size='large' placeholder='Social Media Account'>
                <Option value='whatsapp'>WhatsApp</Option>
                <Option value='twitter'>Twitter</Option>
                <Option value='snapchat'>SnapChat</Option>
              </Select>
            )}
          </Form.Item>

          <Form.Item
            labelAlign='left'
            {...formItemLayout}
            colon={false}
            label={
              <>
                <Icon type='user' />
                {"Name"}
              </>
            }
          >
            {getFieldDecorator("name", {
              initialValue: "",
              rules: [
                {
                  required: true,
                  message: "please type your name"
                },
                {
                  min: 3,
                  max: 20,
                  message:
                    "Your Name Length must be more than 2 and less the 21"
                },
                {
                  pattern: /\D/g,
                  message: "Please Do Not Type Any Numbers in your Name"
                }
              ]
            })(<Input size='large' placeholder='Your Name' />)}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            labelAlign='left'
            colon={false}
            label={
              <>
                <Icon type='tag' />
                {"Username"}
              </>
            }
          >
            {getFieldDecorator("link", {
              initialValue: "",
              rules: [
                {
                  required: true,
                  message: "please Type Your Username"
                }
              ]
            })(
              <Input
                addonBefore={
                  getFieldValue("socialMedia")
                    ? links[getFieldValue("socialMedia")].l
                    : null
                }
                size='large'
                placeholder={
                  getFieldValue("socialMedia")
                    ? links[getFieldValue("socialMedia")].p
                    : "please Type Your Username"
                }
              />
            )}
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            labelAlign='left'
            colon={false}
            label={
              <>
                <Icon type='woman' />
                {"Gender"}
              </>
            }
          >
            {getFieldDecorator("gender", {
              rules: [
                {
                  required: true,
                  message: "Please Choose Your Gender"
                }
              ]
            })(
              <Select size='large' placeholder='Gender'>
                <Option value='Male'>Male</Option>
                <Option value='Female'>Female</Option>
              </Select>
            )}
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            labelAlign='left'
            colon={false}
            label={
              <>
                <Icon type='calendar' />
                {"Age"}
              </>
            }
          >
            {getFieldDecorator("age", {
              initialValue: "",
              rules: [
                {
                  required: true,
                  pattern: /\d/g,
                  message: "Please Type Your Age in Numbers"
                },
                {
                  validator: this.handleAge
                }
              ]
            })(<Input size='large' placeholder='Your Age' />)}
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            labelAlign='left'
            colon={false}
            label={
              <>
                <Icon type='flag' />
                {"Country"}
              </>
            }
          >
            {getFieldDecorator("country", {rules : [{
                required : true,
                message : 'Please Choose Your Country'
              }]})(
              <Select size='large' placeholder='Your Country'>
                {countries.map(c => (
                  <Option key={c.label} value={c.value}>
                    {c.label}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
          {getFieldValue("country") ? (
            <Form.Item
              {...formItemLayout}
              labelAlign='left'
              colon={false}
              label={
                <>
                  <Icon type='environment' />
                  {"City"}
                </>
              }
            >
              {getFieldDecorator("city" , {rules : [{
                required : true,
                message : 'Please Choose Your City'
              }]})(
                <Select size='large' placeholder='Your City'>
                  {cites[getFieldValue("country")].map(ci => (
                    <Option key={ci.label} value={ci.value}>
                      {ci.label}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          ) : null}

          <Divider />
          <Form.Item>
            <Button
            disabled={this.state.setLoading}
              type='primary'
              ghost={this.state.hover}
              htmlType='submit'
              size='large'
              onMouseLeave={() => this.setState({ hover: true })}
              onMouseEnter={() => this.setState({ hover: false })}
            >
              Publish My Account
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
}

export default Form.create({ name: "validate_other" })(AddUser);
