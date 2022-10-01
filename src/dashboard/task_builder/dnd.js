import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Row, Col, Card, Layout } from 'antd'


const DND = () => {
    const [characters, updateCharacters] = useState(finalSpaceCharacters);

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(characters);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        updateCharacters(items);
    }

    const style = {
        margin: "10px 20px",
        boxShadow: "0 0 3px 2px #ccc",
        background: "#fff",
        padding: "20px 10px",
        listStyle: "none"
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Final Space Characters</h1>
                <Row gutter={24}>
                    <Col span={12}>
                        <DragDropContext onDragEnd={handleOnDragEnd}>
                            <Droppable droppableId="characterster">
                                {(provided) => (
                                    <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                                        {characters.map(({ id, name, thumb }, index) => {
                                            return (
                                                <Draggable key={id} draggableId={id} index={index}>
                                                    {(provided) => (
                                                        <li style={style} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                            <div className="characters-thumb">
                                                                <img src={thumb} alt={`${name} Thumb`} />
                                                            </div>
                                                            <p>
                                                                {name}
                                                            </p>
                                                        </li>
                                                    )}
                                                </Draggable>
                                            );
                                        })}
                                        {provided.placeholder}
                                    </ul>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </Col>
                    <Col span={12}>
                        <DragDropContext onDragEnd={handleOnDragEnd}>
                            <Droppable droppableId="characters">
                                {(provided) => (
                                    <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                                        {characters.map(({ id, name, thumb }, index) => {
                                            return (
                                                <Draggable key={id} draggableId={id} index={index}>
                                                    {(provided) => (
                                                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                            <div className="characters-thumb">
                                                                <img src={thumb} alt={`${name} Thumb`} />
                                                            </div>
                                                            <p>
                                                                {name}
                                                            </p>
                                                        </li>
                                                    )}
                                                </Draggable>
                                            );
                                        })}
                                        {provided.placeholder}
                                    </ul>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </Col>
                </Row>
            </header>
            <p>
                Images from <a href="https://final-space.fandom.com/wiki/Final_Space_Wiki">Final Space Wiki</a>
            </p>
        </div>
    )
}

const finalSpaceCharacters = [
    {
        id: 'gary',
        name: 'Gary Goodspeed',
        thumb: '/images/gary.png'
    },
    {
        id: 'cato',
        name: 'Little Cato',
        thumb: '/images/cato.png'
    },
    {
        id: 'kvn',
        name: 'KVN',
        thumb: '/images/kvn.png'
    },
    {
        id: 'mooncake',
        name: 'Mooncake',
        thumb: '/images/mooncake.png'
    },
    {
        id: 'quinn',
        name: 'Quinn Ergon',
        thumb: '/images/quinn.png'
    }
]



export default DND