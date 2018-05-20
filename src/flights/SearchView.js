import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {SearchButton} from "../shared/components/SearchButton";
import {AirportModel} from "../shared/components/AirportModel";
import {SelectAirport} from "../shared/components/SelectAirport";

export class SearchView extends Component {
    state = {
        fromAirport: null,
        toAirport: null
    }
    _updateAirport = (key, airport) => {
        this.setState({
            [key]: airport  //[key] is a dynamic property name based on value of 'key'
        }, () => {console.log(this.state)});
    };
    
    render() {
        const {onClick, airports} = this.props;
        return (
            <div>
                <SelectAirport onChange={console.log} airports={airports}/>
                <SelectAirport onChange={console.log} airports={airports} label={'TO'}/>
                <br/>

                <SearchButton text={`Search for the flights`} onClick={onClick}/>
            </div>
        )
    }
}

SearchView.propTypes = {
    onClick: PropTypes.func.isRequired,
    airports: PropTypes.arrayOf(PropTypes.instanceOf(AirportModel))
};
