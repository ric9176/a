import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import {Button, TextField} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 600,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));


export default function TitlebarGridList({socket}) {
    const classes = useStyles();

    const [selected, setSelected] = useState(null);
    const [tileData, setTileData] = useState([]);
    const [name, setName] = useState();
    const [complete, setComplete] = useState(false);

    socket.on('updatedOptions', (data) => {
        setTileData(data)
    });

    socket.on('completed', (data) => {
        setComplete(data);
    });

    function optionSelection() {
        socket.emit('optionSelection', selected, name)
    }

    return (
        <>
            {!complete ? (
                <div style={{display: "flex", "justify-content": "space-between"}}>
                    <div style={{margin: "0 auto 0 auto", padding: "0px 80px"}}>
                        <h1>Egg Selection</h1>
                        <h5>Note: your name will be stored encrypted and will only be used for egg selection</h5>
                        <p>
                            It's another one of those postpone messages due to COVID-19, It also shows how quick we can be to adapt and work in a different way.
                            As most of you know each year I get an easter egg for friends and close colleague
                        </p>

                        Name (please full name so I don't get mixed up): <TextField value={name}
                                                                                    onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div style={{margin: "auto"}}>
                        <div className={classes.root}>
                            <GridList cellHeight={180} className={classes.gridList}>
                                {tileData.map(tile => (
                                    <GridListTile key={tile.url} onClick={() => {
                                        tile.quantity ? setSelected(tile) : alert(`unfortunately there are no '${tile.title}' remaining`)
                                    }}>
                                        <img src={tile.url} alt={tile.title}/>
                                        <GridListTileBar
                                            title={tile.title}
                                            subtitle={<span>Remaining: {tile.quantity}</span>}
                                        />
                                    </GridListTile>
                                ))}
                            </GridList>
                        </div>

                        {selected && name && (
                            <Button style={{backgroundColor: "green"}}
                                    onClick={optionSelection}>selected: {selected.title} (click
                                to submit)</Button>
                        )}
                    </div>
                </div>
            ) : (
                <div style={{textAlign: 'center'}}>
                    <h1>Hey {name}</h1>
                    <h1>Hopefully this has found you and your family safe and well</h1>
                    <h1>I have put 1 {selected.title} aside for you.</h1>
                    <h1>Stay safe</h1>
                </div>
            )}
        </>
    );
}
