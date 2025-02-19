import Skeleton from "react-loading-skeleton";

export default function SkeletonComponent(props) {
    const SkeletonCount = Array.from({ length: props.length }).map((_, index) => (

        <div className={props.classes} >
            <div key={index} className="mx-1">
                <Skeleton
                    height={props.height}
                    length={props.length}
                    width={props.width}
                />
            </div>
        </div >
    ))
    return (
        SkeletonCount
    )
}