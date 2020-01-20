import { useRouter } from 'next/router';

export default function Card(props) {

  return (
    <div>
        <img src={props.businessCard.avatar} alt={`${props.businessCard.name}'s avatar`}/>
        <h1>{props.businessCard.name}</h1>
        <p>{props.businessCard.title}</p>
        <p>{props.businessCard.fields.XfMG4K444A ? props.businessCard.fields.XfMG4K444A.value : undefined}</p>
    </div>
  );
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

	return {
        businessCard: data,
        query
	};
};