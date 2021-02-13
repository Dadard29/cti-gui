<template>
    <div class="container-fluid" v-if="entryList !== null">
        <div id="group-search">
            <small v-if="entrySearch !== null">found {{entrySearch.length}} out of {{entryList.length}}</small>
            <div class="input-group mb-3">
                <input type="text" class="form-control" :placeholder="placeholder" aria-label="group search..."
                       aria-describedby="button-group-search"  v-model="searchInput">
            </div>
        </div>
        <div id="group-results">
            <div v-for="g in entrySearch" :key="g" class="group-result" @click="loadEntry(g)">
                <span>
                    {{g}}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "EntryList",
        props: {
            entryList: Array,
            placeholder: String,
        },
        computed: {
            entrySearch() {
                let self = this;
                if (self.searchInput === "") {
                    return self.entryList
                }

                let results = [];
                self.entryList.forEach(function(g) {
                    let entryName = g.toUpperCase();
                    let re = new RegExp(self.searchInput.toUpperCase())

                    if (entryName.match(re)) {
                        results.push(g)
                    }
                });

                return results
            }
        },
        data() {
            return {
                searchInput: "",
            }
        },
        methods: {
            loadEntry(entryName) {
                this.$emit("loadEntry", entryName)
            }
        }
    }
</script>

<style scoped>

    #group-results {
        max-height: 200px;
        overflow: auto;
        height: 200px;
        border: solid 1px white;
    }

    .group-result {
        cursor: pointer;
        user-select: none;
    }

    .group-result:hover {
        background-color: grey;
    }
</style>