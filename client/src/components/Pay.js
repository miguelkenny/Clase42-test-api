import React, { useState, useEffect } from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const KEY = 'pk_test_fpHdRQMICLh9otgLgbzqLevo00Qlqve46w';

const Pay = () => {

  const [stripeToken, setStripeToken] = useState(null)

  const onToken = (token) => {
    setStripeToken(token);
  }

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/checkout/payment",
          {
            tokenId: stripeToken.id,
            amount: 2000,
          }
        )

        console.log(res.data);
        
      } catch (error) {
        console.log(error);
      }
    }

    stripeToken && makeRequest()

  }, [stripeToken])

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
    >
      {stripeToken ? (<span>Procesando. Por favor espere unos segundos...</span>) : (
        <StripeCheckout
          name="stripe-checkout"
          image="https://avatars.githubusercontent.com/u/1486366?v=4"
          billingAddress
          shippingAddress
          description=" El total es $20"
          amount={2000}
          token={onToken}
          stripeKey={KEY}
        >
          <button
            style={{
              border: "none",
              width: 120,
              borderRadius: 5,
              padding: "20px",
              backgroundColor: "black",
              color: "white",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            Pay
          </button>
        </StripeCheckout>
      )}
    </div>
  )
}

export default Pay