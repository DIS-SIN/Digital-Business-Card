import fetch from 'isomorphic-unfetch';
import QRCode from 'qrcode.react';
import styles from './[id].module.css';
import iconSet from "../../icons/selection.json";
import IcomoonReact from "icomoon-react";
import RichPreview from "../../components/RichPreview";
import SocialChannels from "../../components/SocialChannels";
import {getSocialChannels, getVCard} from "../../components/helpers/helperFunctions";
import {colours} from '../../components/helpers/styleVariables';

export default function Card(props) {

  return (
    <div className={styles.businessCard}>
        <RichPreview title={props.businessCard.name} description={props.businessCard.title} image={props.businessCard.avatar} url={`localhost:3000/card/${props.businessCard.slackID}`}/>
        <img className={styles.avatar} src={props.businessCard.avatar} alt={`${props.businessCard.name}'s avatar`}/>
        <h1 className={styles.text}>{props.businessCard.name}</h1>
        <p className="text">{props.businessCard.title}</p>
        <p className="text">{props.businessCard.fields.XfMG4K444A ? props.businessCard.fields.XfMG4K444A.value : undefined}</p>
        <a className="iconLabel" href={`mailto:${props.businessCard.email}`} title={`Email ${props.businessCard.email}`} target="_blank">
            <IcomoonReact iconSet={iconSet} color="white" size={20} icon="email"/>
            <p className="text">{props.businessCard.email}</p>
        </a>
        {props.businessCard.phone ?
            <a className="iconLabel" href={`tel:${props.businessCard.phone}`} title={`Call ${props.businessCard.phone}`} target="_blank">
                <IcomoonReact iconSet={iconSet} color="white" size={20} icon="phone"/>
                <p className="text">{props.businessCard.phone}</p>
            </a>    
        : undefined}
        <div className="socialChannels">
            <SocialChannels fields={props.fields} card={props.businessCard} colour={"white"}/>
        </div>
        {process.browser ? <a className="text" href={window.URL.createObjectURL(new Blob([getVCard(props.businessCard, getSocialChannels(props.fields, props.businessCard))], {type: 'text/x-vcard'}))} download={`${props.businessCard.name}.vcf`}>Add to Contacts</a>
        : undefined}
        <QRCode value={`http://localhost:3000/card/${props.businessCard.slackID}`} />
        {/* <style jsx>{styles}</style> */}
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

// const styles = css`
// .businessCard {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     background-color: ${colours.CSPS.purple};
//     border: solid ${colours.CSPS.grey} 5px;
//     box-sizing: border-box;
// }

// .avatar {
//     width: 300px;
// }

// .text {
//     color: white;
// }

// .iconLabel {
//     display: flex;
//     align-items: center;
// }

// .iconLabel .text {
//     margin-left: 10px;
// }
// `;