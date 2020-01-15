import fetch from 'isomorphic-unfetch';
import Card from '../components/Card';

const Index = (props) => (
	<div style={styles.app}>
		{props.businessCards.map(card => (
		<Card key={card["_id"]} card={card} fields={props.fields}/>
      ))}
	</div>
);

Index.getInitialProps = async function() {
	const res = await fetch('http://localhost:3000/api/getAllBusinessCards');
    const data = await res.json();
    
    const fieldsRes = await fetch("http://localhost:3000/api/getFields");
    const fieldsData = await fieldsRes.json();

    // const fields = {};
    // fieldsData.forEach(field => {
    //     fields[field.label.toLowerCase()] = field.fieldID;
    // });

	console.log(`Show data fetched. Count: ${data.length}`);

	return {
        businessCards: data,
        fields: fieldsData
	};
};

const styles = {
    app: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly"
    }
};
  
export default Index;