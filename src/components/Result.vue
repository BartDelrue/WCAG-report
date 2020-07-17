<template>
    <div>
        <h5 class="sticky has-background-white title is-5" lang="en"
            v-text="successcriterium.num + '. ' + successcriterium.handle"/>
        <div lang="en" class="notification">
            <p v-text="successcriterium.text"/>
            <div v-if="successcriterium.details">
                <div v-for="(detail, index) in successcriterium.details"
                     :key="'detail_'+successcriterium.id+index" class="content">
                    <ul v-if="detail.type === 'ulist'">
                        <li v-for="item in detail.items" :key="item.handle">
                            <strong v-if="item.handle" v-text="item.handle"/>&nbsp;
                            <span v-text="item.text"/>
                        </li>
                    </ul>
                    <ol v-if="detail.type === 'olist'">
                        <li v-for="item in detail.items" :key="item.handle">
                            <strong v-if="item.handle" v-text="item.handle"/>&nbsp;
                            <span v-text="item.text"/>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
        <div class="notification content" :class="'is-' + getClassForResult(assertion)">
            <h6 class="title is-6">Resultaat voor de volledige selectie: <strong>{{ assertion.result.outcome |
                rdfToLabel }}</strong></h6>
            <div v-if="assertion.result.description" v-html="$options.filters.markdown(assertion.result.description)"/>
        </div>
        <div v-if="assertion.hasPart.length" >
            <div class="box thin" v-for="part in assertion.hasPart"
                 :key="part.testcase + part.subject[0]"
                 :class="'box-' + getClassForResult(part)">
                <h6 class="title is-6">{{ getPageForSubject(part.subject[0]).title }}: <strong>{{ part.result.outcome |
                    rdfToLabel }}</strong></h6>
                <div v-if="part.result.description" class="content"
                     v-html="$options.filters.markdown(part.result.description)"/>
            </div>
        </div>
    </div>
</template>

<script>

  export default {
    name: 'Result',
    props: {
      assertion: Object,
      successcriterium: Object,
      pages: Array
    },
    methods: {
      getClassForResult ({result}) {
        if (result.outcome === 'earl:failed') {
          return 'danger';
        }
        if (result.outcome === 'earl:passed') {
          return 'success';
        }
        if (result.outcome === 'earl:cantTell') {
          return 'unknown';
        }
        if (result.outcome === 'earl:inapplicable') {
          return 'inapplicable';
        }
        if (result.outcome === 'earl:untested') {
          return 'untested';
        }
      },
      getPageForSubject (subect) {
        return this.pages.find(p => p.id === subect);
      }
    }
  };
</script>

<style scoped>

</style>
