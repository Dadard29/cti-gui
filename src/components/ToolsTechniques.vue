<template>
    <div class="row">
        <div class="col-4">
            <div class="row">
                <entry-list @loadEntry="getTool" placeholder="tool search..." :entry-list="toolsList"></entry-list>
            </div>

            <div class="row">
                <tool-detail :is-loading="toolIsLoading" :tool="tool"></tool-detail>
            </div>
        </div>

        <div class="col">
            <div class="row">
                <div class="col">
                    <tree @selectNode="selectTechnique" ref="toolTechniquesTree" title="Techniques used by tool"
                          :tree="toolsTechniquesTree" container-id="toolTechniquesId" :is-loading="toolsTechniquesTreeIsLoading"></tree>
                </div>
                <div class="col-4">
                    <technique-detail :technique="techniqueSelected" :is-loading="false"></technique-detail>
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <tree @selectNode="selectGroup" ref="toolGroupsTree" title="Groups using tool"
                    :tree="toolsGroupsTree" container-id="toolsGroupsId" :is-loading="toolsGroupsTreeIsLoading"></tree>
                </div>
                <div class="col-4">
                    <group-detail :group="groupSelected" :is-loading="false"></group-detail>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import EntryList from "@/components/EntryList";
    import ToolDetail from "@/components/ToolDetail";
    import CtiService from "@/services/ctiService";
    import Tree from "@/components/Tree";
    import TechniqueDetail from "@/components/TechniqueDetail";
    import GroupDetail from "@/components/GroupDetail";
    export default {
        name: "ToolsTechniques",
        components: {GroupDetail, TechniqueDetail, Tree, ToolDetail, EntryList},
        mounted() {
            this.ctiService = new CtiService();
            this.getToolsList();
        },
        data() {
            return {
                ctiService: null,

                toolsList: null,
                tool: null,
                toolIsLoading: false,

                toolsTechniquesTree: null,
                toolsTechniquesTreeIsLoading: false,
                techniqueSelected: null,

                toolsGroupsTree: null,
                toolsGroupsTreeIsLoading: false,
                groupSelected: null,
            }
        },
        methods: {
            selectTechnique(technique) {
                this.techniqueSelected = technique
            },

            selectGroup(group) {
                this.groupSelected = group
            },

            getToolsList() {
                let self = this;
                this.ctiService.getToolsList()
                    .then(function(toolsList) {
                        self.toolsList = toolsList;
                    })
            },

            getTool(toolName) {
                let self = this;
                this.toolIsLoading = true;
                this.ctiService.getTool(toolName)
                    .then(function(tool) {
                        self.tool = tool;
                        self.toolIsLoading = false;

                        self.getToolTechniques(toolName);
                        self.getToolGroups(toolName)
                    })
            },

            getToolTechniques(toolName) {
                let self = this;
                this.toolsTechniquesTreeIsLoading = true;
                this.ctiService.getToolTechniques(toolName)
                    .then(function(techniques) {
                        let techniquesChildren = [];
                        techniques.forEach(function(t) {
                            techniquesChildren.push({
                                id: t._key,
                                data: t
                            })
                        });

                        self.toolsTechniquesTree = {
                            id: self.tool._key,
                            data: self.tool,
                            children: techniquesChildren
                        };

                        self.toolsTechniquesTreeIsLoading = false;
                        self.$refs.toolTechniquesTree.render(self.toolsTechniquesTree)
                    })
            },

            getToolGroups(toolName) {
                let self = this;
                this.toolsGroupsTreeIsLoading = true;
                this.ctiService.getToolGroups(toolName)
                    .then(function(groups) {
                        let groupsChildren = [];
                        groups.forEach(function(t) {
                            groupsChildren.push({
                                id: t._key,
                                data: t
                            })
                        });

                        self.toolsGroupsTree = {
                            id: self.tool._key,
                            data: self.tool,
                            children: groupsChildren
                        };

                        self.toolsGroupsTreeIsLoading = false;
                        self.$refs.toolGroupsTree.render(self.toolsGroupsTree)
                    })
            },
        }
    }
</script>

<style scoped>

</style>