import { dbService } from "fBase";
import React, {useState} from "react";

const Kweet = ({ kweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newKweet, setNewKweet] = useState(kweetObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure to delete this kweet?");
        console.log(ok);
        if(ok) {
            await dbService.doc(`kweets/${kweetObj.id}`).delete();
        }
    };
    const toggleEditing = () => setEditing((prev) => !prev);
    const onChange = (event) => {
        const {
            target:{value},
        } = event;
        setNewKweet(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`kweets/${kweetObj.id}`).update({
            text: newKweet
        });
        setEditing(false);
    };
    return (
        <div>
            {editing ? (
                    <>
                        <form onSubmit={onSubmit}>
                            <input 
                                type="text"
                                placeholder="Edit your Kweet"
                                value={newKweet} 
                                required 
                                onChange={onChange}
                            />
                            <input type="submit" value="Update Kweet" />
                        </form>
                        <button onClick={toggleEditing}>Cancel</button>
                    </>
                ) : (
                    <>
                        <h4>{kweetObj.text}</h4>
                        {isOwner && (
                            <>
                                <button onClick={onDeleteClick}>Delete Kweet</button>
                                <button onClick={toggleEditing}>Edit Kweet</button>
                            </>
                        )}
                    </>
                )
            }
        </div>
    );
};

export default Kweet;