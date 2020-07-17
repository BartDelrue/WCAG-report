<template>
    <div>
        <h2 class="title is-2">
            Overzicht van de sample
        </h2>
        <h3 class="title is-3">Geordende sample</h3>
        <ul class="mb-3">
            <li v-for="{title, source, id} in structuredSample" :key="id">
                <em>{{title}}</em><br>
                <a :href="source">{{source}}</a>
            </li>
        </ul>
        <h3 class="title is-3">Willekeurige sample</h3>
        <ul>
            <li v-for="{title, source, id} in randomSample" :key="id">
                <em>{{title}}</em><br>
                <a class="has-text-wcag" :href="source">{{source}}</a>
            </li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: 'Pages',
    props: {
      structuredSample: Array,
      randomSample: Array
    }
  };
</script>

<style scoped>

</style>
