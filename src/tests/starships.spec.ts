import { assert, expect } from "chai";
import sinon, { SinonStub } from "sinon";

import axios from "axios";
import * as starships from "../repo/starships";

const STARSHIP_LIST = {
  results: [
    {
      name: "Death Star",
      model: "DS-1 Orbital Battle Station",
      passengers: "843,342",
    },
    {
      name: "Millennium Falcon",
      model: "YT-1300 light freighter",
      passengers: "6",
    },
  ],
};

const DEATH_STAR = {
  id: 9,
  name: "Death Star",
  model: "DS-1 Orbital Battle Station",
  passengers: "843,342",
};

describe("Testing Star Wars API (StarShips)", function () {
  let stub: SinonStub;

  beforeEach(function () {});

  afterEach(function () {
    stub.restore();
  });

  it("Gets a list of starships", async function () {
    stub = sinon
      .stub(axios, "request")
      .returns(Promise.resolve({ data: STARSHIP_LIST }));

    return starships.getStarShips().then(function (list) {
      assert.isNotEmpty(list, "StarShip list is not empty");
    });
  });

  it("Getting a list of characters might throw an error", function () {
    stub = sinon.stub(axios, "request").throws();

    return starships
      .getStarShips()
      .then()
      .catch((error) => {
        expect(error).to.be.instanceOf(Error);
      });
  });

  it("Gets a Death Star ship info", function () {
    stub = sinon
      .stub(axios, "request")
      .returns(Promise.resolve({ data: DEATH_STAR }));

    return starships.getStarShip(DEATH_STAR.id).then(function (ship) {
      assert.equal(ship.name, "Death Star");
      assert.equal(ship.model, "DS-1 Orbital Battle Station");
    });
  });

  it("Getting starship data might throw an error", function () {
    stub = sinon.stub(axios, "request").throws();

    return starships
      .getStarShip(DEATH_STAR.id)
      .then()
      .catch(function (error) {
        expect(error).to.be.instanceOf(Error);
      });
  });
});
