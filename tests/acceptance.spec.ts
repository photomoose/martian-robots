import {OldMars} from '../src/oldMars';
import {OldRobot} from '../src/oldRobot';
import {Instruction} from '../src/instructions';
import {Right} from '../src/instructions';
import {Left} from '../src/instructions';
import {Forward} from '../src/instructions';

describe('Acceptance tests', () => {
  let mars: OldMars;
  let instructions: readonly Instruction[];

  beforeEach(() => {
    instructions = [new Left(), new Right(), new Forward()];
    mars = OldMars.create('5 3');
  });

  describe('when commands are sent to the first robot', () => {
    let robot1: OldRobot;

    beforeEach(() => {
      robot1 = new OldRobot(mars, instructions);
      robot1.setPosition('1 1 E');
      robot1.processInstructions('RFRFRFRF');
    });

    it('the robot\'s position should be 1 1 E', () => {
      expect(robot1.getPosition()).toBe('1 1 E');
    });

    describe('when commands are sent to the second robot', () => {
      let robot2: OldRobot;

      beforeEach(() => {
        robot2 = new OldRobot(mars, instructions);
        robot2.setPosition('3 2 N');
        robot2.processInstructions('FRRFLLFFRRFLL');
      });

      it('the robot\'s position should be 3 3 N LOST', () => {
        expect(robot2.getPosition()).toBe('3 3 N LOST');
      });

      describe('when commands are sent to the third robot', () => {
        let robot3: OldRobot;

        beforeEach(() => {
          robot3 = new OldRobot(mars, instructions);
          robot3.setPosition('0 3 W');
          robot3.processInstructions('LLFFFLFLFL');
        });

        it('the robot\'s position should be 2 3 S', () => {
          expect(robot3.getPosition()).toBe('2 3 S');
        });
      });
    });
  });
});

