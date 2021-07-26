import { expect } from "chai";
import sinon, { SinonStub } from "sinon";

import axios from "axios";
import * as people from "../repo/people";

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

describe("Testing Star Wars API (Characters)", function () {
  let stub: SinonStub;

  beforeEach(function () {});

  afterEach(function () {
    stub.restore();
  });

  it("Gets a list of characters", async function () {
    stub = sinon
      .stub(axios, "request")
      .returns(Promise.resolve({ data: CHARACTER_LIST }));

    return people.getCharacters().then(function (list) {
      expect(list).to.be.not.empty;
      expect(list).to.have.lengthOf(3);
    });
  });

  it("Getting a list of characters might throw an error", function () {
    stub = sinon.stub(axios, "request").throws();

    return people
      .getCharacters()
      .then()
      .catch((error) => {
        expect(error).to.be.instanceOf(Error);
      });
  });

  it("Gets Luke Skywalker character info", function () {
    stub = sinon
      .stub(axios, "request")
      .returns(Promise.resolve({ data: LUKE_SKYWALKER }));

    return people.getCharacter(LUKE_SKYWALKER.id).then(function (character) {
      expect(character.name).to.be.equal("Luke Skywalker");
    });
  });

  it("Getting character data might throw an error", function () {
    stub = sinon.stub(axios, "request").throws();

    return people
      .getCharacter(LUKE_SKYWALKER.id)
      .then()
      .catch(function (error) {
        expect(error).to.be.instanceOf(Error);
      });
  });
});
