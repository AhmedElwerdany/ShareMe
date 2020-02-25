import React from "react";
import axios from "axios";
import { Table, Button } from "antd";

const { Column } = Table;

class Admin extends React.Component {
  state = {
    pagination: {
      current: 1,
      pageSize: 9
    },
    setLoading: true,
    users: [],
    total: 0
  };

  getCount = () => {
    return axios
      .get("http://localhost:4000/users/count/all")
      .then(({ data }) => data.count);
  };

  getData = skip => {
    return axios
      .get(`http://localhost:4000/users/all/${skip}`)
      .then(({ data }) => data);
  };

  componentDidMount() {
    this.getData(0).then(users => {
      this.getCount().then(count => {
        this.setState(state => ({
          users: users,
          total: count,
          setLoading: false
        }));
      });
    });
  }

  handlePagination = ({ current, pageSize }) => {
    this.setState({
      setLoading: true,
      pagination: {
        current,
        pageSize
      }
    });
    this.getData((current - 1) * pageSize).then(users => {
      this.setState({
        users: users,
        setLoading: false
      });
    });
  };

  handleDelete = (e, id) => {
    this.setState({
      setLoading: true
    });
    axios.delete(`http://localhost:4000/users/${id}`).then(() => {
      this.getCount().then(data =>
        this.setState(
          state => ({
            total: data,
            setLoading: false
          }),
          () => this.handlePagination(this.state.pagination)
        )
      );
    });
  };
  render() {
    return (
      <>
        <Table
           scroll={{ x: true}}
            bordered={true}
           loading={this.state.setLoading}
          rowKey={r => r._id}
          onChange={this.handlePagination}
          dataSource={this.state.users}
          pagination={{ total: this.state.total, pageSize: 9 }}
        >

          <Column title='Name' dataIndex='name'/>
          <Column title='Gender' dataIndex='gender'  />
          <Column title='Age' dataIndex='age'  />
          <Column title='Site' dataIndex='socialMedia' />
          <Column title='Link' dataIndex='link'/>
          <Column title='love' dataIndex='lovers' />
          <Column title='like' dataIndex='likers' />
          <Column title='Smile' dataIndex='smilers' />
          <Column title='Country' dataIndex='country' />
          <Column title='City' dataIndex='city' />
          <Column
            title='Action'
            render={(_, { _id }) => (
              <Button
                onClick={e => this.handleDelete(e, _id)}
                type='danger'
                ghost
              >
                Delete
              </Button>
            )}
          />
          {/*       </ColumnGroup> */}
        </Table>
      </>
    );
  }
}

export default Admin;
