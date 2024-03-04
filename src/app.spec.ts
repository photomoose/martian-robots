import {App} from './app';

describe('Acceptance tests', () => {
  let app: App;
  let output: string;

  beforeEach(() => {
    app = new App();
    app.processInput('5 3');
  });

  describe('when commands are sent to the first robot', () => {
    beforeEach(() => {
      app.processInput('1 1 E');
      output = app.processInput('RFRFRFRF');
    });

    it('should return the robot\'s position', () => {
      expect(output).toBe('1 1 E');
    });

    describe('when commands are sent to the second robot', () => {
      beforeEach(() => {
        app.processInput('3 2 N');
        output = app.processInput('FRRFLLFFRRFLL');
      });

      it('should return the robot\'s position', () => {
        expect(output).toBe('3 3 N LOST');
      });

      describe('when commands are sent to the third robot', () => {
        beforeEach(() => {
          app.processInput('0 3 W');
          output = app.processInput('LLFFFLFLFL');
        });

        it('should return the robot\'s position', () => {
          expect(output).toBe('2 3 S');
        });
      });
    });
  });
});

