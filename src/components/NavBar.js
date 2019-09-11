import React, {useContext} from 'react'

import { ProductsContext } from '../contexts/ProductsContext';

const NavBar = () => {
  const [ products ] = useContext(ProductsContext);
  return (
    <div className="navbar">
      <h1>Trufla Frontend test</h1>
      <p>All we have <b>{products.length}</b> Products.</p>
    </div>
  );
}
 
export default NavBar;