import React, { useEffect, useState } from 'react'
import Head from 'next/head'
export default function Tasklist() {
    // reasign task to another card
    // assign task to agent
    // task priority
    const [showCardModal, setShowCardModal] = useState(false)
    const [showTaskModal, setShowTaskModal] = useState(false)
    const [activeCard, setactiveCard] = useState("None")
    const [currentTasks, setCurrentTasks] = useState(null)
    const [refreshState, setRefreshState] = useState(true)
    const [agentModal, setagentModal] = useState(false)

    const [ready, setReady] = useState(false)
    const handleCardModal = () => {
        setShowCardModal(!showCardModal)
    }
    const handleTaskModal = () => {
        setShowTaskModal(!showTaskModal)
    }
    const refreshStateHandler = async () => {
        await setRefreshState(false);
        await setRefreshState(true);
    }

    const addAgentToStorage = (Agent_name) => {
        const AgentName = document.getElementById(Agent_name).value
        const Agent = {
            name: AgentName,
            id: Math.random().toString(36).substr(2, 9)
        }
        const Agents = JSON.parse(localStorage.getItem('Agents'))
        if (Agents) {
            Agents.push(Agent)
            localStorage.setItem('Agents', JSON.stringify(Agents))
        } else {
            localStorage.setItem('Agents', JSON.stringify([Agent]))
        }
    }

    const addTaskToStorage = () => {
        let cards = JSON.parse(localStorage.getItem('cards'));
        let selectedAgent = document.getElementById('task-agent').value
        // get the agent name from the id
        if (selectedAgent !== 'none') {
            const Agents = JSON.parse(localStorage.getItem('Agents'))
            for (let x = 0; x < Agents.length; x++) {
                if (Agents[x].id === selectedAgent) {
                    selectedAgent = Agents[x].name
                    break
                }
            }
        }
        if (selectedAgent === 'none') {
            selectedAgent = 'Unassigned'
        }
        let newTask = {
            id: Math.random().toString(36).substr(2, 9),
            name: document.getElementById('task-description').value,
            cardId: activeCard,
            created: new Date(),
            history: [],
            agent: selectedAgent
        }
        for (let x = 0; x < cards.length; x++) {
            if (cards[x].id === activeCard) {
                let list = cards[x].tasks
                list.push(newTask)
                cards[x].tasks = list
                localStorage.setItem('cards', JSON.stringify(cards))
                break
            }
        }
    }

    const addCardToStorage = () => {
        const cardName = document.getElementById('card-name').value
        const cardChild = document.getElementById('card-child').value
        const cardNumber = 1
        const card = {
            name: cardName,
            id: Math.random().toString(36).substr(2, 9),
            tasks: [],
            child: (cardChild === 'none') ? [] : [cardChild],
            number: cardNumber
        }
        const cards = JSON.parse(localStorage.getItem('cards'))
        if (cards) {
            cards.push(card)
            cards.sort((a, b) => a.number - b.number)
            localStorage.setItem('cards', JSON.stringify(cards))
        } else {
            localStorage.setItem('cards', JSON.stringify([card]))
        }
    }



    useEffect(() => {
        if (!localStorage.getItem('cards')) {
            localStorage.setItem('cards', JSON.stringify([]))
        }
        setReady(true)
    }, [])

    return (
        <>
            <Head>
                <title>Tasklist</title>
            </Head>
            <div className="h-[100vh] grid m-auto">
                <div className='w-[70rem] h-[70vh] m-auto bg-gray-600 rounded'>
                    <div className="flex justify-between bg-gray-500 rounded">
                        <h1 className='text-[2rem] m-2 grid text-white'>Tasklist</h1>
                        <div className="">
                            {/* add Agent */}
                            <button className='bg-green-500 rounded m-2 p-2' onClick={() =>
                                setagentModal(!agentModal)}>Add Agent</button>
                            {/* Agent Modal */}
                            <div className="">
                                {
                                    agentModal && <>
                                        <div className="absolute top-0 left-0 bg-[#ffffff50] w-full h-full"
                                            onClick={
                                                () => {
                                                    setagentModal(false);
                                                }

                                            }
                                        >
                                            <div />
                                        </div>
                                        <div className="
                                absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                                ">
                                            <div className="bg-white p-4 rounded border shadow">
                                                <div className="">
                                                    <h2 className='text-xl'>👨‍💻 + Add Agent</h2>
                                                    <hr />
                                                </div>
                                                <div className="my-4">
                                                    <div className=" flex gap-2">
                                                        <label htmlFor="task-description" className='whitespace-nowrap'>
                                                            <p className=''>Agent Name</p>
                                                        </label>
                                                        <input type="text" id='Agent-name' className='border rounded p-1' />
                                                    </div>

                                                </div>
                                            </div>
                                            <button className='w-full bg-green-500 rounded p-1'
                                                onClick={
                                                    () => {
                                                        addAgentToStorage('Agent-name');
                                                        setagentModal(false);
                                                    }
                                                }
                                            >
                                                <p className='text-white font-bold'>Create</p>
                                            </button>
                                        </div>


                                    </>

                                }
                            </div>
                        </div>

                    </div>
                    <div className="grid  grid-cols-[1fr_2fr] gap-4 m-4 select-none h-[80%]">
                        <div className="grid bg-gray-700 rounded h-[100%] p-2">
                            <div className=" grid gap-2 h-fit">
                                {
                                    ready && JSON.parse(localStorage.getItem('cards')).map((card, index) => {
                                        return (
                                            <div
                                                key={index}
                                                onClick={() => {
                                                    setactiveCard(card.id);
                                                    console.log(activeCard);
                                                    setCurrentTasks(card.tasks)
                                                }}
                                                className={`w-full flex gap-4 px-2 py-1 bg-white 
                                                ${activeCard === card.id ? 'outline-green-500 outline-2 outline outline-offset-2 bg-green-500 ' : ''}
                                                rounded relative cursor-pointer hover:bg-slate-300 group`}>
                                                <p className=''>
                                                    {card.name}
                                                </p>
                                                <p className='mt-0'>
                                                    {card.tasks.length}
                                                </p>
                                                {
                                                    activeCard === card.id && <div className="gap-1 justify-center absolute right-0 hidden group-hover:flex">
                                                        <button className='px-1 bg-green-500 rounded inline-block' onClick={() => {
                                                            let cards = JSON.parse(localStorage.getItem('cards'));
                                                            for (let x = 0; x < cards.length; x++) {
                                                                if (cards[x].id === card.id) {
                                                                    try {
                                                                        let lastNum = cards[x + 1].number
                                                                        cards[x].number = lastNum + 1
                                                                        cards.sort((a, b) => a.number - b.number)

                                                                        localStorage.setItem('cards', JSON.stringify(cards))
                                                                        break
                                                                    } catch (error) {
                                                                        console.log("can't go up")
                                                                        alert("can't go up")
                                                                    }
                                                                }
                                                            }

                                                        }}>
                                                            <p className='text-white'>+</p>
                                                        </button>
                                                        <button className='px-1 bg-red-500 rounded inline-block' onClick={() => {
                                                            let cards = JSON.parse(localStorage.getItem('cards'));
                                                            for (let x = 0; x < cards.length; x++) {
                                                                if (cards[x].id === card.id) {
                                                                    try {
                                                                        let lastNum = cards[x - 1].number
                                                                        console.log(lastNum)
                                                                        cards[x].number = lastNum - 1
                                                                        console.log(cards[x].number)
                                                                        cards.sort((a, b) => a.number - b.number)

                                                                        localStorage.setItem('cards', JSON.stringify(cards))
                                                                        break
                                                                    }
                                                                    catch (error) {
                                                                        console.log(error)
                                                                        console.log("can't go down")
                                                                        alert("can't go down")
                                                                    }
                                                                }
                                                            }
                                                        }}>
                                                            <p className='text-white'>-</p>
                                                        </button>

                                                    </div>
                                                }
                                                {
                                                    // delete card
                                                    activeCard === card.id && <div className="gap-1 justify-center absolute -left-5 hidden group-hover:flex">
                                                        <button className='px-1 bg-red-500 rounded inline-block' onClick={() => {
                                                            let cards = JSON.parse(localStorage.getItem('cards'));
                                                            for (let x = 0; x < cards.length; x++) {
                                                                if (cards[x].id === card.id) {
                                                                    cards.splice(x, 1)
                                                                    localStorage.setItem('cards', JSON.stringify(cards))
                                                                    break
                                                                }
                                                            }
                                                        }
                                                        }>
                                                            <p className='text-white'>X</p>
                                                        </button>
                                                    </div>

                                                }
                                            </div>
                                        )
                                    }
                                    )
                                }
                            </div>
                            <button className='bg-green-500 rounded self-end' onClick={
                                handleCardModal
                            }>
                                <p className='p-2 font-bold text-white'>+ Add a card</p>
                            </button>
                        </div>
                        <div className=" bg-gray-700 rounded h-[100%]  p-2 justify-between">
                            {
                                ready && refreshState && JSON.parse(localStorage.getItem('cards'))?.map((task, index) => {
                                    return (
                                        (task.id === activeCard) && <div
                                            key={index}
                                            className=" grid gap-2 h-fit w-full m-auto">
                                            {
                                                task.tasks.map((task, index) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className="bg-white rounded p-2 flex gap-2">
                                                            <input type="checkbox" name="" id={task?.id}
                                                                className='w-4 h-4 grid m-auto'
                                                                onClick={() => {
                                                                    let cards = JSON.parse(localStorage.getItem('cards'));
                                                                    let cardChild = ""
                                                                    for (let x = 0; x < cards.length; x++) {
                                                                        if (cards[x].id === activeCard) {
                                                                            cardChild = cards[x].id
                                                                            break
                                                                        }
                                                                    }
                                                                    for (let z = 0; z < cards.length; z++) {
                                                                        //    add to the child card
                                                                        console.log(cardChild)
                                                                        console.log(cards[z].id)
                                                                        if (cards[z].id === cardChild) {
                                                                            for (let y = 0; y < cards.length; y++) {
                                                                                if (cards[z].child.length === 0) {
                                                                                    // make sure there is card name "📦Archive" if not create one
                                                                                    for (let x = 0; x < cards.length; x++) {
                                                                                        if (cards[x].name === "📦Archive") {
                                                                                            cards[z].child.push(cards[x].id)
                                                                                            break
                                                                                        }
                                                                                        if (x === cards.length - 1) {
                                                                                            let card = {
                                                                                                id: Math.random().toString(36).substr(2, 9),
                                                                                                name: "📦Archive",
                                                                                                number: cards.length + 1,
                                                                                                tasks: [],
                                                                                                child: []
                                                                                            }
                                                                                            cards.push(card)
                                                                                            localStorage.setItem('cards', JSON.stringify(cards));
                                                                                            cards[z].child.push(card.id)
                                                                                            break
                                                                                        }
                                                                                    }

                                                                                }
                                                                                if (cards[z].child[0] === cards[y].id) {
                                                                                    cards[y].tasks.push(task)
                                                                                    localStorage.setItem('cards', JSON.stringify(cards));
                                                                                    refreshStateHandler();
                                                                                    break
                                                                                }
                                                                            }
                                                                        }

                                                                    }
                                                                    for (let x = 0; x < cards.length; x++) {
                                                                        if (cards[x].id === activeCard) {
                                                                            cards[x].tasks.splice(index, 1);
                                                                            localStorage.setItem('cards', JSON.stringify(cards));
                                                                            refreshStateHandler();
                                                                            break
                                                                        }
                                                                    }

                                                                }}

                                                            />
                                                            <label htmlFor={task?.id} className='w-full grid'>
                                                                {task?.name}
                                                            </label>
                                                            <p>
                                                                {  task?.agent}
                                                            </p>
                                                            <p>{
                                                                // create mints and  hours and days ago
                                                                // (() => {
                                                                //     var timeDiff = new Date() - task?.created;

                                                                //     var seconds = Math.floor(timeDiff / 1000);
                                                                //     var minutes = Math.floor(seconds / 60);
                                                                //     var hours = Math.floor(minutes / 60);
                                                                //     var days = Math.floor(hours / 24);

                                                                //     if (days > 0) {
                                                                //         return days + " days ago";
                                                                //     } else if (hours > 0) {
                                                                //         return hours + " hours ago";
                                                                //     } else if (minutes > 0) {
                                                                //         return minutes + " min ago";
                                                                //     } else {
                                                                //         return seconds + " sec ago";
                                                                //     }
                                                                // })()

                                                            }</p>
                                                            {/* delete button */}
                                                            <button className='bg-red-500 rounded' onClick={() => {
                                                                let cards = JSON.parse(localStorage.getItem('cards'));
                                                                for (let x = 0; x < cards.length; x++) {
                                                                    if (cards[x].id === activeCard) {
                                                                        cards[x].tasks.splice(index, 1);
                                                                        localStorage.setItem('cards', JSON.stringify(cards));
                                                                        refreshStateHandler();
                                                                        break
                                                                    }
                                                                }
                                                            }}>
                                                                <p className='text-white px-1'>X</p>
                                                            </button>

                                                        </div>
                                                    )
                                                })
                                            }
                                            <div className="hidden first:grid my-auto first:m-auto">
                                                <p className='text-4xl text-white text-center'>
                                                    No tasks yet
                                                    <hr />
                                                </p>
                                            </div>
                                        </div>


                                    )
                                }
                                )
                            }

                            {
                                ready && currentTasks && <button className='my-2 bg-green-500 rounded h-fit self-end w-full' onClick={
                                    () => {
                                        handleTaskModal();
                                    }
                                }>
                                    <p className='p-2 font-bold text-white'>+ Add a task</p>
                                </button>
                            }

                        </div>
                    </div>
                </div>
                {showCardModal &&
                    <>
                        <div className="absolute bg-[#ffffff50] w-full h-full"
                            onClick={
                                handleCardModal
                            }
                        >

                        </div>
                        <div className="
                     absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                     ">
                            <div className="bg-white p-4 rounded border shadow">
                                <div className="">
                                    <h2 className='text-xl'>📇Create a card</h2>
                                    <hr />
                                </div>
                                <div className="">
                                    <div className="my-2 py-2 flex gap-2">
                                        <label htmlFor="card-name">
                                            <p className=''>Card Name</p>
                                        </label>
                                        <input id='card-name' type="text" className='rounded p-1 px-2' />
                                    </div>
                                    <div className=" flex gap-2">
                                        <label htmlFor="card-description" className='whitespace-nowrap'>
                                            <p className=''>Card Child</p>
                                        </label>
                                        {/* get the childs from the local stoarge */}
                                        <select name="card-child" id="card-child" className='rounded w-full p-1 px-2'>
                                            <option value="none" className=''>None</option>
                                            {
                                                JSON.parse(localStorage.getItem('cards')).map((card, index) => {
                                                    return (
                                                        <option key={index} value={card.id}>{card.name}
                                                        </option>
                                                    )
                                                }
                                                )
                                            }
                                        </select>
                                    </div>
                                    <button className='w-full bg-green-500 rounded p-1'
                                        onClick={
                                            () => {
                                                addCardToStorage();
                                                handleCardModal();
                                            }
                                        }
                                    >
                                        <p className='text-white font-bold'>Create</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                }
                {showTaskModal &&
                    <>
                        <div className="absolute bg-[#ffffff50] w-full h-full"
                            onClick={
                                handleTaskModal
                            }
                        >
                            <div />
                        </div>
                        <div className="
                        absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                        ">
                            <div className="bg-white p-4 rounded border shadow">
                                <div className="">
                                    <h2 className='text-xl'>📇Create a task</h2>
                                    <hr />
                                </div>
                                <div className="my-4">
                                    <div className=" flex gap-2">
                                        <label htmlFor="task-description" className='whitespace-nowrap'>
                                            <p className=''>Task Description</p>
                                        </label>
                                        <textarea name="task-description" id="task-description" cols="30" rows="10" className='rounded w-full p-2'></textarea>
                                    </div>
                                </div>
                                <div className="my-4">
                                    <div className=" flex gap-2">
                                        <label htmlFor="task-Agent" className='whitespace-nowrap'>
                                            <p className=''>Task Agent</p>
                                        </label>
                                        
                                        {/* select the agent */}
                                        <select name="task-agent" id="task-agent" className='rounded w-full p-1 px-2'>
                                            <option value="none" className=''>None</option>
                                            {
                                                JSON.parse(localStorage.getItem('Agents'))?.map((agent, index) => {
                                                    return (
                                                        <option key={index} value={agent.id}>{agent.name}
                                                        </option>
                                                    )
                                                }
                                                )
                                            }
                                        </select>

                                    </div>
                                </div>
                            </div>
                            <button className='w-full bg-green-500 rounded p-1'
                                onClick={
                                    () => {
                                        addTaskToStorage();
                                        handleTaskModal();
                                    }
                                }
                            >
                                <p className='text-white font-bold'>Create</p>
                            </button>
                        </div>

                    </>
                }
            </div>
        </>
    )
}
