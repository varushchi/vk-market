import React from "react";
import data from './write.json'


function Product(props) {

  const [quantity, setQuantity] = React.useState(props.quantity)
  const [removed, setRemoved] = React.useState(false) 
  
  function remove(id)
  {
    const index = data.products.findIndex(val => val.id === id)
    if (index === -1) return
    data.products.splice(index, 1)
    setRemoved(true)
  }

  function plusButton (id)
  {
    setQuantity(prev => {
        if (prev === 10) return prev
        else {
          const index = data.products.findIndex(val => val.id === id)
          if (index === -1) return
          ++data.products[index].quantity
          return prev + 1
        }
    })
  }

  function minusButton (id)
  {
    setQuantity(prev => {
        if (prev === 1) return prev
        else {
          const index = data.products.findIndex(val => val.id === id)
          if (index === -1) return
          --data.products[index].quantity
          return prev - 1
        }
    })
  }

  return (
    !removed &&
    <>
        <img src = {props.thumbnail} style={{
          width: "300px",
          height: "300px"
        }}/>
        <p>{props.title}</p>
        <ul>
            <li>
                <div>
                    <button onClick={()=> plusButton(props.id)}>+</button>
                    {quantity}
                    <button onClick={()=>minusButton(props.id)}>-</button>
                </div>
            </li>
            <li style={{
                textDecoration: "line-through",
                textDecorationColor : "rgba(0,0,0,0.6)"
            }}>
                {props.price * quantity} руб
            </li>
            <li>{props.discountPercentage}%</li>
            <li>{parseFloat((props.price * quantity * (100 - props.discountPercentage) / 100).toFixed(2))} руб</li>
            <li><button onClick={() => remove(props.id)}>trash</button></li>
        </ul>
    </>
    
  );
}

const productItem = data.products.map(item => {
    return(
        <Product
            key = {item.id}
            {...item}
        />
        
    )
})

function App() {
  const totalPrice = data.products.reduce((acumulator, val) => (
    parseFloat((acumulator + val.price * val.quantity * (100 - val.discountPercentage) / 100).toFixed(2))
  ),0)

  

  return (
    <>
      <div className="left">
        {productItem}
      </div>
      <div className="right">
        <p>Итого: {totalPrice}</p>
      </div>
    </>
  );
}

export default App;
