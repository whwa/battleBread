import React from 'react';
import PropTypes from 'prop-types';
import randomInt from 'random-int';
import { getInfo } from '../actions.js';
import { connect } from 'react-redux';
import { range } from 'lodash';
import { guess } from '../actions.js';

import SmartPlayer from '../AI/ai';

const ai = new SmartPlayer();


/**
 * The tile is indexed by id in the board state.
 * When clicked, dispatches a guess action for the player guess, and one for the AI response
 * @param { object } props
 * @property { string } size ex: '48px'
 * @property { boolean } guessed
 * @property { boolean } hasBread
 * @property { string } color 'blue' || 'green' || 'red'
 * @property { string } id ex: '1,2' or '6,3'
 * }
 */
const Tile = (props) => {
  // console.log('PROPS>>>>>>>>', props)
  const { id, size, color, guessed } = props.options;
  const player = props.player;
  let styles = {
    width: size,
    height: size,
    }

  if (props.options.guessed === true && props.options.dispImage === false){
    styles.backgroundColor = 'red';
  }
  if (props.options.guessed === true && props.options.dispImage === true){
    styles.backgroundImage = `url("${props.options.image}")`;
    styles.backgroundSize = '100%';
  }
  if (props.options.guessed){
  console.log('props.options.guessed', props.options.guessed)
  }
  // console.log('props', props)
  // console.log('styles', styles)

  return (
    <div
      className="card"
      id={id}
      style={styles}
      /**
       * Invoke a guess action, iff this tile is on the opponent's board. Then, have the AI guess randomly.
       */
      onClick={() => {
        console.log('turn', props.turn);
        if (props.player === 'p2' && !guessed && props.turn === 'p1') {
          guess(player, id);
          const hit = ai.hit();
          debugger
          guess('p1', hit.prey.toString(), hit.callback);
        }
        //if player = p1 and board state is not ready, this is where logic for placing ships will go
      }}
    >
      <div className="card-text">

      </div>
    </div>
  );
};

/**
 * @todo: update this based on above shape
 */
Tile.propTypes = {
  options: PropTypes.shape({
    id: PropTypes.string,
    row: PropTypes.number,
    col: PropTypes.number,
    width: PropTypes.string,
    height: PropTypes.string,
    color: PropTypes.string,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  player: PropTypes.string.isRequired,
};


const mapStateToProps = ({ gameInfo }) => ({ ...gameInfo });

export default connect(mapStateToProps)(Tile);
// export default connect()(Tile);
