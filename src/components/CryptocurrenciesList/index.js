import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import CryptocurrencyItem from '../CryptocurrencyItem'
import './index.css'

class CryptocurrenciesList extends Component {
  state = {currencyData: [], isLoading: true}

  componentDidMount() {
    this.getCurrencyData()
  }

  getCurrencyData = async () => {
    const response = await fetch(
      'https://apis.ccbp.in/crypto-currency-converter',
    )
    const data = await response.json()
    const updatedData = data.map(item => ({
      id: item.id,
      currencyName: item.currency_name,
      usdValue: item.usd_value,
      euroValue: item.euro_value,
      currencyLogo: item.currency_logo,
    }))

    this.setState({currencyData: updatedData, isLoading: false})
  }

  renderCurrencyListItem = () => {
    const {currencyData} = this.state
    return (
      <ul className="currency-lists-container">
        <li className="headings-list">
          <h1 className="type">Coin Type</h1>
          <div className="usd-euro-container">
            <p className="value-name">USD</p>
            <p className="value-name">EURO</p>
          </div>
        </li>
        {currencyData.map(item => (
          <CryptocurrencyItem currencyDetails={item} key={item.id} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        {isLoading && (
          <div data-testid="loader" className="loader-container">
            <Loader type="Rings" color="#ffffff" height={80} width={80} />
          </div>
        )}

        {!isLoading && (
          <div className="currency-container">
            <h1 className="heading">Cryptocurrency Tracker</h1>
            <img
              src="https://assets.ccbp.in/frontend/react-js/cryptocurrency-bg.png "
              alt="cryptocurrency"
              className="image"
            />
            {this.renderCurrencyListItem()}
          </div>
        )}
      </>
    )
  }
}

export default CryptocurrenciesList
