import { useSelector } from "react-redux"
import styled from "styled-components";

const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
  `;

const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 280px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;
    &:hover ${Info}{
      opacity: 1;
    }
  `;
const Image = styled.img`
    width: 5%;
    z-index: 2;
  `;

const Success = () => {

  const cart = useSelector(state => state.cart)
  
  return (
    <>
      <div>Compra Realizada</div>
      <div>
        {cart.products.map(product =>
          
          <Container key={product._id}>
            <div>Productos Comprados</div>
            <Image src={product.img}/>
            <div>{product.title}</div>
            <div>{product.desc}</div>
            <div>${product.price}</div>
            <div>{product.quantity}</div>
          </Container>

        )}
      </div>
    </>
  )
}

export default Success