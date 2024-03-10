import prompt from 'prompt-sync';
import {OldMars} from './oldMars';
import {OldRobot} from './oldRobot';
import {Forward, Left, Right} from './instructions';

const p = prompt({
  sigint: true
});

console.log('Enter upper-right coordinates of Mars (e.g. 5 3)');
const upperRight = p('> ');

const mars = OldMars.create(upperRight);

let robotNumber = 1;

// noinspection InfiniteLoopJS
while (true) {
  try {
    console.log(`Enter position of Robot ${robotNumber} (e.g. 1 1 N)`);
    const position = p('> ');
    const robot = new OldRobot(mars, [new Left(), new Right(), new Forward()]);
    robot.setPosition(position);

    console.log(`Enter instructions to send to Robot ${robotNumber} (e.g. RFLF)`);
    const instructions = p('> ');
    robot.processInstructions(instructions);

    console.log(`Robot ${robotNumber} position: ${robot.getPosition()}\n\n`);
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
      console.log();
    } else {
      console.error(e);
      console.log();
    }
  }

  robotNumber++;
}
