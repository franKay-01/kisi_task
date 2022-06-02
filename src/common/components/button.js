export const Button = props => {
    return (
        <button className={`${!!props.issecondary && props.issecondary === "true" ? 'btn-secondary' : 'btn-primary'}`} {...props}>{props.label}</button>
    )
}