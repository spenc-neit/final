import { Link } from "react-router-dom";
const Text = (props) =>{
    if(props.link){
        return (
            <Link to={props.linkSrc} style={{color: props.color, fontSize: props.size, display:"inline-block"}}>{props.children}</Link>
        )
    } else {
    return (
        <p style={{color: props.color, fontSize: props.size, display:"inline-block"}}>{props.children}</p>
    )
}
}
export {Text};