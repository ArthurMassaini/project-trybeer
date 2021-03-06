import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import 'semantic-ui-css/semantic.min.css';
import { Card, Image, Button } from 'semantic-ui-react';

import * as STORAGE from '../../helpers/localStorageHelper';
import * as API from '../../helpers/apiHelper';

function CardComponent({ product, sumTotal }) {
  const { id, name, price } = product;

  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState();

  useEffect(() => {
    API.fetchImage(name).then((data) => {
      setImage(data);
    });
  }, [name]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
      setQuantity(0);
    } else {
      const especificProduct = cart.find((element) => element.id === id);
      if (especificProduct !== undefined) setQuantity(especificProduct.quantidade);
    }
  }, [id]);

  const handleClickAdd = () => {
    STORAGE.addToCart({ ...product, quantidade: 1 });
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const especificProduct = cart.find((element) => element.id === id);

    if (especificProduct !== undefined) {
      setQuantity(especificProduct.quantidade);
    } else {
      setQuantity(0);
    }
    sumTotal();
  };

  const handleClickRemove = () => {
    STORAGE.removeFromCart(product);
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const especificProduct = cart.find((element) => element.id === id);

    if (especificProduct !== undefined) {
      setQuantity(especificProduct.quantidade);
    } else {
      setQuantity(0);
    }
    sumTotal();
  };

  return (
    <Card>
      <Image
        src={ image }
        wrapped
        ui={ false }
        data-testid={ `${id - 1}-product-img` }
      />
      <Card.Content>
        <Card.Header data-testid={ `${id - 1}-product-name` }>{name}</Card.Header>

        <Card.Description data-testid={ `${id - 1}-product-price` }>
          <span>R$ </span>
          {price.replace('.', ',')}
        </Card.Description>
      </Card.Content>

      <Card.Content extra>
        <Button data-testid={ `${id - 1}-product-plus` } onClick={ handleClickAdd }>
          +
        </Button>
        <span data-testid={ `${id - 1}-product-qtd` }>{quantity}</span>
        <Button
          data-testid={ `${id - 1}-product-minus` }
          onClick={ handleClickRemove }
        >
          -
        </Button>
      </Card.Content>
    </Card>
  );
}

CardComponent.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    url_image: PropTypes.string,
  }).isRequired,
  sumTotal: PropTypes.func.isRequired,
};

export default CardComponent;
