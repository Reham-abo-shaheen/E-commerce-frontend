import { useEffect, useState } from "react"


export default function PlusMinusBtn(props) {


    const [btn, setBtn] = useState(1)

    useEffect(() => {
        props.setCount(btn);
        if (props.changeCount) {
            props.changeCount(props.id, btn)
        }
    }, [btn])

    useEffect(() => {
        if (props.count) {
            setBtn(props.count)
        }

    }, [props.count])

    return (
        <>
            <div className="control float-right">
                <span className="cursor-pointer" onClick={() => btn > 1 ?
                    setBtn((prev) => prev - 1) : setBtn(1)}>-</span>
                <p className="inline-block">{btn}</p>
                <span className="cursor-pointer" onClick={() => {
                    setBtn((prev) => ++prev);

                }
                }
                >+</span>
            </div>
        </>
    )
}