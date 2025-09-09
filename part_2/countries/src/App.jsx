import { useEffect } from "react"
import countriesServies from "./services/countries"
import { useState } from "react"
import Countries from "./components/Countries"
import Country from "./components/Country"
function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")

  const handleFilterChange = (event) => {
    setFilter(event.target.value)

  }
  useEffect(() => {
    countriesServies.getAll()
      .then(allCountries => {
        setCountries(allCountries)
      })
  }, [])

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  let displayContent = null
  if (filter) {
    if (filteredCountries.length > 10) {
      displayContent = "Too many matches, specify another filter."
    } else if (filteredCountries.length > 1) {
      displayContent = <Countries countries={filteredCountries} setFilter={setFilter} />
    } else if (filteredCountries.length === 1) {
      displayContent = <Country country={filteredCountries[0]} />
    }
  }
  return (
    <div>
      <p>find countries <input onChange={handleFilterChange} value={filter} /></p>

      {
        displayContent
      }
    </div>
  )
}

export default App
