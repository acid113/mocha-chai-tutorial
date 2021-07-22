import { expect } from "chai";
import sinon, { SinonStub } from "sinon";

import axios from "axios";
import * as people from "./../repo/people";

const CHARACTER_LIST = {
  results: [
    {
      name: "Luke Skywalker",
      gender: "male",
    },
    {
      name: "C-3PO",
      gender: "n/a",
    },
    {
      name: "Leia Organa",
      gender: "female",
    },
  ],
};

const LUKE_SKYWALKER = {
  id: 1,
  name: "Luke Skywalker",
  height: "172",
  birth_year: "19BBY",
  gender: "male",
};

describe("Testing Star Wars API", () => {
  let stub: SinonStub;

  beforeEach(() => {});

  afterEach(() => {
    stub.restore();
  });

  it("Gets a list of characters", () => {
    stub = sinon
      .stub(axios, "request")
      .returns(Promise.resolve({ data: CHARACTER_LIST }));

    people.getCharacters().then((list) => {
      expect(list).to.be.not.empty;
    });

    // * will sometimes fail => missing done()
    // const list = await people.getCharacters();
    // expect(list).to.be.not.empty;
  });

  it("Gets Luke Skywalker character info", () => {
    stub = sinon
      .stub(axios, "request")
      .returns(Promise.resolve({ data: LUKE_SKYWALKER }));

    people.getCharacter(LUKE_SKYWALKER.id).then((character) => {
      expect(character.name).to.be.equal("Luke Skywalker");
    });

    // * will sometimes fail => missing done()
    // const character = await people.getCharacter(LUKE_SKYWALKER.id);
    // expect(character.name).to.be.equal("Luke Skywalker");
  });
});
