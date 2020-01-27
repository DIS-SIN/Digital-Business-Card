import fetch from 'isomorphic-unfetch';
import InfiniteScroll from 'react-infinite-scroller';
import Card from '../components/Card';
import { useState } from 'react';
import css from 'styled-jsx/css'

const Index = (props) => {

    const [businessCards, setBusinessCards] = useState(props.initialBusinessCards.cards);
    const [hasMoreCards, setHasMoreCards] = useState(props.initialBusinessCards.hasMore);

    async function loadMoreCards() {
        const res = await fetch(`http://localhost:3000/api/getAllBusinessCards?skip=${businessCards.length}`);
        const data = await res.json();

        setHasMoreCards(data.hasMore);
        setBusinessCards(businessCards.concat(data.cards));
    }

    const loader = <div className="loader" key="loader">Loading ...</div>;

    let cardComponents = [];
    businessCards.map(card => {
        cardComponents.push(
            <Card key={card["_id"]} card={card} fields={props.fields}/>
        );
    });
    
    return (
        <div className="app">
            <InfiniteScroll pageStart={0} loadMore={loadMoreCards} hasMore={hasMoreCards} loader={loader}>
                <div className="cardContainer">
                    {cardComponents}
                </div>
            </InfiniteScroll>
            <style jsx>{styles}</style>
        </div>
    )
};

Index.getInitialProps = async function() {
	const res = await fetch('http://localhost:3000/api/getAllBusinessCards');
    const data = await res.json();
    
    const fieldsRes = await fetch("http://localhost:3000/api/getFields");
    const fieldsData = await fieldsRes.json();

	console.log(`Show data fetched. Count: ${data.length}`);

	return {
        initialBusinessCards: data,
        fields: fieldsData
	};
};

const styles = css`
.cardContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
}

.loader {
    background-color: black;
    color: white;
    bottom: 10px;
    padding: 20px;
    text-align: center;
}`;
  
export default Index;