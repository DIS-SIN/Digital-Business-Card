import fetch from 'isomorphic-unfetch';
import CardDetails from "../../components/CardDetails";

export default function Card(props) {
    return <CardDetails businessCard={props.businessCard} query={props.query} fields={props.fields}/>;
}

Card.getInitialProps = async function({ query }) {

	const res = await fetch('http://localhost:3000/api/getBusinessCard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: query.id })
    });
    const data = await res.json();

    const fieldsRes = await fetch("http://localhost:3000/api/getFields");
    const fieldsData = await fieldsRes.json();

	return {
        businessCard: data,
        query,
        fields: fieldsData
	};
};