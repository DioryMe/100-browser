import { useNavigate } from "react-router-dom";
import styles from "./ContentSwipes.module.css";
import { IDioryObject } from "@diograph/diograph/types";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

export const ContentSlide = ({ diory }: { diory: IDioryObject }) => {
  const navigate = useNavigate();
  const { storyId } = useSelector((state: RootState) => state.diory);

  return (
    <div
      className={styles.fullImage}
      style={{
        cursor: "grab",
      }}
    >
      <img
        onClick={() => navigate(`/diory/${diory.id}/grid/?storyId=${storyId}`)}
        src={diory && diory.image}
      />
    </div>
  );
};
