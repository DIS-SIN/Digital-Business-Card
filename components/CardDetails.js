import QRCode from 'qrcode.react';
import styles from "../stylesheets/CardDetails.module.css";
import iconSet from "../icons/selection.json";
import IcomoonReact from "icomoon-react";
import RichPreview from "../components/RichPreview";
import SocialChannels from "../components/SocialChannels";
import {getSocialChannels, getVCard} from "../components/helpers/helperFunctions";

export default function CardDetails(props) {

    return (
        <div className={styles.businessCard}>
            <RichPreview title={props.businessCard.name} description={props.businessCard.title} image={props.businessCard.avatar} url={`localhost:3000/card/${props.businessCard.slackID}`}/>
            <img className={styles.avatar} src={props.businessCard.avatar} alt={`${props.businessCard.name}'s avatar`}/>
            <h1 className={styles.text}>{props.businessCard.name}</h1>
            {props.businessCard.title ? <p className={styles.text}>{props.businessCard.title}</p> : undefined}
            {props.businessCard.fields.XfMG4K444A ? <p className={styles.text}>{props.businessCard.fields.XfMG4K444A.value}</p> : undefined}
            <a className={styles.iconLabel} href={`mailto:${props.businessCard.email}`} title={`Email ${props.businessCard.email}`} target="_blank">
                <IcomoonReact iconSet={iconSet} color="white" size={20} icon="email"/>
                <p className={styles.text}>{props.businessCard.email}</p>
            </a>
            {props.businessCard.phone ?
                <a className={styles.iconLabel} href={`tel:${props.businessCard.phone}`} title={`Call ${props.businessCard.phone}`} target="_blank">
                    <IcomoonReact iconSet={iconSet} color="white" size={20} icon="phone"/>
                    <p className={styles.text}>{props.businessCard.phone}</p>
                </a>    
            : undefined}
            <div className={styles.socialChannels}>
                <SocialChannels fields={props.fields} card={props.businessCard} colour={"white"}/>
            </div>
            {process.browser ? <a className={styles.text} href={window.URL.createObjectURL(new Blob([getVCard(props.businessCard, getSocialChannels(props.fields, props.businessCard))], {type: 'text/x-vcard'}))} download={`${props.businessCard.name}.vcf`}>Add to Contacts</a>
            : undefined}
            <QRCode className={styles.qrCode} value={`http://localhost:3000/card/${props.businessCard.slackID}`} />
        </div>
    );
}