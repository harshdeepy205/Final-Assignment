import React, { useState} from 'react'
import './EnterMobile.css'
import { Modal } from 'react-bootstrap';
import { useNavigate}from 'react-router-dom'


function EnterMobile() {

    const [show, setShow] = useState(false);
    const [otp, setOtp] = useState(new Array(4).fill(""));
    const [otpGenerate,setOtpGenetate]=useState()
    const [mobileNumber,setMobileNumber]=useState()
    const navigate = useNavigate();
    const handleClose = () => setShow(false);
    const handleShow = () => {
        console.log("clicked")
        var val = Math.floor(1000 + Math.random() * 9000);
        setOtpGenetate(val)
    };
     
    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;
  
        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
  
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };
  
    const otpValidation=()=>{
        if(otp && otpGenerate){
            console.log("condition true")
            otp.sort();
            otpGenerate.sort();
            for (let i = 0; i < otpGenerate.length; i++)
                if (otp[i] != otpGenerate[i])
                    return false;
            console.log("equal") 
            navigate('/user-info');
        }
    }


    const sentOtp=()=>{
        console.log("called")
        var val = Math.floor(1000 + Math.random() * 9000);
        var intArr = Array.from(String(val));
        
        setOtpGenetate(intArr)
        console.log(mobileNumber,otpGenerate)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
        "number": mobileNumber,
        "message": val
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:5000/sendmessage", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

        setShow(true)

}





    return (
        <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='card otp_container'>
            <div className=" row">
                <div className="col text-center">
                    <h2>Loan OTP Verify</h2>
                    <p>Enter the OTP sent to you to verify your identity</p>

                    {otp.map((data, index) => {
                        return (
                            <input
                                className="otp-field"
                                type="text"
                                name="otp"
                                maxLength="1"
                                key={index}
                                value={data}
                                onChange={e => handleChange(e.target, index)}
                                onFocus={e => e.target.select()}
                            />
                        );
                    })}

                    <p>OTP Entered - {otp.join("")}</p>
                    <div className='btn_div'>
                        <button
                            className="btn btn-secondary mr-2"
                            onClick={e => setOtp([...otp.map(v => "")])}
                        >
                            Clear
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={()=>otpValidation()}
                        >
                            Verify OTP
                        </button>
                    </div>
                </div>
            </div>
            </div>
        </Modal.Body>
      </Modal>




        <div className='card_container'>
            <div className="card">
                <div className="card-body">
                    <h2>Enter You Mobile number</h2>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">+91</span>
                    </div>
                    <input type="number" className="form-control" placeholder="Username" value={mobileNumber} onChange={(e)=>setMobileNumber(e.target.value)} aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>
                    <button className='btn btn-secondary' onClick={()=>sentOtp()}>Submit</button>
                </div>
            </div>
        </div>

        </>
    )
}

export default EnterMobile
