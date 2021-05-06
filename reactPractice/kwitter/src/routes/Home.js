import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Kweet from 'components/Kweet';
import { dbService, storageService } from 'fBase';

const Home = ({ userObj }) => {
    const [kweet, setKweet] = useState("");
    const [kweets, setKweets] = useState([]);
    const [attachment, setAttachment] = useState();
    useEffect(() => {
        dbService.collection("kweets").onSnapshot((snapshot) => {
            const kweetArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setKweets(kweetArray)
        });
    }, []);
    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";
        if (attachment !== "") {
            const attachmentRef = storageService
                .ref()
                .child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();
        }
        const kweetObj = {
            text: kweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        };
        await dbService.collection("kweets").add(kweetObj);
        setKweet("");
        setAttachment(null);
    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setKweet(value);
    };
    const onFileChange = (event) => {
        const {
            target: { files },
        } = event;
        // 업로드한 사진을 가져와서
        const theFile = files[0];
        //reader 객체를 만들어
        if(theFile != null)
        {const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: { result },
            } = finishedEvent;
            setAttachment(result);
        };
        //reader 객체로 파일을 읽는다.
        reader.readAsDataURL(theFile);}
    };
    const onClearAttachment = () => setAttachment(null);
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={kweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="Kweet" />
                {attachment &&
                    <div>
                        <img src={attachment} width="50px" height="50px" />
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>
                }
            </form>
            <div>
                {kweets.map((kweet) => (
                    <Kweet key={kweet.id} kweetObj={kweet} isOwner={kweet.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    );
};
export default Home;
//function component