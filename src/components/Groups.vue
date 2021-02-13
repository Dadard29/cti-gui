<template>
    <div class="row">
        <div class="col-4">
            <!--        group choice-->
            <div class="row">
                <entry-list @loadEntry="getGroup" placeholder="group search..." :entry-list="groupList"></entry-list>
            </div>

            <!--        group detail-->
            <div class="row">
                <group-detail :is-loading="groupIsLoading" :group="group"></group-detail>
            </div>
        </div>

        <div class="col">
            <tree @selectNode="selectTool" ref="groupToolsTree" :title="`Tools used by group`"
                  :tree="tree" container-id="groupToolsId" :is-loading="treeIsLoading"></tree>
        </div>

        <div class="col-4">
            <tool-detail :tool="toolSelected" :is-loading="false"></tool-detail>
        </div>
    </div>
</template>

<script>
    import GroupDetail from "@/components/GroupDetail";
    import ctiService from "@/services/ctiService";
    import EntryList from "@/components/EntryList";
    import Tree from "@/components/Tree";
    import ToolDetail from "@/components/ToolDetail";

    export default {
        name: "Groups",
        components: {ToolDetail, Tree, EntryList, GroupDetail},
        data() {
            return {
                ctiService: null,

                // dom
                groupList: null,
                group: null,
                groupIsLoading: false,
                tree: null,
                treeIsLoading: false,

                toolSelected: null
            }
        },
        mounted() {
            this.ctiService = new ctiService();
            this.getGroupList();
        },
        methods: {
            selectTool(tool) {
                this.toolSelected = tool;

            },

            getGroupList() {
              let self = this;
              this.ctiService.getGroupList()
                .then(function(groupList) {
                    self.groupList = groupList
                })
            },

            getGroup(groupName) {
                let self = this;
                this.groupIsLoading = true;
                this.ctiService.getGroup(groupName)
                    .then(function(group) {
                        self.group = group;
                        self.groupIsLoading = false;

                        self.getGroupTools()
                    })
            },

            getGroupTools() {
                let self = this;
                this.treeIsLoading = true;
                this.ctiService.getGroupTools(this.group.name)
                    .then(function(tools) {
                        let toolsChildren = [];
                        tools.forEach(function(t) {
                            toolsChildren.push({
                                id: t._key,
                                data: t,
                            })
                        });

                        self.tree = {
                            id: self.group._key,
                            data: self.group,
                            children: toolsChildren
                        };
                        self.treeIsLoading = false;
                        self.$refs.groupToolsTree.render(self.tree)
                    })

            }
        }
    }
</script>

<style scoped>

</style>