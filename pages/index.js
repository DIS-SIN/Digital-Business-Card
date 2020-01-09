import fetch from 'isomorphic-unfetch';
import { Card, Icon, Image } from 'semantic-ui-react'

const Index = (props) => (
	<div>
		<p>Hello Next.js</p>
		{props.businessCards.map(card => (
		<React.Fragment>
			<p>{card.name}</p>
			<img src={card.avatar}/>
		</React.Fragment>
      ))}
	</div>
);

Index.getInitialProps = async function() {
	const res = await fetch('http://localhost:3000/api/getAllBusinessCards');
	const data = await res.json();

	console.log(`Show data fetched. Count: ${data.length}`);

	return {
		businessCards: data
	};
};
  
export default Index;