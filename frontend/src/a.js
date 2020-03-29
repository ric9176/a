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

    socket.on('updatedOptions', (data) => { setTileData(data) });

    function abc() {
        alert('done')
    }

    return (
        <div>
            <div className={classes.root}>
                <GridList cellHeight={180} className={classes.gridList}>
                    {tileData.map(tile => (
                        <GridListTile key={tile.img} onClick={() => {
                            console.log(socket)
                            tile.quantity ? setSelected(tile) : alert(`unfortunately there are no '${ tile.title }' remaining`)
                        }}>
                            <img src={tile.img} alt={tile.title}/>
                            <GridListTileBar
                                title={tile.title}
                                subtitle={<span>Remaining: {tile.quantity}</span>}
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
            <br/><br/>
            Name (please full name so I don't get mixed up): <TextField value={name} onChange={(e) => setName(e.target.value)} /> <br/><br/><br/>
            {selected && name && (
            <Button style={{backgroundColor: "green" }}
                    onClick={() => socket.emit('optionSelection', selected)}>selected: {selected.title} (click to submit)</Button>
            )}
        </div>
    );
}
