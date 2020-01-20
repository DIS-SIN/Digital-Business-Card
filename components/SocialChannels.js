import iconSet from "../icons/selection.json"
import IcomoonReact from "icomoon-react";

const SocialChannels = (props) => {

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
        <React.Fragment>
            {getSocialChannels().map(channel => (
                <a key={channel.fieldID} href={channel.value} title={channel.alt ? channel.alt : channel.label} target="_blank">
                    <IcomoonReact iconSet={iconSet} color="#444" size={20} icon={channel.icon}/>
                </a>
            ))}
        </React.Fragment>
    )
};

export default SocialChannels;