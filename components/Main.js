import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div id="content">
        <h1>Add Service</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.serviceName.value
          const price = window.web3.utils.toWei(this.servicePrice.value.toString(), 'Ether')
          this.props.createService(name, price)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="serviceName"
              type="text"
              ref={(input) => { this.serviceName = input }}
              className="form-control"
              placeholder="Service Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="servicePrice"
              type="text"
              ref={(input) => { this.servicePrice = input }}
              className="form-control"
              placeholder="Service Price"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Add Service</button>
        </form>
        <p>&nbsp;</p>
        <h2>Available services:</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Provider</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="serviceList">
            { this.props.services.map((service, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{service.id.toString()}</th>
                  <td>{service.name}</td>
                  <td>{window.web3.utils.fromWei(service.price.toString(), 'Ether')} ETH</td>
                  <td>{service.owner}</td>
                  <td>
                    { !service.purchased
                      ? <button
                          name={service.id}
                          value={service.price}
                          onClick={(event) => {
                            this.props.purchaseService(event.target.name, event.target.value)
                          }}
                        >
                          Buy
                        </button>
                      : null
                    }
                    </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;