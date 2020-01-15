import iconSet from "../icons/selection.json"
import IcomoonReact, { iconList } from "icomoon-react";

const Card = (props) => {

    function getSocialChannels() {
        let socialChannels = [];
        props.fields.forEach(field => {
            if (props.card.fields[field.fieldID] && field.label != "Where I work"){
                socialChannels.push({
                    label: field.label,
                    value: props.card.fields[field.fieldID].value,
                    alt: props.card.fields[field.fieldID].alt,
                    icon: field.label === "Blog/Website" ? "website" : field.label.toLowerCase(),
                    fieldID: field.fieldID
                });
            }
        });
        return socialChannels;
    }

    return (
        <div style={styles.card}>
            <img style={styles.avatar} src={props.card.avatar}/>
            <p>{props.card.name}</p>
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
                {getSocialChannels().map(channel => (
                    <a key={channel.fieldID} href={channel.value} title={channel.alt ? channel.alt : channel.label} target="_blank">
                        <IcomoonReact iconSet={iconSet} color="#444" size={20} icon={channel.icon}/>
                    </a>
                ))}
            </div>
        </div>
    )
};

const styles = {
    card: {
        width: "15%",
        display: "flex",
        flexDirection: "column",
        border: "solid black 2px",
        margin: 5
    },
    avatar: {
        maxWidth: 200
    },
    socialIcons: {
        display: "flex",
        justifyContent: "space-evenly"
    }
};

export default Card;