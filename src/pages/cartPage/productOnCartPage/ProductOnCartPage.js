import React, { useContext } from "react";
import { GlobalContext } from "../../../global/GlobalContext";

export const ProductOnCartPage = (props) => {

    const { functions } = useContext(GlobalContext);

    return(
        <div>
            <div> <img src={props.item.photoUrl} alt={"imagem do alimento ou bebida"}/> </div>

            <div>
                {props.item.name}
                <br />
                {props.item.description}
                <br />
                R${props.item.price.toFixed(2)}
            </div>

            <div> {props.item.quantity} </div>

            <div>
                <button onClick={() => functions.removeProduct(props.item)}>
                    remover
                </button>
            </div>
        </div>
    )
}