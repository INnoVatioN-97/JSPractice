import React, { useEffect, useState } from 'react';
import { dbService } from 'fBase';
import Kweet from 'components/kweet/Kweet';
import KweetFactory from 'components/kweet/KweetFactory';

const Home = ({ userObj }) => {
    const [kweets, setKweets] = useState([]);
    useEffect(() => {
        const getData = dbService.collection('kweets').orderBy('createdAt', 'desc').onSnapshot(snapshot => {
        const nweetArray = snapshot.docs.map(doc => ({
        id: doc.id, ...doc.data()
        }));
        setKweets(nweetArray);
        });
        return () => getData();
        }, []);

    return (
        <div className="container">
            <KweetFactory userObj={userObj} />
            <div style={{ marginTop: 30 }}>
                {kweets.map((kweet) => (
                    <Kweet
                        key={kweet.id}
                        kweetObj={kweet}
                        isOwner={kweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </div>
    );
};
export default Home;
//function component