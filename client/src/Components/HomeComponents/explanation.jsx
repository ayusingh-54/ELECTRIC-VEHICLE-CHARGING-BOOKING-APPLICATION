import ExplanationBox from "./ExplanationBox";
import "./styles/explanation.css";
const Explanation = () => {
  return (
    <div className="explanation">
      <h1>How it works? </h1>
      <hr />
      <div className="explanation-box-container">
        <ExplanationBox boxNo="box-1" />
        <ExplanationBox boxNo="box-2" />
        <ExplanationBox boxNo="box-3" />
      </div>
    </div>
  );
};

export default Explanation;
