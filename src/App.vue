<template>
    <div id="app" class="">
        <header class="hero is-medium is-primary is-bold">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title" v-text="evaluation.title"/>
                    <p class="subtitle">
                        <strong>Auteur</strong> {{evaluator.name}}<br>
                        <strong>Datum</strong> {{ evaluationDate }}<br>
                        <strong>Opdrachtgever</strong> {{evaluation.commissioner}}<br>
                    </p>
                </div>
            </div>
        </header>
        <main>
            <section class="section page-break-before">
                <Summary class="container page-break-avoid" :website="evaluationScope.website"
                         :summary="evaluation.summary"
                         :scope="evaluationScope"
                         :reliedUponTechnology="evaluation.reliedUponTechnology"/>
            </section>
            <section class="section page-break-before">
                <Pages class="container" :structured-sample="structuredSample" :random-sample="randomSample"/>
            </section>
            <section class="section page-break-before">
                <div class="container">
                    <h2 class="title is-2">Overzicht van de resultaten</h2>
                    <div class="notification">
                        <p>Wederkerende inbreuken werden enkel globaal geregistreerd.<br>
                            Een goede score op de individuele pagina's betekent enkel dat er geen <em>extra</em>
                            inbreuken werden vastgesteld.</p>
                    </div>

                    <Breakdown class="main-breakdown" :id="null" title="alle pagina's" :principles="principles"
                               :audit-result="auditResult"/>
                    <div class="columns is-multiline">
                        <div v-for="{id, title} in pages" :key="id" class="column is-half page-break-avoid">
                            <Breakdown style="height:100%" :id="id" :title="title" :principles="principles"
                                       :audit-result="auditResult"/>
                        </div>
                    </div>

                </div>
            </section>
            <section class="section">
                <Detail :audit-result="auditResult" :principles="principles" :pages="pages"/>
            </section>
        </main>
        <footer class="footer"/>
    </div>
</template>

<script>
  import report from '@/assets/visit-gent-evaluation-report.json';
  import wcagEn from '@/assets/wcag2-en.json';
  import Summary from './components/Summary';
  import Breakdown from './components/Breakdown';
  import Pages from './components/Pages';
  import Detail from './components/Detail';

  export default {
    name: 'App',
    data () {
      return {
        report: report['@graph'],
        wcagEn: wcagEn
      };
    },
    computed: {
      evaluation () {
        return this.report.find(v => v.type === 'Evaluation');
      },
      evaluationDate () {
        const date = new Date(this.evaluation.date);
        return `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`;
      },
      evaluationScope () {
        return this.evaluation.evaluationScope;
      },
      evaluator () {
        return this.report.find(v => v.type === 'Person');
      },
      auditResult () {
        return this.evaluation.auditResult;
      },
      structuredSample () {
        return this.evaluation.structuredSample.webpage;
      },
      randomSample () {
        return this.evaluation.randomSample.webpage;
      },
      pages () {
        return [
          ...this.structuredSample,
          ...this.randomSample
        ];
      },
      principles () {
        return this.wcagEn.principles;
      }
    },
    mounted() {
      document.title = this.evaluation.title
    },
    methods: {},
    components: {Summary, Breakdown, Pages, Detail}
  };
</script>

<style lang="scss">
    // Import Bulma's core
    @import "~bulma/sass/utilities/_all";

    // Set your colors
    $primary: #007db3;
    $primary-invert: findColorInvert($primary);
    $cyan: #4099FF;
    $cyan-invert: findColorInvert($cyan);
    $danger: rgb(218, 14, 49);
    $success: rgb(42, 128, 36);
    $inapplicable: rgba(35, 51, 58, 0.75);
    $inapplicable-invert: $white;

    // Setup $colors to use as bulma classes (e.g. 'is-twitter')
    $colors: (
            "white": ($white, $black),
            "black": ($black, $white),
            "light": ($light, $light-invert),
            "dark": ($dark, $dark-invert),
            "primary": ($primary, $primary-invert),
            "info": ($info, $info-invert),
            "success": ($success, $success-invert),
            "warning": ($warning, $warning-invert),
            "danger": ($danger, $danger-invert),
            "cyan": ($cyan, $cyan-invert),
            "inapplicable": ($inapplicable, $inapplicable-invert)
    );

    // Links
    $link: $primary;
    $link-invert: $primary-invert;
    $link-focus-border: $primary;


    // Import Bulma and Buefy styles
    @import "~bulma";
    @import "~buefy/src/scss/buefy";

    .pre-wrap {
        white-space: pre-wrap;
    }

    .container {
        .mt-1 {
            margin-top: 1rem;
        }

        .mb-3 {
            margin-bottom: 3rem;
        }
    }

    .main-breakdown {
        border: .25rem solid $primary;
        padding: 1rem;
    }

    .box.thin {
        margin: 0;
        border-radius: 0;
        border-width: 0;
        border-left-width: .25rem;
        border-style: solid;
    }

    .box-success {
        border-color: $success;
    }

    .box-danger {
        border-color: $danger;
    }

    .box-inapplicable {
        border-color: $inapplicable;
    }

    .page-break-before {
        page-break-before: always;
    }

    .page-break-avoid {
        page-break-inside: avoid;
    }

    .sticky {
        position: sticky;
        top: 0;
        z-index: 1;
    }

    h5.sticky {
        padding: 1rem;
        margin-top: -1rem;
        margin-left: -1rem;
        margin-right: -1rem;
        border-bottom: 1px solid lightgray;
    }

    @media print {
        .sticky {
            position: relative;
        }

        html {
            font-size: 10pt;

            .hero .hero-body {
                * {
                    color: $black !important;
                }
            }

            .hero-body > .title, .hero-body > .subtitle, .tag, .box, .notification {
                color: $black !important;
            }
        }
    }
</style>
