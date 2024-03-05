import {Mars} from './mars';
import {Robot} from './robot';

describe('Acceptance tests', () => {
  let mars: Mars;

  beforeEach(() => {
    mars = Mars.create({ x: 5, y: 3 });
  });

  describe('when commands are sent to the first robot', () => {
    let robot1: Robot;

    beforeEach(() => {
      robot1 = new Robot(mars);
      robot1.setPosition('1 1 E');
      robot1.processInstructions('RFRFRFRF');
    });

    it('the robot\'s position should be 1 1 E', () => {
      expect(robot1.getPosition()).toBe('1 1 E');
    });

    describe('when commands are sent to the second robot', () => {
      let robot2: Robot;

      beforeEach(() => {
        robot2 = new Robot(mars);
        robot2.setPosition('3 2 N');
        robot2.processInstructions('FRRFLLFFRRFLL');
      });

      it('the robot\'s position should be 3 3 N LOST', () => {
        expect(robot2.getPosition()).toBe('3 3 N LOST');
      });

      describe('when commands are sent to the third robot', () => {
        let robot3: Robot;

        beforeEach(() => {
          robot3 = new Robot(mars);
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

