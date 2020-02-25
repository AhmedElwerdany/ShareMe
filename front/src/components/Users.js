import React from "react";
import { Row, Spin, Pagination, Col } from "antd";
import axios from "axios";
import User from "./User";

class Users extends React.Component {
  state = {
    pagination: {
      page: 1
    },
    loadnig: true,
    users: []
  };

  backTop = React.createRef();

  getCount = () => {
    return axios
      .get(`http://localhost:4000/users/count/${this.props.type}`)
      .then(({ data }) => data.count);
  };

  getData = skip => {
    return axios
      .get(`http://localhost:4000/users/${this.props.type}/${skip || 0}`)
      .then(({ data }) => data);
  };

  componentDidMount() {
    console.log('componentDidMount')
    this.handlePagination();
  }

  handlePagination = (page, pageSize) => {
    this.setState({
      loadnig: true,
      pagination: {
        page
      }
    });

    this.getData((page - 1) * pageSize)
      .then(users => {
        this.setState({
          users: users,
          loadnig: false
        });
      })
      .then(() => this.backTop.current.scrollIntoView());
  };

  static getDerivedStateFromProps(props, state) {
    if (props.type !== state.prevType) {
      console.log("How Many Times", "getDerivedStateFromProps");

      return {
        users: [],
        prevType: props.type
      };
    }

    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.users.length) {
      console.log("How Many Times", "ComponentDidUpdate");
      this.getData(0).then(users => {
        this.getCount().then(count => {
          this.setState({
            pagination: {
              page: 1
            },
            users: users,
            total: count
          });
        });
      });
    }
  }

  render() {
    return (
      <>
        {console.log("How Many Times", "render")}

        <Spin spinning={this.state.loadnig}>
          <Row gutter={[10, 10]} type='flex' justify='center' className='users'>
            <span ref={this.backTop}></span>
            {!this.state.users
              ? null
              : this.state.users.map((user, index) => {
                  return <User key={user._id} {...user} />;
                })}

            <Col span={24}>
              <Pagination
                onChange={this.handlePagination}
                current={this.state.pagination.page}
                total={this.state.total}
                pageSize={9}
              />
            </Col>
          </Row>
        </Spin>
      </>
    );
  }
}

export default Users;
