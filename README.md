# warsawjs-workshop-20-flight-scanner

Repository for React Basics Workshop which will take (took) place on 20.05.2018 in Warsaw.

## What we will build?

A simple app like LOT/Wizzair search for multiple airlines. App involves simple search criteria, loading results from online API, presenting the results and more.

## Main steps

Please find the proposed agenda below - what we will build step by step.

### App Core

- [ ] prepare the environment & create app
    * create repository on git and clone it
    * `npm i create-react-app -g` (sudo/admin)
    * `create-react-app .` (`.` == cwd dir)
    * `npm start`
    * open `http://localhost:3000`
    * `https://atom.io/packages/react` - IDE & support for JFX

- [ ] make a simple change and observe how the results change
    * after running the application, change some text or add additional tags and observe live reload

- [ ] a few words about development/production "builds"
    * `npm start`
    * `npm run build` & dist

### Pseudo-scenes / main states / navigation

- [ ] what is a React Component?
- [ ] creating and including a simple component ("Next Button")

    ```
    import React, {Component} from 'react';

    export class SearchButton extends Component {
        render() {
            return (
                <button onClick={console.log}>Next</button>
            )
        }
    }

    // in App.js
    import {SearchButton} from './shared/components/SearchButton'
    ```

- [ ] "props" - what it is?

    * make a text in our Button be "configurable"

    ```
    render() {
        const {text} = this.props; //destructing
        return (
            <button onClick={console.log}>{text}</button>
        )
    }
    ```

    * what happened to our app?

    ```
    <SearchButton text={'Go!'} />
    ```

    * should I really remember which props are where?
    `npm i prop-types --save`

    ```
    import PropTypes from 'prop-types';
    // after class declaration
    SearchButton.propTypes = {
        text: PropTypes.string
    };
    ```

    Try writing `<PrimaryButton` and press space (or any other way to see hints!)

    * ... but I want to mark it as mandatory!

    ```
    //..
        PropTypes.string.isRequired
    //..

    ```

    will throw us an error as expected!

- [ ] creating a target component with results

    ```
    import React, {Component} from 'react';
    import PropTypes from 'prop-types';

    export class FlightsView extends Component {
        render() {
            return (
                <div>
                    <ol>
                        <li>Flight #1</li>
                        <li>Flight #2</li>
                        <li>Flight #3</li>
                    </ol>
                    <button>Go back</button>
                </div>
            )
        }
    }

    FlightsView.propTypes = {

    };
    ```

    * try to display it directly in the App.js

- [ ] making them "work" together (naive way)

    * a few words about component architecture and responsibilities
    * influence on Unit Tests
    * Create SearchView:

    ```
    import React, {Component} from 'react';
    import PropTypes from 'prop-types';
    import {SearchButton} from "../shared/components/SearchButton";

    export class SearchView extends Component {
        render() {
            const {onClick} = this.props;
            return (
                <div>
                    <SearchButton text={`Search for the flights`} onClick={onClick}/>
                </div>
            )
        }
    }

    SearchView.propTypes = {
        onClick: PropTypes.func.isRequired
    };

    ```

    * and modify PrimaryButton to make use of passed onClick prop
    ```
    <button onClick={onClick}>{text}</button>
    ```

    Don't forget about new prop for destruct and propTypes!

    * wrap up relevant changes in App.js:
    ```
    searchPressed() {
            console.log('search pressed');
        }

        render() {
            return (
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h1 className="App-title">Welcome to React</h1>
                    </header>
                    <SearchView onClick={this.searchPressed}/>
                    <FlightsView/>
                </div>
            );
        }
     ```

- [ ] keeping values in "state" - what it is and how it differs from props? (change over time vs. const)
    * pull branch `step_1` with previous changes if necessary
    * add our first state
    ```
    state = {
        searchVisible: true
    };

    searchPressed() {
        this.setState({
            searchVisible: false
        })
    }
    ```
    * why it fails? what about `this` and where our `context` went? Stateful component!
    ```
    constructor(props){
            super(props);
            this.searchPressed = this.searchPressed.bind(this);
        }
    ```
    * being aware of not making `bind` within render
    * conditional rendering
    ```
    //inside render()
    {searchVisible && <SearchView onClick={this.searchPressed}/>}
    {!searchVisible && <FlightsView/>}
    ```
    * naming convenction (not strictly React) - onPress vs onPressed
    * adding a way back (exercise)
    * a few words about setState async
    ```
    onBackClick() {
        this.setState({
            searchVisible: true
        }, () => {
            console.log(this.state);
            });
        console.log(this.state);
    }
    ```


- [ ] a few words about router https://reacttraining.com/react-router/web/guides/quick-start

### Adding dependencies - material-ui / styling
* pull branch `step_2` from this repo if necessary
- [ ] installing the dependency & usage
    * https://material-ui.com/getting-started/installation/
    * `npm i @material-ui.core --save`
    * wrap app in Theme - index.js!
    * stateless component explanation (props, state, 'simple wrapper')
    ```
    import React from 'react';
    import ReactDOM from 'react-dom';
    import './index.css';
    import App from './App';
    import registerServiceWorker from './registerServiceWorker';
    import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

    const ThemedApp = () => (
        <MuiThemeProvider>
            <App/>
        </MuiThemeProvider>
    )

    ReactDOM.render(<ThemedApp />, document.getElementById('root'));
    registerServiceWorker();

    ```
- [ ] changing "Next Button" to use material-ui
    * code
        ```
        import React, {Component} from 'react';
        import PropTypes from 'prop-types';
        import RaisedButton from 'material-ui/RaisedButton';

        export class SearchButton extends Component {
            render() {
                const {text, onClick} = this.props; //destructing
                return (
                    <RaisedButton primary onClick={onClick} label={text}/>
                )
            }
        }


        SearchButton.propTypes = {
            text: PropTypes.string.isRequired,
            onClick: PropTypes.func.isRequired
        };
        ```
    * notice the way we needed to change innerHtml {text} to label to apply styles correctly!

- [ ] refactor task - change our second button!
    * DRY
    * keep UI consistent
    * code
    ```
    //FlightView > render() method
    <SearchButton text={`Go back`} onClick={onBackClick}/>
    ```

- [ ] other components which we will need (Datepicker, ActivityIndicator/Spinner) - check out the documentation!
    * https://v0.material-ui.com/#/components/date-picker
    * https://v0.material-ui.com/#/components/refresh-indicator

### Adding dependencies - axios / API Service
* pull branch `step_3` from this repo if necessary
- [ ] installing the dependency `npm i axios --save`
- [ ] making a "Service" to fetch Locations
    * AirportModel.js
    ```
    export class AirportModel {
        id;
        code;
        country;
        city;

        constructor(data){
            this.id = data.id;
            this.code = data.code;
            this.country = data.country;
            this.city = data.city;
        }
    }
    ```

    * AirportService.js:
    ```
    import axios from 'axios';
    import {AirportModel} from "../models/AirportModel";

    export class AirportService {

        static API_URL = `http://warsawjs-flights-api.herokuapp.com`;

        static getAirportSources() {
            return axios.get(`${this.API_URL}/airports`)
                .then(res => {
                    return res.data.map(item => new AirportModel(item));
                });
        }

    }
    ```

- [ ] component lifecycle https://reactjs.org/docs/react-component.html
    * make a sample use of our Service and assign results to state - App.js
    ```
    state = {
            searchVisible: true,
            airports: []
        };

        componentDidMount() {
            AirportService.getAirportSources().then(airports => {
                console.log(airports);
                this.setState({
                    airports    //shortcut
                })
            })
        }
    ```

### Basic inputs for searcher
- [ ] add inputs to select FROM and TO flight
    * https://material-ui.com/demos/selects/
    * code - SearchView.js
    ```

    import InputLabel from '@material-ui/core/InputLabel';
    import MenuItem from "material-ui/MenuItem";
    import Select from "@material-ui/core/Select";
    import {AirportModel} from "../shared/models/AirportModel";

    //render
    const {onSearchClick, airports} = this.props;

    //inside render
    <InputLabel htmlFor="from">FROM:</InputLabel>
    <Select
        value={''}
        onChange={this.handleChange}
        inputProps={{
            name: 'from',
            id: 'from',
        }}>
        {airports.map(airport => <MenuItem key={airport.id} value={airport}>{airport.city}</MenuItem>)}
     </Select>
    ```
    * remember to add PropTypes and pass airports to SearchView!
    ```
    {searchVisible && <SearchView onSearchClick={this.onSearchClick} airports={airports}/>}
    ```

- [ ] keeping values in "state" - what it is and how it differs from props? (change over time vs. const)

### Spinner/Loader state - a few words about UX/UI
* pull `step_4` branch to start from there
- [ ] refactoring time!
    * we will have two inputs with very similar behavior, thus we want the following:
    ```
    import React, {Component} from 'react';
    import PropTypes from 'prop-types';
    import {PrimaryButton} from "../shared/components/PrimaryButton";
    import {AirportModel} from "../shared/models/AirportModel";
    import {SelectAirport} from "../shared/components/SelectAirport";

    export class SearchView extends Component {

        render() {
            const {onSearchClick, airports} = this.props;
            return (
                <div>
                    <SelectAirport onChange={console.log} airports={airports}/>
                    <SelectAirport onChange={console.log} airports={airports} label={'TO'}/>
                    <br/>

                    <PrimaryButton text={`Search for the flights`} onClick={onSearchClick}/>
                </div>
            )
        }
    }

    SearchView.propTypes = {
        onSearchClick: PropTypes.func.isRequired,
        airports: PropTypes.arrayOf(PropTypes.instanceOf(AirportModel))
    };

    ```
    * how would our SelectAirport look like?
    ```
    import React, {Component} from 'react';
    import PropTypes from 'prop-types';
    import InputLabel from '@material-ui/core/InputLabel';
    import MenuItem from "material-ui/MenuItem";
    import Select from "@material-ui/core/Select";
    import {AirportModel} from "../models/AirportModel";

    export class SelectAirport extends Component {

        state = {
            selectedAirport: '' //cannot be null, as it would be un-controlled input
        };

        extractSelectedValue(event) {
            return event.target.value;
        }

        render() {
            const {onChange, airports, label} = this.props;
            const {selectedAirport} = this.state;
            return (
                <div>
                    <InputLabel htmlFor="from">{label}</InputLabel>
                    <Select
                        autoWidth
                        value={selectedAirport}

                        onChange={(event) => {
                            const airportIndex = this.extractSelectedValue(event);
                            this.setState({
                                selectedAirport: airportIndex
                            });
                            //we need to call 'onChange' with the airport! and the value is just an index
                            onChange(airports[airportIndex]);
                        }}
                        inputProps={{
                            name: 'airport-select',
                            id: 'airport-select',
                        }}
                    >
                        {airports.map((airport, index) => <MenuItem key={airport.id}
                                                           value={index}>{airport.toString()}</MenuItem>)}
                    </Select>

                    <br/>
                </div>
            )
        }
    }

    SelectAirport.propTypes = {
        onChange: PropTypes.func.isRequired,
        airports: PropTypes.arrayOf(PropTypes.instanceOf(AirportModel)),
        label: PropTypes.string
    };

    SelectAirport.defaultProps = {
        label: 'SELECT'
    };

    ```
    * extra task - something more was added to properly display everything - notice and add your own (hint: "string")
    * (optional) make it look even better! (exercise)
    * Follow `https://material-ui.com/demos/selects/` to add theme styles from material-ui
    ```
    //SelectAirport.js
    const styles = theme => ({
      formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
      },
    });
    ```
    Wrap our current rendered elements into:
    ```
    <FormControl className={classes.formControl}>
    ```

    Change the way we export our component: (default export vs export example)
    ```
    ControlledOpenSelect.propTypes = {
      classes: PropTypes.object.isRequired,
    };

    export default withStyles(styles)(ControlledOpenSelect);
    ```
    Remember that we had {namedImport} in the SearchView! (change to import SelectAirport from ...)

- [ ] passing over the selected value to container - store in the state!
    ```
    //SearchView.js
    state = {
        fromAirport: null,
        toAirport: null
    };

    _updateAirport = (key, airport) => {
        this.setState({
            [key]: airport  //[key] is a dynamic property name based on value of 'key'
        }, () => {console.log(this.state)});
    };//no need to .bind to be aware of THIS
    ```

    * end of branch `step_5`

- [ ] make the inputs "aware" of pending/loading state (airports) (exercise)
    ```
    //SearchView.js
    {!pending &&
                    (<div>
                        <SelectAirport onChange={(airport) => this._updateAirport(`fromAirport`, airport)}
                                       airports={airports}
                                       label={'FROM'}/>
                        < SelectAirport onChange={(airport) => this._updateAirport(`toAirport`, airport)}
                                        airports={airports} label={'TO'}/>
                    </div>)}
    ```

    ```
    SearchView.propTypes = {
        onSearchClick: PropTypes.func.isRequired,
        airports: PropTypes.arrayOf(PropTypes.instanceOf(AirportModel)),
        pending: PropTypes.bool
    };

    SearchView.defaultProps = {
        pending: true
    };

    ```
    * task - add progress indicator and finish/start actually take place

- [ ] basic "validation" and button look (exercise)
    ```
    //code that may help you
    <PrimaryButton text={`Search for the flights`}
        onClick={onSearchClick}
        disabled={fieldsSelected}
    ```
- [ ] calling the hero API - FlightService & FlightModel
    * warning - as probably we are getting out of time, we cannot keep our code super clean!
    * (optional todo if we have enough time - in/outPath models)
    * another (better) way to handle DTO objects
    ```
    //FlightModel
    export class FlightModel {
        id;
        price;
        inboundPath;
        outboundPath;

        static fromBackendData(data){
            return Object.assign(new FlightModel(), data)
        }

        toString(){
            return `(${this.id}) $ ${this.price} > ${this.inboundPath} ${this.outboundPath}`;
        }
    }
    ```

    * usage of DTO (hint: normalization!)
    ```
    //Service
    static fetchFlights(fromAirport, toAirport) {
            return axios.get(`${this.API_URL}/flights/01-01-2018/31-01-2018/${fromAirport.id}/${toAirport.id}`).then(res => {
                return res.data.map(item => FlightModel.fromBackendData(item));
            })
        }
    ```

    ```
    //SearchView
    //with arrow notation, we are not loosing context, therefore bind is not necessary!
        onSearchPress = () => {
            this.setState({
                flightsPending: true
            }, () => {
                AirportService.fetchFlights(this.state.fromAirport, this.state.toAirport).then(flights => {
                    this.setState({
                        flightsPending: false
                    }, () => this.props.onSearchClick(flights))
                });
            });
        };
    ```

    ```
    //inside render, change the following:
    {(pending || flightsPending) && <CircularProgress />}
    <br />
    {!flightsPending && <PrimaryButton text={`Search for the flights`}
        onClick={this.onSearchPress}
        disabled={fieldsSelected}
    />}
    ```
- [ ] pending state & ActivityIndicator (exercise)

    * end of branch `step_6`

### Results Model & Presentation

- [ ] talk about how messy (really?) we are starting to be (two containers, passing data over)
- [ ] better solution? redux & state managment
- [ ] without redux? SearchContainer > SearchView & FlightContainer > FlightView
- [ ] now, lets pass the data to FlightsView
    * add propTypes
    ```
    FlightsView.propTypes = {
        onBackClick: PropTypes.func.isRequired,
        flights: PropTypes.arrayOf(PropTypes.instanceOf(FlightModel))
    };

    FlightsView.defaultProps = {
        flights: []
    };
    ```
    * add passing the data to FlightsView.js
    ```
    {!searchVisible && <FlightsView onBackClick={this.onBackClick} flights={flights} />}
    ```
- [ ] displaying the Flight Model
    * quick way to see our hard work!
    ```
    //FlightsView.js
    <ol>
        {flights.map(flight => <div>{flight.toString()}</div>)}
    </ol>
    ```
    * nice-looking way
    ```
    export class FlightsView extends Component {
        render() {
            const {onBackClick, flights} = this.props;
            return (
                <div>
                    <List component="nav">
                        {flights.map(flight => {
                            return (
                                    <ListItem key={flight.id} >
                                        <FlightView flight={flight}/>
                                    </ListItem>
                            )
                        })}
                    </List>
                    <PrimaryButton text={`Go back`} onClick={onBackClick}/>
                </div>
            )
        }
    }
    ```

    * add model to keep flights path (in/out for a single "trip")
    ```
    export  class FlightBoundModel {
        airline;
        airportFrom;
        airportTo;
        length;
        startHour;

        static fromBackendData(data){
            return Object.assign(new FlightBoundModel(), data);
        }
    }
    ```
    * flight model upgrade
    ```
    import {FlightBoundModel} from "./FlightBoundModel";

    export class FlightModel {
        id;
        price;
        inboundPaths = [];
        outboundPaths = [];

        static fromBackendData(data){
            const flight = Object.assign(new FlightModel(), data)
            flight.inboundPaths = data.inboundPaths.map(path => FlightBoundModel.fromBackendData(path));
            flight.outboundPaths = data.outboundPaths.map(path => FlightBoundModel.fromBackendData(path));
            return flight;
        }

        toString(){
            return `(${this.id}) $ ${this.price} > ${this.inboundPath} ${this.outboundPath}`;
        }
    }
    ```
    * FlightView
    ```
    import React, {Component} from 'react';
    import PropTypes from 'prop-types';
    import { withStyles } from '@material-ui/core/styles';
    import Stepper from '@material-ui/core/Stepper';
    import Step from '@material-ui/core/Step';
    import StepLabel from '@material-ui/core/StepLabel';
    import StepContent from '@material-ui/core/StepContent';
    import Button from '@material-ui/core/Button';
    import Paper from '@material-ui/core/Paper';
    import Typography from '@material-ui/core/Typography';
    import {FlightModel} from "../shared/models/FlightModel";

    const styles = theme => ({
        root: {
            width: '90%',
        },
        button: {
            marginTop: theme.spacing.unit,
            marginRight: theme.spacing.unit,
        },
        actionsContainer: {
            marginBottom: theme.spacing.unit * 2,
        },
        resetContainer: {
            padding: theme.spacing.unit * 3,
        },
    });

    class FlightView extends Component {
        render() {
            const { classes, flight } = this.props;
            const stepsIn = flight.inboundPath;

            return (
                <div className={classes.root}>
                    Flight ID: {flight.id} <br />
                    <Stepper activeStep={999} orientation="vertical">
                        {stepsIn.map((flyPath, index) => {
                            return (
                                <Step key={index}>
                                    <StepLabel>From: {flyPath.airportFrom} > To: {flyPath.airportTo} (Duration: {flyPath.length})</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                </div>
            );
        }
    }

    FlightView.propTypes = {
        classes: PropTypes.object,
        flight: PropTypes.instanceOf(FlightModel).isRequired
    };

    export default withStyles(styles)(FlightView);

    ```
    * make your own? (optional - if we have enought time)
    * end of branch `step_7`

### Basic filtering - client side

- [ ] adding max (price) input & filtering
    ```
    <h5>Max Price filter [${currentMaxPrice}]</h5>
    <Slider step={100} value={2000} min={0} max={9999} onChange={(event, value) => this.setState({currentMaxPrice: value})}/>

    ```
    * we have two options: pass `shouldShow` to FlightView or filter the results
    * pros and cons - opinion gathering among participants
    ```
    {fitsMaxPrice && <Error color={'red'}/>}
    <ActionFlightTakeoff color={'blue'}/>
    ```

* end of branch `step_8`

### Whats next (in this project) ?
- [ ] change main view to be more 'wow' before presentation (if you would like to)
- [ ] make date not being dummy again! (add Date Inputs)
- [ ] add icons to buttons
- [ ] add animation & expandable Flight Details (instead of being visible already)
- [ ] add service to fetch airlines data and show logo&name in Flight Results
- [ ] read more about making your own styles

### Next Steps - how to get better?
- [ ] make your own app from scratch - it always helps!
- [ ] use Router
- [ ] make a simple app with login/logout and storing session
- [ ] learn flow or Typescript for types support - it is a must!
- [ ] learn writing Test (jest, enzyme)
- [ ] when you are familiar with the above, write the same app with TDD - you will learn very quick why it is important to keep Components as small as possible and put certain logic in Containers and places where they should be

### Key Notes
* setState is asynchronous
* keep the Components logic & responsibility in one place (Containers > API; View > Screen as a whole; subcomponents to handle internal logic (like Forms); small components to serve just as 'display'
* state vs. props - stateful components vs static display (but both can be 'dynamic')
* Component Lifecycle - ...didMount and similar
* always create models & services
* use PropTypes!
* keep DRY & Constant Refactor
* and be SOLID :) https://en.wikipedia.org/wiki/SOLID
* learn TS/@flow - a must!
* learn Testing - a must!
* learn ES6...100 - plain JS stays, frameworks change
* proper GitFlow is hard to understand.. but fully worth it (you will understand when you go live with product)