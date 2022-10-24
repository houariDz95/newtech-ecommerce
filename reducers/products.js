export default (state = {cartMenu: false, products: []}, action) => {
  switch(action.type){
    case 'ADD_TO_BASKET':
      const foundCart = state.products.find(item => item.id == action.payload.id)
      if(!foundCart){
        return {...state, products: [...state.products, action.payload]}
      }
    case 'REMOVE_ITEM':
      return {...state, products: state.products.filter((item) => item.id !== action.payload)}
    case 'INCREMENT': 
      return {...state, products: state.products.map((cartItem) => {
        if(cartItem.id === action.payload){
          return{
            ...cartItem,
            qty: cartItem.qty + 1,
          }
        }else {
          return{
            ...cartItem 
          }
        }
      })}  
    
     case 'DECREMENT': 
     return {...state, products: state.products.map((cartItem) => {
      if(cartItem.id === action.payload && cartItem.qty > 1){
        return{
          ...cartItem,
          qty: cartItem.qty - 1,
        }
      }else {
        return{
          ...cartItem
        }
      }
    })}
    case "SHOW_MENU":
      return {...state, cartMenu: true};
    case "CLOSE_MENU":
      return {...state, cartMenu: false};
    case "SUCCESS": 
      return {...state, products: []}  
    default:
      return state;
  }
}