import React, { Component } from 'react';
import OtpInput from 'react-otp-input';
import Styles from '../assets/otppage.js';
import OtpSubmit from '../components/otpsubmit';
import ToggleSwitch from '../components/toggleswitch.js';

export default class OtpCodePage extends Component {
    state = { otp: '' };
    handleChange = (otp) => this.setState({ otp });
    render() {
        return (
            <>
            <Styles>
                    <div>
                        <h1>Enter OTP</h1>
                    </div>
                    <OtpInput
                        inputStyle={{  
                            width: '3rem',  
                            height: '3rem',  
                            margin: '50% 1rem', 
                            justifyContent: 'flex-end',
                            fontSize: '2rem',  
                            borderRadius: 4,  
                            border: '2px solid rgba(0,0,0,0.3)',  
                        }} 
                        value={this.state.otp}      
                        onChange={this.handleChange}
                        numInputs={6}
                        separator={<span>•</span>}
                    ></OtpInput>
                    <OtpSubmit>

                    </OtpSubmit>
            </Styles>
            </>
        );
    }
}