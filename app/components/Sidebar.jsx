const Sidebar = () => {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };
    return (
        <aside className={"p-3 flex flex-col items-center gap-4"}>
            <div className="md:w-1/2 h-[40px] border-3 border-black text-white bg-green-500 text-center flex items-center justify-center rounded-xl" onDragStart={(event) => onDragStart(event, 'input')} draggable>
                <p>Input Node</p>
            </div>
            <div className="md:w-1/2 h-[40px] border-3 border-black text-white bg-blue-500 text-center flex items-center justify-center rounded-xl" onDragStart={(event) => onDragStart(event, 'default')} draggable>
                <p>Default Node</p>
            </div>
            <div className="md:w-1/2 h-[40px] border-3 border-black text-white bg-red-500 text-center flex items-center justify-center rounded-xl" onDragStart={(event) => onDragStart(event, 'output')} draggable>
                <p>Output Node</p>
            </div>
        </aside>
    )
}

export default Sidebar