import React, { Component } from 'react';
import API_KEY from './.env';
class CloudContainer extends Component {
    constructor() {
        super();
        this.state = {
            weatherData: {
                city: "",
                country: "",
                weather: "",
                temp: 0
            },
            searchedDone: false,
            savedCities: [],
            hasSavedCities: false,
            errorMessage: ""
        };
        this.getCloudsData = this.getCloudsData.bind(this);
        this.updateSavedCities = this.updateSavedCities.bind(this);
    }
getCloudsData = async (city) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`)
        const parsedResponse = await response.json()
        this.setState({
            clouds: parsedResponse.weatherObj
        })
    }catch(err){
        return err
    }
    }
    componentDidMount() {
        this.getCloudsData()
    }

render(){
    const {
        searchDone,
        weatherData
    } = this.state;
    return(
        <div className="Clouds">
            {searchDone && (
            weatherData={weatherData}
            )}
        </div>

    )
}
}
export default CloudContainer;