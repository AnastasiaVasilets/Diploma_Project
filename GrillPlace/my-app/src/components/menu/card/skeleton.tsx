import ContentLoader from "react-content-loader"

const Skeleton = (props:any) => (
  <ContentLoader 
    speed={0}
    width={310}
    height={479}
    viewBox="0 0 280 465"
    backgroundColor="#ebe6e6"
    foregroundColor="#e1d8cd"
    {...props}
  >
    <rect x="0" y="0" rx="8" ry="8" width="260" height="260" /> 
    <rect x="30" y="268" rx="0" ry="0" width="194" height="27" /> 
    <rect x="1" y="427" rx="0" ry="0" width="97" height="27" /> 
    <rect x="142" y="417" rx="14" ry="14" width="114" height="45" /> 
    <rect x="0" y="311" rx="10" ry="10" width="260" height="95" />
  </ContentLoader>
)

export default Skeleton