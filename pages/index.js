import fetch from 'isomorphic-unfetch';
import ChildLock from 'react-child-lock';
import InfiniteScroll from 'react-infinite-scroller';
import Header from '../components/Header';
import Card from '../components/Card';
import { useState } from 'react';
import styles from '../stylesheets/index.module.css';
import {colours} from '../components/helpers/styleVariables';

const Index = (props) => {

    const [businessCards, setBusinessCards] = useState(props.initialBusinessCards.cards);
    const [hasMoreCards, setHasMoreCards] = useState(props.initialBusinessCards.hasMore);

    async function loadMoreCards() {
        const res = await fetch(`https://digital-business-cards.herokuapp.com/api/getAllBusinessCards?skip=${businessCards.length}`);
        const data = await res.json();

        setHasMoreCards(data.hasMore);
        setBusinessCards(businessCards.concat(data.cards));
    }

    const loader = <div style={{
        backgroundColor: colours.CSPS.purple,
        color: "white",
        bottom: 10,
        padding: 20,
        textAlign: "center"
    }} key="loader">Loading ...</div>;

    let cardComponents = [];
    businessCards.map(card => {
        cardComponents.push(
            <Card key={card["_id"]} card={card} fields={props.fields}/>
        );
    });
    
    return (
        <div className="app">
            <ChildLock password="beta" customContent={<p>This site is currently under development. Only authorized users are allowed access.</p>} background={{image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"}}/>
            <Header/>
            <InfiniteScroll pageStart={0} loadMore={loadMoreCards} hasMore={hasMoreCards} loader={loader}>
                <div className={styles.cardContainer}>
                    {cardComponents}
                </div>
            </InfiniteScroll>
        </div>
    )
};

Index.getInitialProps = async function() {
	const res = await fetch('https://digital-business-cards.herokuapp.com/api/getAllBusinessCards');
    const data = await res.json();
    
    const fieldsRes = await fetch("https://digital-business-cards.herokuapp.com/api/getFields");
    const fieldsData = await fieldsRes.json();

	console.log(`Show data fetched. Count: ${data.length}`);

	return {
        initialBusinessCards: data,
        fields: fieldsData
	};
};
  
export default Index;