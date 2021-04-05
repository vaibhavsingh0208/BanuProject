import React, { Component } from 'react';
import { Table, Button } from 'antd';
import axios from 'axios';

export default class LoginSuccess extends Component {
  constructor() {
    super();
    this.state = {
      h: false,
      data: {},
      surveyError: ''
    };
  }

  clearSurveyData = () => {
    this.setState({
      data: {}
    });
  };

  getSurveyData = () => {
    axios
      .get('http://localhost:3200/displayAllSurvey')
      .then(response => {
        if (response.status === 200) {
          console.log(JSON.stringify(response.data));
          this.setState({
            data: response.data
          });
          console.log('Survey Data', response);
        } else {
          let surveyError = 'Error while processing survey data';
          this.setState({ surveyError });
          console.log('Survey API failed', response);
        }
      })
      .catch(error => {
        console.log('error occured', error);
      });
  };
  render() {
    console.log(this.state.data);
    const data = [this.state.data];
    const isDataAvailable = data[0].surveyId;
    const columns = [
      {
        title: 'Survey Id',
        dataIndex: 'surveyId'
      },
      {
        title: 'Survey Title',
        dataIndex: 'surveyTitle'
      },
      {
        title: ' NoQues',
        dataIndex: 'NoQues'
      },
      {
        title: 'Category ID',
        dataIndex: 'CategoryID'
      },
      {
        title: 'Option Description',
        dataIndex: 'OptDesc'
      },
      {
        title: 'Survey Status',
        dataIndex: 'SurveyStatus'
      }
    ];

    return (
      <div>
        {!isDataAvailable ? (
          <Button
            type='primary'
            htmlType='submit'
            onClick={this.getSurveyData}
            style={{ display: 'flex', alignItems: 'flex-start', marginTop: '50px' }}
          >
            Get Survey Results
          </Button>
        ) : null}
        {isDataAvailable ? (
          <div>
            <Table style={{ width: '1000px', marginTop: '50px' }} dataSource={data} columns={columns} />
            <Button
              type='primary'
              htmlType='submit'
              onClick={this.clearSurveyData}
              style={{ display: 'flex', alignItems: 'flex-start', marginTop: '50px' }}
            >
              Clear Survey Data
            </Button>
          </div>
        ) : null}
      </div>
    );
  }
}
