<template>
    <div>
        <h2 class="title is-2">Samenvatting evaluatieresultaten</h2>
        <div class="content mb-3" v-html="$options.filters.markdown(summary)" />
        <h2 class="title is-2">Scope van de evaluatie</h2>
        <table class="table">
            <tr>
                <th>Website naam</th>
                <td v-text="website.siteName"></td>
            </tr>
            <tr>
                <th>Scope van de website</th>
                <td v-text="website.siteScope"></td>
            </tr>
            <tr>
                <th>WCAG versie</th>
                <td v-text="scope.wcagVersion || 'WCAG 2.1'"></td>
            </tr>
            <tr>
                <th>Conformiteitsdoel</th>
                <td>{{ scope.conformanceTarget | rdfToLabel }}</td>
            </tr>
            <tr>
                <th>Verdere evaluatievereisten</th>
                <td v-html="$options.filters.markdown(scope.additionalEvalRequirement)"></td>
            </tr>
            <tr>
                <th>Basisniveau van toegankelijkheid ondersteund</th>
                <td v-html="$options.filters.markdown(scope.accessibilitySupportBaseline)"></td>
            </tr>
            <tr>
                <th>Technologieën waarop gesteund wordt</th>
                <td>
                    <ul class="tags" >
                        <li class="tag" v-for="{title, id} in reliedUponTechnology" v-text="title" :key="id"></li>
                    </ul>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
  export default {
    name: 'Summary',
    props: {
      website: Object,
      summary: String,
      scope: Object,
      reliedUponTechnology: Array
    }
  };
</script>
