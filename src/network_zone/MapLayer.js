import LatLon2XY from "./LatLon2XY";

import React from "react";
import "./network_zone.css"
import point_img from './point_img.png'

export default class MapLayer extends React.Component {

    constructor(props) {
        super(props);

        this.default_zoom = 12;

        this.layer_src = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        this.getLayer('yandex', 0, 2685, 1304, this.default_zoom);//default
    }

    componentDidUpdate() {
        if (this.props != this.prev_props) {
            this.prev_props = this.props;
            this.getMapCoordinates(this.props.cur_gps_coord[0], this.props.cur_gps_coord[1], this.default_zoom);
            this.getLayer(this.props.layer, this.props.net_generation, this.centerTile_X, this.centerTile_Y, this.default_zoom);
            this.forceUpdate()
        }
    }

    setUrl = (layer, net_generation, centerTile_X, centerTile_Y, zoom, col_delta, row_delta) => {
        switch (layer) {
            case 'yandex':
                return `https://core-renderer-tiles.maps.yandex.net/tiles?l=map&v=21.10.26-0-b211128130500&x=${centerTile_X + col_delta}&y=${centerTile_Y + row_delta}&z=${zoom}&scale=1&lang=ru_RU`
                break;
            case 'point':
                break;
            case 'mts':
                switch (net_generation) {
                    default:
                        return `https://tiles.qsupport.mts.ru/g2_New/${zoom}/${centerTile_X + col_delta}/${centerTile_Y + row_delta}`;
                    case 3:
                        return `https://tiles.qsupport.mts.ru/g3_New/${zoom}/${centerTile_X + col_delta}/${centerTile_Y + row_delta}`;
                    case 4:
                        return `https://tiles.qsupport.mts.ru/LTE_New/${zoom}/${centerTile_X + col_delta}/${centerTile_Y + row_delta}`;
                }
                break;
            case 'megafon':
                switch (net_generation) {
                    default:
                        return `https://coverage-map.megafon.ru/${zoom}/${centerTile_X + col_delta}/${centerTile_Y + row_delta}.png?layers=2g`
                    case 3:
                        return `https://coverage-map.megafon.ru/${zoom}/${centerTile_X + col_delta}/${centerTile_Y + row_delta}.png?layers=3g`
                    case 4:
                        return `https://coverage-map.megafon.ru/${zoom}/${centerTile_X + col_delta}/${centerTile_Y + row_delta}.png?layers=lte`
                }
                break;
            default:
                alert('error when map loading');
                break;
            case 'beeline':
                switch (net_generation) {
                    default:
                        return `https://static.beeline.ru/upload/tiles/2G/current/${zoom}/${centerTile_X + col_delta}/${centerTile_Y + row_delta - 4}.png`;
                    case 3:
                        return `https://static.beeline.ru/upload/tiles/3G/current/${zoom}/${centerTile_X + col_delta}/${centerTile_Y + row_delta - 4}.png`;
                    case 4:
                        return `https://static.beeline.ru/upload/tiles/4G/current/${zoom}/${centerTile_X + col_delta}/${centerTile_Y + row_delta - 4}.png`;
                }
        }

    }

    getMapCoordinates = (gps_lat, gps_lon, zoom) => {
        let result = LatLon2XY(gps_lat, gps_lon, zoom);
        this.centerTile_X = result[0];
        this.centerTile_Y = result[1];
        this.picX = result[2];
        this.picY = result[3];
    }

    getLayer = (layer, net_generation, centerTile_X, centerTile_Y, zoom) => {
        let row_delta = -1;
        for (let row = 0; row < 3; row++) {
            let col_delta = -1;
            for (let col = 0; col < 3; col++) {
                this.layer_src[row][col] = this.setUrl(layer, net_generation, centerTile_X, centerTile_Y, zoom, col_delta, row_delta);
                col_delta++;
            }
            row_delta++;
        }
    }


    render() {
        return (

            this.props.layer != 'point' ?
                <div className="layer">
                    <div className="tile_col">
                        <div className="tile_row">
                            <img className='img' src={this.layer_src[0][0]} />
                            <img className='img' src={this.layer_src[0][1]} />
                            <img className='img' src={this.layer_src[0][2]} />
                        </div>
                        <div className="tile_row">
                            <img className='img' src={this.layer_src[1][0]} />
                            <img className='img' src={this.layer_src[1][1]} />
                            <img className='img' src={this.layer_src[1][2]} />
                        </div>
                        <div className="tile_row">
                            <img className='img' src={this.layer_src[2][0]} />
                            <img className='img' src={this.layer_src[2][1]} />
                            <img className='img' src={this.layer_src[2][2]} />
                        </div>
                    </div>
                </div>
                :
                <div className="point">
                    <img style={{ position: 'absolute', left: 256 + this.picX, top: 256 + this.picY }} src={point_img} />
                </div>

        )
    }


}
