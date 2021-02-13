<template>
    <div class="container-fluid">
        <div class="container tab-selection">
            <div class="input-group input-group-sm">
                <div class="btn-group btn-group-sm btn-group-toggle" data-toggle="buttons">
                    <label for="groups" class="btn btn-outline-primary active" v-on:click="setTabGroups()">
                        <input type="radio" name="filter" id="groups" autocomplete="off" > Groups
                    </label>
                    <label for="tools-techniques" class="btn btn-outline-primary" v-on:click="setTabToolsTechniques()">
                        <input type="radio" name="filter" id="tools-techniques" autocomplete="off" > Tools techniques
                    </label>
                    <label for="groups-compare" class="btn btn-outline-primary" v-on:click="setTabGroupsCompare()">
                        <input type="radio" name="filter" id="groups-compare" autocomplete="off" > Groups compare
                    </label>
                </div>
            </div>
        </div>

        <div v-if="tab === tabGroups">
            <groups></groups>
        </div>
        <div v-else-if="tab === tabToolsTechniques">
            <tools-techniques></tools-techniques>
        </div>
        <div v-else-if="tab === tabGroupsCompare">
            <groups-compare></groups-compare>
        </div>
    </div>
</template>

<script>
    import Groups from "@/components/Groups";
    import ToolsTechniques from "@/components/ToolsTechniques";
    import GroupsCompare from "@/components/GroupsCompare";
    export default {
        name: "Controls",
        components: {GroupsCompare, ToolsTechniques, Groups},
        data() {
            return {
                tab: "tabGroups",
                tabGroups: "tabGroups",
                tabToolsTechniques: "tabToolsTechniques",
                tabGroupsCompare: "tabGroupsCompare"
            }
        },
        methods: {
            setTabGroups() {
                this.setTab(this.tabGroups);
            },
            setTabToolsTechniques() {
                this.setTab(this.tabToolsTechniques);
            },
            setTabGroupsCompare() {
                this.setTab(this.tabGroupsCompare);
            },
            setTab(tab) {
                if (this.tab !== tab) {
                    this.tab = tab;
                }
            }
        }
    }
</script>

<style scoped>
    .tab-selection {
        width: fit-content;
        margin-bottom: 15px;
        margin-top: 15px;
    }
</style>