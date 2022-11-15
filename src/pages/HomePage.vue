<template>
  <div class="flex flex-center">
    <div class="flex-block">
      <div>
        <h2>toolbox</h2>
        <div>just some simple tools to be used with a browser...</div>
        <div>there is <strong>a</strong> tool currently but i figure i might make more so</div>
      </div>

      <div class="q-mt-xl">
        <q-card
          flat
          bordered
          class="card"
          v-for="tool in tools" v-bind:key="tool.name"
          @click="$router.push(tool.name)"
        >
          <q-card-section>
            <div class="title">{{ tool.name }}</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div class="description">{{ tool.description }}</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="q-mt-xl copyright">by tpwhky</div>
    </div>
  </div>
</template>

<script>
const TOOLS = [
  { name: 'sseditor', description: 'write stuff with superscripts and subscripts...' }
];

export default {
  name: "HomePage",

  setup() {
    return {
      tools: TOOLS
    }
  }
}
</script>

<style scoped>
.title {
  font-size: 2rem;
}
.description {
  font-size: .9rem;
  color: gray;
}
.copyright {
  color: lightgray;
  font-size: .8rem;
}
a {
  color: lightgray;
}
.card {
  cursor: pointer;
  transition: 0.3s;
}
.card:hover {
  background: whitesmoke;
}
</style>
