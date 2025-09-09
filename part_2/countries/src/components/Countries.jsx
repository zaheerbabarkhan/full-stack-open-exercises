export default ({ countries, setFilter }) => {
    return (
        <div>
            {
                countries.map(country => {
                    return <p key={country.name.common}>{country.name.common} <button onClick={() => setFilter(country.name.common)}>show</button></p>
                })
            }
        </div>
    )
}