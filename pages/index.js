import fetch from 'isomorphic-unfetch';
import {useState, useEffect} from 'react';
import Card from '../components/Card';

const Index = (props) => {

    const [viewMode, setViewMode] = useState("desktop");
    
    useEffect(() => {
        if (process.browser){
            console.log("Adding listener");
            window.addEventListener('resize', checkMediaQueries);
        }
    },[]);

    function checkMediaQueries() {
        window.outerWidth > 600 ? setViewMode("desktop") : setViewMode("mobile");
    }
    
    return (
        <div style={styles.app}>
            {props.businessCards.map(card => (
                <Card key={card["_id"]} card={card} fields={props.fields} viewMode={viewMode}/>
            ))}
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

const styles = {
    app: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly"
    }
};
  
export default Index;