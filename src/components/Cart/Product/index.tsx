import React from "react";
import { ProductInterface } from "../../../globalTypes";

const Products: React.FC<ProductInterface> = ({ productName, price, id, maxAmount }) => {

    return (
        <option disabled={maxAmount < 1} value={id}>{productName} - ({price}€)</option>
    )
}

export default Products;