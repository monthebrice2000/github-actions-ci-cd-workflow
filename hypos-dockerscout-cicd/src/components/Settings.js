import React, { Component } from 'react';
import octocatImage from '../images/octocat.png';
import './settings.css';

export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTime: new Date(),
            defaultBreaks: [
                {
                    name: 'Coffee Break',
                    duration: 15,
                    icon: 'coffee-cup',
                    enabled: true,
                    selected: false
                },
                {
                    name: 'Lunch Break',
                    duration: 60,
                    icon: 'burger',
                    enabled: true,
                    selected: false
                },
                {
                    name: 'Lab Time',
                    duration: 45,
                    icon: 'microscope',
                    enabled: true,
                    selected: false
                }
            ]
        };
        this.onClickBreak = this.onClickBreak.bind(this);
        this.onClickStartBreak = this.onClickStartBreak.bind(this);
    }
    addMinutesToCurrentDate(minutes) {
        let newTime = new Date();
        newTime.setMinutes(newTime.getMinutes() + minutes);
        return newTime;
    }
    onClickBreak(index) {
        let newBreaks = this.state.defaultBreaks;
        newBreaks.forEach((item, i) => {
            if (i === index) {
                item.selected = true;
            } else {
                item.selected = false;
            }
        });
        this.setState({
            defaultBreaks: newBreaks
        });
    }
    onClickStartBreak() {
        let newTime = this.addMinutesToCurrentDate(this.state.defaultBreaks[this.state.defaultBreaks.findIndex(item => item.selected)].duration);
        let endingTimestamp = newTime.getTime();
        let breakName = this.state.defaultBreaks[this.state.defaultBreaks.findIndex(item => item.selected)].name;
        this.props.history.push('/summary/' + endingTimestamp + '/' + breakName);
    }
    render() {
        let breaks = this.state.defaultBreaks.map((item, index) => {
            let newTime = this.addMinutesToCurrentDate(item.duration);
            let endTime = newTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
            return (
                <div className={"col-12 col-md-6 col-lg-4"} key={index}>
                    <div className={"card card-break mb-3 " + (item.selected ? "selected" : "")} onClick={() => this.onClickBreak(index)}>
                        <div className="row g-0">
                            <div className="col-md-4 break-icon">
                                <img src={require(`../images/icons/${item.icon}.png`).default} alt={item.name} />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">{item.duration} Minutes</p>
                                    <p className="card-text">
                                        <small className="text-muted">It will end at {endTime}</small>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
        let currentTimeString = this.state.currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
        return (
            <div className="full-height-container">
                <div className="bg-white text-center octocat-container">
                    <img src={octocatImage} className="img-fluid" id="octocat-logo" alt="Octocat Logo" />
                </div>
                <div className='container py-5'>
                    <div className='row'>
                        <div className='col-12 text-white text-center pb-5'>
                            <h1>It's {currentTimeString}. Time for a break?</h1>
                        </div>
                    </div>
                    <div className='row text-center pb-5'>
                        {breaks}
                    </div>
                    <div className='row text-center pb-5'>
                        <div className='col-12 text-center'>
                            <button className='btn btn-light btn-lg' onClick={() => this.onClickStartBreak()}>Start Break</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}