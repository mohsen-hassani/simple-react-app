import React from 'react'
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.setFirstName = this.setFirstName.bind(this)
    this.setLastName = this.setLastName.bind(this)
    this.setNationalCode = this.setNationalCode.bind(this)
    this.searchTable = this.searchTable.bind(this)
    this.removeRow = this.removeRow.bind(this)
    this.editRow = this.editRow.bind(this)
    this.saveCloseModal = this.saveCloseModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.setEditedFirstName = this.setEditedFirstName.bind(this)
    this.setEditedLastName = this.setEditedLastName.bind(this)
    this.setEditedNationalCode = this.setEditedNationalCode.bind(this)
    this.state = {
      'data': [
        {
          'id': 1,
          'first_name': 'Mohsen',
          'last_name': 'Hassani',
          'national_code': '298',
        },
        {
          'id': 2,
          'first_name': 'Mohsen',
          'last_name': 'Sarikhani',
          'national_code': '600',
        },
        {
          'id': 3,
          'first_name': 'Behrooz',
          'last_name': 'Shafei',
          'national_code': '299',
        },
      ],
      'filterdData': [],
      'gid': 4,
      'firstName': '',
      'lastName': '',
      'nationalCode': '',
      'searchText': '',
      'showModal': false,
      'editingRow': {},
      'editedFirstName': '',
      'editedLastName': '',
      'editedNationalCode': '',
      'editingId': '',
    }
  }

  componentDidMount() {
    this.setState((state) => ({
      'filterdData': state.data,
    }))
  }

  render() {
    return (
      <div className="continer">
        <div className="jumbotron text-center">
          <h1>
            Hello world!
        </h1>
          <p>
            a simple bootstrap and react app!
        </p>
          <input type="text"
            placeholder="Type to search in table"
            className="form-control searchInput"
            name="search"
            value={this.state.searchText}
            onChange={this.searchTable} />

        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <h2>Data in table</h2>
              <Table data={this.state.filterdData} removeRow={this.removeRow} editRow={this.editRow} />
            </div>
            <div className="col-md-5">
              <AddForm addRow={this.addRow}
                setFirstName={this.setFirstName} Fname={this.state.firstName}
                setLastName={this.setLastName} Lname={this.state.lastName}
                setNationalCode={this.setNationalCode} NCode={this.state.nationalCode}
              />
            </div>
          </div>
        </div>
        <Modal show={this.state.showModal}
          saveCloseModal={this.saveCloseModal}
          closeModal={this.closeModal}
          setEditedFirstName={this.setEditedFirstName}
          setEditedLastName={this.setEditedLastName}
          setEditedNationalCode={this.setEditedNationalCode}
          editingfn={this.state.editedFirstName}
          editingln={this.state.editedLastName}
          editingnc={this.state.editedNationalCode}
          editingId={this.state.editingId} />
      </div>
    )
  }

  closeModal() {
    this.setState({
      'showModal': false,
    })
  }

  saveCloseModal() {
    this.closeModal()
    var foundIndex = this.state.data.findIndex(x => x.id === this.state.editingId);
    let object = {
      'id': this.state.editingId,
      'first_name': this.state.editedFirstName,
      'last_name': this.state.editedLastName,
      'national_code': this.state.editedNationalCode,
    }
    this.setState(prevState => {
      let data = [...prevState.data]
      data[foundIndex] = object
      return {'data': data}
    })
    this.setState(prevState => ({
      'filterdData': prevState.data
    }))
  }

  removeRow(row) {
    this.setState((state) => ({
      'data': state.data.filter(item => item !== row),
    }))
    this.setState((state) => ({
      'filterdData': state.data,
    }))

  }

  editRow(row) {
    this.setState({
      'editingRow': row,
      'editedFirstName': row.first_name,
      'editedLastName': row.last_name,
      'editedNationalCode': row.national_code,
      'editingId': row.id,
      'showModal': true,
    })
  }

  searchTable(e) {
    this.setState({
      'searchText': e.target.value,
    })
    if (e.target.value === '') {
      this.setState((state) => ({
        'filterdData': state.data,
      }))
    }
    else {
      this.setState((state) => ({
        'filterdData': state.data.filter(val => val.national_code.includes(state.searchText)),
      }))
    }
  }

  setFirstName(value) { this.setState({ 'firstName': value, }) }
  setLastName(value) { this.setState({ 'lastName': value, }) }
  setNationalCode(value) { this.setState({ 'nationalCode': value, })}

  setEditedFirstName(value) { this.setState({ 'editedFirstName': value, }) }
  setEditedLastName(value) { this.setState({ 'editedLastName': value, }) }
  setEditedNationalCode(value) { this.setState({ 'editedNationalCode': value, })}

  addRow = () => {
    this.setState((state) => ({
      'data': [...this.state.data, {
        'first_name': this.state.firstName,
        'last_name': this.state.lastName,
        'national_code': this.state.nationalCode,
        'id': state.gid,
      }],
      'gid': state.gid + 1,
      'filterdData': state.data,
    }))
    this.setState((state) => ({
      'gid': state.gid + 1,
    }))
    this.setState((state) => ({
      'filterdData': state.data,
    }))
  }
}

class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.setFirstName = this.setFirstName.bind(this)
    this.setLastName = this.setLastName.bind(this)
    this.setNationalCode = this.setNationalCode.bind(this)
  }
  render() {
    let display = 'none'
    if (this.props.show)
      display = 'block'

    return (
      <div className="modal show" id="myModal" style={{ display: display }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Row ({this.props.editingId})</h4>
              <button type="button" className="close" onClick={this.props.closeModal}>&times;</button>
            </div>
            <div className="modal-body">
              <Form
                fname={this.props.editingfn} setFirstName={this.setFirstName}
                lname={this.props.editingln} setLastName={this.setLastName}
                ncode={this.props.editingnc} setNationalCode={this.setNationalCode} />
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={this.props.saveCloseModal}>Save</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  setFirstName(value) { this.props.setEditedFirstName(value) }
  setLastName(value) { this.props.setEditedLastName(value) }
  setNationalCode(value) { this.props.setEditedNationalCode(value) }
}

class AddForm extends React.Component {
  constructor(props) {
    super(props)
    this.setFirstName = this.setFirstName.bind(this)
    this.setLastName = this.setLastName.bind(this)
    this.setNationalCode = this.setNationalCode.bind(this)

  }
  render() {
    return (
      <div className="card shadow p-3">
        <h2>Add row to table</h2>
        <Form
          setFirstName={this.setFirstName} Fname={this.props.Fname}
          setLastName={this.setLastName} Lname={this.props.Lname}
          setNationalCode={this.setNationalCode} Ncode={this.props.Ncode}
        />
        <button className="btn btn-success" onClick={() => {
          this.props.addRow()
        }}>
          Add New Row
        </button>
      </div>
    )
  }
  setFirstName(value) {
    this.props.setFirstName(value)
  }
  setLastName(value) {
    this.props.setLastName(value)
  }
  setNationalCode(value) {
    this.props.setNationalCode(value)
  }
}

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.setFname = this.setFname.bind(this);
    this.setLname = this.setLname.bind(this);
    this.setNcode = this.setNcode.bind(this);

  }
  setFname(e) {
    this.props.setFirstName(e.target.value)
  }
  setLname(e) {
    this.props.setLastName(e.target.value)
  }
  setNcode(e) {
    this.props.setNationalCode(e.target.value)
  }
  render() {
    return (
      <form className="form">
        <div className="form-group">
          <label>First Name:</label>
          <input type="text" className="form-control" name="fname" value={this.props.fname} onChange={this.setFname} />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input type="text" className="form-control" name="lname" value={this.props.lname} onChange={this.setLname} />
        </div>
        <div className="form-group">
          <label>National Code:</label>
          <input type="text" className="form-control" name="ncode" value={this.props.ncode} onChange={this.setNcode} />
        </div>
      </form>
    )
  }
}

class Table extends React.Component {
  constructor(props) {
    super(props)
    this.removeRow = this.removeRow.bind(this)
    this.editRow = this.editRow.bind(this)
  }
  render() {
    return (
      <table className="table">
        <thead className="table-borderless">
          <tr>
            <th>#</th>
            <th>Fist Name</th>
            <th>Last Name</th>
            <th>National Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.props.data.map((row) => {
            return <TableRow row={row} key={row.id} removeRow={(r) => this.removeRow(r)} editRow={this.editRow} />
          })}
        </tbody>
      </table>
    )
  }
  removeRow(row) {
    this.props.removeRow(row)
  }
  editRow(row) {
    console.log(row);
    
    this.props.editRow(row)
  }
}

class TableRow extends React.Component {
  constructor(props) {
    super(props)
    this.removeRow = this.removeRow.bind(this)
    this.editRow = this.editRow.bind(this)
  }
  render() {
    let { id, first_name, last_name, national_code } = this.props.row
    return (
      <tr>
        <td>{id}</td>
        <td>{first_name}</td>
        <td>{last_name}</td>
        <td>{national_code}</td>
        <td>
          <button className="btn btn-sm btn-outline-secondary mx-1"
            data-toggle="modal" data-target="#myModal"
            onClick={() => this.editRow(this.props.row)}>Edit</button>
          <button className="btn btn-sm btn-outline-danger mx-1"
            onClick={() => this.removeRow(this.props.row)}>
            delete
            </button>
        </td>
      </tr>
    )
  }
  removeRow(row) {
    this.props.removeRow(row)
  }
  editRow(row) {
    this.props.editRow(row)
  }
}

export default App;