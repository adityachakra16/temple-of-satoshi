import {
  ActionConfirmationStatus,
  ActionExecutionStatus,
  ActionSchema,
  MicroRollup,
} from "@stackr/sdk";
import { getDefaultProvider } from "ethers";
import express from "express";
import { stackrConfig } from "../stackr.config";
import { StartLevelSchema, EndLevelSchema } from "./stackr/schemas";
import { machine, MACHINE_ID } from "./stackr/machine";
import { mockMaps } from "./constants";

const PORT = process.env.PORT || 3210;

const stfSchemaMap: Record<string, ActionSchema> = {
  startLevel: StartLevelSchema,
  endLevel: EndLevelSchema,
};

const mru = await MicroRollup({
  config: stackrConfig,
  actionSchemas: [StartLevelSchema, EndLevelSchema],
  stateMachines: [machine],
});

const main = async () => {
  await mru.init();

  const app = express();
  app.use(express.json({ limit: "50mb" }));
  // allow CORS
  app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  const stateMachine = mru.stateMachines.get<typeof machine>(MACHINE_ID);
  if (!stateMachine) {
    throw new Error("State machine not found");
  }

  app.get("/", (_req, res) => {
    const { state } = stateMachine;
    return res.json(state);
  });

  app.get("/info", (_, res) => {
    const transitionToSchema = mru.getStfSchemaMap();
    return res.send({
      rpcUrls: [mru.config.L1RPC],
      signingInstructions: "signTypedData(domain, schema.types, inputs)",
      domain: mru.config.domain,
      transitionToSchema,
      schemas: [StartLevelSchema, EndLevelSchema].reduce((acc, schema) => {
        acc[schema.identifier] = {
          primaryType: schema.EIP712TypedData.primaryType,
          types: schema.EIP712TypedData.types,
        };
        return acc;
      }, {} as Record<string, any>),
    });
  });

  app.get("/leaderboard", async (_req, res) => {
    const { state } = stateMachine;
    const sortedPlayers = [...state.players].sort(
      (a, b) =>
        a.scores.reduce((acc, score) => acc + score, 0) -
        b.scores.reduce((acc, score) => acc + score, 0)
    );
    // make sure to return one entry per player
    const leaderboard = sortedPlayers.map((player) => {
      const scores = player.scores.reduce((acc, score) => acc + score, 0);
      return {
        player: player.id,
        scores,
        levelsCompleted: player.levelsCompleted,
      };
    });

    return res.json(leaderboard);
  });

  const handleAction = async (
    transition: string,
    schema: ActionSchema,
    payload: any
  ) => {
    console.log({ transition, schema, payload });
    const action = schema.actionFrom(payload);
    const ack = await mru.submitAction(transition, action);
    const { logs, errors } = await ack.waitFor(ActionConfirmationStatus.C1);
    if (errors?.length) {
      throw new Error(errors[0].message);
    }
    return logs;
  };

  app.post("/:transition", async (req, res) => {
    const { transition } = req.params;

    console.log({ stfSchemaMap, transition });
    const schema = stfSchemaMap[transition];

    const { inputs, signature, msgSender } = req.body;

    try {
      const logs = await handleAction(transition, schema, {
        inputs,
        signature,
        msgSender,
      });
      return res.json({
        isOk: true,
        logs,
      });
    } catch (error: unknown) {
      console.error(error);
      return res.status(500).json({
        isOk: false,
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  });

  const getUniquePlayers = (games: typeof stateMachine.state.games) => {
    const players = new Set<string>();
    for (const game of games) {
      players.add(game.player);
    }
    return [...players];
  };

  app.get("/games", async (_req, res) => {
    const actionsAndBlocks = await mru.actions.query(
      {
        name: "endLevel",
        executionStatus: ActionExecutionStatus.ACCEPTED,
        confirmationStatus: [
          ActionConfirmationStatus.C1,
          ActionConfirmationStatus.C2,
          ActionConfirmationStatus.C3A,
          ActionConfirmationStatus.C3B,
        ],
        block: {
          isReverted: false,
        },
      },
      false
    );

    await Promise.all(
      getUniquePlayers(stateMachine.state.games).map(async (player) => player)
    );

    const games = actionsAndBlocks.map((actionAndBlock) => {
      const { hash, block, payload } = actionAndBlock;
      const { levelId, player, endTime, startTime } = payload;
      return {
        levelId,
        endTime,
        startTime,
        player,
        hash,
        blockInfo: block
          ? {
              status: block.status,
              daMetadata: block.batchInfo?.daMetadata || null,
              l1TxHash: block.batchInfo?.l1TransactionHash || null,
            }
          : null,
      };
    });

    return res.send(games);
  });

  app.get("/map/:levelId", async (req, res) => {
    const { levelId } = req.params;
    const map = mockMaps[levelId as keyof typeof mockMaps];
    return res.send(map);
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

main();
