import React, { useContext } from "react";
import { useSelector } from "@xstate/react";
import { PortalContext } from "../../lib/PortalProvider";
import { SUNNYSIDE } from "assets/sunnyside";
import { Label } from "components/ui/Label";
import { useAppTranslation } from "lib/i18n/useAppTranslations";
import { PortalMachineState } from "../../lib/Machine";
import { PORTAL_NAME } from "../../Constants";

import blue_balloon from "public/world/balloon-falling-blue.png";

const _target = (state: PortalMachineState) =>
  state.context.state?.minigames.prizes[PORTAL_NAME]?.score ?? 0;
const _score = (state: PortalMachineState) => state.context.score;
const _isTraining = (state: PortalMachineState) => state.context.isTraining;

export const Target: React.FC = () => {
  const { portalService } = useContext(PortalContext);
  const { t } = useAppTranslation();

  const target = useSelector(portalService, _target);
  const score = useSelector(portalService, _score);
  const isTraining = useSelector(portalService, _isTraining);

  const isTargetReached = score >= target;

  return (
    <>
      {isTraining ? (
        <Label className="" type="warning">
          {t("training")}
        </Label>
      ) : (
        <Label
          icon={blue_balloon}
          secondaryIcon={isTargetReached ? SUNNYSIDE.icons.confirm : undefined}
          type={isTargetReached ? "success" : "vibrant"}
        >
          {t(`${PORTAL_NAME}.targetScore`, {
            target: target,
          })}
        </Label>
      )}
    </>
  );
};
