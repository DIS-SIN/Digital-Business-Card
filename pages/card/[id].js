import fetch from 'isomorphic-unfetch';
import RichPreview from "../../components/RichPreview";
import SocialChannels from "../../components/SocialChannels";
import {getSocialChannels, getVCard} from "../../components/helpers/helperFunctions";

export default function Card(props) {

    console.log(getVCard(props.businessCard, getSocialChannels(props.fields, props.businessCard)));
    // console.log(getSocialChannels(props.fields, props.businessCard));
    // console.log(props.businessCard);

  return (
    <div>
        <RichPreview title={props.businessCard.name} description={props.businessCard.title} image={props.businessCard.avatar} url={`localhost:3000/card/${props.businessCard.slackID}`}/>
        <img src={props.businessCard.avatar} alt={`${props.businessCard.name}'s avatar`}/>
        <h1>{props.businessCard.name}</h1>
        <p>{props.businessCard.title}</p>
        <p>{props.businessCard.fields.XfMG4K444A ? props.businessCard.fields.XfMG4K444A.value : undefined}</p>
        <SocialChannels fields={props.fields} card={props.businessCard}/>
        {typeof window == "object" ? <a href={window.URL.createObjectURL(new Blob([getVCard(props.businessCard, getSocialChannels(props.fields, props.businessCard))], {type: 'text/x-vcard'}))} download="contact.vcf">Download</a>
        : undefined}
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

    const fieldsRes = await fetch("http://localhost:3000/api/getFields");
    const fieldsData = await fieldsRes.json();

	return {
        businessCard: data,
        query,
        fields: fieldsData
	};
};