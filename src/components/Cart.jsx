// src/components/Cart.jsx
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, increaseQuantity, decreaseQuantity } from '../features/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, totalQuantity, totalPrice } = useSelector((state) => state.cart);

    // State to keep track of the next product number
    const [productCount, setProductCount] = useState(1);

    // Function to handle adding a new product with an incremented name
    const handleAddProduct = () => {
      const sampleProduct = {
        id: nanoid(),
        name: `Product ${productCount}`,
        price: 100,
      };
      
      dispatch(addItem(sampleProduct));
      
      // Increment the product count for the next product
      setProductCount(productCount + 1);
    };
  

  return (
    <div className='flex justify-center items-center flex-col bg-white'>
      <h2 className="text-2xl font-bold">Shopping Cart</h2>
      <button 
        onClick={handleAddProduct}
        className="bg-green-500 text-white px-4 py-2 rounded my-2"
      >
        Add Sample Product
      </button>
      
      <div className="my-4 flex justify-center flex-wrap">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between flex-col border-b py-2 ">
            <span className='bg-blue-300'>{item.name}</span>
            <div className='flex gap-x-2 mt-4 '>
              <button 
                onClick={() => dispatch(decreaseQuantity(item.id))}
                className="bg-red-500 text-white px-2 py-1 mx-1 rounded"
              >
                -
              </button>
              <span className='bg-emerald-300 p-2'>{item.quantity}</span>
              <button 
                onClick={() => dispatch(increaseQuantity(item.id))}
                className="bg-green-500 text-white px-2 py-1 mx-1 rounded"
              >
                +
              </button>
            </div>
            <span className='bg-yellow-300'>${item.totalPrice}</span>
            <button 
              onClick={() => dispatch(removeItem(item.id))}
              className="bg-red-500 text-white px-2 py-1 rounded ml-2"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-bold bg-teal-300">Total Quantity: {totalQuantity}</h3>
        <h3 className="text-lg font-bold bg-rose-300">Total Price: ${totalPrice}</h3>
      </div>
    </div>
  );
};

export default Cart;
