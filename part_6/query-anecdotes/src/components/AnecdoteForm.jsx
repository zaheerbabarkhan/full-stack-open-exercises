import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { create } from '../requests/anedote.request'
import { useNotifactionDispatch } from '../NotficationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotifactionDispatch()
  const createMutation = useMutation({
    mutationFn: create,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"])
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote))
    },
    onError: () => {
      notificationDispatch({
        type: "SHOW",
        payload: `too short anecdote to add, must have length 5 or more`
      })
      setTimeout(() => {
        notificationDispatch({
          type: "HIDE"
        })
      }, 3000);
    }
  })
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    createMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
