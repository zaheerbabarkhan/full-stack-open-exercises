import { useSelector, useDispatch } from 'react-redux'
import { update } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notifcationReducer'

const AnecdotesList = () => {

  const anecdotes = useSelector(state => {
    if (state.filter) {
      return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
    }
    return state.anecdotes
  })
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(update(anecdote))
    dispatch(setNotification(`You voted '${anecdote.content}'`, 3))
  }
  return (
    <div>
      {[...anecdotes].sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdotesList