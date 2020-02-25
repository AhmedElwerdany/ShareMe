import React from "react";
import { Col, Row, Menu, Button, Icon } from "antd";
import { Link, NavLink } from "react-router-dom";
import SocialIcon from "./SocialIcon";

class NavBar extends React.Component {
  state = {
    hover: true
  }



  render() {
    return (
      <Row type='flex' justify='space-between' align='middle'>
        <Col span={16}>
          <Link to='/' className='logo'>
            <Icon type='cloud' theme='twoTone' /> ShareMe
          </Link>
          <Menu theme='light' mode='horizontal' selectedKeys={[this.props.location.pathname]} >
            <Menu.Item key='/'>
              <NavLink exact to='/'>
                All
              </NavLink>
            </Menu.Item>
            <Menu.Item key='/whatsapp'>
              <NavLink to='/whatsapp'> <SocialIcon type='whatsapp'/> WhatsApp</NavLink>
            </Menu.Item>
            <Menu.Item key='/twitter'>
              <NavLink to='/twitter'> <SocialIcon type="twitter" style={{color:'#1890ff'}}/> Twitter</NavLink>
            </Menu.Item>
            <Menu.Item key='/snapchat'>
              <NavLink to='/snapchat'><SocialIcon type='snapchat'/> SnapChat</NavLink>
            </Menu.Item>
          </Menu>
        </Col>
        <Col style={{ marginLeft: "auto" }}>
          <Button
            size='large'
            type='primary'
            onMouseLeave={() => this.setState({ hover: true })}
            onMouseEnter={() => this.setState({ hover: false })}
            ghost={this.state.hover}
          >
            <Link to='/add_user'>
              <Icon type='plus' /> Create Account
            </Link>
          </Button>
        </Col>
      </Row>
    );
  }
}

export default NavBar;
