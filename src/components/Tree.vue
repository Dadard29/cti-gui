<template>
    <div>
        <span v-if="tree === null && isLoading === false"
              class="text-muted">No data</span>
        <div v-else-if="isLoading" class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
        </div>
        <div v-else>
            <h4>{{title}}</h4>
            <span>{{this.graphService.message}}</span>
        </div>

        <div :id="containerId" class="container"></div>
    </div>
</template>

<script>
    import GraphService from "@/services/graphService";

    export default {
        name: "Tree",
        props: {
            containerId: String,
            isLoading: Boolean,
            title: String,
        },
        data() {
            return {
                tree: null,
                graphService: null,
            }
        },
        watch: {
            'graphService.selectedNode': function(val) {
                this.$emit('selectNode', val);
            }
        },
        mounted() {
            this.graphService = new GraphService();
        },
        methods: {
            render(tree) {
                this.tree = tree;
                this.graphService.newGraph(this.tree, this.containerId, "Tools used by group " + tree.data.name)

            }
        }
    }
</script>

<style scoped>

</style>