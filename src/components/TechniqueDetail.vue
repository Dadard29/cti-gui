<template>
    <div v-if="isLoading === false && technique === null">
        <span class="text-muted">No technique selected</span>
    </div>
    <div v-else-if="isLoading" class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
    </div>
    <div v-else class="container-fluid">
        <div class="card text-center">
            <div class="card-header">
                <h4>{{technique.name}}</h4>
                <ul class="nav nav-pills card-header-pills">
                    <li class="nav-item" @click="toTabDescription">
                        <span class="nav-link active" :id="tabDescription">Description</span>
                    </li>
                    <li class="nav-item" @click="toTabLabels">
                        <span class="nav-link" :id="tabLabels">Labels</span>
                    </li>
                </ul>
            </div>
            <div class="card-body">
                <div v-if="tab === tabDescription">
                    <span v-html="descriptionHtml"></span>
                </div>
                <div v-else-if="tab === tabLabels">
                    <div class="label">
                        <small>created at</small>
                        <div>{{techniqueCreationDate}}</div>
                    </div>

                    <div class="label">
                        <small>modified at</small>
                        <div>{{techniqueModifiedDate}}</div>
                    </div>

                    <div class="label">
                        <small>Kill chain phases</small>
                        <div>
                            <span v-for="a in technique.kill_chain_phases" :key="a" class="badge badge-primary">
                                {{a}}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Remarkable} from "remarkable";

    export default {
        name: "TechniqueDetail",
        props: {
            isLoading: Boolean,
            technique: Object
        },
        computed: {
            descriptionHtml() {
                let rd = new Remarkable();
                return rd.render(this.technique.description)
            },
            techniqueCreationDate() {
                return new Date(this.technique.created).toDateString()
            },
            techniqueModifiedDate() {
                return new Date(this.technique.modified).toDateString()
            }
        },
        data() {
            return {
                tab: "technique-tab-description",

                tabDescription: "technique-tab-description",
                tabLabels: "technique-tab-labels",
                tabRefs: "technique-tab-refs"

            }
        },
        methods: {
            setTabActive() {
                document.getElementById(this.tab).classList.add("active")
            },

            unsetTabActive() {
                document.getElementById(this.tab).classList.remove("active")
            },

            toTabDescription() {
                this.unsetTabActive();
                this.tab = this.tabDescription;
                this.setTabActive();
            },
            toTabLabels() {
                this.unsetTabActive();
                this.tab = this.tabLabels;
                this.setTabActive();
            },
            toTabRefs() {
                this.unsetTabActive();
                this.tab = this.tabRefs;
                this.setTabActive();
            },
        }
    }
</script>

<style scoped>
    .tool-detail-refs {
        text-align: left;
    }

    .nav-item {
        cursor: pointer;
    }

    .badge {
        margin: 3px
    }

    .label {
        margin-bottom: 0;
    }
</style>