import React, { Component } from 'react';
import QRCode from "react-qr-code";
import Countdown from 'react-countdown';
import './summary.css';

export default class Summary extends Component {
    calcolateTimeDifferentTimezone(timestamp, timeZone) {
        return new Date(timestamp).toLocaleString("en-US", { timeZone: timeZone, timeZoneName: 'short', hour: '2-digit', minute: '2-digit', hour12: false });
    }
    generateQRCodeUrl(timestamp, name) {
        return window.location.protocol + "//" + window.location.host + "/mobile/" + timestamp + "/" + name;
    }
    render() {
        let timestamp = parseInt(this.props.match.params.timestamp);
        const rendererCountdown = ({ hours, minutes, seconds, completed }) => {
            if (completed) {
                return <span className="text-danger">00:00:00</span>;
            } else {
                hours = hours < 10 ? "0" + hours : hours;
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;
                let style = "text-white";
                if(hours === 0) {
                    if(minutes > 2 && minutes < 5) {
                        style = "text-warning";
                    } else if(minutes < 2) {
                        style = "text-danger";
                    }
                } 
                return <span className={style}>{hours}:{minutes}:{seconds}</span>;
            }
        };
        return (
            <div className="full-height-container background-container py-5">
                <div className="container">
                    <div className='row row-eq-height'>
                        <div className='col-12 col-md-6 col-lg-4 '>
                            <div className='card card-countdown'>
                                <div className='card-body text-center'>
                                    <h5 className='card-title'>{this.props.match.params.name}!</h5>
                                    <div className="cowntdown">
                                        <Countdown
                                            date={timestamp}
                                            daysInHours={true}
                                            renderer={rendererCountdown} />
                                    </div>
                                    <p className='card-text'>Minutes until the break ends</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-md-6 col-lg-4'>
                            <div className='card card-qrcode'>
                                <div className='card-body text-center'>
                                    <h5 className='card-title pb-3'>Scan Me!</h5>
                                    <div className='bg-white py-5'>
                                        <QRCode bgColor='#FFFFFF' fgColor='#212529' value={this.generateQRCodeUrl(timestamp, this.props.match.params.name)} />
                                    </div>
                                    <p className='card-text pt-3'>Scan this QR code with your smartphone to get a mobile timer page</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-md-6 col-lg-4'>
                            <div className='card card-custom'>
                                <div className='card-body'>
                                    <h5 className='card-title pb-3'>Class will resume at:</h5>
                                    <p className='card-text'>
                                        <strong>{this.calcolateTimeDifferentTimezone(timestamp, "Australia/Melbourne")} </strong><br /> Melbourne, Australia</p>
                                    <p className='card-text'>
                                        <strong>{this.calcolateTimeDifferentTimezone(timestamp, "Europe/London")} </strong><br /> London, United Kingdom</p>
                                    <p className='card-text'>
                                        <strong>{this.calcolateTimeDifferentTimezone(timestamp, "America/Chicago")} </strong><br /> Chicago, United States</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}