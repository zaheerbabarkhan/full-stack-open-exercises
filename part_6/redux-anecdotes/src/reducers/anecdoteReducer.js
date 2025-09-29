import { createSlice } from "@reduxjs/toolkit"

import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    upvote(state, action) {
      const id = action.payload
      return state.map(anecdote => anecdote.id === id ? {
        ...anecdote,
        votes: anecdote.votes + 1
      } : anecdote)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const update = anecdote => {
  return async dispatch => {
    await anecdoteService.update(anecdote)
    dispatch(upvote(anecdote.id))
  }
}
export const { appendAnecdote, upvote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer