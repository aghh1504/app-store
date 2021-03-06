import React, { Component } from 'react'
import { connect } from 'react-redux';
import { selectAppAdd } from '../Actions'
import '../Styles/App.css'

class List extends Component {

  onHandleInput = e => {
    this.props.selectAppAdd(e.target.id)
  }

  render() {
    const {appList, kind, property} = this.props
    return (
      <table>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>{kind}</th>
          </tr>
           <tbody>
              {
                  appList.map(app => {

                    console.log('property', property, app[property])
                  return (
                    <tr key={app.id}>
                      <td>{app.name}</td>
                      <td>{app.desc}</td>
                      <td><input type='checkbox' id={app.id} checked={app[property]} onChange={this.onHandleInput}/></td>
                    </tr>
                  )
                })
              }
        </tbody>
    </table>
    )
  }
}

const mapDispatchToProps = {
  selectAppAdd
}

export default connect(null, mapDispatchToProps)(List)
