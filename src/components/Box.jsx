export const Box = (props) => {
    return (
        <div className="h-[100px] w-[100px] bg-blue-300 flex justify-center items-center border">
            <p>Ini box : {props.order}</p>
        </div>
    )
}