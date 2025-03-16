import { useNavigate, useParams } from "react-router-dom";
import styles from "./DiorySlide.module.css";

import diographJson from "../mary-json.json";
import { Diograph } from "@diograph/diograph";
import { IDioryObject } from "@diograph/diograph/types";
const diograph = new Diograph(diographJson);

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
