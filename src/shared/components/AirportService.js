import axios from 'axios';
import {AirportModel} from "./AirportModel";

export class AirportService {

    static API_URL = `http://warsawjs-flights-api.herokuapp.com`;

    static getAirportSources() {
        return axios.get(`${this.API_URL}/airports`)
            .then(res => {
                return res.data.map(item => new AirportModel(item));
            });
    }

}