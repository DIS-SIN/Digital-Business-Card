import fetch from 'isomorphic-unfetch';
import Card from '../components/Card';

const Index = (props) => {
    
    return (
        <div className="app">
            {props.businessCards.map(card => (
                <Card key={card["_id"]} card={card} fields={props.fields}/>
            ))}
            {styles()}
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
        businessCards: data,
        fields: fieldsData
	};
};

function styles() {
    return <style jsx>{`
        .app {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-evenly;
        }
    `}</style>
}
  
export default Index;