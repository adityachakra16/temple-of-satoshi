export const mockMaps = [
  {
    start: [0, 0],
    end: [0, 5],
    barriers: [[0, 4]],
    stones: [[0, 1]],
    path: [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
    ],
  },
  {
    start: [0, 0],
    end: [7, 1],
    barriers: [
      // [4, 5],
      [5, 1],
      [6, 1],
    ],
    stones: [
      [3, 4],
      [3, 3],
    ],
    path: [
      [0, 0],
      [1, 0],
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 1],
      [5, 1],
      [6, 1],
      [7, 1],
      [4, 2],
      [4, 3],
      [4, 4],
      [3, 3],
      [3, 4],
    ],
  },
];

export const LLMInstructions = `You are creating a map for a strategy game. 

The objective of the game is for a player to start from position A and collect a jewel at position B. However, to collect the jewel the player must unlock barriers that prevent him from getting to the jewel. To unlock these barriers, the player must step on specific areas (lets call them "magical stone") of the same map. For example barrier 1 is linked to magical stone 1, barrier 2 to magical stone 2 and so on. The barrier will only open when the user is stepping on the magical stone currently. If the user steps outside the stone, the barrier will close again.

The player respawns multiple times to finish the game. His movements from all the previous spawns are stored such that they open barriers for the current spawn. Each spawn lasts 10 seconds. If a player was stepping on stone 1 from 3-6 seconds in the previous spawn, barrier 1 will open from 3-6 seconds in the current spawn. So on and so forth.

Assume this is level 1 of the game and the map is a 10x10 grid. Please return a json object containing the data for where you will place all the game objects. Only return the json object and nothing else. The json should contain the following fields - 


1. start - (x, y) coordinates of position A
2. end - (x,y) coordinates of position B
3. barriers - Array of (x,y) coordinates where barriers will be placed
4. stones - Array of (x,y) coordinates where magic stones will be placed
5. path - Array of (x,y) coordinates where the player can traverse. start, end, barriers and stones must all be reachable by the path. Dont return all the coordinates in the 9x9 matrix, only coordinates that are relevant, ie, must exist for a player to react from start to end and stepping stones.`;
