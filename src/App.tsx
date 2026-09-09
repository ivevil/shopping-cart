'use client';

import React from 'react';
import Modal from './components/UI/Modal'
import CartSelection from './components/Cart/CartSelection';
import CartTable from './components/Cart/CartTable';
import CartMessages from './components/Cart/CartMessages';
import CartTotal from './components/Cart/CartTotal';
import { Layout } from './components/UI/Layout';
import { useEffect, useState, useReducer } from 'react';
import { reducerFn, initialState } from './reducer';
import { ProductInterface } from "./globalTypes";

const App: React.FC = () => {

  const [state, dispatch] = useReducer(reducerFn, initialState);
  const [amount, setAmount] = useState<number>(1)
  const [error, updateMessageError] = useState<string>('')
  const [modal, showModal] = useState(false);
  const [selectedTotal, setSelectedTotal] = useState<string>('0.00')
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const selectProduct = (id: string) => {
    const value = id;

    if (value !== undefined && value !== "0") {
      dispatch({
        type: "SELECT_A_PRODUCT", payload: product, select: state?.products.find(
          product => product.id === value
        ) as ProductInterface
      })
    }
  }

  const product: ProductInterface = state?.products.find(
    product => product.id === state.product.id
  ) as ProductInterface

  const handleClick = () => {
    if (isNaN(amount) || amount === 0) {
      updateMessageError("Sorry, you need to select valid number as an amount!");
    } else if (product === undefined) {
      updateMessageError("Sorry, you need to pick a product!");
    } else if (amount > product.maxAmount) {
      updateMessageError("Sorry, there is no enough items. There is/are only " + product.maxAmount + " available!");
    } else {
      product.amount = amount;
      dispatch({ type: "ADD_TO_CART", payload: product })
      updateMessageError("");
    }
  }

  const removeTheProduct = (id: string) => {
    dispatch({ type: "REMOVE_THE_PRODUCT", payload: id })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART", payload: product })
  }

  const buyItems = () => {
    toggle();
    dispatch({ type: "CLEAR_CART", payload: product })
  }

  const toggle = () => {
    showModal(!modal);
  }

  const checkIfButtonIsDisabled = () => {
    if (!product) {
      return true;
    }

    const isItemInCart = state.shoppingCart.find(item => item.id === product.id);
    let newAmount = 0;
    state.shoppingCart.forEach(item => {
      newAmount += item.amount
    })

    if (!isItemInCart) {
      return !(state.totalAmount <= 10 && state.totalAmount + amount <= 10)
    } else {
      return !(state.totalAmount <= 10 && newAmount - isItemInCart.amount + amount <= 10)
    }
  }

  const getTotal = () => {
    let total = 0;
    let itemPrice = 0;

    state.shoppingCart.map(item => {
      itemPrice = item.price * item.amount
      return total += itemPrice
    })
    return total.toFixed(2);
  }

  useEffect(() => {
    if (!product) {
      setSelectedTotal('0.00');
      return;
    }

    const timer = window.setTimeout(() => {
      const selectedTotalPrice = (product.price * amount).toFixed(2);
      setSelectedTotal(selectedTotalPrice);
    }, 200);

    return () => window.clearTimeout(timer);
  }, [product, amount]);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('cart-theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('cart-theme', theme);
  }, [theme]);

  useEffect(() => {
    fetch('/products.json')
      .then(response => response.json())
      .then(data => dispatch({ type: "LIST_PRODUCTS", payload: data }));
  }, [])

  const cartStatus = state.totalAmount >= 10 ? 'Limit reached' : state.shoppingCart.length ? 'Ready to checkout' : 'No items yet';
  const selectedStock = product ? Math.max(product.maxAmount - (state.shoppingCart.find(item => item.id === product.id)?.amount ?? 0), 0) : 0;

  const toggleTheme = () => {
    setTheme((currentTheme) => currentTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <Layout theme={theme} onToggleTheme={toggleTheme}>
        <h1>CART</h1>

        <div className="cart__hero panel">
          <div>
            <span className="eyebrow">Curated essentials</span>
            <h2>{product ? product.productName : 'Choose your item'}</h2>
          </div>
          <div className="cart__hero-statuses">
            <span className={`status-pill ${state.totalAmount >= 10 ? 'danger' : 'success'}`}>{cartStatus}</span>
            <span className="status-pill neutral">{state.shoppingCart.length} item(s)</span>
            <span className="status-pill neutral">{selectedStock} left in stock</span>
          </div>
        </div>

        <CartSelection state={state} selectProduct={selectProduct} amount={amount} handleClick={handleClick} setAmount={setAmount} product={product} checkIfButtonIsDisabled={checkIfButtonIsDisabled()} />
        <div className="cart__products">
          <CartMessages error={error}>
            <p><span className="meta-label">PRICE</span><strong>{product !== undefined ? Number(product.price).toFixed(2) : "0.00"} €</strong></p>
            <p><span className="meta-label">AMOUNT</span><strong>{!isNaN(amount) ? amount : 'invalid number'}</strong></p>
            <p><span className="meta-label">TOTAL</span><strong>{selectedTotal} €</strong></p>
          </CartMessages>
          <CartTable state={state} removeTheProduct={removeTheProduct}></CartTable>
        </div>
        <CartTotal state={state} getTotal={getTotal()} clearCart={clearCart} buyItems={buyItems} />
      </Layout>
      <Modal open={modal} toggle={toggle}>
        <h3>Your order is confirmed.</h3>
      </Modal>
    </>
  )
}

export default App;
