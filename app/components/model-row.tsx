import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import style from "./model-row.module.scss";

interface ModelRowProps {
  baseModel: string;
  variants: string[];
  isExpanded: boolean;
  hasSingleVariant: boolean;
  determineModelIcon: (model: string) => JSX.Element;
  extractModelDetails: (model: string) => {
    displayName: string;
    quantBadge: string | null;
  };
  onSelectModel: (model: string) => void;
  onClose: () => void;
  handleToggleExpand: (modelName: string) => void;
}

const ModelRow: React.FC<ModelRowProps> = ({
  baseModel,
  variants,
  isExpanded,
  hasSingleVariant,
  determineModelIcon,
  extractModelDetails,
  onSelectModel,
  onClose,
  handleToggleExpand,
}) => {
  const { quantBadge } = hasSingleVariant
    ? extractModelDetails(variants[0])
    : { quantBadge: null };

  return (
    <div className={style["row"]} key={baseModel}>
      <div
        className={style["summary-continer"]}
        onClick={() => {
          if (hasSingleVariant) {
            onSelectModel(variants[0]);
            onClose();
          } else {
            handleToggleExpand(baseModel);
          }
        }}
      >
        <div className={style["summary"]}>
          <div className={style["summary-model-info"]}>
            {determineModelIcon(variants[0])}
            <span>{baseModel}</span>
            {hasSingleVariant && quantBadge && <span>{quantBadge}</span>}
          </div>
          {!hasSingleVariant && (isExpanded ? <ChevronUp /> : <ChevronDown />)}
        </div>
      </div>
      {isExpanded && !hasSingleVariant && (
        <div className={style["expanded"]}>
          {variants.map((variant) => {
            const { quantBadge } = extractModelDetails(variant);
            return (
              <div
                key={variant}
                onClick={() => {
                  onSelectModel(variant);
                  onClose();
                }}
                className={style["variant-option"]}
              >
                <span className={style["variant-label"]}>
                  {quantBadge || variant}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ModelRow;
