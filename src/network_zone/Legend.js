
import React from "react";
import "./network_zone.css"
import meg2g from './img/meg2g.png'
import megNo2g from './img/megNo2g.png'
import meg3g from './img/meg3g.png'
import megNo3g from './img/megNo3g.png'
import meg4g from './img/meg4g.png'
import megNo4g from './img/megNo4g.png'
import mtsNet from './img/mtsNet.png'
import mtsNoNet from './img/mtsNoNet.png'
import beeNet from './img/beeNet.png'
import beeNoNet from './img/beeNoNet.png'

export default class Legend extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidUpdate() { }

    getLegend() {
        switch (this.props.operator) {
            case 'megafon':
                return (
                    <div className="legend">
                        <img className='legend-img' src={meg2g} />
                        <p className='legend-text'> - 2G  </p>
                        <img className='legend-img' src={megNo2g} />
                        <p className='legend-text'> - нет 2G  </p>

                        <img className='legend-img' src={meg3g} />
                        <p className='legend-text'> - 3G  </p>
                        <img className='legend-img' src={megNo3g} />
                        <p className='legend-text'> - нет 3G  </p>

                        <img className='legend-img' src={meg4g} />
                        <p className='legend-text'> - 4G  </p>
                        <img className='legend-img' src={megNo4g} />
                        <p className='legend-text'> - нет 4G  </p>
                    </div>
                )
            case 'mts':
                return (
                    <div className="legend">
                        <img className='legend-img' src={mtsNet} />
                        <p className='legend-text'> - связь доступна  </p>
                        <img className='legend-img' src={mtsNoNet} />
                        <p className='legend-text'> - связи нет </p>
                    </div>
                )
            case 'beeline':
                return (
                    <div className="legend">
                        <img className='legend-img' src={beeNet} />
                        <p className='legend-text'> - связь доступна  </p>
                        <img className='legend-img' src={beeNoNet} />
                        <p className='legend-text'> - связи нет </p>
                    </div>
                )
            default:
                <div></div>

        }
    }

    render() {
        return (
            <div>
                { this.getLegend() }
            </div>

        )
    }
}