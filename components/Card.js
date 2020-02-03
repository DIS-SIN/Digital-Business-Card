import Link from 'next/link';
import iconSet from "../icons/selection.json";
import IcomoonReact from "icomoon-react";
import styles from '../stylesheets/Card.module.css';
import {multiClass} from "../components/helpers/helperFunctions";
import {colours} from '../components/helpers/styleVariables';
import SocialChannels from "./SocialChannels";

const Card = (props) => {

    

    return (
        <div className={styles.card}>
            <Link href="/card/[id]" as={`/card/${props.card.slackID}`}>
                <img className={styles.avatar} src={props.card.avatar} alt={`${props.card.name}'s avatar`}/>
            </Link>
            <Link href="/card/[id]" as={`/card/${props.card.slackID}`}>
                <div className={styles.cardContent}>
                    <p className={multiClass(styles.name, styles.cardText)}>{props.card.name}</p>
                    <p className={multiClass(styles.title, styles.cardText)}>{props.card.title}</p>
                    <p className={multiClass(styles.location, styles.cardText)}>{props.card.fields.XfMG4K444A ? props.card.fields.XfMG4K444A.value : undefined}</p>
                </div>
            </Link>
            <div className={styles.socialIcons}>
                <a href={`mailto:${props.card.email}`} title={`Email ${props.card.email}`} target="_blank">
                    <IcomoonReact iconSet={iconSet} color={colours.CSPS.purple} size={20} icon="email"/>
                </a>
                {props.card.phone ?
                    <a href={`tel:${props.card.phone}`} title={`Call ${props.card.phone}`} target="_blank">
                        <IcomoonReact iconSet={iconSet} color={colours.CSPS.purple} size={20} icon="phone"/>
                    </a>    
                : undefined}
                <SocialChannels fields={props.fields} card={props.card} colour={colours.CSPS.purple}/>
            </div>
        </div>
    )
};

export default Card;