<template>
    <div v-if="isLoading === false && group === null">
        <span class="text-muted">No group selected</span>
    </div>
    <div v-else-if="isLoading" class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
    </div>
    <div v-else class="container-fluid">
        <div class="card text-center">
            <div class="card-header">
                <h4>{{group.name}}</h4>
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
                        <div>{{groupCreationDate}}</div>
                    </div>

                    <div class="label">
                        <small>modified at</small>
                        <div>{{groupModifiedDate}}</div>
                    </div>

                    <div class="label">
                        <small>aliases</small>
                        <div>
                            <span v-for="a in group.aliases" :key="a" class="badge badge-primary">
                                {{a}}
                            </span>
                        </div>
                    </div>
                </div>
                <div v-else-if="tab === tabRefs">
                    <div v-for="r in group.references" :key="r.name" class="tool-detail-refs">
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
        name: "GroupDetail",
        props: {
            isLoading: Boolean,
            group: Object
        },
        computed: {
            descriptionHtml() {
                let rd = new Remarkable();
                return rd.render(this.group.description)
            },
            groupCreationDate() {
                return new Date(this.group.created).toDateString()
            },
            groupModifiedDate() {
                return new Date(this.group.modified).toDateString()
            }
        },
        data() {
            return {
                tab: "group-tab-description",

                tabDescription: "group-tab-description",
                tabLabels: "group-tab-labels",
                tabRefs: "group-tab-refs"

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