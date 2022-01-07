import React, { useEffect, useState } from 'react'
import './UserDetails.css'
import axios from 'axios';


function UserDetails() {
    const [getUserData, setUserData] = useState('')
    const [dataPresent, setDataPresent] = useState(false)

    async function getData() {
        let response = await fetch('https://randomuser.me/api');
        let data = await response.json();
        setUserData(data.results)
        setDataPresent(true)
        return data;
    }

    useEffect(() => {
        getData()
    }, [])

    console.log(getUserData)


    function loadScript(src) {
        return new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = src;
          script.onload = () => {
            resolve(true);
          };
          script.onerror = () => {
            resolve(false);
          };
          document.body.appendChild(script);
        });
      }
    
      async function displayRazorpay() {
        const res = await loadScript(
          'https://checkout.razorpay.com/v1/checkout.js'
        );
    
        if (!res) {
          alert('Razorpay SDK failed to load. Are you online?');
          return;
        }
    
        const result = await axios.post('http://localhost:5000/payment/orders');
    
        if (!result) {
          alert('Server error. Are you online?');
          return;
        }
    
        const { amount, id: order_id, currency } = result.data;
    
        const options = {
          key: 'rzp_test_chMdzVi1BnMpHt', 
          amount: amount.toString(),
          currency: currency,
          order_id: order_id,
          handler: async function (response) {
            const data = {
              orderCreationId: order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            };
    
            const result = await axios.post('http://localhost:5000/payment/success', data);
    
            alert(result.data.msg);
          },
          prefill: {
            name: getUserData[0].name.first +" "+ getUserData[0].name.last,
            email: getUserData[0].email,
            contact: getUserData[0].phone,
          },
          notes: {
            address: 'Example Corporate Office',
          },
          theme: {
            color: '#61dafb',
          },
        };
    
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      }
    

    return (
        <div>
            {
                dataPresent && getUserData.map((e, index) => {
                    return (
                        <div key={index} class="insta-main">
                            <div class="insta-wrapper">
                                <div class="insta-banner">
                                    <canvas width="320"></canvas>
                                </div>
                                <div class="insta-details">
                                    <div class="insta-dp">
                                        <img src={e.picture.large} alt="dp" />
                                    </div>
                                    <div class="insta-name">
                                        <h2>{e.name.title + ". " + e.name.first + " " + e.name.last}<span>{e.location.city + ", " + e.location.state}</span></h2>
                                    </div>
                                    <div class="insta-followers-wrap">
                                        <div class="insta-follow">
                                            <h2>10,000<span>Loan Amount</span></h2>
                                        </div>
                                        <div class="insta-follow">
                                            <h2>7000<span>To be paid</span></h2>
                                        </div>
                                    </div>
                                    <div class="insta-button">
                                        <button  onClick={displayRazorpay}>
                                            Pay ₹7000
                                        </button>
                                    </div>
                                    <div class="insta-bio">
                                        <p>Email:-{e.email}</p>
                                        <p>Contact no.:-{e.phone}</p>
                                        <p>Address:-{e.location.street.number}{" "}{e.location.street.name},{e.location.city},{e.location.state},{e.location.country}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div >
    )
}

export default UserDetails
