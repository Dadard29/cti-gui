<template>
    <div v-if="isLoading === false && tool === null">
        <span class="text-muted">No tool selected</span>
    </div>
    <div v-else-if="isLoading" class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
    </div>
    <div v-else class="container-fluid">
        <div class="card text-center">
            <div class="card-header">
                <h4>{{tool.name}}</h4>
                <ul class="nav nav-pills card-header-pills">
                    <li class="nav-item" @click="toTabDescription">
                        <span class="nav-link active" :id="tabDescription">Description</span>
                    </li>
                    <li class="nav-item" @click="toTabLabels">
                        <span class="nav-link" :id="tabLabels">Labels</span>
                    </li>
                    <li class="nav-item" @click="toTabRefs">
                        <span class="nav-link" :id="tabRefs">References</span>
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
                        <div>{{toolCreationDate}}</div>
                    </div>

                    <div class="label">
                        <small>modified at</small>
                        <div>{{toolModifiedDate}}</div>
                    </div>

                    <div class="label">
                        <small>aliases</small>
                        <div>
                            <span v-for="a in tool.labels" :key="a" class="badge badge-primary">
                                {{a}}
                            </span>
                        </div>
                    </div>
                </div>
                <div v-else-if="tab === tabRefs">
                    <div v-for="r in tool.references" :key="r.name" class="tool-detail-refs">
                        <a :href="r.url" target="_blank">{{r.name}}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Remarkable} from "remarkable";

    export default {
        name: "ToolDetail",
        props: {
            isLoading: Boolean,
            tool: Object
        },
        computed: {
            descriptionHtml() {
                let rd = new Remarkable();
                return rd.render(this.tool.description)
            },
            toolCreationDate() {
                return new Date(this.tool.created).toDateString()
            },
            toolModifiedDate() {
                return new Date(this.tool.modified).toDateString()
            }
        },
        data() {
            return {
                tab: "tool-tab-description",

                tabDescription: "tool-tab-description",
                tabLabels: "tool-tab-labels",
                tabRefs: "tool-tab-refs"

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