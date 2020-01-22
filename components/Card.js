import Link from 'next/link';
import iconSet from "../icons/selection.json";
import IcomoonReact from "icomoon-react";
import SocialChannels from "./SocialChannels";

const Card = (props) => {

    return (
        <div style={props.viewMode === "desktop" ? styles.card : styles.mobileCard}>
            <img style={styles.avatar} src={props.card.avatar} alt={`${props.card.name}'s avatar`}/>
            <Link href="/card/[id]" as={`/card/${props.card.slackID}`}>
                <p>{props.card.name}</p>
            </Link>
            <p>{props.card.title}</p>
            <p>{props.card.fields.XfMG4K444A ? props.card.fields.XfMG4K444A.value : undefined}</p>
            <div style={styles.socialIcons}>
                <a href={`mailto:${props.card.email}`} title={`Email ${props.card.email}`} target="_blank">
                    <IcomoonReact iconSet={iconSet} color="#444" size={20} icon="email"/>
                </a>
                {props.card.phone ?
                    <a href={`tel:${props.card.phone}`} title={`Call ${props.card.phone}`} target="_blank">
                        <IcomoonReact iconSet={iconSet} color="#444" size={20} icon="phone"/>
                    </a>    
                : undefined}
                <SocialChannels fields={props.fields} card={props.card}/>
            </div>
        </div>
    )
};

const styles = {
    mobileCard: {
        width: "75%",
        display: "flex",
        flexDirection: "column",
        border: "solid black 2px",
        margin: 5
    },
    card: {
        width: 200,
        display: "flex",
        flexDirection: "column",
        border: "solid black 2px",
        margin: 5
    },
    avatar: {
        maxWidth: 200,
        objectFit: "contain"
    },
    socialIcons: {
        display: "flex",
        justifyContent: "space-evenly",
        flex: 1,
        alignItems: "flex-end",
        padding: 10
    }
};

export default Card;