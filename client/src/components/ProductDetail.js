import React from 'react';
import './RenderList.css';
import axios from 'axios';


import './DetailStyle.css';
import LogoMeli from '../Logo_ML.png';

import Search from './Search';
class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: {},
      message: '',
    }
    this.cancel = '';
    this.timeout = 0;

    const productId = this.props.match.params.productId;
    const searchUrl = `http://localhost:5000/items/${productId}`;

    if (this.cancel) {
      this.cancel.cancel();
    }
    // Create a new CancelToken
    this.cancel = axios.CancelToken.source();
    axios
      .get(searchUrl, {
        cancelToken: this.cancel.token,
      })
      .then((res) => {
        const resultNotFoundMsg = !res.data
          ? this.res.error
          : '';
        this.setState({
          results: res.data,
          message: resultNotFoundMsg,
          loading: false,
        });
      })
      .catch((error) => {
        if (axios.isCancel(error) || error) {
          this.setState({
            loading: false,
            message: error.response.data,
          });
        }
      });
  }

  render() {
    return (
      <div>
        <div className="container">
          <label className="search-label" htmlFor="search-input">
            <img className="logo-meli" src={LogoMeli} />
            <input
              type="text"
              id="search-input"
              placeholder="Nunca deixe de buscar"
              onChange={this.handleOnInputChange}
            />
          </label>
          <button className="button-submit"></button>
          <i className="fa fa-search search-icon" />
        </div>
        <div className="container-detail">

          <div className="box-img">
            <img src={(this.state.results.item || {}).picture} alt={(this.state.results.item || {}).title} />
          </div>

          <div className="detail-right">
            <p>{(this.state.results.item || {}).condition} -
            {(this.state.results.item || {}).sold_quanti} vendidos</p>
            <p className="subtite">{(this.state.results.item || {}).title}</p>
            <p class="price">
            {((this.state.results.item || {}).price || {}).currency}
            {((this.state.results.item || {}).price || {}).decimals}</p>
            <button className="button-buy">Comprar</button>
          </div>

          <div className="box-description">
            <h4>Descricao do produto</h4>
            <p>{(this.state.results.item || {}).description}</p>
          </div>

        </div>
      </div>
    )
  }
}

export default ProductDetail;
