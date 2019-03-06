import React, { Component } from 'react';
import axios from 'axios';

const server = 'https://api.zipaddress.net/';

class App extends Component {
  constructor() {
    super();
    this.state = {
      zipcode: '',
      status: 0,
      result: '',
    }
  }

  handleChange = e => {
    this.setState({
      zipcode: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    axios.get(`${server}?zipcode=${this.state.zipcode}`)
      .then((res) => {
        this.setState({ status: res.data.code })
        if(this.state.status === 200) {
          this.setState({ result: res.data.data })
        }else{
          this.setState({ result: '' })
        }
      })
      .catch((e) => {
        console.error(e);
      })
  }

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <label>
            zipcode:
            <input type="text" name="zipcode" onChange={this.handleChange} />
          </label>
          <button type="submit">Get</button>
        </form>

        <div>取得結果：{this.state.status}</div>
        <table>
          <tbody>
            <tr><td>pref</td><td>{this.state.result.pref}</td></tr>
            <tr><td>town</td><td>{this.state.result.town}</td></tr>
            <tr><td>address</td><td>{this.state.result.address}</td></tr>
            <tr><td>fullAddress</td><td>{this.state.result.fullAddress}</td></tr>
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
