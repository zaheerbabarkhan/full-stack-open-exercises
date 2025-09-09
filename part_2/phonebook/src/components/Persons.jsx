const Persons = ({ personToShow, onClick }) => {
    return (
        <div>
            {
                personToShow.map(person => <p key={person.name}>{person.name} {person.number} <button onClick={() => onClick(person.id)}>delete</button></p>)
            }
        </div>
    )
}

export default Persons