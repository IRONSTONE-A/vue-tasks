// global state managemet için store oluşturdum

import { createStore } from "vuex";

export default createStore({
  state: {
    // görevler için bir başlangıç durumu array 
    todos: [],
  },
  mutations: {
    // durumu değiştirmek için senkron methodlar
    //ekleme
    addTodo(state, todo) {
      state.todos.push(todo);
    },
    //silme
    deleteTodo(state, index) {
      state.todos.splice(index, 1);
    },
   // tamamlama durumu değişikliği için toggle
    toggleTodoStatus(state, index) {
      state.todos[index].completed = !state.todos[index].completed;
    },
  },
  actions: {
    // async işlemler için 
    // ekleme mutasyonunu tetikliyorum
    addTodo({ commit }, todo) {
      commit("addTodo", todo);
    },
    // silme mutasyonunu tetikliyorum
    deleteTodo({ commit }, index) {
      commit("deleteTodo", index);
    },
  },
  // verileri almak için
  getters: {
    // tamamı
    allTodos: (state) => state.todos,
    // tamamlananlar
    completedTodos: (state) => state.todos.filter((todo) => todo.completed),
    // tamamlanmayanlar
    pendingTodos: (state) => state.todos.filter((todo) => !todo.completed),
  },
});
