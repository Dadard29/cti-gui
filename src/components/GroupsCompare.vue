<template>
    <div class="row">
<!--        group 1-->
        <div class="col-4">
            <div class="row">
                <entry-list @loadEntry="getGroupOne" placeholder="group search..."
                            :entry-list="groupList"></entry-list>
            </div>
            <div class="row">
                <group-detail :is-loading="groupOneLoading" :group="groupOne"></group-detail>
            </div>
        </div>

<!--        stats-->
        <div class="col">
            <div class="row" v-if="toolList !== null">
                <div class="container">
                    <div class="card text-center">
                    <div class="card-header">
                        Group comparison between {{groupOne.name}} and {{groupTwo.name}}
                    </div>
                    <div class="card-body">
                        <h1 class="card-title">{{stats.percent}}%</h1> tools in common
                    </div>
                    <div class="card-footer text-muted">
                        {{stats.count}} tools out of {{stats.total}}
                    </div>
                </div>
                </div>
            </div>

            <div class="row" v-if="toolList !== null">
                <entry-list @loadEntry="getTool" placeholder="tool search..."
                            :entry-list="toolList"></entry-list>
            </div>
            <div class="row" v-if="toolList !== null">
                <tool-detail :is-loading="toolIsLoading" :tool="tool"></tool-detail>
            </div>

        </div>

<!--        group 2-->
        <div class="col-4">
            <div class="row">
                <entry-list @loadEntry="getGroupTwo" placeholder="group search..."
                            :entry-list="groupList"></entry-list>
            </div>
            <div class="row">
                <group-detail :is-loading="groupTwoLoading" :group="groupTwo"></group-detail>
            </div>
        </div>
    </div>
</template>

<script>
    import EntryList from "@/components/EntryList";
    import GroupDetail from "@/components/GroupDetail";
    import CtiService from "@/services/ctiService";
    import ToolDetail from "@/components/ToolDetail";
    export default {
        name: "GroupsCompare",
        components: {ToolDetail, GroupDetail, EntryList},
        data() {
            return {
                ctiService: null,

                groupList: null,
                groupOne: null,
                groupOneLoading: false,
                groupTwo: null,
                groupTwoLoading: false,

                toolList: null,
                toolIsLoading: false,
                tool: null,

                stats: null,
            }
        },
        mounted() {
            this.ctiService = new CtiService();
            this.getGroupList();
        },
        methods: {
            getGroupList() {
                let self = this;
                this.ctiService.getGroupList()
                    .then(function(l) {
                        self.groupList = l;
                    })
            },

            getGroupOne(groupName) {
                let self = this;
                this.ctiService.getGroup(groupName)
                    .then(function(group) {
                        self.groupOne = group;
                        self.compare();
                    })
            },

            getGroupTwo(groupName) {
                let self = this;
                this.ctiService.getGroup(groupName)
                    .then(function(group) {
                        self.groupTwo = group;
                        self.compare();
                    })

            },

            compare() {
                if (this.groupOne === null || this.groupTwo === null) {
                    return
                }

                let self = this;
                this.ctiService.groupsCompare(this.groupOne.name, this.groupTwo.name)
                    .then(function(res) {
                        self.toolList = res.tools;
                        self.stats = res.stats;
                    })
            },

            getTool(toolName) {
                let self = this;
                this.ctiService.getTool(toolName)
                    .then(function(tool) {
                        self.tool = tool;
                    })
            }
        }
    }
</script>

<style scoped>

</style>