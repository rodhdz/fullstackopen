import { useState } from 'react'
import { useEffect } from 'react'
import countriesService from './services/countries.js'

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      find countries <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

const Weather = ({ capital }) => {

  const [capitalWeather, setCapitalWeather] = useState(
    {
      temperature: '',
      image: null,
      wind: ''
    }
  )

  useEffect(() => {
    countriesService
      .weather(capital)
      .then(response => setCapitalWeather(
        {
          temperature: response.current.temp_c,
          image: 'https:' + response.current.condition.icon,
          wind: response.current.wind_kph
        }
      ))
  }, [])

  return (
    <>
      <div>
        <h3>
          Weather in {capital}
        </h3>
      </div>
      <div>
        Temperature {capitalWeather.temperature} Celsius
      </div>
      <img src={capitalWeather.image} />
      <div>
        Wind {capitalWeather.wind} m/s
      </div>
    </>
  )
}

const Countries = ({ filteredCountries, setFilter }) => {

  const Country = ({ country }) => {

    const handleShowCountry = () => {
      setFilter(country.name.common)
    }

    return (
      <div>
        {country.name.common}  <button onClick={handleShowCountry}>Show</button>
      </div>
    )
  }

  const MainCountry = ({ country }) => {
    const languages = country.languages
    return (
      <div>
        <div><h2>{country.name.common}</h2></div>
        <div>Capital {country.capital}</div>
        <div>Area {country.area}</div>
        <div><h3>Languages</h3></div>
        <ul>
          {Object.keys(languages).map(key => (
            <li key={key}>{languages[key]}</li>
          ))}
        </ul>
        <img src={country.flags.png} crossOrigin="anonymous" />
        <Weather capital={country.capital} />
      </div>
    )
  }

  if (filteredCountries === null) {
    return null
  } else if (filteredCountries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  } else if ((filteredCountries.length < 10) && (filteredCountries.length > 1)) {
    return (
      <div>
        {filteredCountries.map(country => (
          <Country key={country.name.common} country={country} />
        ))}
      </div>
    )
  } else {
    const [country] = filteredCountries;
    console.log("One Country", country)
    return (
      <div>
        {filteredCountries.map(country => (
          <MainCountry key={country.name.common} country={country} />
        ))}
      </div >
    )
  }
}



function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

  useEffect(() => {
    countriesService
      .getAll()
      .then((response) => setCountries(response))
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <>
      <div>
        <Filter filter={filter} handleFilterChange={handleFilterChange} />
      </div>
      <div>
        <Countries filteredCountries={filteredCountries} setFilter={setFilter} />
      </div>
    </>
  )
}

export default App
