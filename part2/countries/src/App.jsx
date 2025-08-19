import { useState } from 'react'
import { useEffect } from 'react'
import countriesService from './services/countries.js'
import axios from 'axios'

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      find countries <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

const Countries = ({ filteredCountries }) => {

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
        {/*}        <h2>{country.name.common}</h2>
        <div>Capital {country.capital}</div>
        <div>Area {country.area}</div>

        <h3>Languages</h3> */}
      </div >

    )
  }
}

const Country = ({ country }) => {
  return (
    <div>
      <div>{country.name.common}</div>
    </div>
  )
}

const MainCountry = ({ country }) => {
  const languages = country.languages
  console.log("languages", languages)
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
    </div>
  )
}

function App() {
  const [filter, setNewFilter] = useState('')
  const [countries, setNewCountries] = useState([])
  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => setNewCountries(response.data))
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <>
      <div>
        <Filter filter={filter} handleFilterChange={handleFilterChange} />
      </div>
      <div>
        <Countries filteredCountries={filteredCountries} />
      </div>

      {/*}      <div>
        {filteredCountries.map(country => (
          console.log("country", country.name.com),
          <Country key={country.name.common} country={country} />
        ))}
      </div>*/}
    </>
  )
}

export default App
