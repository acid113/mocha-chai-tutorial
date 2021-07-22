import { assert, expect } from "chai";

import { getCharacter, getCharacters } from "./../repo/people";

describe("Testing Star Wars API", () => {
  it("Gets a list of characters", async () => {
    const list = await getCharacters();

    expect(list).to.be.not.empty;
  });

  it("Gets Luke Skywalker character info", async () => {
    const character = await getCharacter(1);

    expect(character.name).to.be.equal("Luke Skywalker");
  });
});
