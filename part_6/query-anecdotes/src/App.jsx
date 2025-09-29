import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { create, getAll, update } from './requests/anedote.request'
import { useNotifactionDispatch } from './NotficationContext'

const App = () => {
  const queryClient = useQueryClient()
  const getAllResult = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAll,
  })
  const notificationDispatch = useNotifactionDispatch()
  const upvoteMutation = useMutation({
    mutationFn: update,
    onSuccess: (upvoted) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"])
      queryClient.setQueryData(["anecdotes"], anecdotes.map(anecdote => anecdote.id === upvoted.id ? upvoted : anecdote))

    }
  })
  const handleVote = (anecdote) => {
    const upVotedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    upvoteMutation.mutate(upVotedAnecdote)
    notificationDispatch({
      type: "SHOW",
      payload: `anecdote '${anecdote.content}' voted`
    })
    setTimeout(() => {
      notificationDispatch({
        type: "HIDE"
      })
    }, 3000);
  }



  if (getAllResult.isError) {
    return (
      <div>
        anecdote service not available due to error in server
      </div>
    )
  }
  let anecdotes = []
  if (getAllResult.isSuccess) {
    anecdotes = getAllResult.data
  }
  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
