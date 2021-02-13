import G6 from '@antv/g6';

const groupNodeSize = 50;
const groupNodeColor = "red";
const groupNodeStroke = "darkred";
const externalNodeSize = 25;

const nodeFillColor = "blue";
const nodeStrokeColor = "darkBlue";
const edgeStrokeColor = "darkBlue";


const maxChildrenCount = 10;

export default class GraphService {
    constructor() {
        this.graph = null;
        this.selectedNode = null;
        this.message = "";
    }

    getNodes(tree) {
        tree.size = groupNodeSize;
        tree.style = {
            fill: groupNodeColor,
            stroke: groupNodeStroke
        };

        tree.label = tree.data.name;

        tree.children.forEach(function(n) {
            n.size = externalNodeSize;
            n.label = n.data.name;
        });

        tree.children.splice(maxChildrenCount);

        return tree
    }

    clearGraph() {
        if (this.graph !== null) {
            this.graph.clear();
            this.graph.destroy();
            this.graph = null;
        }
    }

    newGraph(tree, containerId) {
        let self = this;
        this.clearGraph();

        let originalNodeCount = tree.children.length;
        let graphData = this.getNodes(tree);
        let displayedNodeCount = graphData.children.length;
        this.message = `(${displayedNodeCount} out of ${originalNodeCount})`;

        // let container = document.getElementById('graphNode');
        const graphWidth = 500;
        const graphHeight = 500;

        this.graph = new G6.TreeGraph({
            container: containerId,
            width: graphWidth,
            height: graphHeight,

            fitView: true,

            layout: {
                type: 'compactBox',
                direction: 'LR',
                getId: function getId(d) {
                    return d.id;
                },
                getHeight: function getHeight() {
                    return 16;
                },
                getWidth: function getWidth() {
                    return 16;
                },
                getVGap: function getVGap() {
                    return 10;
                },
                getHGap: function getHGap() {
                    return 100;
                },
            },
            animate: true,

            defaultNode: {
                labelCfg: {
                    style: {
                        fontSize: 8,
                        fill: "white",
                    }
                },
                style: {
                    lineWidth: groupNodeSize / 20,
                    fill: nodeFillColor,
                    stroke: nodeStrokeColor,
                }
            },
            defaultEdge: {
                type: 'cubic-horizontal',
                labelCfg: {
                    style: {
                        fontSize: 12,
                        fill: "white",
                        opacity: 0,
                    }
                },
                style: {
                    stroke: edgeStrokeColor,
                    lineWidth: 2
                }
            },
            nodeStateStyles: {
                click: {
                    stroke: 'lightblue',
                }
            },
        });

        let g = this.graph;
        g.on("node:click", e => {
            const clickNodes = g.findAllByState('node', 'click');
            clickNodes.forEach(cn => {
                g.setItemState(cn, 'click', false);
            });

            const nodeItem = e.item;

            // set state
            g.setItemState(nodeItem, 'click', true);
            self.selectedNode = nodeItem._cfg.model.data;
        });

        this.graph.data(graphData);
        this.graph.render();
        this.graph.fitView();
    }
}