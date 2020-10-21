<template>
    <div class="box">
        <table class="table is-fullwidth">
            <caption class="title is-3">
                Resultaten voor {{title}}
            </caption>
            <thead>
            <tr>
                <th>Principe</th>
                <th>Niveau A</th>
                <th>Niveau AA</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="{id: principle, num, handle} in principles" :key="principle">
              <th><a :href="'#' + handle.replaceAll(' ', '-')">{{num}}. {{handle}}</a></th>
                <td>
                    <span class="tag is-light"
                          :class="getAlertClass(getFlatResultForLevelAndPrinciple(principle, 'A', id))">
                        {{getFlatResultForLevelAndPrinciple(principle, 'A', id).passed}} /
                        {{getFlatResultForLevelAndPrinciple(principle, 'A', id).total}}
                    </span>
                </td>
                <td>
              <span class="tag"
                    :class="getAlertClass(getFlatResultForLevelAndPrinciple(principle, 'AA', id))">
                    {{getFlatResultForLevelAndPrinciple(principle, 'AA', id).passed}} /
                    {{getFlatResultForLevelAndPrinciple(principle, 'AA', id).total}}
              </span>
                </td>
            </tr>
            <tr>
                <th>Totaal</th>
                <td>
                    <span class="tag" :class="getAlertClass(getFlatResultForLevel('A', id))">
                        {{getFlatResultForLevel('A', id).passed}} /  {{getFlatResultForLevel('A', id).total}}
                    </span>
                </td>
                <td>
                    <span class="tag" :class="getAlertClass(getFlatResultForLevel('AA', id))">
                        {{getFlatResultForLevel('AA', id).passed}} /  {{getFlatResultForLevel('AA', id).total}}
                    </span>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
  export default {
    name: 'Breakdown',
    props: {
      id: String,
      title: String,
      principles: Array,
      auditResult: Array
    },
    methods: {
      getAlertClass (result) {
        if (result.passed === result.total) {
          return 'is-success';
        }
        if (result.passed >= result.total * .5) {
          return 'is-warning';
        }
        return 'is-danger';
      },
      getResultForCriterium (criterium, page) {
        const {hasPart, result} = this.auditResult.find(r => r.test === criterium.id);
        return page && hasPart ? (hasPart.find(p => p.subject[0] === page)?.result || {}) : result;
      },
      getResultForPrinciple (id, page) {
        const successcriteria = this.principles.find(p => p.id === id)
          .guidelines
          .map(g => g.successcriteria)
          .flat();
        return successcriteria.reduce((acc, criterium) => {
          const {outcome} = this.getResultForCriterium(criterium, page);
          if (!acc[criterium.level]) {
            acc[criterium.level] = {};
          }
          if (!acc[criterium.level][outcome]) {
            acc[criterium.level][outcome] = 0;
          }
          ++acc[criterium.level][outcome];
          return acc;
        }, {});
      },
      getFlatResultForLevelAndPrinciple (principle, level, page) {
        const result = this.getResultForPrinciple(principle, page)[level] || {};
        const total = Object.values(result).reduce((acc, current) => {
          current += acc;
          return current;
        }, 0);
        const passed = total - (result['earl:failed'] || 0);
        return {passed, total};
      },
      getFlatResultForLevel (level, page) {
        return this.principles.reduce((acc, current) => {
          const result = this.getFlatResultForLevelAndPrinciple(current.id, level, page);
          acc.passed += result.passed;
          acc.total += result.total;
          return acc;
        }, {passed: 0, total: 0});
      }
    }
  };
</script>

<style scoped>
    caption {
        text-align: left;
        margin: .5rem 0;
    }

</style>
