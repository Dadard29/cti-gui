const axios = require('axios').default;
const host = "https://cti-api.dadard.fr";

const groupReplace = "{{group}}";
const toolReplace = "{{tool}}";


export default class CtiService {
    constructor() {
        this.service = axios.create({
            baseURL: host
        });

        this.routes = {
            "groupList": "/groups",
            "group": "/groups/{{group}}",
            "groupTools": "/groups/{{group}}/tools",
            "groupsCompare": "/compare",
            "toolList": "/tools",
            "tool": "/tools/{{tool}}",
            "toolsTechniques": "/tools/{{tool}}/techniques",
            "toolsGroups": "/tools/{{tool}}/groups"
        }
    }

    getUrl(route, replace, groupName) {
        return route.replace(replace, groupName)
    }

    getGroupList() {
        let url = this.routes.groupList;
        return this.service.get(url)
            .then(function(response) {
                return response.data
            })
    }

    getGroup(groupName) {
        let url = this.getUrl(this.routes.group, groupReplace, groupName);
        return this.service.get(url)
            .then(function (response) {
                return response.data
            })
    }

    getGroupTools(groupName) {
        let url = this.getUrl(this.routes.groupTools, groupReplace, groupName);
        return this.service.get(url)
            .then(function (response) {
                return response.data
            })
    }

    getToolsList() {
        let url = this.routes.toolList;
        return this.service.get(url)
            .then(function(response) {
                return response.data
            })
    }

    getTool(toolName) {
        let url = this.getUrl(this.routes.tool, toolReplace, toolName);
        return this.service.get(url)
            .then(function(response) {
                return response.data
            })
    }

    getToolTechniques(toolName) {
        let url = this.getUrl(this.routes.toolsTechniques, toolReplace, toolName);
        return this.service.get(url)
            .then(function(response) {
                return response.data
            })
    }

    getToolGroups(toolName) {
        let url = this.getUrl(this.routes.toolsGroups, toolReplace, toolName);
        return this.service.get(url)
            .then(function(response) {
                return response.data
            })
    }

    groupsCompare(groupOneName, groupTwoName) {
        let url = `${this.routes.groupsCompare}?group1=${groupOneName}&group2=${groupTwoName}`
        return this.service.get(url)
            .then(function(response) {
                return response.data
            })
    }



}