<!-- template i vuetify bileşenleri ile oluşturdum. ezmem veya eklemem gereken işlemleri tailwind ile yaptım -->
<template>
  <section class="grid min-h-[calc(100dvh-5rem)] place-items-center w-full">
    <div class="px-4 w-[80rem] max-[1300px]:w-full">
      <div class="flex max-[1300px]:flex-col h-fit gap-2 w-full">
        <div class="flex h-fit w-full gap-2">
          <v-container>
            <!-- başlık -->
            <h1
              class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl dark:text-white"
            >
              Todo List
            </h1>
            <!-- açıklama -->

            <p class="mb-6 text-lg font-normal text-gray-300 lg:text-xl">
              You can add, delete and prioritize todo's.
            </p>
            <v-row>
              <v-col cols="12" md="3">
                <v-text-field
                  :rules="rules"
                  hide-details="auto"
                  label="Title"
                  v-model="newTodo.title"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <!-- Text area açıklama için -->
                <v-textarea
                  v-model="newTodo.description"
                  label="Description"
                  row-height="10"
                  rows="1"
                  variant="filled"
                  auto-grow
                  shaped
                ></v-textarea>
              </v-col>
              <v-col cols="12" md="3">
                <!-- öncelik seçmek için -->
                <v-select
                  v-model="newTodo.priority"
                  :items="items"
                  label="Priority"
                  class="h-full"
                ></v-select>
              </v-col>
              <v-col cols="12" md="3">
                <v-btn @click="handleAddTodo" class="mt-1 h-full w-full"
                  >Add Todo</v-btn
                >
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <div class="flex justify-between items-center mb-4">
                  <h2 class="text-2xl">
                    <v-icon>mdi-format-list-checks</v-icon>Todos
                  </h2>
                  <div class="w-[20rem]">
                    <v-select
                      v-model="filterOption"
                      :items="filterOptions"
                      label="Filter"
                      outlined
                      hide-details="auto"
                    ></v-select>
                  </div>
                </div>
                <v-table>
                  <thead>
                    <tr>
                      <th class="text-left">Title</th>
                      <th class="text-left">Description</th>
                      <th class="text-left">Priority</th>
                      <th class="text-left">
                        <v-icon>mdi-check-circle</v-icon>
                      </th>
                    </tr>
                  </thead>
                  <template v-if="filteredTodos.length <= 0">
                    <tr>
                      <td colspan="4" class="text-center p-4 text-xl">
                        No todos
                      </td>
                    </tr>
                  </template>
                  <tbody v-else>
                    <tr v-for="(item, i) in filteredTodos" :key="item.name">
                      <td>{{ item.title }}</td>
                      <td>{{ item.description }}</td>
                      <td>
                        <div class="flex items-center gap-2 my-1">
                          <div>
                            <v-select
                              :items="items"
                              v-model="item.priority"
                              outlined
                              hide-details="true"
                            ></v-select>
                          </div>
                          <div>
                            <v-chip
                              :color="
                                item.priority === 'low'
                                  ? 'green'
                                  : item.priority === 'medium'
                                  ? 'yellow'
                                  : 'red'
                              "
                              outlined
                              >{{ item.priority }}</v-chip
                            >
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="flex gap-1">
                          <!-- tamamlanma durumu stili -->
                          <v-btn icon @click="toggleTodoStatus(i)">
                            <v-icon
                              :class="
                                item?.completed
                                  ? 'text-green-500'
                                  : 'text-yellow-500'
                              "
                              >{{
                                item?.completed
                                  ? "mdi-check-circle"
                                  : "mdi-circle-outline"
                              }}</v-icon
                            >
                          </v-btn>
                          <!-- silme iconu -->
                          <v-btn icon @click="handleDeleteTodo(i)">
                            <v-icon>mdi-delete</v-icon>
                          </v-btn>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import işlemi
// vuex deki fonksiyonları buradaki methodlarla eşleyeceğiz
import { mapMutations } from "vuex";

export default {
  // veriler
  data() {
    return {
      // yeni task bilgileri için obje
      newTodo: {
        title: "",
        description: "",
        priority: "low",
        completed: false,
      },
      // öncelik için array
      items: ["low", "medium", "high"],
      filterOption: "all", // Default olarak tüm görevleri göster
      filterOptions: ["all", "completed", "pending"],
    };
  },
  // hesaplanmış işlemleri tanımlarız
  computed: {
    // tüm todoları almak için
    todos() {
      return this.$store.getters.allTodos;
    },
    // tamamlanma durumlarına göre
    completedTodos() {
      return this.$store.getters.completedTodos;
    },
    pendingTodos() {
      return this.$store.getters.pendingTodos;
    },
    filteredTodos() {
      if (this.filterOption === "completed") {
        return this.completedTodos;
      } else if (this.filterOption === "pending") {
        return this.pendingTodos;
      } else {
        return this.todos;
      }
    },
  },
  // methodları tanımlarız
  methods: {
    // import ettiğimiz mapMutations dan fonksiyonları alıp buradaki methodlarla eşleriz
    ...mapMutations(["addTodo", "deleteTodo"]),
    // yeni eklenecek todo işlemleri
    handleAddTodo() {
      // title ve desc için boş bırakılma durum kontrolü
      if (
        this.newTodo.title.trim() !== "" &&
        this.newTodo.description.trim() !== ""
      ) {
        // vuex e yeni todo ekleyip , yeni bir eklemeye hazırlanmak için reset işlemi
        this.addTodo({ ...this.newTodo });
        this.newTodo = {
          title: "",
          description: "",
          priority: "low",
          completed: false,
        };
      }
    },
    // todonun yapılıp yapılmama durumunu değiştirmek için
    toggleTodoStatus(index) {
      this.$store.commit("toggleTodoStatus", index);
    },
    // todoyu silmek için
    handleDeleteTodo(index) {
      this.deleteTodo(index);
    },
  },
};
</script>
