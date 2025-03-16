import { useNavigate } from "react-router-dom";
import styles from "./ContentSwipes.module.css";
import { IDioryObject } from "@diograph/diograph/types";

export const ContentSlide = ({ diory }: { diory: IDioryObject }) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.fullImage}
      style={{
        cursor: "grab",
      }}
    >
      <img
        onClick={() => navigate(`/diory/${diory.id}`)}
        src={diory && diory.image}
      />
    </div>
  );
};
