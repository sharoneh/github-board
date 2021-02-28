import { createStore } from 'redux'

const INITIAL_STATE = {
  lists: [
    { title: 'TO DO', tasks: ['task', 'task', 'task'], editorActive: false },
    {
      title: 'IN PROGRESS',
      tasks: ['task', 'task', 'task'],
      editorActive: false,
    },
    {
      title: 'IN REVIEW',
      tasks: ['task', 'task', 'task'],
      editorActive: false,
    },
    { title: 'DONE', tasks: ['task', 'task', 'task'], editorActive: false },
  ],
}

// action types
export const ADD_TASK = 'ADD_TASK'
export const ADD_LIST = 'ADD_LIST'

// actions
export const addTask = (listIndex, task) => {
  return {
    type: ADD_TASK,
    payload: { listIndex, task },
  }
}

export const addList = (title) => {
  return {
    type: ADD_LIST,
    payload: title,
  }
}

const BoardReducer = (state = INITIAL_STATE, action) => {
  let newLists = [...state.lists]
  const { payload } = action

  switch (action.type) {
    case ADD_TASK:
      newLists[payload.listIndex] = {
        ...state.lists[payload.listIndex],
        tasks: [...state.lists[payload.listIndex].tasks, payload.task],
      }

      return {
        ...state,
        lists: newLists,
      }
    case ADD_LIST:
      newLists.push({ title: payload, tasks: [] })

      return {
        ...state,
        lists: newLists,
      }
    default:
      return state
  }
}

const store = createStore(BoardReducer)

export default store
