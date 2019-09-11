import React, { createContext, useState } from "react";

export const ProductsContext = createContext();

const ProductsContextProvider = props => {
  const products = useState([
    {
      id: 1,
      department_name:"phones",
      name: "Iphone X",
      price: "$23.23",
      promotion: {
        code: 1111,
        active: true,
        discount: "50%"
      }
    },
    {
      id: 2,
      department_name:"phones",
      name: "Iphone 8 plus",
      price: "$18.23",
      promotion: {
        code: 2222,
        active: false,
        discount: "50%"
      }
    },
    {
      id: 3,
      department_name:"laptops",
      name: "LENOVO ideapad 520",
      price: "$20",
      promotion: {
        code: 3333,
        active: true,
        discount: "50%"
      }
    },
    {
      id: 4,
      department_name:"laptops",
      name: "DELL",
      price: "$18.23",
      promotion: {
        code: 4444,
        active: false,
        discount: "50%"
      }
    },{
      id: 5,
      department_name:"phones",
      name: "Iphone 11",
      price: "$999",
      promotion: {
        code: 1234,
        active: false,
        discount: "50%"
      }
    },
  ]);
  return (
    <ProductsContext.Provider value={products}>
      {props.children}
    </ProductsContext.Provider>
  );
};
export default ProductsContextProvider;
