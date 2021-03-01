import move from 'array-move'
import update from 'immutability-helper'

const INITIAL_STATE = {
  lists: [
    { title: 'TO DO', tasks: ['task1', 'task2', 'task3'] },
    {
      title: 'IN PROGRESS',
      tasks: ['task4', 'task5', 'task6'],
    },
    {
      title: 'IN REVIEW',
      tasks: ['task7', 'task8', 'task9'],
    },
    { title: 'DONE', tasks: ['task10', 'task11', 'task12'] },
  ],
}

// action types
export const SET_LISTS = 'SET_LISTS'

// actions
export const addTask = (listIndex, task) => {
  return (dispatch, getState) => {
    let lists = [...getState().board.lists]

    lists[listIndex].tasks = update(lists[listIndex].tasks, { $push: [task] })

    dispatch({ type: SET_LISTS, payload: lists })
  }
}

export const addList = (title) => {
  return (dispatch, getState) => {
    let lists = [...getState().board.lists]

    lists = update(lists, { $push: [{ title, tasks: [] }] })

    dispatch({ type: SET_LISTS, payload: lists })
  }
}

export const moveTaskInList = (listIndex, from, to) => {
  return (dispatch, getState) => {
    let lists = [...getState().board.lists]

    lists[listIndex].tasks = move(lists[listIndex].tasks, from, to)

    dispatch({ type: SET_LISTS, payload: lists })
  }
}

export const moveTaskToList = (taskIndex, from, to) => {
  return (dispatch, getState) => {
    let lists = [...getState().board.lists]

    const task = lists[from].tasks[taskIndex]

    lists[from].tasks = update(lists[from].tasks, { $splice: [[taskIndex, 1]] })
    lists[to].tasks = update(lists[to].tasks, { $push: [task] })

    dispatch({ type: SET_LISTS, payload: lists })
  }
}

const BoardReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_LISTS:
      return { ...state, lists: payload }
    default:
      return state
  }
}

export default BoardReducer
