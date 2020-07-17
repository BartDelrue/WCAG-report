<template>
    <div class="container">
        <h2 class="title is-2">Detail van de audit</h2>
        <div v-for="principle in principles" :key="principle.id">
            <h3 class="title is-3" lang="en" v-text="principle.num + '. ' + principle.handle"/>
            <div class="notification" v-text="principle.text"></div>
            <div class="mb-3" v-for="guideline in principle.guidelines" :key="guideline.id">

                <h4 class="title is-4" lang="en" v-text="guideline.num + '. ' + guideline.handle"/>
                <div class="notification" lang="en" v-text="guideline.text"></div>

                <Result v-for="successcriterium in guideline.successcriteria.filter(s => s.level !== 'AAA')"
                        class="box"
                        :key="successcriterium.id"
                        :successcriterium="successcriterium"
                        :pages="pages"
                        :assertion="getAssertionForCriterium(successcriterium.id)"
                ></Result>
            </div>
        </div>
    </div>
</template>

<script>
  import Result from './Result';

  export default {
    name: 'Detail',
    components: {Result},
    props: {
      auditResult: Array,
      pages: Array,
      principles: Array
    },
    methods: {
      getAssertionForCriterium (criterium) {
        return this.auditResult.find(r => r.test === criterium);
      }
    }
  };
</script>

<style scoped>

</style>
