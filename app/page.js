"use client"
import React, {memo, useCallback, useState} from 'react';
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge, ReactFlowProvider,
} from 'reactflow';

import 'reactflow/dist/style.css';
import Sidebar from "@/app/components/Sidebar";
import "./nodeStyle.css"

const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } , className: 'custom-node'},
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
    { id: '3', position: { x: 250, y: 100 }, data: { label: '3' } },
];
const initialEdges = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-2', source: '2', target: '3' },
];

const App = ()=> {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    let id = 0;
    const getId = () => `dndnode_${id++}`;

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const type = event.dataTransfer.getData('application/reactflow');

            if (typeof type === 'undefined' || !type) {
                return;
            }
            const position = reactFlowInstance.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            const newNode = {
                id: getId(),
                type,
                position,
                data: { label: `${type} node` },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance],
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <div>
            <ReactFlowProvider>
                <div className={"grid grid-cols-4 h-dvh"}>
                    <div className={"col-span-3"}>
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                            onInit={setReactFlowInstance}
                            onDrop={onDrop}
                            onDragOver={onDragOver}
                            fitView
                        >
                            <Controls/>
                            <MiniMap/>
                            <Background variant="dots" gap={12} size={1}/>
                        </ReactFlow>
                    </div>
                    <Sidebar/>
                </div>
            </ReactFlowProvider>
        </div>
    );
}

export default memo(App)