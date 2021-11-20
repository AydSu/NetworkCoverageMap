import React from "react";
import "./network_zone.css";
import { Box, Button, TextField, Select, InputLabel, MenuItem, FormControl } from '@material-ui/core';
import MapLayer from "./MapLayer";
import Legend from "./Legend";

export default class NetworkZone extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            all_gps: [],
            openSelect: false,
            cur_gps_coord: [54.718065, 55.995351],
            operator: 'mts',
            net_generation: 2
        }

        this.default_zoom = 12;
        this.map_src = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        this.layer_src = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]

    }


    handleSelectOperator = (event) => {
        this.setState({ operator: event.target.value })
    }

    handleSelectNetGeneration = (event) => {
        this.setState({ net_generation: event.target.value })
    }

    renderSelectMenu = () => {
        let result = [];
        this.state.all_gps.forEach(element => {
            result.push(<MenuItem value={element}>{element.iconCaption[0]}</MenuItem>)
        });
        return (
            result
        )
    }

    handleLat = (event) => {
        let lat = event.target.value;
        this.setState((state)=>{   
            return {cur_gps_coord: [...[lat,state.cur_gps_coord[1]]]} 
        })
    }

    handleLon = (event) => {
        let lon = event.target.value;
        this.setState((state)=>{  
            return {cur_gps_coord: [...[state.cur_gps_coord[0],lon]]} 
        })
    }


    render() {
        return (
            <div className="container"   >

                <p>Карта зоны покрытия сети </p>

                <div className='panel'>
                    <TextField id="standard-basic" label="Широта" variant="standard" onBlur={(event)=>{this.handleLat(event)}}/>
                    <TextField id="standard-basic" label="Долгота" variant="standard" onBlur={(event)=>{this.handleLon(event)}} />

                    <Box sx={{ width: 180 }}>
                        <FormControl fullWidth>
                            <InputLabel id="label1">Выберите оператора</InputLabel>
                            <Select
                                labelId="label1"
                                id="operator"
                                value={this.state.operator}
                                label="Выберите оператора"
                                onChange={this.handleSelectOperator}
                            >
                                <MenuItem value={'mts'}>MTS</MenuItem>
                                <MenuItem value={'megafon'}>Megafon</MenuItem>
                                <MenuItem value={'beeline'}>Beeline</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Box sx={{ width: 180 }}>
                        <FormControl fullWidth>
                            <InputLabel id="label2">Выберите сеть</InputLabel>
                            <Select
                                labelId="label2"
                                id="net_generation"
                                value={this.state.net_generation}
                                label="Выберите оператора"
                                onChange={this.handleSelectNetGeneration}
                            >
                                <MenuItem value={2}>2G</MenuItem>
                                <MenuItem value={3}>3G</MenuItem>
                                <MenuItem value={4}>4G</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <p>{this.log_text}</p>
                </div>


                <div className="covered_map">

                    <MapLayer layer='yandex' cur_gps_coord={this.state.cur_gps_coord} />
                    <MapLayer layer={this.state.operator} net_generation={this.state.net_generation} cur_gps_coord={this.state.cur_gps_coord} />
                    <MapLayer layer='point' cur_gps_coord={this.state.cur_gps_coord} />

                </div >

                <Legend operator={this.state.operator}></Legend>

            </div>
        )
    }


}
