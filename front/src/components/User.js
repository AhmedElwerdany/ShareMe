import React from "react";
import axios from "axios";
import SocialIcon from "./SocialIcon"
import { Row, Col, Card, Icon, Badge } from "antd";

class User extends React.Component {
  state = {
    loved: localStorage.getItem(`${this.props._id}_love`) ? true : false,
    liked: localStorage.getItem(`${this.props._id}_like`) ? true : false,
    smiled: localStorage.getItem(`${this.props._id}_smile`) ? true : false,
    lovers: this.props.lovers,
    likers: this.props.likers,
    smilers: this.props.smilers
  };

  handleLove = e => {
    const { name } = e.currentTarget.dataset;
    if (this.state[[name + "d"]]) {
      this.setState(
        state => ({
          [name + "d"]: false,
          [name + "rs"]: state[name + "rs"] - 1
        }),
        () => {
          axios
            .post("http://localhost:4000/users/update", {
              id: this.props._id,
              react: "un" + name,
              count: name + "rs"
            })
            .then(() => {
              localStorage.removeItem(`${this.props._id}_${name}`);
            });
        }
      );
    } else {
      this.setState(
        state => ({
          [name + "d"]: true,
          [name + "rs"]: state[name + "rs"] + 1
        }),
        () => {
          axios
            .post("http://localhost:4000/users/update", {
              id: this.props._id,
              react: name,
              count: name + "rs"
            })
            .then(() => {
              localStorage.setItem(`${this.props._id}_${name}`, true);
            });
        }
      );
    }
  };

  render() {
    const {
      name,
      link,
      socialMedia,
      country,
      city,
      age,
      gender,
      createdAt
    } = this.props;
    return (
      <Col xs={24} md={12} lg={8} >
        <Card
          type='inner'
          title={
            <a style={{ fontSize: "20px" }} href={link}>
              {name}
            </a>
          }
          extra={
            <a href={link}>
              <SocialIcon type={socialMedia} style={{fontSize:'30px'}}/>
             </a>
          }
          actions={[
            <Badge
              offset={[5, 0]}
              data-name='love'
              onClick={this.handleLove}
              count={this.state.lovers}
            >
              <Icon
                style={{ fontSize: "20px", color: "red" }}
                theme={this.state.loved ? "filled" : null}
                type='heart'
                key='love'
              />
            </Badge>,
            <Badge
              onClick={this.handleLove}
              data-name='like'
              offset={[5, 0]}
              style={{ backgroundColor: "blue" }}
              count={this.state.likers}
            >
              <Icon
                style={{ fontSize: "20px", color: "blue" }}
                type='like'
                key='like'
                theme={this.state.liked ? "filled" : null}
              />
            </Badge>,

            <Badge
              onClick={this.handleLove}
              data-name='smile'
              offset={[5, 0]}
              count={this.state.smilers}
              style={{ backgroundColor: "#ffa700" }}
            >
              <Icon
                style={{ fontSize: "20px", color: "#ffa700" }}
                type='smile'
                key='fine'
                theme={this.state.smiled ? "filled" : null}
              />
            </Badge>
          ]}
        >
          <Row type='flex' justify='center' gutter={[20, 10]}>
            <Col style={{ fontSize: "18px" }}>
              <Icon type='flag' /> {country}
            </Col>
            <Col style={{ fontSize: "18px" }}>
              <Icon type='environment' /> {city}
            </Col>
            <Col style={{ fontSize: "18px" }}>
              <Icon type='user' /> {gender} / {age}y
            </Col>
          </Row>
          <Row type='flex' justify='center'>
            <Col style={{ fontSize: "18px" }}>
              <Icon type='calendar' /> {new Date(createdAt).toLocaleString()}
            </Col>
          </Row>
        </Card>
      </Col>
    );
  }
}

export default User