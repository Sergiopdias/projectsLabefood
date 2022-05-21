import { Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../global/GlobalContext";
import ShowModal from "../modal/Modal";
import {
  ButtonRemove,
  CardInfoMeal,
  CardMediaItemImg,
  Container,
  Quantity,
  ButtonAdd,
  RestaurantName,
  Price,
  Description
} from "./styled";
export const ProductCard = (props) => {
  const { states, setters, functions } = useContext(GlobalContext)
  const [initialQuantity, setInitialQuantity] = useState(0)
  const [productQuantity, setProductQuantity] = useState(0)
  const [modalQuantity, setModalQuantity] = useState(0)

  const [open, setOpen] = useState(false)
  const handleClose = () => { setOpen(false) }

  //-- Alterar quantidade dos produtos --//
  const addProduct = (product) => {

    const newCart = [...states.cart, { ...product, quantity: modalQuantity }]

    setOpen(false)
    setInitialQuantity(productQuantity - 1)
    setProductQuantity(modalQuantity)
    setters.setCart(newCart)
    setters.setRestaurantId(props.params)
  }

  const onChangeQuantity = (product) => {
    const newQuantity = states.cart.map((item) => {
      if (item.id === product.id) {
        return { ...item, quantity: Number(modalQuantity) }
      }
      return item
    })
    setInitialQuantity(productQuantity + 1)
    setOpen(false)
    setters.setCart(newQuantity)
  }

  console.log(states.cart)
  //-- Open Modal --//
  const openModal = () => {
    if (states.restaurantId === props.params || states.restaurantId === undefined || states.cart.length === 0) {
      setOpen(true)
    } else {
      alert("só pode adicionar 1 restaurante no carrinho");
    }
  };

  //-- Remover produtos do carrinho --//
  const removeProduct = (product) => {
    const newCart = states.cart.map((item) => {
      if (item.id === product.id) {
        setProductQuantity(productQuantity - 1)
        return { ...item, quantity: item.quantity - 1 }
      }
      return item
    }).filter((item) => {
      if (item.quantity === 0) {
        setModalQuantity(0)
        setInitialQuantity(0)
        setProductQuantity(0)
      }
      return item.quantity > 0
    })
    setters.setUpdate(states.update + 1)
    setters.setCart(newCart)
  }

  return (
    <div>
      <Container>
        <CardMediaItemImg src={props.product.photoUrl} alt={"imagem do alimento ou bebida"} />
        <CardInfoMeal>
          <RestaurantName gutterBottom variant="p" color="primary">{props.product.name}</RestaurantName>
          <br />
          <Description>{props.product.description}</Description>
          <br />
          <Price> R${props.product.price.toFixed(2)}</Price>
        </CardInfoMeal>

        <div>
          {productQuantity === 0
            ?
            <ButtonAdd onClick={() => openModal()}>
              adicionar
            </ButtonAdd>
            :
            <ButtonRemove onClick={() => removeProduct(props.product)}>
              remover
            </ButtonRemove>
          }
        </div>
        <div>
          {productQuantity !== 0 ? <Quantity onClick={() => openModal()}>{productQuantity}</Quantity> : ""}
        </div>

        <ShowModal
          open={open}
          handleClose={handleClose}
          product={props.product}
          productQuantity={productQuantity}
          setProductQuantity={setProductQuantity}
          addProduct={addProduct}
          onChangeQuantity={onChangeQuantity}
          initialQuantity={initialQuantity}
          setModalQuantity={setModalQuantity}
          modalQuantity={modalQuantity}
        />

      </Container>
    </div >
  );
};
