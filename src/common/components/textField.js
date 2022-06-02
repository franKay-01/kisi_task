/*
    interface TextField {
        showLabel?: boolean
        label: string,
        type?: string
    }
*/

export const TextField = props => {

    return (
        <div className="flex flex-col space-y-1">
            {props.showlabel === "false" ? "": <label className="text-sm" htmlFor={props.label}>{props.label}</label>}
            <input type={props.type || 'text'} className="form-control" placeholder={props.label} {...props}/>
        </div>
    )
}