<template>
  <AppDrop @drop="moveTaskOrColumn">
    <AppDrag
      class="column bg-grey-light p-2 mr-4 text-left shadow rounded"
      :transferData="{
        type: 'column',
        fromColumnIndex: columnIndex
      }"
    >
      <div class="flex items-center mb-2 font-bold justify-between">
        <p>{{ column.name }}</p>
        <p @click="deleteColumn">delete</p>
      </div>
      <div class="list-reset">
        <ColumnTask
          v-for="(task, $taskIndex) of column.tasks"
          :key="$taskIndex"
          :task="task"
          :taskIndex="$taskIndex"
          :column="column"
          :columnIndex="columnIndex"
          :board="board"
        />

        <input
          type="text"
          class="block p-2 w-full bg-transparent"
          placeholder="+ Enter new task"
          @keyup.enter="createTask($event, column.tasks)"
        />
      </div>
    </AppDrag>
  </AppDrop>
</template>

<script>
import ColumnTask from "./ColumnTask";
import AppDrag from "./AppDrag";
import AppDrop from "./AppDrop";
import movingTasksAndColumnsMixin from "@/mixins/movingTasksAndColumnsMixin";

export default {
  components: {
    ColumnTask,
    AppDrag,
    AppDrop
  },
  mixins: [movingTasksAndColumnsMixin],
  methods: {
    pickupColumn(e, fromColumnIndex) {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.dropEffect = "move";

      e.dataTransfer.setData("from-column-index", fromColumnIndex);
      e.dataTransfer.setData("type", "column");
    },
    createTask(e, tasks) {
      this.$store.commit("trelloBoard/CREATE_TASK", {
        tasks,
        name: e.target.value
      });
      e.target.value = "";
    },
    deleteColumn() {
      this.$store.commit("trelloBoard/DELETE_COLUMN", {
        columnIndex: this.columnIndex
      });
    }
  }
};
</script>

<style  scoped>
.column {
  min-width: 350px;
}
</style>
