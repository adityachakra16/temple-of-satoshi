import { ActionSchema, SolidityType } from "@stackr/sdk";

// define and export the schema for your action
export const StartLevelSchema = new ActionSchema("startLevel", {
  timestamp: SolidityType.UINT,
  width: SolidityType.UINT,
  height: SolidityType.UINT,
});

export const EndLevelSchema = new ActionSchema("endLevel", {
  gameId: SolidityType.STRING,
  level: SolidityType.UINT,
  timestamp: SolidityType.UINT,
  gameInputs: SolidityType.STRING,
});
