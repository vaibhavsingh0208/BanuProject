import React, { Component } from 'react';
import { Button, Table } from 'antd';
import axios from 'axios';

export default class UserList extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: [],
      callMade: false
    };
  }

  componentDidMount() {
    this.displayUserData();
  }

  componentDidUpdate() {
    if (this.state.userInfo?.length === 0 && this.state.userInfo.callMade === false) {
      this.displayUserData();
      this.setState({
        callMade: true
      });
    }
  }

  displayUserData = () => {
    this.setState({
      addBucketClicked: false
    });
    axios
      .get('http://localhost:3200/displayAllUsers')
      .then(response => {
        if (response.status === 200) {
          console.log(JSON.stringify(response.data));
          this.setState({
            userInfo: response.data
          });
          console.log('Survey Bucket', response);
        } else {
          let surveyError = 'Error while fetching user details';
          this.setState({ surveyError });
          console.log('Error while fetching user details', response);
        }
      })
      .catch(error => {
        console.log('error occured', error);
      });
  };

  render() {
    const userDataInfo = this.state.userInfo;
    let userFilterData = userDataInfo;
    const { userType } = this.props;
    if (userType !== 'all' && userDataInfo.length) {
      userFilterData = userDataInfo.filter(data => data.UserType === userType);
    }
    const userInfohasData = userFilterData.length;

    const userColumnInfo = [
      {
        title: 'User ID',
        dataIndex: 'UserID'
      },
      {
        title: 'First Name',
        dataIndex: 'First_Name'
      },
      {
        title: 'Last Name',
        dataIndex: 'Last_Name'
      },
      {
        title: 'Type',
        dataIndex: 'UserType'
      }
    ];

    return (
      <div style={{ display: 'flex', flexFlow: 'column' }}>
        <div id='body'>
          {userDataInfo && userInfohasData ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Table
                style={{ width: '1000px', marginTop: '20px' }}
                dataSource={userFilterData}
                columns={userColumnInfo}
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}